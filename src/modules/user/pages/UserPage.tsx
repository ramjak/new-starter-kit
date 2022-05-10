import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInjection } from "inversify-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Add, ArrowBack, ArrowForward } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import TYPES from "../../../services/types";
import IUserRepository from "../../../repositories/IUserRepository";
import IUser, { IRawUser, userSchema } from "../../../domains/user";
import styles from "./UserPage.module.scss";
import UserRow from "../components/UserRow";

interface IUserPage {}

const UserPage: React.FC<IUserPage> = () => {
  const userRepository = useInjection<IUserRepository>(TYPES.UserRepository);
  const [users, setUsers] = useState<IUser[]>([]);
  const initialUser = useRef<IRawUser>({ name: "", rocket: "", twitter: "" });
  const [modalData, setModalData] = useState<null | IRawUser>(null);

  useEffect(() => {
    const unsubscribe = userRepository.subscribe((state) => {
      console.log({ state });
      setUsers(state.data);
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    userRepository.getAll();
    return () => unsubscribe();
  }, [userRepository]);

  const deleteUser = useCallback((id) => userRepository.delete(id), [
    userRepository,
  ]);

  const openCreateModal = useCallback(() => {
    setModalData(initialUser.current);
  }, []);

  const openEditModal = useCallback((userData: IUser) => {
    setModalData(userData);
  }, []);

  const resetModal = useCallback(() => {
    setModalData(null);
  }, []);

  const submit = useCallback(
    (values: IUser | IRawUser, helper: FormikHelpers<IUser | IRawUser>) => {
      if ("id" in values) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        userRepository.update(values, values.id);
        resetModal();
        helper.setSubmitting(false);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        userRepository.store(values);
        resetModal();
        helper.setSubmitting(false);
      }
    },
    [resetModal, userRepository]
  );

  return (
    <main className={styles.userPage}>
      <h1>User List</h1>
      <Button
        className={styles.addUserBtn}
        variant="contained"
        color="default"
        aria-label="Add user"
        onClick={openCreateModal}
      >
        <Add />
      </Button>
      <Divider />
      <section>
        <TableContainer>
          <Table aria-label="List of users">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Rocket name</TableCell>
                <TableCell>Twitter</TableCell>
                <TableCell>Last updated</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <UserRow
                  key={row.id}
                  row={row}
                  destroy={deleteUser}
                  edit={openEditModal}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <nav>
          <Button aria-label="Previous page">
            <ArrowBack />
          </Button>
          <small>1</small>
          <Button aria-label="Next page">
            <ArrowForward />
          </Button>
        </nav>
      </section>
      <Dialog
        open={modalData !== null}
        maxWidth="xs"
        fullWidth={true}
        onClose={resetModal}
      >
        <Formik
          initialValues={modalData || initialUser.current}
          onSubmit={submit}
          validationSchema={userSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>Create new user</DialogTitle>
              <Divider />
              <DialogContent>
                <Field
                  as={TextField}
                  className={styles.input}
                  error={errors.name && touched.name}
                  helperText={touched.name && errors.name}
                  label="Name"
                  name="name"
                  fullWidth={true}
                />
                <Field
                  as={TextField}
                  className={styles.input}
                  error={errors.rocket && touched.rocket}
                  helperText={touched.rocket && errors.rocket}
                  label="Rocket"
                  name="rocket"
                  fullWidth={true}
                />
                <Field
                  as={TextField}
                  className={styles.input}
                  error={errors.twitter && touched.twitter}
                  helperText={touched.twitter && errors.twitter}
                  label="Twitter"
                  name="twitter"
                  fullWidth={true}
                />
              </DialogContent>
              <Divider />
              <DialogActions>
                <Button variant="text" color="default" onClick={resetModal}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleClick}
                  type="submit"
                >
                  Create
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </main>
  );
};

export default UserPage;

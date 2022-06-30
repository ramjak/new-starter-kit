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
import { useInjection } from "inversify-react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { FormikHelpers } from "formik/dist/types";
import IAdminRepository from "../../repositories/IAdminRepository";
import TYPES from "../../services/types";
import IAdmin, { adminSchema, IRawAdmin } from "../../domains/admin";
import AdminRow from "./components/AdminRow";
import styles from "./AdminPage.module.scss";

interface IAdminPage {}

const AdminPage: FC<IAdminPage> = () => {
  const adminRepository = useInjection<IAdminRepository>(TYPES.AdminRepository);
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [modalData, setModalData] = useState<null | IRawAdmin>(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const unsubscribe = adminRepository.subscribe((state) => {
      setAdmins(state.data);
    });
    adminRepository.getAll(pageNumber).catch((e) => console.error(e));
    return () => {
      console.log("unsubs");
      unsubscribe();
    };
  }, [adminRepository, pageNumber]);

  console.log({ admins });

  const goToNextPage = useCallback(() => {
    setPageNumber((pn) => pn + 1);
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber((pn) => pn - 1);
  }, []);

  const deleteAdmin = useCallback((id) => adminRepository.delete(id), [
    adminRepository,
  ]);

  const initialAdmin = useRef<IRawAdmin>({ name: "", email: "" });

  const openCreateModal = useCallback(() => {
    setModalData(initialAdmin.current);
  }, []);

  const openEditModal = useCallback((adminData: IAdmin) => {
    setModalData(adminData);
  }, []);

  const resetModal = useCallback(() => {
    setModalData(null);
  }, []);

  const submit = useCallback(
    (values: IAdmin | IRawAdmin, helper: FormikHelpers<IAdmin | IRawAdmin>) => {
      if ("id" in values) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        adminRepository.update(values, values.id);
        resetModal();
        helper.setSubmitting(false);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        adminRepository.store(values);
        resetModal();
        helper.setSubmitting(false);
      }
    },
    [adminRepository, resetModal]
  );

  return (
    <main className={styles.adminPage}>
      <h1>Admin List</h1>
      <Button
        className={styles.addAdminBtn}
        variant="contained"
        color="default"
        aria-label="Add admin"
        onClick={openCreateModal}
      >
        <Add />
      </Button>
      <Divider />
      <section>
        <TableContainer>
          <Table aria-label="List of admins">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Last updated</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <AdminRow
                  key={admin.id}
                  admin={admin}
                  destroy={deleteAdmin}
                  edit={openEditModal}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <nav>
          <Button aria-label="Previous page" onClick={goToPrevPage}>
            <ArrowBack />
          </Button>
          <small>{pageNumber}</small>
          <Button aria-label="Next page" onClick={goToNextPage}>
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
          initialValues={modalData || initialAdmin.current}
          onSubmit={submit}
          validationSchema={adminSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>
                {modalData?.name ? "Edit" : "Create new"} admin
              </DialogTitle>
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
                  error={errors.email && touched.email}
                  helperText={touched.email && errors.email}
                  label="Email"
                  name="email"
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
                  {modalData?.name ? "Edit" : "Create"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </main>
  );
};

export default AdminPage;

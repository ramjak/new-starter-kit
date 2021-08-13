import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers } from "formik";
import ROUTES, { useNavigateTo } from "../../routes";
import usePost from "../../domainHooks/usePost";
import IPost, { postSchema } from "../../domains/post";
import { domainPayload } from "../../domainHooks/domainHooksType";

interface ISetPostPage {}

function SetPostPage(props: ISetPostPage) {
  const location = useLocation();
  const navigateTo = useNavigateTo();
  const { read, store, update } = usePost({ doUseList: false });

  const initialPost = useMemo(() => ({ body: "", title: "" }), []);
  const [post, setPost] = useState<domainPayload<IPost>>(initialPost);

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    if (id !== "create") {
      read(id).then((currentPost) => {
        setPost(currentPost);
      });
    }
  }, [location.pathname, read]);

  const isCreate = useMemo(() => location.pathname === ROUTES.createPost.path, [
    location.pathname,
  ]);

  const submit = useCallback(
    async (
      values: domainPayload<IPost>,
      helper: FormikHelpers<domainPayload<IPost>>
    ) => {
      if (isCreate) {
        await store(values);
        helper.resetForm();
      } else {
        const id = location.pathname.split("/")[2];
        update(values, id);
        navigateTo(ROUTES.post);
      }
      helper.setSubmitting(false);
    },
    [isCreate, navigateTo, store, update, location.pathname]
  );

  return (
    <main>
      <h1>{isCreate ? "Create" : "Update"} Post</h1>
      <Formik
        initialValues={post}
        enableReinitialize={true}
        onSubmit={submit}
        validationSchema={postSchema}
      >
        {({ isSubmitting, errors, touched, isValid, dirty }) => (
          <Form title="Create post form">
            <Field
              as={TextField}
              error={errors.title && touched.title}
              helperText={touched.title && errors.title}
              placeholder="title"
              name="title"
              fullWidth={true}
            />
            <Field
              as={TextField}
              multiline={true}
              error={errors.body && touched.body}
              helperText={touched.body && errors.body}
              placeholder="body"
              name="body"
              fullWidth={true}
              rowsMin={2}
              rows={2}
            />
            <Button
              type="submit"
              fullWidth={true}
              variant="outlined"
              disabled={isSubmitting || !(isValid && dirty)}
            >
              {isCreate ? "Create" : "Update"}
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default SetPostPage;

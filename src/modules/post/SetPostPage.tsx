import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import ROUTES, { IRouteParams, useNavigateTo, useParams } from "../../routes";
import usePost from "../../domainHooks/usePost";
import IPost, { postSchema } from "../../domains/post";
import { domainPayload } from "../../domainHooks/domainHooksType";

interface ISetPostPage {}

function SetPostPage(props: ISetPostPage) {
  const params = useParams<
    IRouteParams["createPost"] | IRouteParams["editSinglePost"]
  >();
  const navigateTo = useNavigateTo();
  const { read, store, update } = usePost({ doUseList: false });

  const initialPost = useMemo(() => ({ body: "", title: "" }), []);
  const [post, setPost] = useState<domainPayload<IPost>>(initialPost);

  const idParam = useMemo(() => params?.id, [params?.id]);

  useEffect(() => {
    if (idParam) {
      read(idParam).then((currentPost) => {
        setPost(currentPost);
      });
    }
  }, [idParam, read]);

  const submit = useCallback(
    async (
      values: domainPayload<IPost>,
      helper: FormikHelpers<domainPayload<IPost>>
    ) => {
      if (idParam) {
        update(values, idParam);
        navigateTo(ROUTES.post);
      } else {
        await store(values);
        helper.resetForm();
      }
      helper.setSubmitting(false);
    },
    [idParam, update, navigateTo, store]
  );

  return (
    <main>
      <h1>{!idParam ? "Create" : "Update"} Post</h1>
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
              {!idParam ? "Create" : "Update"}
            </Button>
          </Form>
        )}
      </Formik>
    </main>
  );
}

export default SetPostPage;

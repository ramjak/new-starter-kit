import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import IPost from "../../domains/post";
import usePost from "../../domainHooks/usePost";
import { domainPayload } from "../../domainHooks/domainHooksType";
import useComment from "../../domainHooks/useComment";
import SingleComment from "./SingleComment";
import IComment, { commentSchema } from "../../domains/comment";
import container from "../../inversify.config";
import IAuthService from "../../services/IAuthService";
import TYPES from "../../services/types";
import { IRouteParams, useParams } from "../../routes";

interface ISinglePostPage {}

const SinglePostPage = ({}: ISinglePostPage) => {
  const { id } = useParams<IRouteParams["viewSinglePost"]>();

  const authData = container.get<IAuthService>(TYPES.AuthService).getAuthData();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { username: name, email } = authData!;

  const { read } = usePost({ doUseList: false });
  const { data: comments, store } = useComment(id);

  const initialPost = useMemo(() => ({ body: "", title: "" }), []);
  const [post, setPost] = useState<domainPayload<IPost>>(initialPost);

  const initialComment = useMemo<domainPayload<IComment>>(
    () => ({ postId: parseInt(id, 10), body: "", name, email }),
    [email, id, name]
  );

  useEffect(() => {
    read(id)
      .then((currentPost) => {
        setPost(currentPost);
      })
      .catch((e) => {
        throw e;
      });
  }, [read, id]);

  const submit = useCallback(
    async (
      values: domainPayload<IComment>,
      helper: FormikHelpers<domainPayload<IComment>>
    ) => {
      await store(values);
      helper.resetForm();
      helper.setSubmitting(false);
    },
    [store]
  );

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
      <Formik
        initialValues={initialComment}
        onSubmit={submit}
        validationSchema={commentSchema}
      >
        {({ isSubmitting, errors, touched, isValid, dirty }) => (
          <Form title="create new comment">
            <Field
              as={TextField}
              error={errors.body && touched.body}
              helperText={touched.body && errors.body}
              name="body"
              multiline={true}
              fullWidth={true}
              placeholder="Comment this post"
              label="Comment"
              variant="outlined"
            />
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              disabled={isSubmitting || !(isValid && dirty)}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <hr />
      <section aria-labelledby="comments">
        <h3 id="comments">Comments:</h3>
        {comments.map((c) => (
          <SingleComment key={c.id} comment={c} />
        ))}
      </section>
    </article>
  );
};

export default SinglePostPage;

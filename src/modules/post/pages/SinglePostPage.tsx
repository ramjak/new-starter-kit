import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { FormikHelpers } from "formik/dist/types";
import { useInjection } from "inversify-react";
import { IRawPost } from "../../../domains/post";
import SingleComment from "../components/SingleComment";
import IComment, { commentSchema, IRawComment } from "../../../domains/comment";
import { IRouteParams, useParams } from "../../../routes";
import { useUserContext } from "../../../contexts/UserContext";
import IPostRepository from "../../../repositories/IPostRepository";
import TYPES from "../../../services/types";
import ICommentRepository from "../../../repositories/ICommentRepository";

interface ISinglePostPage {}

const SinglePostPage = ({}: ISinglePostPage) => {
  const { id } = useParams<IRouteParams["viewSinglePost"]>();

  const { userData } = useUserContext();
  const { username: name, email } = userData;

  const initialPost = useMemo(() => ({ body: "", title: "" }), []);
  const [post, setPost] = useState<IRawPost>(initialPost);
  const postRepository = useInjection<IPostRepository>(TYPES.PostRepository);

  const [comments, setComments] = useState<IComment[]>([]);
  const commentRepository = useInjection<ICommentRepository>(
    TYPES.CommentRepository
  );

  const initialComment = useMemo<IRawComment>(
    () => ({ postId: parseInt(id, 10), body: "", name, email }),
    [email, id, name]
  );

  useEffect(() => {
    postRepository
      .read(id)
      .then((currentPost) => {
        setPost(currentPost);
      })
      .catch((e) => {
        throw e;
      });
    commentRepository
      .getAll(id)
      .then((currentPost) => {
        setComments(currentPost);
      })
      .catch((e) => {
        throw e;
      });
  }, [postRepository, id, commentRepository]);

  const submit = useCallback(
    async (values: IRawComment, helper: FormikHelpers<IRawComment>) => {
      await commentRepository.store(id, values);
      helper.resetForm();
      helper.setSubmitting(false);
    },
    [commentRepository, id]
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

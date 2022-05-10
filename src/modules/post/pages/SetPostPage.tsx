import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useInjection } from "inversify-react";
import ROUTES, {
  IRouteParams,
  useNavigateTo,
  useParams,
} from "../../../routes";
import { IRawPost, postSchema } from "../../../domains/post";
import TYPES from "../../../services/types";
import IPostRepository from "../../../repositories/IPostRepository";

interface ISetPostPage {}

const SetPostPage = ({}: ISetPostPage) => {
  const params = useParams<
    IRouteParams["createPost"] | IRouteParams["editSinglePost"]
  >();
  const navigateTo = useNavigateTo();
  const postRepository = useInjection<IPostRepository>(TYPES.PostRepository);

  const initialPost = useMemo(() => ({ body: "", title: "" }), []);
  const [post, setPost] = useState<IRawPost>(initialPost);

  const idParam = useMemo(() => params?.id, [params?.id]);

  useEffect(() => {
    if (idParam) {
      postRepository
        .read(idParam)
        .then((currentPost) => {
          setPost(currentPost);
        })
        .catch((e) => console.error(e));
    }
  }, [idParam, postRepository]);

  const submit = useCallback(
    async (values: IRawPost, helper: FormikHelpers<IRawPost>) => {
      if (idParam) {
        postRepository.update(values, idParam).catch((e) => {
          throw e;
        });
        navigateTo(ROUTES.post);
      } else {
        await postRepository.store(values);
        helper.resetForm();
      }
      helper.setSubmitting(false);
    },
    [idParam, navigateTo, postRepository]
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
};

export default SetPostPage;

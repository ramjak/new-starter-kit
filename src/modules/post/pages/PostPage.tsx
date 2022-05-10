import { useCallback, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useInjection } from "inversify-react";
import styles from "./PostPage.module.scss";
import SinglePost from "../components/SinglePost";
import ROUTES, { IRoute, useNavigateTo as useNT } from "../../../routes";
import TYPES from "../../../services/types";
import IPostRepository from "../../../repositories/IPostRepository";
import IPost from "../../../domains/post";

interface IPostPage {
  // eslint-disable-next-line react/no-unused-prop-types
  useNavigateTo?: () => (route: IRoute, ...params: string[] | number[]) => void;
}

const PostPage = (props: IPostPage) => {
  const { useNavigateTo } = { useNavigateTo: useNT, ...props };
  const postRepository = useInjection<IPostRepository>(TYPES.PostRepository);
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigateTo = useNavigateTo();

  const loadPosts = useCallback(async () => {
    const loadedPosts = await postRepository.getAll();
    setPosts(loadedPosts);
  }, [postRepository]);

  const deletePost = useCallback((id) => postRepository.delete(id), [
    postRepository,
  ]);

  useEffect(() => {
    loadPosts().catch((e) => console.log(e));
  }, [loadPosts]);

  const navigateToSinglePost = useCallback(
    (id) => navigateTo(ROUTES.viewSinglePost, id),
    [navigateTo]
  );

  const navigateToEditForm = useCallback(
    (id) => navigateTo(ROUTES.editSinglePost, id),
    [navigateTo]
  );

  const goToCreatePostPage = useCallback(() => {
    navigateTo(ROUTES.createPost);
  }, [navigateTo]);

  return (
    <main className={styles.postPage}>
      <h1>Post List</h1>
      <Button
        variant="contained"
        color="default"
        className={styles.addPostBtn}
        onClick={goToCreatePostPage}
      >
        <Add />
      </Button>
      <hr />
      {posts.slice(0, 5).map((item) => (
        <SinglePost
          key={item.id}
          item={item}
          view={navigateToSinglePost}
          edit={navigateToEditForm}
          destroy={deletePost}
        />
      ))}
    </main>
  );
};

export default PostPage;

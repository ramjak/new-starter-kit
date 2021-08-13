import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import usePost from "../../domainHooks/usePost";
import styles from "./PostPage.module.scss";
import SinglePost from "./SinglePost";
import ROUTES, { useNavigateTo } from "../../routes";

interface IPostPage {}

function PostPage(props: IPostPage) {
  const { data, destroy } = usePost();
  const navigateTo = useNavigateTo();

  // useEffect(() => {
  //   const currentTitle = document.title;
  //   document.title = 'PostPage';
  //   return () => { document.title = currentTitle };
  // }, []);

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
      {data.slice(0, 5).map((item) => (
        <SinglePost key={item.id} item={item} destroy={destroy} />
      ))}
    </main>
  );
}

export default PostPage;

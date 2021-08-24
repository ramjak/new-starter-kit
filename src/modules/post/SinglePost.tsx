import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import styles from "./SinglePost.module.scss";
import IPost from "../../domains/post";
import ROUTES, { Link, useNavigateTo } from "../../routes";

interface ISinglePost {
  item: IPost;
  destroy(id: string): Promise<unknown>;
}

export default function SinglePost({ item, destroy }: ISinglePost) {
  const navigateTo = useNavigateTo();

  const navigateToEditForm = useCallback(
    () => navigateTo(ROUTES.editSinglePost, item.id),
    [navigateTo, item]
  );
  const destroyThis = useCallback(() => destroy(item.id.toString()), [
    destroy,
    item,
  ]);

  return (
    <article className={styles.post}>
      <h2>
        <Link route={ROUTES.viewSinglePost} params={[item.id]}>
          {item.title}
        </Link>
      </h2>
      <section title="action buttons" className={styles.actions}>
        <Button variant="outlined" color="default" onClick={navigateToEditForm}>
          <Edit />
        </Button>
        &nbsp;
        <Button variant="contained" color="secondary" onClick={destroyThis}>
          <Delete />
        </Button>
      </section>
      <p>{item.body}</p>
    </article>
  );
}

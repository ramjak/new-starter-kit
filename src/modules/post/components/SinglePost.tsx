import React, { useCallback } from "react";
import { Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import styles from "./SinglePost.module.scss";
import IPost from "../../../domains/post";

interface ISinglePost {
  item: IPost;
  view(id: string): unknown;
  edit(id: string): unknown;
  destroy(id: string): Promise<unknown>;
}

export default function SinglePost({ item, destroy, edit, view }: ISinglePost) {
  const viewThis = useCallback(() => view(item.id.toString()), [view, item.id]);
  const editThis = useCallback(() => edit(item.id.toString()), [edit, item.id]);
  const destroyThis = useCallback(() => destroy(item.id.toString()), [
    destroy,
    item,
  ]);

  return (
    <article className={styles.post}>
      <Button
        className={styles.title}
        color="primary"
        onClick={viewThis}
        data-testid="view-btn"
        component="h2"
      >
        {item.title}
      </Button>
      <section title="action buttons" className={styles.actions}>
        <Button
          variant="outlined"
          color="default"
          onClick={editThis}
          data-testid="edit-btn"
        >
          <Edit />
        </Button>
        &nbsp;
        <Button
          variant="contained"
          color="secondary"
          onClick={destroyThis}
          data-testid="destroy-btn"
        >
          <Delete />
        </Button>
      </section>
      <p data-testid="article-body">{item.body}</p>
    </article>
  );
}

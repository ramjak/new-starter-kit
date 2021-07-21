import React, { useEffect, useMemo, useState } from 'react';
import IPost from '../../domains/post';
import usePost from '../../domainHooks/usePost';
import { domainPayload } from '../../domainHooks/domainHooksType';
import { useLocation } from 'react-router-dom';
import useComment from '../../domainHooks/useComment';
import SingleComment from './SingleComment';
import { Button, OutlinedInput } from '@material-ui/core';

interface ISinglePostPage {}

export function SinglePostPage(props: ISinglePostPage) {
  const location = useLocation();

  const id = useMemo(() => location.pathname.split('/')[2], [
    location.pathname,
  ]);

  const { read } = usePost({ doUseList: false });
  const { data: comments } = useComment(id);

  const initialPost = useMemo(() => ({ body: '', title: '' }), []);
  const [post, setPost] = useState<domainPayload<IPost>>(initialPost);

  useEffect(() => {
    if (id) {
      // tslint:disable-next-line no-floating-promises
      read(id).then((currentPost) => {
        setPost(currentPost);
      });
    }
  }, [location.pathname, read, id]);

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
      <form title="create new comment">
        <OutlinedInput
          multiline={true}
          value=""
          fullWidth={true}
          placeholder="Comment this post"
          label="Comment"
        />
        <Button type="submit" color="primary" variant="outlined">
          Submit
        </Button>
      </form>
      <hr />
      <section aria-labelledby="comments">
        <h3 id="comments">Comments:</h3>
        {comments.map((c) => (
          <SingleComment key={c.id} comment={c} />
        ))}
      </section>
    </article>
  );
}

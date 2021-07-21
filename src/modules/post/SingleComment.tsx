import React from 'react';
import IComment from '../../domains/comment';

interface ISingleComment {
  comment: IComment;
}

function SingleComment({ comment }: ISingleComment) {
  return (
    <>
      <article>
        <p>{comment.body}</p>
        <address>
          By:{' '}
          <a href={`mailto:${comment.email}`} rel="author">
            {comment.name}
          </a>
        </address>
      </article>
      <hr />
    </>
  );
}

export default SingleComment;

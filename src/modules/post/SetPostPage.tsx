import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Button, Input } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ROUTES, { useNavigateTo } from '../../routes';
import usePost from '../../domainHooks/usePost';
import IPost from '../../domains/post';
import { domainPayload } from '../../domainHooks/domainHooksType';

interface ISetPostPage {}

function SetPostPage(props: ISetPostPage) {
  const location = useLocation();
  const navigateTo = useNavigateTo();
  const { read, store, update } = usePost({ doUseList: false });

  const initialPost = useMemo(() => ({ body: '', title: '' }), []);
  const [post, setPost] = useState<domainPayload<IPost>>(initialPost);

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    if (id !== 'create') {
      // tslint:disable-next-line no-floating-promises
      read(id).then((currentPost) => {
        setPost(currentPost);
      });
    }
  }, [location.pathname, read]);

  const isCreate = useMemo(() => location.pathname === ROUTES.createPost.path, [
    location.pathname,
  ]);

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPost((prevState) => ({ ...prevState, title: value }));
  }, []);

  const changeBody = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPost((prevState) => ({ ...prevState, body: value }));
  }, []);

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (isCreate) {
        // tslint:disable-next-line no-floating-promises
        store(post);
        setPost(initialPost);
      } else {
        const id = location.pathname.split('/')[2];
        // tslint:disable-next-line no-floating-promises
        update(post, id);
        navigateTo(ROUTES.post);
      }
    },
    [isCreate, navigateTo, initialPost, post, store, update, location.pathname]
  );

  return (
    <main>
      <h1>{isCreate ? 'Create' : 'Update'} Post</h1>
      <form title="Create post form" onSubmit={submit}>
        <Input
          placeholder="title"
          fullWidth={true}
          value={post.title}
          onChange={changeTitle}
        />
        <Input
          multiline={true}
          placeholder="body"
          fullWidth={true}
          rowsMin={2}
          rows={2}
          value={post.body}
          onChange={changeBody}
        />
        <Button type="submit" fullWidth={true} variant="outlined">
          {isCreate ? 'Create' : 'Update'}
        </Button>
      </form>
    </main>
  );
}

export default SetPostPage;

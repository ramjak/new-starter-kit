import React, { useCallback } from 'react';
import TodoPage from './modules/todo';
import LoginPage from './modules/auth/LoginPage';
import Logout from './modules/auth/Logout';
import PostPage from './modules/post';
import SetPostPage from './modules/post/SetPostPage';
import { SinglePostPage } from './modules/post/SinglePostPage';
import { useHistory, Link as RouterLink } from 'react-router-dom';

export enum routeEnum {
  FREE = 'FREE',
  GUEST = 'GUEST',
  AUTHED = 'AUTHED',
}

export interface IRoute {
  path: string;
  exact?: boolean;
  component: React.ReactNode;
  type: routeEnum;
}

const ROUTES: Record<string, IRoute> = {
  todos: { path: '/todos', component: TodoPage, type: routeEnum.FREE },
  home: {
    path: '/',
    exact: true,
    component: () => <h1>Hello, stranger</h1>,
    type: routeEnum.GUEST,
  },
  login: {
    path: '/login',
    exact: false,
    component: LoginPage,
    type: routeEnum.GUEST,
  },
  homeUser: {
    path: '/',
    exact: true,
    component: () => <h1>Hello, user</h1>,
    type: routeEnum.AUTHED,
  },
  createPost: {
    path: '/post/create',
    exact: true,
    component: SetPostPage,
    type: routeEnum.AUTHED,
  },
  editSinglePost: {
    path: '/post/:id/edit',
    component: SetPostPage,
    type: routeEnum.AUTHED,
  },
  viewSinglePost: {
    path: '/post/:id',
    component: SinglePostPage,
    type: routeEnum.AUTHED,
  },
  post: { path: '/post', component: PostPage, type: routeEnum.AUTHED },
  logout: {
    path: '/logout',
    exact: false,
    component: Logout,
    type: routeEnum.AUTHED,
  },
};

const getPath = (route: IRoute, ...params: string[] | number[]) => {
  const wildCards = route.path.match(/(:[^\n/]+)/g) || [];
  if (wildCards.length < params.length) {
    // tslint:disable-next-line no-console
    console.warn(
      'You have too many params for ' +
        route.path +
        '. Current params: ' +
        params.join(',')
    );
  } else if (wildCards.length > params.length) {
    throw new Error(
      'You need to include enough param for ' +
        route.path +
        '. Current params: ' +
        params.join(',')
    );
  }
  return wildCards.reduce(
    (acc, curr, i) => acc.replace(curr, params[i].toString()),
    route.path
  );
};

export const useNavigateTo = () => {
  const history = useHistory();
  return useCallback(
    (route: IRoute, ...params: string[] | number[]) => {
      const finalPath = getPath(route, ...params);
      return history.push(finalPath);
    },
    [history]
  );
};

interface ILink {
  route: IRoute;
  params?: string[] | number[];
}

// tslint:disable-next-line variable-name
export const Link: React.FC<ILink> = (props) => {
  return (
    <RouterLink to={getPath(props.route, ...props.params)}>
      {props.children}
    </RouterLink>
  );
};

export default ROUTES;

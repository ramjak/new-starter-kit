import { useCallback } from "react";
import * as React from "react";
import {
  useHistory,
  Link as RouterLink,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import TodoPage from "./modules/todo/TodoPage";
import LoginPage from "./modules/auth/LoginPage";
import Logout from "./modules/auth/Logout";
import PostPage from "./modules/post/pages/PostPage";
import SetPostPage from "./modules/post/pages/SetPostPage";
import SinglePostPage from "./modules/post/pages/SinglePostPage";
import UserPage from "./modules/user/pages/UserPage";

export enum routeEnum {
  FREE = "FREE",
  GUEST = "GUEST",
  AUTHED = "AUTHED",
}

export interface IRoute {
  path: string;
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<RouteComponentProps & any>;
  type: routeEnum;
}

export interface IRouteParams {
  todos: undefined;
  home: undefined;
  login: undefined;
  homeUser: undefined;
  createPost: undefined;
  editSinglePost: { id: string };
  viewSinglePost: { id: string };
  post: undefined;
  user: undefined;
  logout: undefined;
}

const ROUTES: Record<keyof IRouteParams, IRoute> = {
  todos: { path: "/todos", component: TodoPage, type: routeEnum.FREE },
  home: {
    path: "/",
    exact: true,
    component: () => <h1>Hello, stranger</h1>,
    type: routeEnum.GUEST,
  },
  login: {
    path: "/login",
    exact: false,
    component: LoginPage,
    type: routeEnum.GUEST,
  },
  homeUser: {
    path: "/",
    exact: true,
    component: () => <h1>Hello, user</h1>,
    type: routeEnum.AUTHED,
  },
  createPost: {
    path: "/post/create",
    exact: true,
    component: SetPostPage,
    type: routeEnum.AUTHED,
  },
  editSinglePost: {
    path: "/post/:id/edit",
    component: SetPostPage,
    type: routeEnum.AUTHED,
  },
  viewSinglePost: {
    path: "/post/:id",
    component: SinglePostPage,
    type: routeEnum.AUTHED,
  },
  post: { path: "/post", component: PostPage, type: routeEnum.AUTHED },
  user: { path: "/user", component: UserPage, type: routeEnum.AUTHED },
  logout: {
    path: "/logout",
    exact: false,
    component: Logout,
    type: routeEnum.AUTHED,
  },
};

const getPath = (route: IRoute, ...params: string[] | number[]) => {
  const wildCards = route.path.match(/(:[^\n/]+)/g) || [];
  if (wildCards.length < params.length) {
    throw new Error(
      `You have too many params for ${
        route.path
      }. Current params: ${params.join(",")}`
    );
  } else if (wildCards.length > params.length) {
    throw new Error(
      `You need to include enough param for ${
        route.path
      }. Current params: ${params.join(",")}`
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

export const useParams = <T,>() => {
  const { params } = useRouteMatch<T>();
  return params;
};

interface ILink {
  route: IRoute;
  params?: string[] | number[];
  children: React.ReactNode;
}

export const Link = (props: ILink) => {
  return (
    <RouterLink to={getPath(props.route, ...props.params)}>
      {props.children}
    </RouterLink>
  );
};

export default ROUTES;

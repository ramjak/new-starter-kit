import React from "react";
import { IObjectMap } from "./helpers/types";
import TodoPage from "./modules/todo";

export interface IRoute {
  path: string,
  exact?: boolean,
  component: React.ReactNode
}

export interface IAppRoutes {
  nonAuthed: IObjectMap<IRoute>
  free: IObjectMap<IRoute>
}

const ROUTES: IAppRoutes = {
  free: {
    todos: { path: "/todos", component: TodoPage }
  },
  nonAuthed: {
    home: { path: "/", exact: true, component: () => <h1>Hello, stranger</h1> },
    login: { path: "/login", exact: false, component: () => <h1>Log in</h1> }
  }
};

export default ROUTES;

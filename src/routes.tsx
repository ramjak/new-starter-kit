import React from 'react';
import { IObjectMap } from './helpers/types';
import HomePage from './modules/home';

export interface IRoute {
  path: string;
  exact?: boolean;
  component: React.ReactNode;
}

const ROUTES: IObjectMap<IRoute> = {
  home: { path: '/', exact: true, component: HomePage },
};

export default ROUTES;

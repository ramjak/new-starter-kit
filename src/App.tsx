import React from 'react';
import BasePage, { ILink } from "./components/BasePage";
import ROUTES, {IRoute} from './routes';
import {IObjectMap} from "./helpers/types";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  function getLinks(o: IObjectMap<IRoute>) {
    return Object.keys(o).map(route => ({text: route, link: o[route].path}));
  }

  // const getLinks = (routes: IRoute[]) => routes.map(route => ({ text: route. }))
  const routeLinks: ILink[] = [
    ...(getLinks(ROUTES.free)),
    ...(getLinks(ROUTES.nonAuthed)),
  ];

  function getRoutes(routes: IObjectMap<IRoute>) {
    return Object.values(routes).map(route => <Route
      key={route.path} exact={route.exact} path={route.path}
      // @ts-ignore
      render={(props) => <route.component {...props} />}/>);
  }

  const routes = [
    ...(getRoutes(ROUTES.nonAuthed)),
    ...(getRoutes(ROUTES.free)),
  ];
  return (
    <BrowserRouter>
      <BasePage topNavLinks={routeLinks}>
        <Switch>
          {routes}
          {/*<Route component={() => <h1>Not Found!</h1>} />*/}
        </Switch>
      </BasePage>
    </BrowserRouter>
  );
}

export default App;

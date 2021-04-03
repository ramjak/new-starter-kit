import React from 'react';
import ROUTES, { IRoute } from './routes';
import { IObjectMap } from './helpers/types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core';
import './App.css';

function App() {
  const getRoutes = (currRoutes: IObjectMap<IRoute>) =>
    Object.values(currRoutes).map((route) => (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        // @ts-ignore
        // tslint:disable-next-line jsx-no-lambda
        render={(props) => <route.component {...props} />}
      />
    ));

  const routes = [...getRoutes(ROUTES)];

  return (
    <BrowserRouter>
      <StylesProvider injectFirst={true}>
        <Switch>
          {routes}
          {/* tslint:disable-next-line jsx-no-lambda  */}
          <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;

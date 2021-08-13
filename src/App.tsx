import React, { useCallback } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core";
import BasePage, { ILink } from "./components/BasePage";
import ROUTES, { IRoute, routeEnum } from "./routes";
import { IUserContextValue, UserContextProvider } from "./contexts/UserContext";

function App() {
  function getLinks(text: string, route: IRoute) {
    return {
      text,
      link: route.path,
    };
  }

  const getRouteLinks = (isAuthenticated: boolean): ILink[] => [
    getLinks("Todo", ROUTES.todos),
    ...(!isAuthenticated
      ? [getLinks("Home", ROUTES.home), getLinks("Login", ROUTES.login)]
      : []),
    ...(isAuthenticated
      ? [
          getLinks("Home", ROUTES.homeUser),
          getLinks("Post", ROUTES.post),
          getLinks("Logout", ROUTES.logout),
        ]
      : []),
  ];

  const getRoutes = useCallback(
    (isAuthed: boolean) =>
      Object.values(ROUTES)
        .filter(
          (r) =>
            (r.type === routeEnum.GUEST && !isAuthed) ||
            (r.type === routeEnum.AUTHED && isAuthed) ||
            r.type === routeEnum.FREE
        )
        .map((route) => (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            render={(props) => <route.component {...props} />}
          />
        )),
    []
  );

  const renderNotFound = useCallback(() => <h1>Not Found!</h1>, []);

  return (
    <BrowserRouter>
      <StylesProvider injectFirst={true}>
        <UserContextProvider>
          {({ userData }: IUserContextValue) => {
            return (
              <BasePage topNavLinks={getRouteLinks(!!userData.token)}>
                <Switch>
                  {getRoutes(!!userData.username)}
                  <Route component={renderNotFound} />
                </Switch>
              </BasePage>
            );
          }}
        </UserContextProvider>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Redirect } from "react-router-dom";
import ROUTES from "../../routes";
import { useUserContext } from "../../contexts/UserContext";
import container from "../../inversify.config";
import TYPES from "../../services/types";
import IAuthService from "../../services/IAuthService";

interface ILogout {}

function Logout(props: ILogout) {
  const { setUserData } = useUserContext();
  const authService = container.get<IAuthService>(TYPES.AuthService);

  setUserData({ token: "", username: "", email: "" });
  // tslint:disable-next-line no-floating-promises
  authService.logout();

  return <Redirect to={ROUTES.home.path} />;
}

export default Logout;

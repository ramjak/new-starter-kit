import React from "react";
import { Redirect } from "react-router-dom";
import ROUTES from "../../routes";
import { useUserContext } from "../../contexts/UserContext";

interface ILogout {}

const Logout = ({}: ILogout) => {
  const { logout } = useUserContext();
  logout();

  return <Redirect to={ROUTES.home.path} />;
};

export default Logout;

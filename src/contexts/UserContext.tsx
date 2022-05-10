import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import * as React from "react";
import { interfaces } from "inversify";
import realContainer from "../inversify.config";
import IAuthService from "../services/IAuthService";
import TYPES from "../services/types";

export interface IUser {
  username: string;
  token: string;
  email: string;
}

const defaultUserValue = {
  username: "",
  token: "",
  email: "",
};

export interface IUserContextValue {
  userData: IUser;
  login(user: IUser): void;
  logout(): void;
}

export const UserContext = createContext<IUserContextValue>({
  userData: defaultUserValue,
  login(): void {
    console.log("login");
  },
  logout(): void {
    console.log("logout");
  },
});

export const useUserContext = () => useContext(UserContext);

interface IUserContextProvider {
  container?: interfaces.Container;
}

export const UserContextProvider: React.FC<IUserContextProvider> = (props) => {
  const { children, container } = { container: realContainer, ...props };
  const authService = container.get<IAuthService>(TYPES.AuthService);
  const currentUser = authService.getAuthData();

  const [userData, setUserData] = useState<IUser>(
    currentUser || defaultUserValue
  );

  const login = useCallback(
    (user) => {
      authService.login(user).catch((err) => {
        throw err;
      });
      setUserData(user);
    },
    [authService]
  );

  const logout = useCallback(() => {
    authService.logout().catch((err) => {
      throw err;
    });
    setUserData({ token: "", username: "", email: "" });
  }, [authService]);

  const value = useMemo(() => ({ userData, login, logout }), [
    login,
    logout,
    userData,
  ]);

  return (
    <UserContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </UserContext.Provider>
  );
};

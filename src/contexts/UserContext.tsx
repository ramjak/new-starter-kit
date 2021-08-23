import React, { createContext, useContext, useMemo, useState } from "react";
import container from "../inversify.config";
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
  setUserData(user: IUser): void;
}

const userContext = createContext<IUserContextValue>({
  userData: defaultUserValue,
  setUserData(): void {
    console.log("setUserData");
  },
});

export const useUserContext = () => useContext(userContext);

export const UserContextProvider: React.FC = ({ children }) => {
  const authService = container.get<IAuthService>(TYPES.AuthService);
  const user = authService.getAuthData();

  const [userData, setUserData] = useState<IUser>(user || defaultUserValue);
  const value = useMemo(() => ({ userData, setUserData }), [
    userData,
    setUserData,
  ]);

  return (
    <userContext.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </userContext.Provider>
  );
};

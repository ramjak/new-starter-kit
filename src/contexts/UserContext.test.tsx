import "reflect-metadata";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { IUserContextValue, UserContextProvider } from "./UserContext";
import container from "../__mocks__/inversify.config";
import IAuthService from "../services/IAuthService";
import TYPES from "../services/types";

describe("UserContext", () => {
  let value: IUserContextValue;
  const mockFn = (param: IUserContextValue) => {
    value = param;
  };

  let loginCalledWith: unknown = [];
  let isLogoutCalled = false;
  const initialUserData = {
    username: "test",
    token: "123",
    email: "test@email.com",
  };
  const authServiceMock: IAuthService = {
    getAuthData: () => initialUserData,
    login: async (...params) => {
      loginCalledWith = params;
    },
    logout: async () => {
      isLogoutCalled = true;
    },
  };
  container.unbind(TYPES.AuthService);
  container.bind(TYPES.AuthService).toConstantValue(authServiceMock);

  it("login user and update user data state", () => {
    render(
      <UserContextProvider container={container}>{mockFn}</UserContextProvider>
    );

    const sampleUser = {
      token: "456",
      email: "false@email.com",
      username: "test",
    };

    act(() => {
      value.login(sampleUser);
    });

    expect(loginCalledWith).toEqual([sampleUser]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(value!.userData).toEqual(sampleUser);
  });

  it("logout user and cleaned user data", () => {
    render(
      <UserContextProvider container={container}>{mockFn}</UserContextProvider>
    );

    // assert initial user is defined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(value!.userData).toEqual(initialUserData);

    act(() => {
      value.logout();
    });

    expect(isLogoutCalled).toBe(true);
    // assert initial user is defined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(value!.userData).toEqual({ token: "", username: "", email: "" });
  });
});

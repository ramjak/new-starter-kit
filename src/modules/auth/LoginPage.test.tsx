import "reflect-metadata";
import { createRenderer } from "react-test-renderer/shallow";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "./LoginPage";
import { UserContext } from "../../contexts/UserContext";
import ROUTES from "../../routes";

describe("LoginPage", () => {
  it("render correctly at first load", () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<LoginPage />);
    const result = shallowRenderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it("process input correctly", () => {
    const navigateToMock = jest.fn();
    const useNavigateToMock = () => navigateToMock;
    const loginMock = jest.fn();
    const logoutMock = jest.fn();

    const { getByRole, getByPlaceholderText } = render(
      <UserContext.Provider
        value={{
          userData: { username: "", email: "", token: "" },
          login: loginMock,
          logout: logoutMock,
        }}
      >
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <LoginPage useNavigateTo={useNavigateToMock} />
      </UserContext.Provider>
    );

    userEvent.type(getByPlaceholderText("Username"), "username123");
    expect(getByPlaceholderText("Username")).toHaveValue("username123");

    userEvent.type(getByPlaceholderText("Password"), "password");
    expect(getByPlaceholderText("Password")).toHaveValue("password");

    userEvent.click(getByRole("button", { name: /Log in/i }));

    expect(loginMock).toBeCalledWith({
      email: "username123@email.com",
      token: "username123-password",
      username: "username123",
    });
    expect(navigateToMock).toBeCalledWith(ROUTES.home);
  });
});

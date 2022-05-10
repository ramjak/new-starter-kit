import { Button, Input } from "@material-ui/core";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import ROUTES, { IRoute, useNavigateTo as useNT } from "../../routes";
import { useUserContext } from "../../contexts/UserContext";

interface ILoginPage {
  // eslint-disable-next-line react/no-unused-prop-types
  useNavigateTo?: () => (route: IRoute, ...params: string[] | number[]) => void;
}

interface ICredential {
  username: string;
  password: string;
}

const LoginPage = (props: ILoginPage) => {
  const { useNavigateTo } = { useNavigateTo: useNT, ...props };
  const initValue: ICredential = { password: "", username: "" };
  const [value, setValue] = useState<ICredential>(initValue);
  const navigateTo = useNavigateTo();
  const { login } = useUserContext();

  const submitLogin = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const token = `${value.username}-${value.password}`;
      login({
        token,
        username: value.username,
        email: `${value.username}@email.com`,
      });
      navigateTo(ROUTES.home);
    },
    [login, navigateTo, value.password, value.username]
  );

  const onChangeUsername = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue((state) => ({ ...state, username: event.target.value }));
    },
    []
  );

  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue((state) => ({ ...state, password: event.target.value }));
    },
    []
  );

  return (
    <form onSubmit={submitLogin}>
      <Input
        placeholder="Username"
        fullWidth={true}
        value={value.username}
        onChange={onChangeUsername}
      />{" "}
      <br />
      <Input
        type="password"
        placeholder="Password"
        fullWidth={true}
        value={value.password}
        onChange={onChangePassword}
      />{" "}
      <br />
      <Button
        name="submit"
        type="submit"
        variant="outlined"
        fullWidth={true}
        color="primary"
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginPage;

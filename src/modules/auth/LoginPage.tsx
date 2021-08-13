import { Button, Input } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import container from '../../inversify.config';
import TYPES from '../../services/types';
import IAuthService from '../../services/IAuthService';
import ROUTES, { useNavigateTo } from '../../routes';
import { useUserContext } from '../../contexts/UserContext';

interface ILoginPage {}

interface ICredential {
  username: string;
  password: string;
}

function LoginPage(props: ILoginPage) {
  const initValue: ICredential = { password: '', username: '' };
  const [value, setValue] = useState<ICredential>(initValue);
  const authService = container.get<IAuthService>(TYPES.AuthService);
  const navigateTo = useNavigateTo();
  const { setUserData } = useUserContext();

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = `${value.username}-${value.password}`;
    // tslint:disable-next-line no-floating-promises
    authService.login(token);
    setUserData({
      token,
      username: value.username,
      email: `${value.username}@email.com`,
    });
    navigateTo(ROUTES.home);
  }

  function onChangeUsername(event: ChangeEvent<HTMLInputElement>) {
    setValue((state) => ({ ...state, username: event.target.value }));
  }

  function onChangePassword(event: ChangeEvent<HTMLInputElement>) {
    setValue((state) => ({ ...state, password: event.target.value }));
  }

  return (
    <form onSubmit={login}>
      <Input
        placeholder="Username"
        fullWidth={true}
        value={value.username}
        onChange={onChangeUsername}
      />{' '}
      <br />
      <Input
        type="password"
        placeholder="Password"
        fullWidth={true}
        value={value.password}
        onChange={onChangePassword}
      />{' '}
      <br />
      <Button type="submit" variant="outlined" fullWidth={true} color="primary">
        Log in
      </Button>
    </form>
  );
}

export default LoginPage;

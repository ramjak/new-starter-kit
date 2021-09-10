import { inject, injectable } from "inversify";
import IAuthService from "./IAuthService";
import IPersistentStorage from "./IPersistentStorage";
import TYPES from "./types";
import { IUser } from "../contexts/UserContext";

@injectable()
export default class AuthService implements IAuthService {
  public static readonly AUTH_KEYS: IUser = {
    token: "_appt_",
    username: "_appa_",
    email: "_appb_",
  };

  public static readonly DAY_AFTER_EXPIRED = 7;

  @inject(TYPES.PersistentService) private readonly storage: IPersistentStorage;

  public errorMessage: string;

  public isLoading: boolean;

  public logout() {
    (Object.keys(AuthService.AUTH_KEYS) as Array<
      keyof typeof AuthService.AUTH_KEYS
    >).forEach((key) => this.storage.remove(AuthService.AUTH_KEYS[key]));
    return Promise.resolve();
  }

  public getAuthData() {
    const authData = (Object.keys(AuthService.AUTH_KEYS) as Array<
      keyof typeof AuthService.AUTH_KEYS
    >).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: this.storage.get(AuthService.AUTH_KEYS[curr]),
      }),
      {}
    ) as IUser;

    if (!authData.token) {
      // throw new Error("Token doesn't exist");
      return null;
    }
    return authData;
  }

  public login(authData: IUser) {
    (Object.keys(AuthService.AUTH_KEYS) as Array<
      keyof typeof AuthService.AUTH_KEYS
    >).forEach((key) =>
      this.storage.set(AuthService.AUTH_KEYS[key], authData[key], {
        expires: AuthService.DAY_AFTER_EXPIRED,
      })
    );

    return Promise.resolve();
  }
}

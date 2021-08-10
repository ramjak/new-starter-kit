import IAuthService from './IAuthService';
import IPersistentStorage from './IPersistentStorage';
import { inject, injectable } from 'inversify';
import TYPES from './types';

@injectable()
export default class AuthService implements IAuthService {
  public static readonly AUTH_KEY = '_app_';
  public static readonly DAY_AFTER_EXPIRED = 7;

  @inject(TYPES.PersistentService) private storage: IPersistentStorage;
  public errorMessage: string;
  public isLoading: boolean;

  public logout() {
    this.storage.remove(AuthService.AUTH_KEY);
    return Promise.resolve();
  }

  public getAuthData() {
    const val = this.storage.get(AuthService.AUTH_KEY);
    if (!val) {
      // throw new Error("Token doesn't exist");
      return null;
    }
    return { username: 'test', token: val, email: 'test@email.com' };
  }

  public login(token: string) {
    this.storage.set(AuthService.AUTH_KEY, token, {
      expires: AuthService.DAY_AFTER_EXPIRED,
    });
    return Promise.resolve();
  }
}

import IAuthService, { onTokenChangeType } from './IAuthService';
import IPersistentStorage from './IPersistentStorage';

export default class AuthService implements IAuthService {
  get onTokenChange(): onTokenChangeType {
    return this._onTokenChange;
  }

  set onTokenChange(func: onTokenChangeType) {
    func(this.getToken());
    this._onTokenChange = func;
  }
  public static readonly AUTH_KEY = '_app_';
  public static readonly DAY_AFTER_EXPIRED = 7;

  private storage: IPersistentStorage;

  constructor(storage: IPersistentStorage) {
    this.storage = storage;
  }
  private _onTokenChange: onTokenChangeType = (token: string) => {
    // tslint:disable-next-line no-console
    console.log('no token listener has been set', { token });
  };

  public deleteToken(): void {
    this.storage.remove(AuthService.AUTH_KEY);
    this._onTokenChange('');
  }

  public getToken(): string {
    const val = this.storage.get(AuthService.AUTH_KEY);
    if (!val) {
      // throw new Error("Token doesn't exist");
      return '';
    }
    return val;
  }

  public refreshToken(): void {
    const currentToken = this.getToken();
    this.saveToken(currentToken);
  }

  public saveToken(token: string): void {
    this.storage.set(AuthService.AUTH_KEY, token, {
      expires: AuthService.DAY_AFTER_EXPIRED,
    });
    this._onTokenChange(token);
  }
}

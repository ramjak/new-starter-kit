import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie,
} from 'es-cookie';
import IPersistentStorage, { IStorageOptions } from './IPersistentStorage';
import { injectable } from 'inversify';

@injectable()
export default class CookieService implements IPersistentStorage {
  public get(name: string): string | undefined {
    return getCookie(name);
  }
  public set(name: string, value: string, options?: IStorageOptions): void {
    setCookie(name, value, options);
  }
  public remove(name: string) {
    removeCookie(name);
  }
}

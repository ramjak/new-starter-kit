import {
  get as getCookie,
  remove as removeCookie,
  set as setCookie,
} from 'es-cookie';
import IPersistentStorage, { IStorageOptions } from './IPersistentStorage';

const cookieService: IPersistentStorage = {
  get(name: string): string | undefined {
    return getCookie(name);
  },
  set(name: string, value: string, options?: IStorageOptions): void {
    setCookie(name, value, options);
  },
  remove(name) {
    removeCookie(name);
  },
};

export default cookieService;

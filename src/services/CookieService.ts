import esCookie from 'es-cookie';
import { injectable } from 'inversify';
import IPersistentStorage, { IStorageOptions } from './IPersistentStorage';

@injectable()
export default class CookieService implements IPersistentStorage {
  private readonly cookie = esCookie;

  public get(name: string): string | undefined {
    return this.cookie.get(name);
  }

  public set(name: string, value: string, options?: IStorageOptions): void {
    this.cookie.set(name, value, options);
  }

  public remove(name: string) {
    this.cookie.remove(name);
  }
}

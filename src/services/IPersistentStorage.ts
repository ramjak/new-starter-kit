export interface IStorageOptions {
  expires: number;
}

export default interface IPersistentStorage {
  get(name: string): string | undefined;
  remove(name: string): void;
  set(name: string, value: string, options?: Partial<IStorageOptions>): void;
}

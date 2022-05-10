/* eslint-disable no-underscore-dangle */

export interface IRepositoryState<T> {
  data: T[];
  errorMessage?: string;
  isLoading: boolean;
  total: 0;
}

export type listenerType<T> = (state: IRepositoryState<T>) => unknown;

export class RepositoryState<T> implements IRepositoryState<T> {
  public get errorMessage(): string | undefined {
    return this._errorMessage;
  }

  public set errorMessage(value: string | undefined) {
    this._errorMessage = value;
    this.notify();
  }

  public get data(): T[] {
    return this._data;
  }

  public set data(value: T[]) {
    this._data = value;
    this.notify();
  }

  public get total(): 0 {
    return this._total;
  }

  public set total(value: 0) {
    this._total = value;
    this.notify();
  }

  public get isLoading(): boolean {
    return this._isLoading;
  }

  public set isLoading(value: boolean) {
    this._isLoading = value;
    this.notify();
  }

  public get state() {
    return {
      isLoading: this.isLoading,
      total: this.total,
      errorMessage: this.errorMessage,
      data: this.data,
    };
  }

  private _isLoading: boolean;

  private _total: 0;

  private _data: T[];

  private _errorMessage?: string;

  private readonly listeners: Set<listenerType<T>> = new Set<listenerType<T>>();

  public constructor(state: IRepositoryState<T>) {
    this.isLoading = state.isLoading;
    this.errorMessage = state.errorMessage;
    this.data = state.data;
    this.total = state.total;
  }

  public subscribe(listener: listenerType<T>) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.state));
  }
}

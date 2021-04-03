interface IUrlParam {
  [extraProps: string]: string;
}

export interface IPayload {
  [extraProps: string]: any;
}

export interface IRequestOptions {
  queryObj?: IUrlParam;
  doSendAuth?: boolean;
}

export interface IPostRequestOptions extends IRequestOptions {
  doWithFormData?: boolean;
}

export enum requestMethod {
  get = 'get',
  post = 'post',
}

export default interface IRequestService {
  get(path: string, options?: IRequestOptions): any;
  post(path: string, payload: IPayload, options: IPostRequestOptions): any;
}

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

export enum requestMethodEnum {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

export default interface IRequestService {
  request(
    method: requestMethodEnum,
    path: string,
    payload: IPayload,
    requestOptions?: IPostRequestOptions
  ): Promise<any>;
  get(path: string, options?: IRequestOptions): any;
  post(path: string, payload: IPayload, options?: IPostRequestOptions): any;
}

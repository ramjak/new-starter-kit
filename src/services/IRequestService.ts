interface IUrlParam {
  [extraProps: string]: string;
}

export interface IPayload {
  [extraProps: string]: string | Blob;
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
  request<Res>(
    method: requestMethodEnum,
    path: string,
    payload?: IPayload,
    requestOptions?: IPostRequestOptions
  ): Promise<Res>;
  get<Res>(path: string, options?: IRequestOptions): Promise<Res>;
  post<Res>(
    path: string,
    payload: IPayload,
    options?: IPostRequestOptions
  ): Promise<Res>;
}

import { requestMethodEnum } from "./IHttpService";

interface IUrlParam {
  [extraProps: string]: string;
}

export interface IPayload {
  [extraProps: string]: string | Blob;
}

export interface IRequestOptions {
  queryObj?: IUrlParam;
}

export interface IPostRequestOptions extends IRequestOptions {
  doWithFormData?: boolean;
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
  put<Res>(
    path: string,
    payload: IPayload,
    options?: IPostRequestOptions
  ): Promise<Res>;
  delete<Res>(path: string, options?: IRequestOptions): Promise<Res>;
}

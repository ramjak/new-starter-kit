export enum requestMethodEnum {
  GET = "get",
  POST = "post",
  DELETE = "delete",
  PUT = "put",
}

export interface IHttpServiceConfig {
  method: requestMethodEnum;
  data: Record<string, unknown> | FormData;
  headers: HeadersInit;
  url: string;
}

export default interface IHttpService {
  request: <Res>(
    config: IHttpServiceConfig
  ) => Promise<{
    data: Res;
    status: number;
  }>;
}

import queryStringEncode from "query-string-encode";
import { inject, injectable } from "inversify";
import IAuthService from "./IAuthService";
import IRequestService, {
  IPayload,
  IPostRequestOptions,
  IRequestOptions,
} from "./IRequestService";
import TYPES from "./types";
import IHttpService, {
  IHttpServiceConfig,
  requestMethodEnum,
} from "./IHttpService";

@injectable()
export default class RequestService implements IRequestService {
  @inject(TYPES.AuthService) private readonly authService: IAuthService;

  @inject(TYPES.HttpService) private readonly httpService: IHttpService;

  private readonly baseUrl = process.env.REACT_APP_BASE_API_URL;

  private async setUpHeaders(options?: IPostRequestOptions) {
    const headers: HeadersInit = {
      Accept: "application/json",
    };

    const token = this.authService.getAuthData()?.token;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (!(options && options.doWithFormData)) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  public async request<Res>(
    method: requestMethodEnum,
    path: string,
    payload: IPayload,
    requestOptions?: IPostRequestOptions
  ) {
    const headers = await this.setUpHeaders(requestOptions);

    const requestConfig: IHttpServiceConfig = {
      data: payload,
      headers,
      method,
      url: `${this.baseUrl || ""}${path}`,
    };

    if (requestOptions) {
      if (requestOptions.queryObj) {
        requestConfig.url += `?${queryStringEncode(requestOptions.queryObj)}`;
      }

      if (payload && requestOptions.doWithFormData) {
        const formData = new FormData();

        Object.keys(payload).forEach((key) => {
          formData.append(key, payload[key]);
        });

        requestConfig.data = formData;
      }
    }

    const res = await this.httpService.request<Res>(requestConfig);
    const json = res.data;
    if (res.status < 200 || res.status > 299) {
      // todo: should create a new error type
      throw Error("Something's bad happened");
    }

    return json;
  }

  public get<Res>(path: string, options?: IRequestOptions): Promise<Res> {
    return this.request(requestMethodEnum.GET, path, {}, options);
  }

  public post<Res>(
    path: string,
    payload: IPayload,
    options?: IPostRequestOptions
  ): Promise<Res> {
    return this.request(requestMethodEnum.POST, path, payload, options);
  }

  public put<Res>(
    path: string,
    payload: IPayload,
    options?: IPostRequestOptions
  ): Promise<Res> {
    return this.request(requestMethodEnum.PUT, path, payload, options);
  }

  public delete<Res>(path: string, options?: IRequestOptions): Promise<Res> {
    return this.request(requestMethodEnum.DELETE, path, {}, options);
  }
}

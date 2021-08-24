import axios, { AxiosRequestConfig } from "axios";
import queryStringEncode from "query-string-encode";
import { inject, injectable } from "inversify";
import IAuthService from "./IAuthService";
import IRequestService, {
  IPayload,
  IPostRequestOptions,
  IRequestOptions,
  requestMethodEnum,
} from "./IRequestService";
import TYPES from "./types";

@injectable()
export default class RequestService implements IRequestService {
  @inject(TYPES.AuthService) private readonly authService: IAuthService;

  private readonly baseUrl = process.env.REACT_APP_BASE_API_URL;

  private static async setUpHeaders(options?: IPostRequestOptions) {
    const headers: HeadersInit = {
      Accept: "application/json",
    };

    if (options) {
      if (!options.doWithFormData) {
        headers["Content-Type"] = "application/json";
      }

      if (typeof options.doSendAuth === "boolean") {
        try {
          // headers.Authorization = this.authService.getToken();
        } catch (e) {
          throw new Error("No auth data found");
        }
      }
    }

    return headers;
  }

  public async request<Res>(
    method: requestMethodEnum,
    path: string,
    payload: IPayload,
    requestOptions?: IPostRequestOptions
  ) {
    const headers = RequestService.setUpHeaders(requestOptions);
    // console.log({payload});

    const requestConfig: AxiosRequestConfig = {
      data: payload,
      headers,
      method,
      url: `${this.baseUrl}${path}`,
    };

    if (requestOptions) {
      if (requestOptions.queryObj) {
        requestConfig.url += queryStringEncode(requestOptions);
      }

      if (payload && requestOptions.doWithFormData) {
        const formData = new FormData();

        Object.keys(payload).forEach((key) => {
          formData.append(key, payload[key]);
        });

        requestConfig.data = formData;
      }
    }

    const res = await axios.request<Res>(requestConfig);
    console.log({ res, requestConfig });
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
    options: IPostRequestOptions
  ): Promise<Res> {
    return this.request(requestMethodEnum.POST, path, payload, options);
  }
}

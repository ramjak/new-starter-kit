import axios, { AxiosRequestConfig } from 'axios';
import queryStringEncode from 'query-string-encode';
import IAuthService from './IAuthService';
import IRequestService, {
  IPayload,
  IPostRequestOptions,
  IRequestOptions,
  requestMethod,
} from './IRequestService';

export default class RequestService implements IRequestService {
  private authService: IAuthService;
  private baseUrl = process.env.REACT_APP_BASE_URL;

  constructor(authService: IAuthService) {
    this.authService = authService;
  }

  private async setUpHeaders(options?: IPostRequestOptions) {
    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    if (options) {
      if (!options.doWithFormData) {
        headers['Content-Type'] = 'application/json';
      }

      if (typeof options.doSendAuth === 'boolean') {
        try {
          headers.Authorization = this.authService.getToken();
        } catch (e) {
          throw new Error('No auth data found');
        }
      }
    }

    return headers;
  }

  private async request(
    method: requestMethod,
    path: string,
    payload: IPayload,
    requestOptions?: IPostRequestOptions
  ) {
    const headers = this.setUpHeaders(requestOptions);

    const requestConfig: AxiosRequestConfig = {
      data: {},
      headers,
      method,
      url: `${this.baseUrl}${path}`,
    };

    if (requestOptions) {
      if (requestOptions.queryObj) {
        requestConfig.url =
          requestConfig.url + queryStringEncode(requestOptions);
      }

      if (payload && requestOptions.doWithFormData) {
        const formData = new FormData();

        for (const key in payload) {
          if (payload.hasOwnProperty(key)) {
            formData.append(key, payload[key]);
          }
        }

        requestConfig.data = formData;
      } else {
        requestConfig.data = payload;
      }
    }

    const res = await axios.request(requestConfig);
    const json = res.data;
    if (res.status < 200 || res.status > 299) {
      // todo: should create a new error type
      throw Error(json.error.message || "Something's bad happened");
    }

    return json;
  }

  public get(path: string, options?: IRequestOptions): Promise<any> {
    return this.request(requestMethod.get, path, {}, options);
  }

  public post(
    path: string,
    payload: IPayload,
    options: IPostRequestOptions
  ): Promise<any> {
    return this.request(requestMethod.post, path, payload, options);
  }
}

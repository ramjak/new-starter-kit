import axios, { AxiosRequestConfig } from 'axios';
import queryStringEncode from 'query-string-encode';
import IAuthService from './IAuthService';
import IRequestService, {
  IPayload,
  IPostRequestOptions,
  IRequestOptions,
  requestMethodEnum,
} from './IRequestService';
import { inject, injectable } from 'inversify';
import TYPES from './types';

@injectable()
export default class RequestService implements IRequestService {
  @inject(TYPES.AuthService) private authService: IAuthService;
  private baseUrl = process.env.REACT_APP_BASE_API_URL;

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
          // headers.Authorization = this.authService.getToken();
        } catch (e) {
          throw new Error('No auth data found');
        }
      }
    }

    return headers;
  }

  public async request(
    method: requestMethodEnum,
    path: string,
    payload: IPayload,
    requestOptions?: IPostRequestOptions
  ) {
    const headers = this.setUpHeaders(requestOptions);
    // console.log({payload});

    const requestConfig: AxiosRequestConfig = {
      data: payload,
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
      }
    }

    const res = await axios.request(requestConfig);
    // console.log({ res,  requestConfig });
    const json = res.data;
    if (res.status < 200 || res.status > 299) {
      // todo: should create a new error type
      throw Error(json.error.message || "Something's bad happened");
    }

    return json;
  }

  public get(path: string, options?: IRequestOptions): Promise<any> {
    return this.request(requestMethodEnum.GET, path, {}, options);
  }

  public post(
    path: string,
    payload: IPayload,
    options: IPostRequestOptions
  ): Promise<any> {
    return this.request(requestMethodEnum.POST, path, payload, options);
  }
}

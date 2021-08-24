import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import container from "../inversify.config";
import TYPES from "../services/types";
import IRequestService, {
  IPayload,
  requestMethodEnum,
} from "../services/IRequestService";
import { IDomainData } from "./domainHooksType";

export interface ICancelable {
  cancel(reason: string): void;
}

const addSource = (ongoingRequestSources: ICancelable[]) => {
  const source = axios.CancelToken.source();
  ongoingRequestSources.push(source);

  return source;
};

interface ICreateRequestOptions<Data> {
  cb?: (data: Data[]) => unknown;
  payload?: IPayload;
  doHaveToStored?: boolean;
}

export default function createRequest<Data>(
  baseDomainUrl: string,
  ongoingRequestSources: ICancelable[],
  setInfo: Dispatch<SetStateAction<IDomainData<Data>>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapper: (originalObj: any) => Data[]
) {
  return async (
    url: string,
    type: requestMethodEnum,
    { cb, payload, doHaveToStored }: ICreateRequestOptions<Data> = {}
  ) => {
    setInfo((pState) => ({
      ...pState,
      isLoading: true,
      errorMessage: "",
    }));
    const source = addSource(ongoingRequestSources);
    const requestService = container.get<IRequestService>(TYPES.RequestService);

    // console.trace('cek', { url, type, cb, payload, doHaveToStored });
    try {
      const res = await requestService.request(
        type,
        `${baseDomainUrl}${url}`,
        payload
      );
      // if request canceled, why it is not throwing any error tho
      if (res) {
        if (doHaveToStored) {
          const mappedData = mapper(res);
          setInfo((pState) => ({
            ...pState,
            isLoading: false,
            data: mappedData,
          }));
          cb && cb(mappedData);
        } else {
          setInfo((pState) => ({
            ...pState,
            isLoading: false,
          }));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cb && cb(res as any);
        }
      }
      ongoingRequestSources.filter((src) => src !== source);

      return res;
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log(`request cancelled:${e.message}`);
      } else {
        setInfo((pState) => ({
          ...pState,
          isLoading: false,
          errorMessage: e?.message,
        }));
        console.error(`an error happened:${e?.message}`);
      }
      throw e;
    }
  };
}

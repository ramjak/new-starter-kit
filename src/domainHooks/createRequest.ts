import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { container } from '../inversify.config';
import TYPES from '../services/types';
import IRequestService, {
  requestMethodEnum,
} from '../services/IRequestService';
import { IDomainData } from './domainHooksType';

export interface ICancelable {
  cancel(reason: string): void;
}

const addSource = (ongoingRequestSources: ICancelable[]) => {
  const source = axios.CancelToken.source();
  ongoingRequestSources.push(source);

  return source;
};

export default function createRequest<Data>(
  baseDomainUrl: string,
  ongoingRequestSources: ICancelable[],
  setInfo: Dispatch<SetStateAction<IDomainData<Data>>>,
  mapper: (originalObj: any) => Data
) {
  return async (
    url: string,
    type: requestMethodEnum,
    { cb, payload, doHaveToStored }: any = {}
  ) => {
    setInfo((pState) => ({
      ...pState,
      isLoading: true,
      errorMessage: '',
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
        const mappedData = doHaveToStored && mapper(res);
        setInfo((pState) => ({
          ...pState,
          isLoading: false,
          ...(doHaveToStored && { data: mappedData }),
        }));
        ongoingRequestSources.filter((src) => src !== source);
        cb && cb(res.data);
      }

      return res;
    } catch (e) {
      if (axios.isCancel(e)) {
        // tslint:disable-next-line no-console
        console.log(`request cancelled:${e.message}`);
      } else {
        setInfo((pState) => ({
          ...pState,
          isLoading: false,
          errorMessage: e?.message,
        }));
        // tslint:disable-next-line no-console
        console.error('an error happened:' + e?.message);
      }
      throw e;
    }
  };
}

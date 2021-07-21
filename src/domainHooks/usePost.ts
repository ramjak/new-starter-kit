import { useCallback, useEffect, useRef, useState } from 'react';
import createRequest, { ICancelable } from './createRequest';
import { camelToSnakeKeys } from '../helpers/string';
import domainHooksType, { IDomainData } from './domainHooksType';
import { requestMethodEnum } from '../services/IRequestService';
import IPost from '../domains/post';

const identityFunc = (I: any) => I;
type usePostType = domainHooksType<IPost, any>;

const usePost: usePostType = (options = { doUseList: true }) => {
  const defaultMeta = {
    // pageNumber: 1,
    // limit: 10,
  };

  const [info, setInfo] = useState<IDomainData<IPost>>({
    data: [],
    errorMessage: '',
    isLoading: false,
    total: 0,
  });
  const [meta, setMeta] = useState({ ...defaultMeta, ...options.initialMeta });

  const ongoingRequestSources = useRef<ICancelable[]>([]);

  const request = useCallback(
    createRequest('/posts', ongoingRequestSources.current, setInfo, (res) => {
      return res?.map(options.inboundMapper || identityFunc);
    }),
    []
  );

  const getAll = useCallback(() => {
    if (!options.doUseList) {
      return;
    }

    const newMeta = camelToSnakeKeys(meta);
    const rawMetaQs = Object.keys(newMeta).reduce(
      (acc, key) => `${acc}${key}=${newMeta[key]}&`,
      ''
    );
    const metaQs = rawMetaQs.replace(/&$/, '');

    return request(`?${metaQs}`, requestMethodEnum.GET, {
      doHaveToStored: true,
    });
  }, [options.doUseList, request, meta]);

  const store = useCallback(
    async (payload) => {
      const res = await request(`/`, requestMethodEnum.POST, { payload });
      getAll();
      return res;
    },
    [request, getAll]
  );

  const read = useCallback(
    async (id) => {
      const res = await request(`/${id}`, requestMethodEnum.GET);
      // console.log({res})
      return res;
    },
    [request]
  );

  const destroy = useCallback(
    async (id) => {
      const res = await request(`/${id}`, requestMethodEnum.DELETE);
      getAll();
      return res;
    },
    [request, getAll]
  );

  const update = useCallback(
    async (payload, id) => {
      const res = await request(`/${id}`, requestMethodEnum.PUT, { payload });
      getAll();
      return res;
    },
    [request, getAll]
  );

  useEffect(() => {
    getAll();
    const currentSources = ongoingRequestSources.current;
    return () =>
      currentSources.forEach((source) =>
        source.cancel('Cancelling in cleanup')
      );
  }, [getAll]);

  return { ...info, ...meta, setMeta, read, store, update, destroy };
};

export default usePost;

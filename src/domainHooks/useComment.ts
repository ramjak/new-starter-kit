import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import createRequest, { ICancelable } from "./createRequest";
import { camelToSnakeKeys } from "../helpers/string";
import domainHooksType, { IDomainData } from "./domainHooksType";
import IComment from "../domains/comment";
import { requestMethodEnum } from "../services/IHttpService";

const identityFunc = (I: unknown) => I;

type useCommentType = domainHooksType<IComment, unknown> extends (
  ...p: infer U
) => infer R
  ? (userId: number | string, ...p: U) => R
  : never;

const useComment: useCommentType = (userId, options = { doUseList: true }) => {
  const defaultMeta = {
    // pageNumber: 1,
    // limit: 10,
  };

  const [info, setInfo] = useState<IDomainData<IComment>>({
    data: [],
    errorMessage: "",
    isLoading: false,
    total: 0,
  });
  const [meta, setMeta] = useState({ ...defaultMeta, ...options.initialMeta });

  const ongoingRequestSources = useRef<ICancelable[]>([]);

  const request = useMemo(
    () =>
      createRequest<IComment>(
        `/posts/${userId}/comments`,
        ongoingRequestSources.current,
        setInfo,
        (res) => {
          return res?.map(options.inboundMapper || identityFunc);
        }
      ),
    [options.inboundMapper, userId]
  );

  const getAll = useCallback(() => {
    if (!options.doUseList) {
      return Promise.resolve();
    }

    const newMeta = camelToSnakeKeys(meta);
    const rawMetaQs = Object.keys(newMeta).reduce(
      (acc, key) => `${acc}${key}=${newMeta[key]}&`,
      ""
    );
    const metaQs = rawMetaQs.replace(/&$/, "");

    return request(`?${metaQs}`, requestMethodEnum.GET, {
      doHaveToStored: true,
    });
  }, [options.doUseList, request, meta]);

  const store = useCallback(
    async (payload) => {
      const res = await request(`/`, requestMethodEnum.POST, { payload });
      getAll().catch((e) => {
        throw e;
      });
      return res;
    },
    [request, getAll]
  );

  const read = useCallback(
    async (id) => {
      const res = await request(`/${id}`, requestMethodEnum.GET);
      // console.log({res})
      return res as IComment;
    },
    [request]
  );

  const destroy = useCallback(
    async (id) => {
      const res = await request(`/${id}`, requestMethodEnum.DELETE);
      getAll().catch((e) => {
        throw e;
      });
      return res;
    },
    [request, getAll]
  );

  const update = useCallback(
    async (payload, id) => {
      const res = await request(`/${id}`, requestMethodEnum.PUT, { payload });
      getAll().catch((e) => {
        throw e;
      });
      return res;
    },
    [request, getAll]
  );

  useEffect(() => {
    getAll().catch((e) => {
      throw e;
    });
    const currentSources = ongoingRequestSources.current;
    return () =>
      currentSources.forEach((source) =>
        source.cancel("Cancelling in cleanup")
      );
  }, [getAll]);

  return { ...info, ...meta, setMeta, read, store, update, destroy };
};

export default useComment;

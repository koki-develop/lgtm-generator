import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { lgtmsState } from '~/recoil/atoms';
import { ApiClient } from '~/lib/apiClient';
import { Lgtm } from '~/types/lgtm';

export const useLgtms = (): Lgtm[] => {
  return useRecoilValue(lgtmsState);
};

export type FetchLgtmsFn = (after?: string) => Promise<void>;

export const useFetchLgtms = (): {
  fetchLgtms: FetchLgtmsFn;
  loading: boolean;
  isTruncated: boolean;
} => {
  const perPage = useMemo(() => 20, []);
  const [loading, setLoading] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  const setLgtms = useSetRecoilState(lgtmsState);

  const fetchLgtms = useCallback(
    async (after?: string) => {
      setLoading(true);
      await ApiClient.getLgtms(perPage, after)
        .then(lgtms => {
          setLgtms(prev => [...prev, ...lgtms]);
          setIsTruncated(lgtms.length === perPage);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [perPage, setLgtms],
  );

  return { fetchLgtms, loading, isTruncated };
};

export type CreateLgtmFromBase64Fn = (
  base64: string,
  contentType: string,
) => Promise<void>;

export const useCreateLgtmFromBase64 = (): {
  createLgtmFromBase64: CreateLgtmFromBase64Fn;
  loading: boolean;
} => {
  const setLgtms = useSetRecoilState(lgtmsState);
  const [loading, setLoading] = useState<boolean>(false);

  const createLgtmFromBase64 = useCallback(
    async (base64: string, contentType: string) => {
      setLoading(true);
      await ApiClient.createLgtmFromBase64(base64, contentType)
        .then(lgtm => {
          setLgtms(prev => [lgtm, ...prev]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setLgtms],
  );

  return { createLgtmFromBase64, loading };
};

import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { lgtmsState } from '~/recoil/atoms';
import { ApiClient } from '~/lib/apiClient';
import { useToast } from '~/components/providers/ToastProvider';
import { Lgtm } from '~/types/lgtm';
import { UnsupportedImageFormatError } from '~/lib/errors';

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

// TODO: fromUrl と共通化する
export const useCreateLgtmFromBase64 = (): {
  createLgtmFromBase64: CreateLgtmFromBase64Fn;
  loading: boolean;
} => {
  const setLgtms = useSetRecoilState(lgtmsState);
  const [loading, setLoading] = useState<boolean>(false);

  const { enqueueSuccess, enqueueError } = useToast();

  const createLgtmFromBase64 = useCallback(
    async (base64: string, contentType: string) => {
      setLoading(true);
      await ApiClient.createLgtmFromBase64(base64, contentType)
        .then(lgtm => {
          setLgtms(prev => [lgtm, ...prev]);
          enqueueSuccess('LGTM 画像を生成しました');
        })
        .catch(err => {
          switch (err.constructor) {
            case UnsupportedImageFormatError:
              enqueueError('サポートしていない画像形式です');
              break;
            default:
              enqueueError('LGTM 画像の生成に失敗しました');
              console.error(err);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [enqueueError, enqueueSuccess, setLgtms],
  );

  return { createLgtmFromBase64, loading };
};

export type CreateLgtmFromUrlFn = (url: string) => Promise<void>;

export const useCreateLgtmFromUrl = (): {
  createLgtmFromUrl: CreateLgtmFromUrlFn;
  loading: boolean;
} => {
  const setLgtms = useSetRecoilState(lgtmsState);
  const [loading, setLoading] = useState<boolean>(false);

  const { enqueueSuccess, enqueueError } = useToast();

  const createLgtmFromUrl = useCallback(
    async (url: string) => {
      setLoading(true);
      await ApiClient.createLgtmFromUrl(url)
        .then(lgtm => {
          setLgtms(prev => [lgtm, ...prev]);
          enqueueSuccess('LGTM 画像を生成しました');
        })
        .catch(err => {
          switch (err.constructor) {
            case UnsupportedImageFormatError:
              enqueueError('サポートしていない画像形式です');
              break;
            default:
              enqueueError('LGTM 画像の生成に失敗しました');
              console.error(err);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [enqueueError, enqueueSuccess, setLgtms],
  );

  return { createLgtmFromUrl, loading };
};

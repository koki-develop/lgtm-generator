import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useToast } from '~/components/providers/ToastProvider';
import { ApiClient } from '~/lib/apiClient';
import { DataStorage } from '~/lib/dataStorage';
import { UnsupportedImageFormatError } from '~/lib/errors';
import { lgtmsState, favoriteIdsState } from '~/recoil/atoms';
import { Lgtm } from '~/types/lgtm';
import { useTranslate } from './translateHooks';

export const useLgtms = (): Lgtm[] => {
  return useRecoilValue(lgtmsState);
};

export type FetchLgtmsFn = (options: {
  reset?: boolean;
  after?: string;
  random: boolean;
}) => Promise<void>;

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
    async (options: { reset?: boolean; after?: string; random: boolean }) => {
      if (options.reset) {
        setLgtms([]);
      }
      setLoading(true);
      await ApiClient.getLgtms(options)
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

  useEffect(() => {
    return () => {
      setLgtms([]);
    };
  }, [setLgtms]);

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
  const { t } = useTranslate();

  const createLgtmFromBase64 = useCallback(
    async (base64: string, contentType: string) => {
      setLoading(true);
      await ApiClient.createLgtmFromBase64(base64, contentType)
        .then(lgtm => {
          setLgtms(prev => [lgtm, ...prev]);
          enqueueSuccess(t.GENERATED_LGTM_IMAGE);
        })
        .catch(err => {
          switch (err.constructor) {
            case UnsupportedImageFormatError:
              enqueueError(t.UNSUPPORTED_IMAGE_FORMAT);
              break;
            default:
              enqueueError(t.LGTM_IMAGE_GENERATION_FAILED);
              console.error(err);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [
      enqueueError,
      enqueueSuccess,
      setLgtms,
      t.GENERATED_LGTM_IMAGE,
      t.LGTM_IMAGE_GENERATION_FAILED,
      t.UNSUPPORTED_IMAGE_FORMAT,
    ],
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
  const { t } = useTranslate();

  const createLgtmFromUrl = useCallback(
    async (url: string) => {
      setLoading(true);
      await ApiClient.createLgtmFromUrl(url)
        .then(lgtm => {
          setLgtms(prev => [lgtm, ...prev]);
          enqueueSuccess(t.GENERATED_LGTM_IMAGE);
        })
        .catch(err => {
          switch (err.constructor) {
            case UnsupportedImageFormatError:
              enqueueError(t.UNSUPPORTED_IMAGE_FORMAT);
              break;
            default:
              enqueueError(t.LGTM_IMAGE_GENERATION_FAILED);
              console.error(err);
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [
      enqueueError,
      enqueueSuccess,
      setLgtms,
      t.GENERATED_LGTM_IMAGE,
      t.LGTM_IMAGE_GENERATION_FAILED,
      t.UNSUPPORTED_IMAGE_FORMAT,
    ],
  );

  return { createLgtmFromUrl, loading };
};

export const useFavoriteIds = (): string[] => {
  return useRecoilValue(favoriteIdsState);
};

export type AddFavoriteIdFn = (id: string) => void;

export const useAddFavoriteId = (): { addFavoriteId: AddFavoriteIdFn } => {
  const setFavoriteId = useSetRecoilState(favoriteIdsState);

  const addFavoriteId = useCallback(
    (id: string) => {
      setFavoriteId(prev => {
        const after = [id, ...prev];
        DataStorage.saveFavoriteIds(after);
        return after;
      });
    },
    [setFavoriteId],
  );

  return { addFavoriteId };
};

export type RemoveFavoriteIdFn = (id: string) => void;

export const useRemoveFavoriteId = (): {
  removeFavoriteId: RemoveFavoriteIdFn;
} => {
  const setFavoriteId = useSetRecoilState(favoriteIdsState);

  const removeFavoriteId = useCallback(
    (id: string) => {
      setFavoriteId(prev => {
        const after = prev.filter(prevId => prevId !== id);
        DataStorage.saveFavoriteIds(after);
        return after;
      });
    },
    [setFavoriteId],
  );

  return { removeFavoriteId };
};

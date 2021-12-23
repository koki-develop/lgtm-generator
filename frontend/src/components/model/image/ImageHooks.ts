import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { imagesState } from '~/recoil/atoms';
import { ApiClient } from '~/lib/apiClient';

export const useImages = () => {
  return useRecoilValue(imagesState);
};

export type SearchImagesFn = (query: string) => Promise<void>;

export const useSearchImages = (): {
  searchImages: SearchImagesFn;
  loading: boolean;
} => {
  const setImages = useSetRecoilState(imagesState);
  const [loading, setLoading] = useState<boolean>(false);

  const searchImages = useCallback(
    async (query: string) => {
      setLoading(true);
      await ApiClient.searchImages(query)
        .then(images => {
          setImages(images);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setImages],
  );

  return { searchImages, loading };
};

import { atom } from 'recoil';
import { Lgtm } from '~/types/lgtm';
import { Image } from '~/types/image';
import { DataStorage } from '~/lib/dataStorage';

export const lgtmsState = atom<Lgtm[]>({
  key: 'lgtmsState',
  default: [],
});

export const imagesState = atom<Image[]>({
  key: 'imagesState',
  default: [],
});

export const favoriteIdsState = atom<string[]>({
  key: 'favoriteIdsState',
  default: DataStorage.getFavoriteIds(),
});

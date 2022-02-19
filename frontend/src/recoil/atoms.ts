import { atom } from 'recoil';
import { DataStorage } from '~/lib/dataStorage';
import { Image } from '~/types/image';
import { Lgtm } from '~/types/lgtm';

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

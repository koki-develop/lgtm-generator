import { atom } from 'recoil';
import { DataStorage } from '@/lib/dataStorage';
import { Image } from '@/models/image';
import { Lgtm } from '@/models/lgtm';

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

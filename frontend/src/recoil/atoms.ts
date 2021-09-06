import { atom } from 'recoil';
import { Lgtm } from '~/types/lgtm';

export const lgtmsState = atom<Lgtm[]>({
  key: 'lgtmsState',
  default: [],
});

export const favoriteIdsState = atom<string[]>({
  key: 'favoriteIdsState',
  default: [],
});

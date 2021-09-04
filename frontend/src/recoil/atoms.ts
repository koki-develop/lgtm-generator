import { atom } from 'recoil';

export const favoriteIdsState = atom<string[]>({
  key: 'favoriteIdsState',
  default: [],
});

import { atom } from 'recoil';
import { DataStorage } from '~/lib/dataStorage';

export const favoriteIdsState = atom<string[]>({
  key: 'favoriteIdsState',
  default: DataStorage.getFavoriteIds(),
});

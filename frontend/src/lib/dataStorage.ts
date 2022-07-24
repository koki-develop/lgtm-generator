const favoriteIdsKey = 'FAVORITE_IDS';
const randomlyKey = 'RANDOMLY';

export class DataStorage {
  public static getFavoriteIds(): string[] {
    if (typeof window === 'undefined') {
      return [];
    }
    const val = window.localStorage.getItem(favoriteIdsKey);
    if (!val) {
      return [];
    }
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }

  public static saveFavoriteIds(favoriteIds: string[]): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(favoriteIdsKey, JSON.stringify(favoriteIds));
  }

  public static setRandomly(v: boolean): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(randomlyKey, JSON.stringify(v));
  }

  public static getRandomly(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    const val = window.localStorage.getItem(randomlyKey);
    if (!val) {
      return false;
    }
    try {
      const v = JSON.parse(val);
      if (typeof v === 'boolean') {
        return v;
      }
      return false;
    } catch {
      return false;
    }
  }
}

const favoriteIdsKey = 'FAVORITE_IDS';

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
}

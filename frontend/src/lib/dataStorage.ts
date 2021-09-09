const favoriteIdsKey = 'FAVORITE_IDS';

export class DataStorage {
  public static getFavoriteIds(): string[] {
    const val = localStorage.getItem(favoriteIdsKey);
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
    localStorage.setItem(favoriteIdsKey, JSON.stringify(favoriteIds));
  }
}

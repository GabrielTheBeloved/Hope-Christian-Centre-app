import { Hymn } from '../types';
import defaultHymns from '../data/hymnsData.json';

const FAVORITES_KEY = 'hcc_hymnal_favorites';

export class HymnStorageService {
  private static hymnsCache: Hymn[] = defaultHymns as Hymn[];

  // Retrieve all hymns with favorites merged
  public static getAllHymns(): Hymn[] {
    const favs = this.getFavorites();
    const favSet = new Set(favs);
    return this.hymnsCache.map(h => ({
      ...h,
      isFavorite: favSet.has(h.number)
    }));
  }

  public static getHymnByNumber(num: number): Hymn | undefined {
    const hymns = this.getAllHymns();
    return hymns.find(h => h.number === num);
  }

  public static getFavorites(): number[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public static toggleFavorite(hymnNumber: number): boolean {
    try {
      const favs = this.getFavorites();
      const exists = favs.includes(hymnNumber);
      let updated: number[];
      if (exists) {
        updated = favs.filter(n => n !== hymnNumber);
      } else {
        updated = [...favs, hymnNumber];
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return !exists;
    } catch {
      return false;
    }
  }
}

export interface Verse {
  number: number;
  text: string;
}

export interface Hymn {
  id: string;
  number: number;
  title: string;
  englishTitle: string;
  meter: string;
  tune: string;
  denomination: string;
  liturgicalSeason: string;
  verses: Verse[];
  chorus?: string;
  rawText: string;
  slug?: string;
  wpPostId?: number;
  isFavorite?: boolean;
}

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

export type AppTab = 'home' | 'hymns' | 'sundayschool' | 'favorites';

export interface LessonOutline {
  outlineNumber: number;
  letter?: string; // 'A', 'B', 'C', etc.
  titleYoruba: string;
  titleEnglish: string;
  scripturePassage?: string;
  scripturePassageEnglish?: string;
  scripturePassageYoruba?: string;
  contentYoruba: string[];
  contentEnglish: string[];
  scriptures?: string[];
  discussionQuestionYoruba?: string;
  discussionQuestionEnglish?: string;
}

export interface DailyReading {
  dayYoruba: string; // e.g. "Ọjọ́ Ajé (Monday)"
  dayEnglish: string;
  scripture: string;
  themeYoruba: string;
  themeEnglish: string;
}

export interface SundaySchoolLesson {
  id: string;
  lessonNumber: number;
  quarterNumber: number;
  quarterThemeYoruba: string;
  quarterThemeEnglish: string;
  unitTitleYoruba: string;
  unitTitleEnglish: string;
  month: string; // e.g. 'September', 'October', etc.
  monthYoruba?: string; // e.g. 'Oṣù Kẹsàn-án'
  sundayOfMonth?: number; // 1, 2, 3, 4, 5
  date: string;
  dateEnglish?: string;
  dateYoruba?: string;
  topicYoruba: string;
  topicEnglish: string;
  devotionalReading?: {
    english: string;
    yoruba: string;
  } | string;
  backgroundScripture?: {
    english: string;
    yoruba: string;
  } | string;
  lessonScripture?: {
    english: string;
    yoruba: string;
  } | string;
  biblePassage: string;
  biblePassageEnglish?: string;
  biblePassageYoruba?: string;
  biblePassageTextYoruba?: string;
  biblePassageTextEnglish?: string;
  goldenText?: {
    textEnglish: string;
    textYoruba: string;
    referenceEnglish: string;
    referenceYoruba: string;
  };
  memoryVerse: {
    reference: string;
    referenceEnglish?: string;
    referenceYoruba?: string;
    textYoruba: string;
    textEnglish: string;
  };
  centralTruth?: {
    yoruba: string;
    english: string;
  };
  lessonAims?: {
    yoruba: string[];
    english: string[];
  };
  introductionPoints?: {
    english: string[];
    yoruba: string[];
  };
  introduction: {
    yoruba: string;
    english: string;
  };
  outlines: LessonOutline[];
  practicalApplication?: {
    yoruba: string;
    english: string;
  };
  summary?: {
    yoruba: string;
    english: string;
  };
  closingPrayer?: {
    yoruba: string;
    english: string;
  };
  dailyReadings: DailyReading[];
  isBookmarked?: boolean;
}


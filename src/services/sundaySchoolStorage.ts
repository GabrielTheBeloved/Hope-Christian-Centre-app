import { SundaySchoolLesson } from '../types';
import { allSundaySchoolLessons } from '../data/allLessons';

const BOOKMARKS_KEY = 'hcc_sunday_school_bookmarks_v1';
const COMPLETED_KEY = 'hcc_sunday_school_completed_v1';
const RECENT_LESSON_KEY = 'hcc_sunday_school_last_read';
const DAILY_READINGS_KEY = 'hcc_daily_readings_checked_v1';

export class SundaySchoolStorageService {
  static getBookmarkedIds(): string[] {
    try {
      const raw = localStorage.getItem(BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static toggleBookmark(lessonId: string): boolean {
    try {
      const current = this.getBookmarkedIds();
      const exists = current.includes(lessonId);
      const updated = exists ? current.filter((id) => id !== lessonId) : [...current, lessonId];
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
      return !exists;
    } catch {
      return false;
    }
  }

  static isBookmarked(lessonId: string): boolean {
    return this.getBookmarkedIds().includes(lessonId);
  }

  static getCompletedLessonIds(): string[] {
    try {
      const raw = localStorage.getItem(COMPLETED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static toggleCompleted(lessonId: string): boolean {
    try {
      const current = this.getCompletedLessonIds();
      const exists = current.includes(lessonId);
      const updated = exists ? current.filter((id) => id !== lessonId) : [...current, lessonId];
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(updated));
      return !exists;
    } catch {
      return false;
    }
  }

  static isCompleted(lessonId: string): boolean {
    return this.getCompletedLessonIds().includes(lessonId);
  }

  static getCompletedDailyReadings(): Record<string, boolean> {
    try {
      const raw = localStorage.getItem(DAILY_READINGS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  static toggleDailyReading(lessonId: string, dayEnglish: string): boolean {
    try {
      const key = `${lessonId}_${dayEnglish}`;
      const current = this.getCompletedDailyReadings();
      const updated = { ...current, [key]: !current[key] };
      localStorage.setItem(DAILY_READINGS_KEY, JSON.stringify(updated));
      return !!updated[key];
    } catch {
      return false;
    }
  }

  static isDailyReadingCompleted(lessonId: string, dayEnglish: string): boolean {
    const key = `${lessonId}_${dayEnglish}`;
    return !!this.getCompletedDailyReadings()[key];
  }

  static saveLastReadLessonId(lessonId: string) {
    try {
      localStorage.setItem(RECENT_LESSON_KEY, lessonId);
    } catch {
      // ignore storage error
    }
  }

  static getLastReadLessonId(): string | null {
    try {
      return localStorage.getItem(RECENT_LESSON_KEY);
    } catch {
      return null;
    }
  }

  static getAllLessons(): SundaySchoolLesson[] {
    const bookmarkedIds = new Set(this.getBookmarkedIds());
    return allSundaySchoolLessons.map((lesson) => ({
      ...lesson,
      isBookmarked: bookmarkedIds.has(lesson.id)
    }));
  }
}

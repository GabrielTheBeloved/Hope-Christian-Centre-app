import React, { useState, useMemo } from 'react';
import { SundaySchoolLesson } from '../types';
import { YEAR_MONTHS, MonthInfo, getCurrentMonthInfo } from '../data/monthsData';
import { getLessonBiblePassage } from '../utils/scriptureUtils';
import {
  Bookmark,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface SundaySchoolTabProps {
  lessons: SundaySchoolLesson[];
  onSelectLesson: (lesson: SundaySchoolLesson) => void;
  onToggleBookmark: (lessonId: string) => void;
  completedIds: string[];
  language?: SundaySchoolLanguage;
  onLanguageChange?: (lang: SundaySchoolLanguage) => void;
}

export type SundaySchoolLanguage = 'english' | 'yoruba';

export const SundaySchoolTab: React.FC<SundaySchoolTabProps> = ({
  lessons,
  onSelectLesson,
  onToggleBookmark,
  completedIds,
  language: controlledLanguage,
  onLanguageChange
}) => {
  // 1. Language Toggle: Controlled or internal (defaults to English)
  const [internalLanguage, setInternalLanguage] = useState<SundaySchoolLanguage>('english');
  const language = controlledLanguage ?? internalLanguage;

  const handleLanguageToggle = (newLang: SundaySchoolLanguage) => {
    setInternalLanguage(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  // 2. Real-time Month Check: dynamically detects current month (e.g., September, October, December)
  const realTimeMonthInfo = useMemo(() => getCurrentMonthInfo(), []);
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(() => realTimeMonthInfo.monthIndex);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const activeMonth = YEAR_MONTHS[activeMonthIndex] || realTimeMonthInfo;
  const isViewingCurrentRealMonth = activeMonthIndex === realTimeMonthInfo.monthIndex;

  // Filter lessons: strictly displays ONLY the Sunday school lessons for this active month
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => lesson.month === activeMonth.id);
  }, [lessons, activeMonth.id]);

  const handlePrevMonth = () => {
    setActiveMonthIndex((prev) => (prev > 0 ? prev - 1 : 11));
  };

  const handleNextMonth = () => {
    setActiveMonthIndex((prev) => (prev < 11 ? prev + 1 : 0));
  };

  const handleSelectMonth = (index: number) => {
    setActiveMonthIndex(index);
    setIsCalendarOpen(false);
  };

  const handleJumpToCurrentMonth = () => {
    setActiveMonthIndex(realTimeMonthInfo.monthIndex);
    setIsCalendarOpen(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in duration-300 text-[#2c241d]">
      
      {/* Tab Hero Banner */}
      <div
        className="relative rounded-3xl overflow-hidden p-6 sm:p-9 border border-[#4a240c]/25 text-white shadow-lg"
        style={{
          backgroundImage: "url('/images/bible-card.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      >
        {/* Rich warm amber-mahogany vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#592c10]/95 via-[#441f08]/92 to-[#261005]/96 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            {/* Title */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              {language === 'yoruba' ? 'Ẹ̀kọ́ Ilé Ọjọ́ Ìsinmi' : 'Sunday School Lessons'}
            </h1>

            {/* Subtitle */}
            <p className="text-[#f2ded0] text-xs sm:text-sm md:text-base leading-relaxed">
              {language === 'yoruba'
                ? 'Kọ́ Ọ̀rọ̀ Ọlọ́run nípasẹ̀ àwọn ẹ̀kọ́ ọ̀sọ̀ọ̀sẹ̀, kíkà Bíbélì ojoojúmọ́, àkọ́sórí, àti ìṣe ìgbé-ayé onígbàgbọ́ fún gbogbo ọdún náà.'
                : 'Grow deeper in God’s Word with comprehensive weekly outlines, memory verses, daily devotionals, and life applications for the entire church year.'}
            </p>
          </div>

          {/* ONLY THE LANGUAGE BAR: English and Yoruba */}
          <div className="inline-flex items-center bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-inner shrink-0">
            <button
              id="sunday-school-lang-english-btn"
              onClick={() => handleLanguageToggle('english')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                language === 'english'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-[#f2ded0] hover:text-white'
              }`}
            >
              English
            </button>
            <button
              id="sunday-school-lang-yoruba-btn"
              onClick={() => handleLanguageToggle('yoruba')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                language === 'yoruba'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-extrabold'
                  : 'text-[#f2ded0] hover:text-white'
              }`}
            >
              Yorùbá
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MONTH NAVIGATION BAR WITH CALENDAR ICON & PREV/NEXT BUTTONS */}
      {/* ============================================================ */}
      <div className="rounded-2xl bg-[#ede7dd] border border-[#ded4c6] p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Calendar Icon Button displaying current month */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          <button
            id="calendar-month-picker-btn"
            onClick={() => setIsCalendarOpen(true)}
            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-[#faf7f2] border border-[#dfd6ca] text-[#592c10] shadow-xs hover:border-[#8c4316]/60 transition-all cursor-pointer group"
            title="Open to browse all 12 months (January to December)"
          >
            <div className="text-left">
              <div className="text-xs sm:text-sm font-bold text-[#2c241d] group-hover:text-[#592c10] flex items-center gap-1.5">
                <span>{language === 'yoruba' ? activeMonth.nameYoruba : `${activeMonth.nameEnglish} 2026`}</span>
                <ChevronDown size={14} className="text-[#8c7b6d] group-hover:text-[#592c10] transition-transform group-hover:translate-y-0.5" />
              </div>
              <div className="text-[11px] text-[#8c4316] font-semibold">
                {language === 'yoruba' ? 'Wo Gbogbo Àwọn Oṣù' : 'Browse All Months'}
              </div>
            </div>
          </button>

          {/* Quick indicator or button to return to Current Real-time Month */}
          {!isViewingCurrentRealMonth ? (
            <button
              id="return-to-current-month-btn"
              onClick={handleJumpToCurrentMonth}
              className="text-xs font-bold text-[#8c4316] hover:text-[#592c10] px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white border border-[#dfd6ca] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs active:scale-95"
              title="Return to real-time current month"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{language === 'yoruba' ? 'Padà sí Oṣù Yìí' : 'This Month'}</span>
            </button>
          ) : (
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {language === 'yoruba' ? 'Oṣù Lọ́wọ́lọ́wọ́' : 'Current Month'}
            </span>
          )}
        </div>

        {/* Right: Previous & Next Month Navigation Arrows */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            id="prev-month-nav-btn"
            onClick={handlePrevMonth}
            aria-label="Previous Month"
            title="Go back to previous month"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#faf7f2] border border-[#dfd6ca] hover:border-[#8c4316]/50 text-[#592c10] text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ChevronLeft size={16} />
            <span className="text-xs font-semibold">
              {language === 'yoruba' ? 'Oṣù Tẹ́lẹ̀' : 'Previous'}
            </span>
          </button>

          <button
            id="next-month-nav-btn"
            onClick={handleNextMonth}
            aria-label="Next Month"
            title="Go forward to next month"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#faf7f2] border border-[#dfd6ca] hover:border-[#8c4316]/50 text-[#592c10] text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span className="text-xs font-semibold">
              {language === 'yoruba' ? 'Oṣù Tó Kàn' : 'Next'}
            </span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 12-MONTH CALENDAR PICKER MODAL (January to December) */}
      {/* ============================================================ */}
      {isCalendarOpen && (
        <div
          id="calendar-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div
            id="calendar-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-2xl bg-[#fcfaf7] border border-[#dfd6ca] shadow-2xl p-5 sm:p-6 space-y-4 text-[#2c241d] max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ebd8c5]">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#592c10]">
                  {language === 'yoruba' ? 'Yan Oṣù nínú Kàlẹ́ńdà' : 'Select Month from Calendar'}
                </h3>
                <p className="text-[11px] text-[#786b60]">
                  {language === 'yoruba'
                    ? 'Gbogbo oṣù 12 ọdún (Oṣù Kíní – Oṣù Kejìlá)'
                    : 'All 12 months of the year (January to December)'}
                </p>
              </div>

              <button
                onClick={() => setIsCalendarOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-[#ede7dd] transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick jump to Real-time Current Month */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200/70 text-xs">
              <span className="text-amber-900 font-medium">
                {language === 'yoruba'
                  ? `Lọ́wọ́lọ́wọ́ a wà ní: ${realTimeMonthInfo.nameYoruba}`
                  : `Currently in: ${realTimeMonthInfo.nameEnglish} 2026`}
              </span>
              <button
                onClick={handleJumpToCurrentMonth}
                className="px-2.5 py-1 rounded-lg bg-[#592c10] text-white font-bold text-[11px] hover:bg-[#441f08] transition-colors cursor-pointer shadow-xs"
              >
                {language === 'yoruba' ? 'Lọ sí Oṣù Yìí' : 'Go to This Month'}
              </button>
            </div>

            {/* 12 Months Grid: January to December */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {YEAR_MONTHS.map((m: MonthInfo, idx: number) => {
                const isSelected = activeMonthIndex === idx;
                const isRealCurrent = realTimeMonthInfo.monthIndex === idx;

                return (
                  <button
                    key={m.id}
                    id={`calendar-month-item-${m.id}`}
                    onClick={() => handleSelectMonth(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 relative ${
                      isSelected
                        ? 'bg-[#592c10] text-white border-[#592c10] shadow-md ring-2 ring-amber-400/40'
                        : 'bg-white hover:bg-[#fbf7f1] border-[#dfd6ca] text-[#2c241d] hover:border-[#8c4316]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold font-serif">
                        {language === 'yoruba' ? m.shortYoruba : m.shortEnglish}
                      </span>
                      {isRealCurrent && (
                        <span
                          className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-amber-400 text-stone-950'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {language === 'yoruba' ? 'Lọ́wọ́' : 'Today'}
                        </span>
                      )}
                    </div>

                    <div
                      className={`text-xs font-medium truncate ${
                        isSelected ? 'text-[#f5eedc]' : 'text-[#592c10]'
                      }`}
                    >
                      {language === 'yoruba' ? m.nameYoruba.split('(')[0].trim() : m.nameEnglish}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* LESSON CARDS FOR THE ACTIVE MONTH */}
      {/* Only displays the Sunday school lessons for that month */}
      {/* ============================================================ */}
      {filteredLessons.length > 0 ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8c4316] flex items-center gap-1.5">
              <span>
                {language === 'yoruba'
                  ? `Àwọn Ẹ̀kọ́ Ọjọ́ Ìsinmi fún ${activeMonth.nameYoruba}`
                  : `Sunday School Lessons for ${activeMonth.nameEnglish} 2026`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedIds.includes(lesson.id);
              const topic = language === 'yoruba' ? lesson.topicYoruba : lesson.topicEnglish;
              const dateStr = language === 'yoruba' ? lesson.dateYoruba : lesson.dateEnglish;
              const memoryText = language === 'yoruba' ? lesson.memoryVerse.textYoruba : lesson.memoryVerse.textEnglish;
              // Pure language-specific Bible passage (English in English mode, Yoruba in Yoruba mode)
              const biblePassageLocalized = getLessonBiblePassage(lesson, language);

              return (
                <div
                  key={lesson.id}
                  id={`lesson-card-${lesson.id}`}
                  className="group relative rounded-2xl bg-white hover:bg-[#fbf9f6] border border-[#dfd6ca] hover:border-[#8c4316]/50 p-5 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    {/* Top Action Bar inside Card */}
                    <div className="flex items-center justify-end gap-1.5 mb-2.5">
                      {isCompleted && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
                          <CheckCircle2 size={11} /> {language === 'yoruba' ? 'Ti Kà' : 'Read'}
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(lesson.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          lesson.isBookmarked
                            ? 'text-amber-600 hover:text-amber-700'
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                        title={lesson.isBookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                      >
                        <Bookmark size={16} className={lesson.isBookmarked ? 'fill-amber-600' : ''} />
                      </button>
                    </div>

                    {/* Date */}
                    <div className="text-[11px] text-[#8c4316] font-semibold mb-1.5">
                      <span>{dateStr}</span>
                    </div>

                    {/* Lesson Topic (Purely in selected language) */}
                    <h3 className="font-serif text-lg font-bold text-[#2c241d] group-hover:text-[#592c10] transition-colors leading-snug mb-3">
                      {topic}
                    </h3>

                    {/* Bible Passage Pill (Strictly in selected language: English or Yoruba) */}
                    <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#f5eedc] border border-[#e5d8c3] text-[#592c10] text-xs font-semibold mb-3">
                      <span>{biblePassageLocalized}</span>
                    </div>

                    {/* Memory Verse Snippet (Purely in selected language) */}
                    <div className="p-3 rounded-xl bg-[#f9f6f0] border border-[#ebe4d8] text-xs text-[#5e5146] italic line-clamp-3 mb-4 leading-relaxed">
                      &ldquo;{memoryText}&rdquo;
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <button
                    id={`open-lesson-btn-${lesson.id}`}
                    onClick={() => onSelectLesson(lesson)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#ede7dd] group-hover:bg-[#592c10] text-[#592c10] group-hover:text-[#fdfbf7] border border-[#ded4c6] group-hover:border-[#592c10] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <span>{language === 'yoruba' ? 'Ṣí Ẹ̀kọ́ Náà' : 'Open Lesson'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty state if ever no lessons found */
        <div className="p-10 text-center rounded-2xl bg-white border border-[#dfd6ca] space-y-2 shadow-sm">
          <h3 className="text-base font-bold text-[#2c241d]">
            {language === 'yoruba' ? 'Kò sí ẹ̀kọ́ fún oṣù yìí' : 'No lessons found for this month'}
          </h3>
        </div>
      )}
    </div>
  );
};

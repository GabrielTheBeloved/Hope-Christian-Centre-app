import React from 'react';
import { Hymn, SundaySchoolLesson } from '../types';
import { allSundaySchoolLessons } from '../data/allLessons';
import { getDailyDevotion } from '../utils/dailyDevotion';
import { toEnglishScripture } from '../utils/scriptureUtils';

interface HomeTabProps {
  hymnsCount: number;
  lessonsCount: number;
  onNavigateToHymns: () => void;
  onNavigateToSundaySchool: () => void;
  onQuickNumberJump?: (num: number) => void;
  onSelectHymn?: (hymn: Hymn) => void;
  onSelectLesson?: (lesson: SundaySchoolLesson) => void;
  hymns?: Hymn[];
  lessons?: SundaySchoolLesson[];
}

export const HomeTab: React.FC<HomeTabProps> = ({
  hymnsCount,
  onNavigateToHymns,
  onNavigateToSundaySchool,
  lessons = [],
}) => {
  // Format today's date like "Thursday, September 3"
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Active lessons dataset
  const effectiveLessons = lessons && lessons.length > 0 ? lessons : allSundaySchoolLessons;
  const { devotion, currentLesson } = getDailyDevotion(effectiveLessons, now);

  return (
    <div className="w-full bg-[#f6f2ec] text-[#2c241d] py-6 sm:py-10 px-4 transition-colors duration-200">
      <div className="max-w-[520px] sm:max-w-[580px] mx-auto flex flex-col gap-5">
        
        {/* ============================================================ */}
        {/* 1. WELCOME TAB WITH TODAY'S DEVOTIONAL OVERLAY */}
        {/* Static overlay: displays only today's devotion without redirection */}
        {/* ============================================================ */}
        <div
          id="welcome-card"
          className="relative rounded-2xl overflow-hidden shadow-lg text-white border border-[#4a240c]/20 transition-all duration-300"
          style={{
            backgroundImage: "url('/images/worship-banner.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
          }}
        >
          {/* Rich warm amber-brown translucent vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#592c10]/94 via-[#441f08]/92 to-[#261005]/96 backdrop-brightness-75 pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 p-6 sm:p-7 flex flex-col">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#e9b882] select-none mb-1.5">
              WELCOME
            </span>

            <h1 className="font-serif text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-tight mb-2">
              {formattedDate}
            </h1>

            {/* Static Devotional Display: Only Day, Text, and Topic */}
            <div
              id="daily-devotion-card"
              className="mt-3 pt-3.5 border-t border-amber-300/25 flex flex-col gap-2 select-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#e9b882]">
                  Today&rsquo;s Devotion
                </span>
              </div>

              {/* Static card showing strictly the day, the text, and the topic */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#faf7f2] text-[#2c241d] border border-[#dfd6ca] shadow-sm flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                    <span className="text-[#592c10] font-bold">
                      {devotion.dayName}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#f5eedc] text-[11px] sm:text-xs font-mono text-[#592c10] font-semibold border border-[#e2d9cd]">
                      {toEnglishScripture(devotion.reference)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#786b60] font-normal mt-1 leading-snug">
                    {devotion.theme}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. SUNDAY SCHOOL MANUAL */}
        {/* ============================================================ */}
        <div
          id="section-card-sundayschool-full"
          onClick={onNavigateToSundaySchool}
          className="group relative h-36 sm:h-40 rounded-2xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] border border-[#d8cfc4]"
          style={{
            backgroundImage: "url('/images/bible-card.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 42%',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 group-hover:from-black/80 transition-colors duration-300" />

          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md group-hover:text-amber-200 transition-colors">
              Sunday School Manual
            </h3>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. YORUBA BAPTIST HYMN MANUAL */}
        {/* ============================================================ */}
        <div
          id="section-card-hymnal"
          onClick={onNavigateToHymns}
          className="group relative h-36 sm:h-40 rounded-2xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] border border-[#d8cfc4]"
          style={{
            backgroundImage: "url('/images/hymnal-card.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 group-hover:from-black/80 transition-colors duration-300" />

          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-md group-hover:text-amber-200 transition-colors">
              Yoruba Baptist Hymn Manual
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 font-medium drop-shadow mt-0.5">
              {hymnsCount} hymns · YBH 1–660
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. DAILY SCRIPTURE READING TAB */}
        {/* ============================================================ */}
        {currentLesson.dailyReadings && currentLesson.dailyReadings.length > 0 && (
          <div
            id="home-daily-scripture-readings"
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dfd6ca] shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#f0e8dc]">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#f5eedc] border border-[#e2d9cd] text-xs font-bold uppercase tracking-wider text-[#592c10]">
                <span>Daily Scripture Readings</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
              {currentLesson.dailyReadings.map((reading) => {
                const isToday = reading.dayEnglish.toLowerCase().includes(devotion.dayName.toLowerCase());

                return (
                  <div
                    key={reading.dayEnglish}
                    id={`home-reading-${reading.dayEnglish.toLowerCase()}`}
                    className={`p-3.5 rounded-xl border flex flex-col justify-center transition-all ${
                      isToday
                        ? 'bg-[#fcf7ee] border-amber-400/80 ring-1 ring-amber-400/30 text-[#2c241d]'
                        : 'bg-[#faf7f2] border-[#dfd6ca] text-[#2c241d]'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className={isToday ? 'text-[#8c4316] font-bold' : 'text-[#592c10] font-bold'}>
                          {reading.dayEnglish}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#f5eedc] text-[11px] font-mono text-[#592c10] font-semibold border border-[#e2d9cd]">
                          {toEnglishScripture(reading.scripture)}
                        </span>
                        {isToday && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-200 text-amber-900 border border-amber-300">
                            Today
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#786b60] font-normal mt-1 leading-snug">
                        {reading.themeEnglish}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

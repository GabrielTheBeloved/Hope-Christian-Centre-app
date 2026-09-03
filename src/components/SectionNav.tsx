import React from 'react';
import { Home } from 'lucide-react';
import { AppTab } from '../types';

interface SectionNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  hymnsCount?: number;
  lessonsCount?: number;
}

export const SectionNav: React.FC<SectionNavProps> = ({
  activeTab,
  onTabChange,
  hymnsCount,
  lessonsCount,
}) => {
  return (
    <div className="sticky top-16 sm:top-[72px] z-20 w-full bg-[#f6f2ec]/95 backdrop-blur-md border-b border-[#dfd6ca] py-2.5 px-4 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Navigation Tabs Bar */}
        <nav
          id="section-navigation-tabs"
          className="bg-[#ede7dd] p-1 rounded-2xl border border-[#ddd3c5] shadow-inner inline-flex items-center gap-1 sm:gap-1.5"
          aria-label="Section navigation"
        >
          {/* Home Button */}
          <button
            id="nav-tab-home"
            onClick={() => {
              onTabChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
              activeTab === 'home'
                ? 'bg-[#592c10] text-[#fdfbf7] shadow-sm'
                : 'text-[#6e5d50] hover:text-[#2c241d] hover:bg-black/5'
            }`}
          >
            <Home size={15} className="shrink-0" />
            <span>Home</span>
          </button>

          {/* Sunday School Button */}
          <button
            id="nav-tab-sundayschool"
            onClick={() => {
              onTabChange('sundayschool');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
              activeTab === 'sundayschool'
                ? 'bg-[#592c10] text-[#fdfbf7] shadow-sm'
                : 'text-[#6e5d50] hover:text-[#2c241d] hover:bg-black/5'
            }`}
          >
            <span>Sunday School</span>
            <span className="hidden md:inline text-[11px] opacity-80">(Ẹ̀kọ́)</span>
          </button>

          {/* Hymns Button */}
          <button
            id="nav-tab-hymns"
            onClick={() => {
              onTabChange('hymns');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
              activeTab === 'hymns'
                ? 'bg-[#592c10] text-[#fdfbf7] shadow-sm'
                : 'text-[#6e5d50] hover:text-[#2c241d] hover:bg-black/5'
            }`}
          >
            <span>Hymns</span>
            <span className="hidden md:inline text-[11px] opacity-80">(Orin)</span>
          </button>
        </nav>

        {/* Current Active Section Badge & Quick Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#8c7b6d]">
          <span>Current Section:</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#ede7dd] text-[#592c10] font-bold border border-[#ddd3c5]">
            {activeTab === 'sundayschool' && 'Sunday School Lessons'}
            {activeTab === 'hymns' && 'Yoruba Baptist Hymnal'}
            {activeTab === 'home' && 'Home Page'}
          </span>
        </div>
      </div>
    </div>
  );
};

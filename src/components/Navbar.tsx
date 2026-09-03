import React from 'react';
import { ChurchLogo } from './ChurchLogo';
import { WifiOff, Download, Home } from 'lucide-react';
import { AppTab } from '../types';

interface NavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  isOffline?: boolean;
  canInstallPwa?: boolean;
  onInstallPwa?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isOffline = false,
  canInstallPwa = false,
  onInstallPwa,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fcfaf7]/95 backdrop-blur-2xl text-[#2c241d] border-b border-[#dfd6ca] shadow-xs transition-all duration-200">
      <div className={`max-w-7xl mx-auto px-4 relative flex flex-col items-center justify-center ${
        activeTab === 'home' ? 'py-3 sm:py-3.5' : 'pt-3 pb-2.5 sm:pt-3.5 sm:pb-3 gap-2 sm:gap-2.5'
      }`}>
        {/* Status / Offline & Install App Actions positioned at top-right */}
        <div className={`absolute right-3 sm:right-6 ${activeTab === 'home' ? 'top-1/2 -translate-y-1/2' : 'top-3 sm:top-3.5'} flex items-center gap-2`}>
          {/* Offline indicator badge */}
          {isOffline && (
            <div
              id="offline-status-badge"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#ede7dd] border border-[#ddd3c5] text-[#592c10] text-[10px] sm:text-xs font-semibold"
              title="All hymns and Sunday school lessons are available offline"
            >
              <WifiOff size={12} className="text-[#8c4316] shrink-0" />
              <span className="hidden md:inline">Offline Ready</span>
            </div>
          )}

          {/* Install to device button */}
          {canInstallPwa && onInstallPwa && (
            <button
              onClick={onInstallPwa}
              id="install-pwa-btn"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#592c10] hover:bg-[#441f08] text-amber-100 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
              title="Install app on your device for instant offline access"
            >
              <Download size={12} />
              <span className="hidden md:inline">Install App</span>
            </button>
          )}
        </div>

        {/* 1. Centralized Church Emblem & Name */}
        <div
          className="flex items-center justify-center gap-2 sm:gap-3 cursor-pointer select-none group text-center px-12 sm:px-0"
          onClick={() => {
            onTabChange('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <ChurchLogo size={36} />
          </div>
          <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#382012] leading-tight group-hover:text-[#592c10] transition-colors">
            Hope Christian Centre
          </span>
        </div>

        {/* 2. Centralized Nav Bar (Home, Sunday School, Hymns) - Hidden on Home page */}
        {activeTab !== 'home' && (
          <nav
            id="main-navigation-tabs"
            className="bg-[#ede7dd] p-1 rounded-2xl border border-[#ddd3c5] shadow-inner inline-flex items-center justify-center gap-1 sm:gap-1.5 animate-in fade-in duration-200"
            aria-label="Main navigation"
          >
            {/* Home Button */}
            <button
              id="nav-tab-home"
              onClick={() => {
                onTabChange('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#592c10] text-[#fdfbf7] shadow-sm'
                  : 'text-[#6e5d50] hover:text-[#2c241d] hover:bg-black/5'
              }`}
            >
              <Home size={14} className="shrink-0" />
              <span>Home</span>
            </button>

            {/* Sunday School Button */}
            <button
              id="nav-tab-sundayschool"
              onClick={() => {
                onTabChange('sundayschool');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                activeTab === 'sundayschool'
                  ? 'bg-[#592c10] text-[#fdfbf7] shadow-sm'
                  : 'text-[#6e5d50] hover:text-[#2c241d] hover:bg-black/5'
              }`}
            >
              <span>Sunday School</span>
              <span className="hidden sm:inline text-[11px] opacity-80">(Ẹ̀kọ́)</span>
            </button>

            {/* Hymns Button */}
            <button
              id="nav-tab-hymns"
              onClick={() => {
                onTabChange('hymns');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                activeTab === 'hymns'
                  ? 'bg-[#592c10] text-[#fdfbf7] shadow-sm'
                  : 'text-[#6e5d50] hover:text-[#2c241d] hover:bg-black/5'
              }`}
            >
              <span>Hymns</span>
              <span className="hidden sm:inline text-[11px] opacity-80">(Orin)</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};


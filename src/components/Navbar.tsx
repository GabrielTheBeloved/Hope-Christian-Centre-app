import React from 'react';
import { ChurchLogo } from './ChurchLogo';
import { WifiOff, Download } from 'lucide-react';

interface NavbarProps {
  isOffline?: boolean;
  canInstallPwa?: boolean;
  onInstallPwa?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isOffline = false,
  canInstallPwa = false,
  onInstallPwa,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-indigo-950/85 backdrop-blur-xl text-slate-100 border-b border-white/10 shadow-lg shadow-black/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Church Official Emblem & Title */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <ChurchLogo size={42} />
          </div>
          <div className="flex flex-col text-left justify-center">
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-white leading-tight group-hover:text-amber-300 transition-colors">
              Hope Christian Centre
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-semibold leading-tight">
              Sacred Hymnal
            </span>
          </div>
        </div>

        {/* Status / Offline & Install App Actions */}
        <div className="flex items-center gap-2">
          {/* Offline indicator badge when mobile data / network is disconnected */}
          {isOffline && (
            <div
              id="offline-status-badge"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-medium animate-pulse"
              title="All 654 hymns are available without mobile data or internet"
            >
              <WifiOff size={13} className="text-amber-400 shrink-0" />
              <span>Offline Ready</span>
            </div>
          )}

          {/* Install to device button if PWA install prompt is available */}
          {canInstallPwa && onInstallPwa && (
            <button
              onClick={onInstallPwa}
              id="install-pwa-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
              title="Install app on your device for instant offline access"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Install Offline App</span>
              <span className="sm:hidden">Install</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

import React, { useState, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Star,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { Hymn } from '../types';

interface HymnReaderProps {
  hymn: Hymn;
  isOpen: boolean;
  onClose: () => void;
  onSelectPrevious: () => void;
  onSelectNext: () => void;
  onToggleFavorite: (hymnNumber: number) => void;
  onOpenPresentation: (hymn: Hymn) => void;
}

export const HymnReader: React.FC<HymnReaderProps> = ({
  hymn,
  isOpen,
  onClose,
  onSelectPrevious,
  onSelectNext,
  onToggleFavorite,
  onOpenPresentation,
}) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !hymn) return null;

  const handleCopy = () => {
    const fullText = `HOPE CHRISTIAN CENTRE HYMNAL\nHymn #${hymn.number}: ${hymn.title}\nEnglish: ${hymn.englishTitle}\nLiturgical Season: ${hymn.liturgicalSeason}\n\n${hymn.rawText}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        id="hymn-reader-modal"
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] backdrop-blur-2xl bg-indigo-950/98 text-slate-100 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-white/10 bg-white/[0.04] backdrop-blur-xl flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-400/40 text-amber-300 font-serif font-bold text-sm sm:text-lg flex items-center justify-center shrink-0 shadow-md">
              #{hymn.number}
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-base sm:text-xl font-bold text-white truncate">
                {hymn.title}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                {hymn.englishTitle}
              </p>
            </div>
          </div>

          {/* Essential Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => onToggleFavorite(hymn.number)}
              className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                hymn.isFavorite
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
              }`}
              title="Bookmark"
            >
              <Star size={16} className={hymn.isFavorite ? 'fill-amber-400 text-amber-400' : ''} />
            </button>

            <button
              onClick={() => onOpenPresentation(hymn)}
              className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 text-slate-300 backdrop-blur-md transition-colors"
              title="Presentation Mode"
            >
              <Maximize2 size={16} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 backdrop-blur-md transition-colors"
              title="Copy Lyrics"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/10 text-slate-400 backdrop-blur-md transition-colors ml-0.5"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Main Hymn Stanzas & Verses Scroll Area */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 scroll-smooth"
        >
          <div className="space-y-6 sm:space-y-7 max-w-2xl mx-auto">
            {hymn.verses.map((verse) => (
              <div
                key={verse.number}
                className="group relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-colors hover:bg-white/[0.05]"
              >
                {/* Verse Number Pill */}
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-serif font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {verse.number}
                </span>

                {/* Stanza Lines */}
                <div className="font-serif text-slate-100 whitespace-pre-line text-base sm:text-lg md:text-xl leading-relaxed">
                  {verse.text}
                </div>
              </div>
            ))}

            {/* Distinct Chorus / Ègbè Section */}
            {hymn.chorus && (
              <div className="my-4 sm:my-6 p-4 sm:p-6 backdrop-blur-xl bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent border border-amber-500/30 rounded-2xl shadow-xl max-w-2xl mx-auto">
                <div className="flex items-center gap-1.5 mb-2 text-amber-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                  <Sparkles size={13} className="text-amber-400" />
                  <span>Ègbè (Chorus / Refrain)</span>
                </div>
                <p className="font-serif text-amber-100 whitespace-pre-line italic text-base sm:text-lg md:text-xl leading-relaxed">
                  {hymn.chorus}
                </p>
              </div>
            )}

            {/* Liturgical Amen at the end */}
            <div className="pt-4 sm:pt-6 text-center font-serif text-amber-400 font-bold text-base sm:text-lg tracking-widest uppercase">
              — Àmín —
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="p-3 sm:p-5 border-t border-white/10 bg-white/[0.04] backdrop-blur-xl flex items-center justify-between gap-2.5 shrink-0">
          {/* Prev Hymn Button */}
          <button
            onClick={onSelectPrevious}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-amber-400/30 text-slate-200 hover:text-white transition-all text-xs sm:text-sm font-semibold flex items-center gap-1.5"
          >
            <ChevronLeft size={16} />
            <span>Hymn #{Math.max(1, hymn.number - 1)}</span>
          </button>

          {/* Current Hymn Indicator */}
          <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
            Hymn {hymn.number}
          </span>

          {/* Next Hymn Button */}
          <button
            onClick={onSelectNext}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-amber-400/30 text-slate-200 hover:text-white transition-all text-xs sm:text-sm font-semibold flex items-center gap-1.5"
          >
            <span>Hymn #{hymn.number + 1}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

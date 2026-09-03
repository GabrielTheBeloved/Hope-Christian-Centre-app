import React, { useState, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Star,
  Copy,
  Check
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
    const fullText = `ÌWÉ ORIN MÍMỌ́\nOrin ${hymn.number}: ${hymn.title}\n\n${hymn.rawText}\n\n— Àmín —`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        id="hymn-reader-modal"
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[90vh] bg-[#fcfaf7] text-[#2c241d] rounded-2xl sm:rounded-3xl border border-[#dfd6ca] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-[#e2d9cd] bg-[#f5eedc] flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#592c10] text-amber-100 font-serif font-bold text-sm sm:text-lg flex items-center justify-center shrink-0 shadow-sm">
              {hymn.number}
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-base sm:text-xl font-bold text-[#2c241d] truncate">
                {hymn.title}
              </h2>
            </div>
          </div>

          {/* Essential Actions */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={() => onToggleFavorite(hymn.number)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                hymn.isFavorite
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-white/80 hover:bg-white border border-[#dfd6ca] text-stone-600'
              }`}
              title="Bookmark"
            >
              <Star size={16} className={hymn.isFavorite ? 'fill-amber-500 text-amber-500' : ''} />
            </button>

            <button
              onClick={() => onOpenPresentation(hymn)}
              className="p-2 rounded-xl bg-white/80 hover:bg-white hover:text-[#592c10] border border-[#dfd6ca] text-stone-600 transition-colors cursor-pointer"
              title="Presentation Mode"
            >
              <Maximize2 size={16} />
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white/80 hover:bg-white border border-[#dfd6ca] text-stone-600 transition-colors cursor-pointer"
              title="Copy Lyrics"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/80 hover:bg-rose-50 hover:text-rose-600 border border-[#dfd6ca] text-stone-500 transition-colors ml-0.5 cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Main Hymn Stanzas & Verses Scroll Area */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 scroll-smooth bg-[#fcfaf7]"
        >
          <div className="space-y-6 sm:space-y-7 max-w-2xl mx-auto">
            {hymn.verses.map((verse) => (
              <div
                key={verse.number}
                className="group relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl transition-colors hover:bg-[#f5eedc]/50"
              >
                {/* Verse Number Pill */}
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ede7dd] border border-[#ded4c6] text-[#592c10] font-serif font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {verse.number}
                </span>

                {/* Stanza Lines */}
                <div className="font-serif text-[#2c241d] whitespace-pre-line text-base sm:text-lg md:text-xl leading-relaxed">
                  {verse.text}
                </div>
              </div>
            ))}

            {/* Distinct Chorus / Ègbè Section */}
            {hymn.chorus && (
              <div className="my-4 sm:my-6 p-4 sm:p-6 bg-[#f7f0e3] border border-[#e8dac5] rounded-2xl shadow-sm max-w-2xl mx-auto">
                <div className="mb-2 text-[#592c10] font-bold uppercase tracking-wider text-[11px] sm:text-xs">
                  <span>Ègbè (Chorus / Refrain)</span>
                </div>
                <p className="font-serif text-[#3d2a1c] whitespace-pre-line italic text-base sm:text-lg md:text-xl leading-relaxed">
                  {hymn.chorus}
                </p>
              </div>
            )}

            {/* Liturgical Amen at the end */}
            <div className="pt-4 sm:pt-6 text-center font-serif text-[#592c10] font-bold text-base sm:text-lg tracking-widest uppercase">
              — Àmín —
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="p-3 sm:p-4 border-t border-[#e2d9cd] bg-[#f5eedc] flex items-center justify-between gap-2.5 shrink-0">
          {/* Prev Hymn Button */}
          <button
            onClick={onSelectPrevious}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-[#ede7dd] border border-[#dfd6ca] text-[#592c10] transition-all text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>Hymn {Math.max(1, hymn.number - 1)}</span>
          </button>

          {/* Current Hymn Indicator */}
          <span className="text-[11px] sm:text-xs text-[#786b60] font-mono font-medium">
            Hymn {hymn.number} of 654
          </span>

          {/* Next Hymn Button */}
          <button
            onClick={onSelectNext}
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-[#ede7dd] border border-[#dfd6ca] text-[#592c10] transition-all text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Hymn {hymn.number < 654 ? hymn.number + 1 : 1}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

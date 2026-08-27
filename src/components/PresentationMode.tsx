import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Hymn } from '../types';
import { ChurchLogo } from './ChurchLogo';

interface PresentationModeProps {
  hymn: Hymn;
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  hymn,
  isOpen,
  onClose
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Prepare slides: verse by verse with chorus in-between
  const slides = React.useMemo(() => {
    if (!hymn) return [];
    const list: { type: 'verse' | 'chorus' | 'title'; title: string; text: string; subtitle?: string }[] = [
      {
        type: 'title',
        title: `Hymn #${hymn.number}`,
        subtitle: hymn.englishTitle,
        text: hymn.title
      }
    ];

    hymn.verses.forEach((verse) => {
      list.push({
        type: 'verse',
        title: `Hymn #${hymn.number} • Stanza ${verse.number}`,
        text: verse.text
      });

      if (hymn.chorus) {
        list.push({
          type: 'chorus',
          title: `Hymn #${hymn.number} • Ègbè (Chorus)`,
          text: hymn.chorus
        });
      }
    });

    return list;
  }, [hymn]);

  useEffect(() => {
    setSlideIndex(0);
  }, [hymn]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        setSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen || !hymn || slides.length === 0) return null;

  const currentSlide = slides[slideIndex] || slides[0];

  return (
    <div
      id="presentation-projector-mode"
      className="fixed inset-0 z-50 bg-indigo-950/98 text-slate-100 flex flex-col justify-between p-4 sm:p-8 md:p-12 select-none animate-in fade-in duration-300 backdrop-blur-2xl"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Minimal Bar */}
      <div className="flex items-center justify-between opacity-90">
        <div className="flex items-center gap-2 sm:gap-3">
          <ChurchLogo size={32} />
          <span className="font-serif font-bold text-amber-300 text-sm sm:text-lg md:text-xl">
            Hope Christian Centre
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] sm:text-xs font-mono text-slate-300">
            {slideIndex + 1} / {slides.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-slate-200 transition-colors"
            title="Exit Projector Mode (ESC)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Projected Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-2 sm:px-4 my-auto py-4">
        <div className="mb-4 sm:mb-6">
          <span className="inline-block px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full backdrop-blur-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase font-sans shadow-lg">
            {currentSlide.title}
          </span>
        </div>

        {currentSlide.subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-slate-300 italic mb-3 sm:mb-4 font-serif">
            {currentSlide.subtitle}
          </p>
        )}

        <div className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-relaxed whitespace-pre-line drop-shadow-lg px-2">
          {currentSlide.text}
        </div>
      </div>

      {/* Bottom Floating Navigation Controls */}
      <div className="flex items-center justify-between opacity-90 pt-3 gap-2">
        <button
          onClick={() => setSlideIndex((p) => Math.max(0, p - 1))}
          disabled={slideIndex === 0}
          className="px-3.5 py-2 sm:px-5 sm:py-2.5 backdrop-blur-md bg-white/5 hover:bg-white/10 disabled:opacity-30 rounded-xl sm:rounded-2xl border border-white/10 text-slate-100 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all"
        >
          <ChevronLeft size={16} />
          <span className="hidden xs:inline sm:inline">Previous</span>
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[160px] sm:max-w-md py-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                slideIndex === idx ? 'w-6 sm:w-8 bg-amber-400 shadow-sm shadow-amber-400/50' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setSlideIndex((p) => Math.min(slides.length - 1, p + 1))}
          disabled={slideIndex === slides.length - 1}
          className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-amber-500 hover:bg-amber-400 text-indigo-950 disabled:opacity-30 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/25"
        >
          <span className="hidden xs:inline sm:inline">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Hash, ArrowRight } from 'lucide-react';

interface ChurchHeroProps {
  onSearchHymnNumber: (num: number) => void;
  maxHymnNumber?: number;
}

export const ChurchHero: React.FC<ChurchHeroProps> = ({
  onSearchHymnNumber,
  maxHymnNumber = 654,
}) => {
  const [hymnNumberInput, setHymnNumberInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNumberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const num = parseInt(hymnNumberInput.trim(), 10);
    if (!isNaN(num) && num >= 1 && num <= maxHymnNumber) {
      onSearchHymnNumber(num);
      setHymnNumberInput('');
    } else if (!isNaN(num)) {
      setErrorMessage(`Please enter a hymn number between 1 and ${maxHymnNumber}`);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      {/* Subtle background sacred pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(rgba(245,158,11,0.25)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-3xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        {/* Hero Title */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic tracking-tight text-white leading-snug sm:leading-tight mb-3 sm:mb-4 px-2">
          Lifting hearts in <span className="text-amber-400 not-italic font-semibold">worship</span> through timeless hymns.
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal mb-8 sm:mb-10 px-4">
          Access over 650 authentic Yoruba hymns for individual and congregational devotion.
        </p>

        {/* Centered Hymn Number Lookup Input */}
        <div className="w-full max-w-md mx-auto px-2">
          <form
            onSubmit={handleNumberSubmit}
            className="flex items-center backdrop-blur-2xl bg-indigo-950/80 rounded-2xl border border-amber-500/40 p-2 shadow-2xl focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/40 transition-all min-h-[52px]"
          >
            <div className="pl-3 pr-2 flex items-center justify-center text-amber-400">
              <Hash size={20} />
            </div>

            <input
              id="hymn-number-input"
              type="number"
              min="1"
              max={maxHymnNumber}
              autoFocus
              placeholder="Enter Hymn # (e.g. 1)"
              value={hymnNumberInput}
              onChange={(e) => {
                setHymnNumberInput(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              className="w-full bg-transparent text-amber-100 placeholder-slate-400 text-sm sm:text-base font-semibold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              type="submit"
              id="search-by-number-btn"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-indigo-950 font-bold text-sm rounded-xl flex items-center gap-1.5 shrink-0 transition-colors shadow-md shadow-amber-900/30 active:scale-95 cursor-pointer"
            >
              Go <ArrowRight size={15} />
            </button>
          </form>

          {errorMessage && (
            <p className="text-amber-400 text-xs mt-2 font-medium animate-in fade-in duration-150">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { Hymn } from '../types';
import { Search, Heart, ArrowRight, X } from 'lucide-react';

interface HymnsTabProps {
  hymns: Hymn[];
  onSelectHymn: (hymn: Hymn) => void;
  onToggleFavorite: (hymnNumber: number) => void;
  onQuickNumberJump: (num: number) => void;
}

export const HymnsTab: React.FC<HymnsTabProps> = ({
  hymns,
  onSelectHymn,
  onToggleFavorite,
  onQuickNumberJump,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 36;

  const isSearching = searchQuery.trim().length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const q = searchQuery.trim();
    if (!q) return;

    const num = parseInt(q, 10);
    if (!isNaN(num) && num.toString() === q) {
      if (num >= 1 && num <= hymns.length) {
        onQuickNumberJump(num);
      } else {
        setErrorMessage(`Please enter a hymn number between 1 and ${hymns.length}`);
      }
    }
  };

  // Filtered hymns when actively searching
  const filteredHymns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const num = parseInt(q, 10);
    const isPureNumber = !isNaN(num) && num.toString() === q;

    return hymns.filter((hymn) => {
      if (isPureNumber) {
        return hymn.number === num || hymn.number.toString().startsWith(q);
      }
      const matchNum = hymn.number.toString() === q;
      const matchTitle = hymn.title.toLowerCase().includes(q);
      const matchLyrics = hymn.rawText?.toLowerCase().includes(q);
      return matchNum || matchTitle || matchLyrics;
    });
  }, [hymns, searchQuery]);

  // Paginated search results
  const displayedHymns = useMemo(() => {
    return filteredHymns.slice(0, page * itemsPerPage);
  }, [filteredHymns, page]);

  const hasMore = displayedHymns.length < filteredHymns.length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300 text-[#2c241d]">
      {/* Hero Search & Jump Bar - The Only Feature on the Page */}
      <div
        className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-[#4a240c]/25 text-white shadow-lg"
        style={{
          backgroundImage: "url('/images/hymnal-card.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
        }}
      >
        {/* Rich warm amber-mahogany vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#592c10]/95 via-[#441f08]/92 to-[#261005]/96 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-200 text-xs font-bold uppercase tracking-wider">
            <span>Ìwé Orin Mímọ́</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            Lifting hearts in <span className="text-[#f5c68f]">worship</span> through timeless hymns.
          </h1>

          {/* Quick Search & Hymn Number Jump Form */}
          <div className="w-full max-w-md mx-auto pt-2">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-white rounded-2xl border border-amber-200/50 p-1.5 shadow-lg focus-within:ring-2 focus-within:ring-amber-500/50 transition-all"
            >
              <div className="pl-3 pr-2 text-[#592c10]">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Enter Hymn Number / Nọ́mbà Orin (1 - 654)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                  if (errorMessage) setErrorMessage('');
                }}
                className="w-full bg-transparent text-[#2c241d] placeholder-stone-400 text-sm font-semibold focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setErrorMessage('');
                    setPage(1);
                  }}
                  className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer mr-1"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-[#592c10] hover:bg-[#441f08] text-amber-100 font-bold text-xs rounded-xl flex items-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer active:scale-95"
              >
                Go <ArrowRight size={14} />
              </button>
            </form>

            {errorMessage && (
              <p className="text-amber-200 text-xs mt-2 font-semibold">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* The songs will ONLY be displayed when they are being searched */}
      {isSearching && (
        <div className="space-y-4 pt-2 animate-in fade-in duration-200">
          {/* Search Status Header */}
          <div className="flex items-center justify-between text-xs text-[#786b60] px-1">
            <span>
              Found <strong className="text-[#592c10]">{filteredHymns.length}</strong> {filteredHymns.length === 1 ? 'hymn' : 'hymns'} matching "{searchQuery}"
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setErrorMessage('');
                setPage(1);
              }}
              className="text-[#8c4316] hover:text-[#592c10] font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X size={14} />
              <span>Clear search</span>
            </button>
          </div>

          {/* Hymn Search Results Grid */}
          {filteredHymns.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedHymns.map((hymn) => (
                <div
                  key={hymn.id}
                  onClick={() => onSelectHymn(hymn)}
                  className="group relative rounded-2xl bg-white hover:bg-[#fbf9f6] border border-[#dfd6ca] hover:border-[#8c4316]/50 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    {/* Header inside Hymn Card */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-[#f5eedc] text-[#592c10] font-serif font-bold text-sm flex items-center justify-center border border-[#e5d8c3]">
                        {hymn.number}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#ede7dd] text-[#6b5b4e] truncate max-w-[120px]">
                          {hymn.liturgicalSeason}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(hymn.number);
                          }}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            hymn.isFavorite
                              ? 'text-rose-600 hover:text-rose-700'
                              : 'text-stone-400 hover:text-stone-600'
                          }`}
                          title={hymn.isFavorite ? 'Remove favorite' : 'Add favorite'}
                        >
                          <Heart size={16} className={hymn.isFavorite ? 'fill-rose-600' : ''} />
                        </button>
                      </div>
                    </div>

                    {/* Hymn Yoruba Title - English title removed */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2c241d] group-hover:text-[#592c10] transition-colors line-clamp-1">
                      {hymn.title}
                    </h3>

                    {/* Lyrics preview */}
                    <p className="text-xs text-[#5e5146] line-clamp-2 mt-2 leading-relaxed">
                      {hymn.verses[0]?.text.replace(/\n/g, ' ')}
                    </p>
                  </div>

                  {/* Meter and Verse count */}
                  <div className="mt-4 pt-3 border-t border-[#f0eae1] flex items-center justify-between text-[11px] text-[#8c7b6d]">
                    <span>{hymn.verses.length} Verses</span>
                    <span className="text-[#8c4316] font-mono text-[10px] font-medium">{hymn.meter}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State - No music icon */
            <div className="p-10 text-center rounded-3xl bg-white border border-[#dfd6ca] space-y-3 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-[#2c241d]">No hymns found</h3>
              <p className="text-xs sm:text-sm text-[#786b60] max-w-sm mx-auto">
                No hymns matched "{searchQuery}". Please check your search term or enter a hymn number between 1 and {hymns.length}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setErrorMessage('');
                  setPage(1);
                }}
                className="px-4 py-2 rounded-xl bg-[#ede7dd] hover:bg-[#e4dcce] border border-[#ded4c6] text-[#592c10] text-xs font-bold transition-all cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-[#ede7dd] text-[#592c10] hover:text-[#441f08] border border-[#dfd6ca] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                Load More Results ({filteredHymns.length - displayedHymns.length} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

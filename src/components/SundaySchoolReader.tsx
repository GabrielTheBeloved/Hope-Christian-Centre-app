import React, { useState, useEffect } from 'react';
import { SundaySchoolLesson, LessonOutline } from '../types';
import {
  getLessonMemoryReference,
  getDevotionalReading,
  getBackgroundScripture,
  getLessonScripture,
  toEnglishScripture,
  toYorubaScripture
} from '../utils/scriptureUtils';
import {
  X,
  Copy,
  Check
} from 'lucide-react';

interface SundaySchoolReaderProps {
  lesson: SundaySchoolLesson;
  isOpen: boolean;
  onClose: () => void;
  language?: 'english' | 'yoruba';
  onToggleBookmark?: (id: string) => void;
  onSelectPrevious?: () => void;
  onSelectNext?: () => void;
  isCompleted?: boolean;
  onToggleCompleted?: (id: string) => void;
  initialLanguage?: 'english' | 'yoruba';
}

function cleanOutlineTitle(title: string, fallbackLetter: string): string {
  // If title already starts with "A.", "B.", etc., preserve it
  if (/^[A-Z]\.\s+/i.test(title)) return title;
  // If it starts with "Outline 1: " or "Àkòrí 1: ", strip the prefix and prepend letter
  const cleaned = title.replace(/^(Outline\s*\d+:?|Àkòrí\s*\d+:?)\s*/i, '').trim();
  return `${fallbackLetter}. ${cleaned}`;
}

function getOutlineScripture(outline: LessonOutline, isYoruba: boolean): string {
  if (isYoruba && outline.scripturePassageYoruba) return outline.scripturePassageYoruba;
  if (!isYoruba && outline.scripturePassageEnglish) return outline.scripturePassageEnglish;
  if (outline.scripturePassage) {
    return isYoruba ? toYorubaScripture(outline.scripturePassage) : toEnglishScripture(outline.scripturePassage);
  }
  if (outline.scriptures && outline.scriptures.length > 0) {
    return outline.scriptures.map(s => isYoruba ? toYorubaScripture(s) : toEnglishScripture(s)).join(', ');
  }
  return '';
}

function getOutlinePoints(outline: LessonOutline, isYoruba: boolean): string[] {
  const points = isYoruba ? [...outline.contentYoruba] : [...outline.contentEnglish];
  const question = isYoruba ? outline.discussionQuestionYoruba : outline.discussionQuestionEnglish;
  if (question && !points.some(p => p.includes(question))) {
    points.push(question);
  }
  return points;
}

export const SundaySchoolReader: React.FC<SundaySchoolReaderProps> = ({
  lesson,
  isOpen,
  onClose,
  language = 'english',
  initialLanguage = 'english'
}) => {
  // Uses selected language from the main Sunday School page
  const isYoruba = (language || initialLanguage) === 'yoruba';
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedVerse, setCopiedVerse] = useState(false);

  useEffect(() => {
    // Reset copy state when lesson changes
    setCopiedVerse(false);
  }, [lesson?.id]);

  if (!isOpen || !lesson) return null;

  // Scripture references
  const devotional = getDevotionalReading(lesson, isYoruba ? 'yoruba' : 'english');
  const background = getBackgroundScripture(lesson, isYoruba ? 'yoruba' : 'english');
  const lessonScripture = getLessonScripture(lesson, isYoruba ? 'yoruba' : 'english');

  // Introduction points
  const getIntroPoints = (): string[] => {
    if (lesson.introductionPoints) {
      const pts = isYoruba ? lesson.introductionPoints.yoruba : lesson.introductionPoints.english;
      if (pts && pts.length > 0) return pts;
    }
    const rawText = isYoruba ? lesson.introduction?.yoruba : lesson.introduction?.english;
    if (!rawText) return [];
    // Split sentences if raw text is a paragraph
    const sentences = rawText
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    return sentences.length > 0 ? sentences : [rawText];
  };

  const introPoints = getIntroPoints();

  // Golden text
  const goldenText = lesson.goldenText ? {
    text: isYoruba ? lesson.goldenText.textYoruba : lesson.goldenText.textEnglish,
    reference: isYoruba ? lesson.goldenText.referenceYoruba : lesson.goldenText.referenceEnglish
  } : {
    text: isYoruba ? lesson.memoryVerse.textYoruba : lesson.memoryVerse.textEnglish,
    reference: getLessonMemoryReference(lesson, isYoruba ? 'yoruba' : 'english')
  };

  const handleCopyVerse = () => {
    const text = `“${goldenText.text}” — ${goldenText.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedVerse(true);
    setTimeout(() => setCopiedVerse(false), 2000);
  };

  const getTextClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-[#fcfaf7] border border-[#dfd6ca] shadow-2xl overflow-hidden text-[#2c241d]">
        
        {/* Top Header Bar: ONLY Topic, Dates, and transparent Exit button */}
        <header className="px-5 py-4 border-b border-[#e2d9cd] bg-[#f5eedc] flex items-center justify-between gap-4 shrink-0">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="font-serif text-base sm:text-xl md:text-2xl font-bold text-[#2c241d] leading-snug break-words uppercase">
              {isYoruba ? lesson.topicYoruba : lesson.topicEnglish}
            </h2>
            <div className="text-xs sm:text-sm text-[#8c4316] font-semibold mt-1">
              <span>{isYoruba ? lesson.dateYoruba : lesson.dateEnglish}</span>
            </div>
          </div>

          {/* Transparent Exit button that won't cover any text */}
          <button
            onClick={onClose}
            title="Close"
            aria-label="Close"
            className="p-2 rounded-full text-stone-600 hover:text-stone-900 bg-transparent hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer shrink-0 border-0"
          >
            <X size={24} />
          </button>
        </header>

        {/* Scrollable Lesson Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 text-[#2c241d] bg-[#fcfaf7]">
          
          {/* 1. SCRIPTURAL REFERENCES IN 3 SEPARATE TABS / BOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {devotional && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f7f1e6] border border-[#e8ddcd] shadow-xs flex flex-col justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8c4316] pb-1 border-b border-[#e8ddcd]/60">
                  <span>{isYoruba ? 'Kíkà fún Ìfọkànsìn' : 'Devotional Reading'}</span>
                </div>
                <div className="font-serif font-bold text-sm sm:text-base text-[#2c241d] mt-2">
                  {devotional}
                </div>
              </div>
            )}

            {background && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f7f1e6] border border-[#e8ddcd] shadow-xs flex flex-col justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8c4316] pb-1 border-b border-[#e8ddcd]/60">
                  <span>{isYoruba ? 'Ìpìlẹ̀ Ẹsẹ Bíbélì' : 'Background Scripture'}</span>
                </div>
                <div className="font-serif font-bold text-sm sm:text-base text-[#2c241d] mt-2">
                  {background}
                </div>
              </div>
            )}

            {lessonScripture && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f7f1e6] border border-[#e8ddcd] shadow-xs flex flex-col justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8c4316] pb-1 border-b border-[#e8ddcd]/60">
                  <span>{isYoruba ? 'Ẹsẹ Bíbélì Ẹ̀kọ́' : 'Lesson Scripture'}</span>
                </div>
                <div className="font-serif font-bold text-sm sm:text-base text-[#2c241d] mt-2">
                  {lessonScripture}
                </div>
              </div>
            )}
          </div>

          {/* 2. THE INTRODUCTION HAS ITS OWN TAB / BOX */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#dfd6ca] shadow-sm space-y-4">
            <div className="flex items-center pb-2 border-b border-[#f0e8dc]">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#f5eedc] border border-[#e2d9cd] text-xs font-bold uppercase tracking-wider text-[#592c10]">
                <span>{isYoruba ? 'ÌFÁÀRÀ' : 'INTRODUCTION'}</span>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              {introPoints.map((point, idx) => {
                const cleanedPoint = point.replace(/^\d+\.?\s*/, '');
                return (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#f5eedc] text-[#8c4316] font-bold text-xs flex items-center justify-center select-none shrink-0 mt-0.5 border border-[#e8dac5]">
                      {idx + 1}
                    </span>
                    <p className={`${getTextClass()} text-[#2c241d] font-normal leading-relaxed`}>
                      {cleanedPoint}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. THE LESSON EXPLAINED IN A SINGLE TAB, WITH LESSON A AND B IN SEPARATE TABS */}
          <section className="p-5 sm:p-6 rounded-2xl bg-[#faf6ef] border border-[#ded3c2] shadow-sm space-y-5">
            
            {/* Header tab for The Lesson Explained */}
            <div className="flex items-center pb-3 border-b border-[#dfd6ca]">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#f5eedc] border border-[#e2d9cd] text-xs font-bold uppercase tracking-wider text-[#592c10]">
                <span>{isYoruba ? 'ÀWỌN KÓKÓ Ẹ̀KỌ́ TÍ A ṢÀLÀYÉ' : 'THE LESSON EXPLAINED'}</span>
              </div>
            </div>

            {/* Individual Outlines: Outline A in a tab, Outline B in a tab */}
            <div className="space-y-5">
              {lesson.outlines.map((outline, oIdx) => {
                const actualIndex = lesson.outlines.indexOf(outline);
                const letter = outline.letter || String.fromCharCode(65 + (actualIndex >= 0 ? actualIndex : oIdx));
                const title = isYoruba ? outline.titleYoruba : outline.titleEnglish;
                const formattedTitle = cleanOutlineTitle(title, letter);
                const scripture = getOutlineScripture(outline, isYoruba);
                const points = getOutlinePoints(outline, isYoruba);

                return (
                  <div
                    key={outline.outlineNumber || actualIndex}
                    className="p-5 sm:p-6 rounded-xl bg-white border border-[#e5dcce] shadow-xs space-y-4 transition-all"
                  >
                    {/* Outline Header Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-[#f2ece2]">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#592c10]">
                        {formattedTitle}
                      </h4>
                      {scripture && (
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#f5eedc] text-xs font-semibold text-[#8c4316] border border-[#e5dac8]">
                          {scripture}
                        </span>
                      )}
                    </div>

                    {/* Outline Points */}
                    <div className="space-y-3 pt-1">
                      {points.map((point, pIdx) => {
                        const cleanedPoint = point.replace(/^\d+\.?\s*/, '');
                        return (
                          <div key={pIdx} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#faf6ef] text-[#8c4316] font-bold text-xs flex items-center justify-center select-none shrink-0 mt-0.5 border border-[#e5dcce]">
                              {pIdx + 1}
                            </span>
                            <p className={`${getTextClass()} text-[#2c241d] leading-relaxed`}>
                              {cleanedPoint}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 4. GOLDEN TEXT HAS ITS OWN TAB / BOX */}
          <section className="p-5 sm:p-6 rounded-2xl bg-[#f7f0e3] border border-[#e8dac5] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e8dac5]">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#ede2cf] border border-[#ded1bb] text-xs font-bold uppercase tracking-wider text-[#592c10]">
                <span>{isYoruba ? 'GÓŃGÓ Ẹ̀KỌ́' : 'GOLDEN TEXT'}</span>
              </div>
              <button
                onClick={handleCopyVerse}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#dfd6ca] hover:bg-[#ede7dd] text-xs text-[#592c10] font-semibold transition-colors cursor-pointer shadow-xs"
                title="Copy verse"
              >
                {copiedVerse ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedVerse ? (isYoruba ? 'Ti Dá Kọ' : 'Copied') : (isYoruba ? 'Dá Kọ' : 'Copy')}</span>
              </button>
            </div>

            <div className="pt-1">
              <blockquote className="font-serif">
                <p className={`${getTextClass()} text-[#2c241d] font-medium italic leading-relaxed`}>
                  “{goldenText.text}”
                </p>
              </blockquote>
              <div className="mt-3 text-right">
                <cite className="not-italic inline-block font-bold text-sm sm:text-base text-[#8c4316]">
                  — {goldenText.reference}
                </cite>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Text Size Toggle Bar */}
        <footer className="px-5 py-2.5 bg-[#ede7dd] border-t border-[#ded4c6] flex items-center justify-between gap-3 text-xs shrink-0">
          <span className="text-[#6b5b4e] font-medium">
            {isYoruba ? 'Ìwọ̀n Ìwé:' : 'Text Size:'}
          </span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#dfd6ca]">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                fontSize === 'normal' ? 'bg-[#592c10] text-white font-bold' : 'text-[#6b5b4e] hover:text-[#2c241d]'
              }`}
              title="Normal text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                fontSize === 'large' ? 'bg-[#592c10] text-white font-bold' : 'text-[#6b5b4e] hover:text-[#2c241d]'
              }`}
              title="Large text"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                fontSize === 'xlarge' ? 'bg-[#592c10] text-white font-bold' : 'text-[#6b5b4e] hover:text-[#2c241d]'
              }`}
              title="Extra large text"
            >
              A++
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

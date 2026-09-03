import React, { useState, useEffect } from 'react';
import { Hymn, AppTab, SundaySchoolLesson } from './types';
import { HymnStorageService } from './services/hymnStorage';
import { SundaySchoolStorageService } from './services/sundaySchoolStorage';
import { Navbar } from './components/Navbar';
import { HomeTab } from './components/HomeTab';
import { HymnsTab } from './components/HymnsTab';
import { SundaySchoolTab } from './components/SundaySchoolTab';
import { SundaySchoolReader } from './components/SundaySchoolReader';
import { HymnReader } from './components/HymnReader';
import { PresentationMode } from './components/PresentationMode';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [hymns, setHymns] = useState<Hymn[]>(() => HymnStorageService.getAllHymns());
  const [lessons, setLessons] = useState<SundaySchoolLesson[]>(() =>
    SundaySchoolStorageService.getAllLessons()
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() =>
    SundaySchoolStorageService.getCompletedLessonIds()
  );

  // Active Modals & Readers
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [presentationHymn, setPresentationHymn] = useState<Hymn | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<SundaySchoolLesson | null>(null);
  const [sundaySchoolLanguage, setSundaySchoolLanguage] = useState<'english' | 'yoruba'>('english');

  // Network offline state detection
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredInstallPrompt) return;
    await deferredInstallPrompt.prompt();
    const choiceResult = await deferredInstallPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setDeferredInstallPrompt(null);
    }
  };

  // Keyboard shortcut listener (ESC closes any modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedHymn(null);
        setPresentationHymn(null);
        setSelectedLesson(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Jump by Hymn Number
  const handleSearchHymnNumber = (num: number) => {
    const matched = hymns.find((h) => h.number === num);
    if (matched) {
      setSelectedHymn(matched);
    }
  };

  // Toggle favorite hymn
  const handleToggleFavorite = (hymnNumber: number) => {
    HymnStorageService.toggleFavorite(hymnNumber);
    setHymns((prev) =>
      prev.map((h) => (h.number === hymnNumber ? { ...h, isFavorite: !h.isFavorite } : h))
    );
    if (selectedHymn && selectedHymn.number === hymnNumber) {
      setSelectedHymn((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  // Prev / Next Hymn in Reader
  const handleSelectPreviousHymn = () => {
    if (!selectedHymn) return;
    const prevNum = selectedHymn.number > 1 ? selectedHymn.number - 1 : hymns.length;
    const prevHymn = hymns.find((h) => h.number === prevNum);
    if (prevHymn) setSelectedHymn(prevHymn);
  };

  const handleSelectNextHymn = () => {
    if (!selectedHymn) return;
    const nextNum = selectedHymn.number < hymns.length ? selectedHymn.number + 1 : 1;
    const nextHymn = hymns.find((h) => h.number === nextNum);
    if (nextHymn) setSelectedHymn(nextHymn);
  };

  // Sunday School Bookmarking
  const handleToggleLessonBookmark = (lessonId: string) => {
    SundaySchoolStorageService.toggleBookmark(lessonId);
    setLessons((prev) =>
      prev.map((l) => (l.id === lessonId ? { ...l, isBookmarked: !l.isBookmarked } : l))
    );
    if (selectedLesson && selectedLesson.id === lessonId) {
      setSelectedLesson((prev) => (prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null));
    }
  };

  // Sunday School Lesson Completion
  const handleToggleLessonCompleted = (lessonId: string) => {
    SundaySchoolStorageService.toggleCompleted(lessonId);
    setCompletedLessonIds(SundaySchoolStorageService.getCompletedLessonIds());
  };

  // Prev / Next Lesson in Reader
  const handleSelectPreviousLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : lessons.length - 1;
    setSelectedLesson(lessons[prevIndex]);
  };

  const handleSelectNextLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = lessons.findIndex((l) => l.id === selectedLesson.id);
    const nextIndex = currentIndex < lessons.length - 1 ? currentIndex + 1 : 0;
    setSelectedLesson(lessons[nextIndex]);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col font-sans bg-[#f6f2ec] text-[#2c241d] selection:bg-amber-200 selection:text-stone-900">
      {/* Main Navbar with Centralized Logo, Name, and Nav Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOffline={isOffline}
        canInstallPwa={!!deferredInstallPrompt}
        onInstallPwa={handleInstallPwa}
      />

      {/* Main Viewport Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-start">
        {activeTab === 'home' && (
          <HomeTab
            hymnsCount={hymns.length}
            lessonsCount={lessons.length}
            onNavigateToHymns={() => {
              setActiveTab('hymns');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToSundaySchool={() => {
              setActiveTab('sundayschool');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onQuickNumberJump={(num) => {
              handleSearchHymnNumber(num);
            }}
            onSelectHymn={(hymn) => setSelectedHymn(hymn)}
            onSelectLesson={(lesson) => setSelectedLesson(lesson)}
            hymns={hymns}
            lessons={lessons}
          />
        )}

        {activeTab === 'hymns' && (
          <div className="pb-12">
            <HymnsTab
              hymns={hymns}
              onSelectHymn={(hymn) => setSelectedHymn(hymn)}
              onToggleFavorite={handleToggleFavorite}
              onQuickNumberJump={handleSearchHymnNumber}
            />
          </div>
        )}

        {activeTab === 'sundayschool' && (
          <div className="pb-12">
            <SundaySchoolTab
              lessons={lessons}
              onSelectLesson={(lesson) => setSelectedLesson(lesson)}
              onToggleBookmark={handleToggleLessonBookmark}
              completedIds={completedLessonIds}
              language={sundaySchoolLanguage}
              onLanguageChange={setSundaySchoolLanguage}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-4 text-center text-xs space-y-2 border-t border-[#dfd6ca] bg-[#ede6dc] text-stone-600">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-medium">
          <span className="font-semibold text-stone-800">
            Hope Christian Centre
          </span>
          <span>Yoruba Hymns & Sunday School Manual</span>
        </div>

        <p className="text-[11px] text-stone-500 font-serif italic">
          &ldquo;He maketh my feet like hinds&rsquo; feet, and setteth me upon my high places.&rdquo; — Psalm 18:33
        </p>

        <p className="text-[11px] text-stone-500 pt-1">
          Copyright &copy; Hope Christian Centre 2026
        </p>
      </footer>

      {/* Full Hymn Reader Modal */}
      {selectedHymn && (
        <HymnReader
          hymn={selectedHymn}
          isOpen={!!selectedHymn}
          onClose={() => setSelectedHymn(null)}
          onSelectPrevious={handleSelectPreviousHymn}
          onSelectNext={handleSelectNextHymn}
          onToggleFavorite={handleToggleFavorite}
          onOpenPresentation={(h) => setPresentationHymn(h)}
        />
      )}

      {/* Sunday School Lesson Reader Modal */}
      {selectedLesson && (
        <SundaySchoolReader
          lesson={selectedLesson}
          isOpen={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
          language={sundaySchoolLanguage}
        />
      )}

      {/* Church Presentation / Projector Mode */}
      {presentationHymn && (
        <PresentationMode
          hymn={presentationHymn}
          isOpen={!!presentationHymn}
          onClose={() => setPresentationHymn(null)}
        />
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Hymn } from './types';
import { HymnStorageService } from './services/hymnStorage';
import { Navbar } from './components/Navbar';
import { ChurchHero } from './components/ChurchHero';
import { HymnReader } from './components/HymnReader';
import { PresentationMode } from './components/PresentationMode';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function App() {
  const [hymns, setHymns] = useState<Hymn[]>(() => HymnStorageService.getAllHymns());

  // Active Modals & Readers
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [presentationHymn, setPresentationHymn] = useState<Hymn | null>(null);

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

  // Keyboard shortcut listener (ESC closes modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedHymn(null);
        setPresentationHymn(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Jump by Number
  const handleSearchHymnNumber = (num: number) => {
    const matched = hymns.find((h) => h.number === num);
    if (matched) {
      setSelectedHymn(matched);
    }
  };

  // Toggle favorite
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

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col font-sans bg-indigo-950 text-slate-100 selection:bg-amber-500 selection:text-indigo-950">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] max-w-[650px] h-[50vw] max-h-[650px] bg-blue-600 rounded-full blur-[140px] opacity-25 pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[55vw] max-w-[700px] h-[55vw] max-h-[700px] bg-amber-600 rounded-full blur-[160px] opacity-20 pointer-events-none z-0" />
      <div className="fixed top-[45%] left-[30%] w-[40vw] max-w-[500px] h-[40vw] max-h-[500px] bg-indigo-500 rounded-full blur-[150px] opacity-15 pointer-events-none z-0" />

      {/* Clean Navigation Header with Offline & Install Status */}
      <Navbar
        isOffline={isOffline}
        canInstallPwa={!!deferredInstallPrompt}
        onInstallPwa={handleInstallPwa}
      />

      {/* Main Home Page Hero & Hymn Number Input */}
      <main className="relative z-10 flex-1 flex flex-col justify-center pb-8 sm:pb-12">
        <ChurchHero
          onSearchHymnNumber={handleSearchHymnNumber}
          maxHymnNumber={hymns.length}
        />
      </main>

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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ViewMode, VocabularyWord, UserProgress } from './types/vocabulary';
import { VOCABULARY_DATABASE } from './data/vocabularyData';
import { 
  loadProgress, 
  saveProgress, 
  loadTheme, 
  saveTheme, 
  loadAudioSpeed, 
  saveAudioSpeed 
} from './utils/storage';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FlashcardModule } from './components/FlashcardModule';
import { WordListView } from './components/WordListView';
import { QuizArena } from './components/QuizArena';
import { ToneGuideModal } from './components/ToneGuideModal';
import { WordDetailModal } from './components/WordDetailModal';
import { RoyalEmblem } from './components/RoyalEmblem';
import { 
  BookOpen, 
  Layers, 
  Sparkles, 
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('grid');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [isDark, setIsDark] = useState<boolean>(loadTheme);
  const [audioSpeed, setAudioSpeed] = useState<number>(loadAudioSpeed);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);
  const [isToneGuideOpen, setIsToneGuideOpen] = useState<boolean>(false);

  // Synchronize dark theme class with html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(isDark);
  }, [isDark]);

  // Persist progress changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleToggleAudioSpeed = () => {
    const nextSpeed = audioSpeed === 0.7 ? 0.85 : audioSpeed === 0.85 ? 1.0 : 0.7;
    setAudioSpeed(nextSpeed);
    saveAudioSpeed(nextSpeed);
  };

  const handleToggleStar = (id: string) => {
    setProgress((prev) => {
      const exists = prev.favorites.includes(id);
      const newFavs = exists ? prev.favorites.filter((f) => f !== id) : [...prev.favorites, id];
      return { ...prev, favorites: newFavs };
    });
  };

  const handleToggleMaster = (id: string) => {
    setProgress((prev) => {
      const exists = prev.mastered.includes(id);
      const newMastered = exists ? prev.mastered.filter((m) => m !== id) : [...prev.mastered, id];
      return { ...prev, mastered: newMastered };
    });
  };

  const handleUpdateHighScore = (newScore: number) => {
    setProgress((prev) => ({
      ...prev,
      quizHighScore: Math.max(prev.quizHighScore, newScore),
      totalQuizzesTaken: prev.totalQuizzesTaken + 1,
    }));
  };

  // Filter words by category and search query
  const filteredWords = useMemo(() => {
    return VOCABULARY_DATABASE.filter((w) => {
      // Category filter
      if (selectedCategory !== 'all' && w.category !== selectedCategory) {
        return false;
      }
      // Search filter across Thai, Phonetic, Burmese, and Burmese Phonetic
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchThai = w.thai.toLowerCase().includes(q);
        const matchPhonetic = w.phonetic.toLowerCase().includes(q);
        const matchBurmese = w.burmese.toLowerCase().includes(q);
        const matchBurmesePhonetic = w.burmesePhonetic.toLowerCase().includes(q);
        return matchThai || matchPhonetic || matchBurmese || matchBurmesePhonetic;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#020617] text-[#1E293B] dark:text-[#E2E8F0] transition-colors duration-200">
      {/* 3-Zone Top Bar Navigation */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        streakDays={progress.streakDays}
        audioSpeed={audioSpeed}
        onToggleAudioSpeed={handleToggleAudioSpeed}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
        {/* Hero Banner with Royal Purple Palette & Canary Glow Ring */}
        <HeroBanner
          totalWords={VOCABULARY_DATABASE.length}
          starredCount={progress.favorites.length}
          masteredCount={progress.mastered.length}
          onOpenToneGuide={() => setIsToneGuideOpen(true)}
        />

        {/* Dynamic View Display */}
        {currentView === 'flashcards' && (
          <FlashcardModule
            words={filteredWords}
            starredIds={progress.favorites}
            masteredIds={progress.mastered}
            onToggleStar={handleToggleStar}
            onToggleMaster={handleToggleMaster}
            audioSpeed={audioSpeed}
          />
        )}

        {(currentView === 'grid' || currentView === 'compact') && (
          <WordListView
            words={filteredWords}
            starredIds={progress.favorites}
            masteredIds={progress.mastered}
            onToggleStar={handleToggleStar}
            onToggleMaster={handleToggleMaster}
            onSelectWord={setSelectedWord}
            audioSpeed={audioSpeed}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentView === 'quiz' && (
          <QuizArena
            words={VOCABULARY_DATABASE}
            audioSpeed={audioSpeed}
            onUpdateHighScore={handleUpdateHighScore}
            onReturnToStudy={() => setCurrentView('flashcards')}
          />
        )}

        {currentView === 'tone-guide' && (
          <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-burmese text-[#0F172A] dark:text-white">
                ထိုင်းဘာသာ အသံ ၅ သံနှင့် ဗျည်းအုပ်စု လမ်းညွှန်
              </h2>
              <button
                onClick={() => setCurrentView('flashcards')}
                className="text-xs text-[#9333EA] font-semibold hover:underline cursor-pointer"
              >
                ဝေါဟာရများသို့ ပြန်သွားမည်
              </button>
            </div>
            <p className="font-burmese text-sm text-[#64748B] mb-6">
              အောက်ပါ အသံ ၅ သံ လမ်းညွှန်ချက်ကို ဖတ်ရှုပြီး တိုက်ရိုက် အသံထွက်များကို နှိပ်၍ နားထောင်နိုင်ပါသည်။
            </p>
            <button
              onClick={() => setIsToneGuideOpen(true)}
              className="py-3 px-6 rounded-2xl bg-[#9333EA] text-white hover:bg-[#7E22CE] font-bold text-sm cursor-pointer shadow-md"
            >
              အသံ ၅ သံ လမ်းညွှန် ဖွင့်ရန် (Open Interactive Guide)
            </button>
          </div>
        )}
      </main>

      {/* Tone Guide Modal */}
      <ToneGuideModal
        isOpen={isToneGuideOpen}
        onClose={() => setIsToneGuideOpen(false)}
        audioSpeed={audioSpeed}
      />

      {/* Word Detail Drawer / Modal */}
      <WordDetailModal
        word={selectedWord}
        isOpen={Boolean(selectedWord)}
        onClose={() => setSelectedWord(null)}
        isStarred={selectedWord ? progress.favorites.includes(selectedWord.id) : false}
        isMastered={selectedWord ? progress.mastered.includes(selectedWord.id) : false}
        onToggleStar={handleToggleStar}
        onToggleMaster={handleToggleMaster}
        audioSpeed={audioSpeed}
      />

      {/* Mobile Bottom Navigation Bar (Thumb friendly) */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-[#E2E8F0] dark:border-[#1E293B] px-4 py-2 flex items-center justify-around"
      >
        <button
          onClick={() => setCurrentView('flashcards')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold cursor-pointer ${
            currentView === 'flashcards'
              ? 'text-[#9333EA] font-bold'
              : 'text-[#64748B] dark:text-[#94A3B8]'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span>ကတ်ပြား</span>
        </button>

        <button
          onClick={() => setCurrentView('grid')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold cursor-pointer ${
            currentView === 'grid' || currentView === 'compact'
              ? 'text-[#9333EA] font-bold'
              : 'text-[#64748B] dark:text-[#94A3B8]'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>ဝေါဟာရ</span>
        </button>

        <button
          onClick={() => setCurrentView('quiz')}
          className={`flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold cursor-pointer ${
            currentView === 'quiz'
              ? 'text-[#FED01B] font-bold'
              : 'text-[#64748B] dark:text-[#94A3B8]'
          }`}
        >
          <Sparkles className="w-5 h-5 text-[#FED01B]" />
          <span>ဉာဏ်စမ်း</span>
        </button>

        <button
          onClick={() => setIsToneGuideOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-3 text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8] cursor-pointer"
        >
          <HelpCircle className="w-5 h-5" />
          <span>အသံ ၅ သံ</span>
        </button>
      </nav>

      {/* Quiet Footer */}
      <footer className="border-t border-[#E2E8F0] dark:border-[#1E293B] py-6 bg-white dark:bg-[#0F172A] text-xs text-[#64748B] dark:text-[#94A3B8] transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <RoyalEmblem size={26} />
            <span className="font-burmese">
              တော်ဝင် မယ်ရီဂိုးလ် ထိုင်း-မြန်မာ ဝေါဟာရ စနစ် (Royal Marigold System)
            </span>
          </div>

          <div className="flex items-center gap-4 font-burmese">
            <span>ထိုင်းစကားပြော လေ့ကျင့်ရန်</span>
            <span aria-hidden="true">·</span>
            <span>Web Speech API အသံထွက်</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

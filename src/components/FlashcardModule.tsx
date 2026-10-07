import React, { useState, useEffect } from 'react';
import { VocabularyWord } from '../types/vocabulary';
import { audioService } from '../utils/audio';
import { TONE_DETAILS } from '../data/vocabularyData';
import { 
  Volume2, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Shuffle, 
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';

interface FlashcardModuleProps {
  words: VocabularyWord[];
  starredIds: string[];
  masteredIds: string[];
  onToggleStar: (id: string) => void;
  onToggleMaster: (id: string) => void;
  audioSpeed: number;
}

export const FlashcardModule: React.FC<FlashcardModuleProps> = ({
  words,
  starredIds,
  masteredIds,
  onToggleStar,
  onToggleMaster,
  audioSpeed,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [promptInBurmese, setPromptInBurmese] = useState(true); // Burmese front vs Thai front

  const currentWord = words[currentIndex];
  const isStarred = currentWord ? starredIds.includes(currentWord.id) : false;
  const isMastered = currentWord ? masteredIds.includes(currentWord.id) : false;

  // Reset flip when index changes
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex, words]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, words.length]);

  if (!words || words.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-[#0F172A] rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] p-8">
        <Sparkles className="w-12 h-12 text-[#FED01B] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-white">ဝေါဟာရ မရှိပါ</h3>
        <p className="text-sm text-[#64748B] mt-1 font-burmese">
          ရွေးချယ်ထားသော အုပ်စုတွင် စာလုံးမတွေ့ပါ။ အခြားအုပ်စုကို ရွေးပါ သို့မဟုတ် ရှာဖွေမှု ဖျက်ပါ။
        </p>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentIndex(randomIndex);
    setIsFlipped(false);
  };

  const handlePlayAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentWord) return;
    setIsPlayingAudio(true);
    audioService.speak(
      currentWord.thai,
      audioSpeed,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const toneInfo = TONE_DETAILS[currentWord.tone] || TONE_DETAILS.mid;

  return (
    <div className="max-w-xl mx-auto">
      {/* Top Controls: Counter & Mode Switcher */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F1F5F9] dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8]">
            {currentIndex + 1} / {words.length}
          </span>
          <button
            onClick={() => setPromptInBurmese(!promptInBurmese)}
            className="flex items-center gap-1.5 text-xs text-[#6D28D9] dark:text-[#C084FC] hover:underline font-medium cursor-pointer"
            title="Toggle prompt script"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{promptInBurmese ? 'မြန်မာ ➔ ထိုင်း' : 'ထိုင်း ➔ မြန်မာ'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Shuffle cards"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={() => onToggleStar(currentWord.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isStarred
                ? 'text-[#EAB308] bg-yellow-50 dark:bg-yellow-950/40'
                : 'text-[#64748B] hover:text-[#0F172A] dark:hover:text-white'
            }`}
            title="Favorite"
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-[#EAB308]' : ''}`} />
          </button>
          <button
            onClick={() => onToggleMaster(currentWord.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isMastered
                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                : 'text-[#64748B] hover:text-emerald-600'
            }`}
            title="Mark as Mastered"
          >
            <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'fill-emerald-600 text-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3D Flashcard Stage */}
      <div
        className="w-full h-[400px] sm:h-[420px] perspective-1000 cursor-pointer select-none"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white dark:bg-[#0F172A] border-2 border-[#E9D5FF] dark:border-[#581C87] shadow-xl shadow-purple-900/5 p-7 flex flex-col justify-between">
            {/* Header: Category & Tone Indicator (Quiet text) */}
            <div className="flex items-center justify-between text-xs text-[#64748B] dark:text-[#94A3B8]">
              <span className="font-burmese font-medium">{currentWord.partOfSpeech}</span>
              <span className="text-[11px] font-semibold text-[#6D28D9] dark:text-[#C084FC]">
                ကတ်ပြားကို နှိပ်ပါ (Tap to Flip)
              </span>
            </div>

            {/* Prompt Center Content */}
            <div className="text-center my-auto py-4">
              {promptInBurmese ? (
                <>
                  <div className="text-xs uppercase tracking-wider text-[#6D28D9] dark:text-[#C084FC] font-semibold mb-2">
                    မြန်မာအဓိပ္ပာယ်
                  </div>
                  <h2 className="font-burmese font-bold text-3xl sm:text-4xl text-[#0F172A] dark:text-white leading-relaxed mb-3">
                    {currentWord.burmese}
                  </h2>
                  <div className="font-burmese text-sm text-[#64748B] dark:text-[#94A3B8]">
                    အသံထွက်အနီးစပ်ဆုံး: <span className="font-bold text-[#6D28D9] dark:text-[#C084FC]">{currentWord.burmesePhonetic}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs uppercase tracking-wider text-[#6D28D9] dark:text-[#C084FC] font-semibold mb-2">
                    ထိုင်းစာလုံး
                  </div>
                  <h2 className="font-thai font-extrabold text-4xl sm:text-5xl text-[#0F172A] dark:text-white tracking-wide mb-3">
                    {currentWord.thai}
                  </h2>
                  <div className="font-phonetic text-base font-bold text-[#6D28D9] dark:text-[#C084FC]">
                    {currentWord.phonetic}
                  </div>
                </>
              )}
            </div>

            {/* Bottom: Quick sound & Flip hint */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] dark:border-[#1E293B]">
              <button
                onClick={handlePlayAudio}
                className={`p-3 rounded-2xl bg-[#FAF5FF] dark:bg-[#3B0764] text-[#6D28D9] dark:text-[#E9D5FF] hover:bg-[#F3E8FF] transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold ${
                  isPlayingAudio ? 'ring-2 ring-[#FED01B] scale-105' : ''
                }`}
                title="Listen to Thai pronunciation"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-[#EAB308]' : ''}`} />
                <span>အသံနားထောင်မည်</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                <RotateCw className="w-3.5 h-3.5" />
                <span>လှန်ကြည့်ရန်</span>
              </div>
            </div>
          </div>

          {/* BACK FACE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-white dark:bg-[#0F172A] border-2 border-[#E9D5FF] dark:border-[#581C87] shadow-xl shadow-purple-900/5 p-7 flex flex-col justify-between">
            {/* Header: Tone Classification Badge & Star */}
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${toneInfo.color}`}>
                {toneInfo.thaiLabel} · {toneInfo.burmeseLabel}
              </span>
              <span className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8]">
                {toneInfo.pitch}
              </span>
            </div>

            {/* Revealed Answer Center Content */}
            <div className="text-center my-auto py-2">
              <h2 className="font-thai font-extrabold text-4xl sm:text-5xl text-[#0F172A] dark:text-white tracking-wide mb-2 leading-tight">
                {currentWord.thai}
              </h2>
              
              <div className="font-phonetic font-bold text-lg text-[#6D28D9] dark:text-[#C084FC] mb-2">
                {currentWord.phonetic}
              </div>

              <div className="font-burmese font-bold text-xl text-[#0F172A] dark:text-white mb-2">
                {currentWord.burmese}
              </div>

              <div className="font-burmese text-xs text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto">
                အသံထွက်: <span className="text-[#0F172A] dark:text-white font-semibold">{currentWord.burmesePhonetic}</span>
                {currentWord.notes && (
                  <span className="block mt-1 text-[#6D28D9] dark:text-[#C084FC]">
                    💡 {currentWord.notes}
                  </span>
                )}
              </div>
            </div>

            {/* Example sentence drawer on the card back */}
            <div className="bg-[#FAF5FF] dark:bg-[#1E1B4B]/40 rounded-2xl p-3 border border-purple-100 dark:border-purple-900/40 text-left">
              <div className="text-[11px] font-semibold text-[#6D28D9] dark:text-[#C084FC] uppercase tracking-wider mb-1">
                ဥပမာ ဝါကျ (Example)
              </div>
              <div className="font-thai text-sm text-[#0F172A] dark:text-white font-medium">
                {currentWord.exampleThai}
              </div>
              <div className="font-burmese text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                {currentWord.exampleBurmese}
              </div>
            </div>

            {/* Audio playback on Back */}
            <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] dark:border-[#1E293B]">
              <button
                onClick={handlePlayAudio}
                className="p-2.5 rounded-xl bg-[#4A1272] text-[#FED01B] hover:bg-[#3B0764] transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold shadow-sm"
              >
                <Volume2 className="w-4 h-4" />
                <span>အသံထွက် နားထောင်ပါ</span>
              </button>

              <span className="text-xs text-[#94A3B8]">
                Space ခလုတ်ဖြင့် လှန်နိုင်ပါသည်
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Bottom Navigation Controls */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={handlePrev}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-[#334155] dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all cursor-pointer active:scale-95"
          title="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-[#9333EA] text-white hover:bg-[#7E22CE] font-bold text-sm tracking-wide shadow-md shadow-purple-900/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 focus:ring-2 focus:ring-[#FED01B]"
        >
          <RotateCw className="w-4 h-4" />
          <span>{isFlipped ? 'အရှေ့မျက်နှာသို့ (Show Front)' : 'အဖြေကြည့်မည် (Flip Answer)'}</span>
        </button>

        <button
          onClick={handleNext}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] text-[#334155] dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all cursor-pointer active:scale-95"
          title="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { VocabularyItem } from '../types/vocabulary';
import { audioService } from '../utils/audio';
import { TONE_DETAILS } from '../data/vocabularyData';
import { 
  Volume2, 
  X, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  Snail
} from 'lucide-react';

interface WordDetailModalProps {
  word: VocabularyItem | null;
  isOpen: boolean;
  onClose: () => void;
  isStarred: boolean;
  isMastered: boolean;
  onToggleStar: (id: number) => void;
  onToggleMaster: (id: number) => void;
  audioSpeed: number;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  word,
  isOpen,
  onClose,
  isStarred,
  isMastered,
  onToggleStar,
  onToggleMaster,
  audioSpeed,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingExample, setPlayingExample] = useState(false);

  if (!isOpen || !word) return null;

  const toneInfo = TONE_DETAILS[word.tone] || TONE_DETAILS["Mid Tone"];

  const handlePlayWord = (rate: number = audioSpeed) => {
    setIsPlaying(true);
    audioService.speak(
      word.thai,
      rate,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const handlePlayExample = () => {
    if (!word.exampleThai) return;
    setPlayingExample(true);
    audioService.speak(
      word.exampleThai,
      0.8,
      () => setPlayingExample(true),
      () => setPlayingExample(false),
      () => setPlayingExample(false)
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-3xl border border-purple-200 dark:border-purple-900/40 shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Tone Badge + Close */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${toneInfo.color}`}>
              {word.tone} {word.toneMyanmar ? `· ${word.toneMyanmar}` : ''}
            </span>
            <span className="font-mono text-xs text-[#64748B]">
              {toneInfo.pitch}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleStar(word.id)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#64748B] transition-colors cursor-pointer"
              title="Favorite"
            >
              <Star className={`w-5 h-5 ${isStarred ? 'fill-[#EAB308] text-[#EAB308]' : ''}`} />
            </button>
            <button
              onClick={() => onToggleMaster(word.id)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Mark as Mastered"
            >
              <CheckCircle2 className={`w-5 h-5 ${isMastered ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-[#64748B] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Big Thai Display */}
        <div className="text-center py-4 bg-gradient-to-b from-[#FAF5FF] to-white dark:from-[#3B0764]/20 dark:to-transparent rounded-2xl border border-purple-100 dark:border-purple-900/20 mb-6">
          <h2 lang="th" className="font-thai font-extrabold text-5xl sm:text-6xl text-[#0F172A] dark:text-white tracking-wide mb-2 leading-tight">
            {word.thai}
          </h2>
          <div lang="en" className="font-phonetic font-bold text-lg text-[#6D28D9] dark:text-[#C084FC]">
            {word.phonetic}
          </div>
          <div lang="my" className="font-burmese font-bold text-2xl text-[#0F172A] dark:text-white mt-2">
            {word.meaning}
          </div>
          <div lang="my" className="font-burmese text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
            မြန်မာအသံထွက်: <span className="font-semibold text-[#6D28D9] dark:text-[#C084FC]">{word.myanmarReading}</span>
          </div>
        </div>

        {/* Audio Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => handlePlayWord(1.0)}
            className={`py-3 px-4 rounded-2xl bg-[#4A1272] text-[#FED01B] hover:bg-[#3B0764] flex items-center justify-center gap-2 font-bold text-xs shadow-md transition-all cursor-pointer ${
              isPlaying ? 'ring-2 ring-[#FED01B]' : ''
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span lang="my" className="font-burmese">ပုံမှန်အသံထွက် (1.0x)</span>
          </button>

          <button
            onClick={() => handlePlayWord(0.7)}
            className="py-3 px-4 rounded-2xl bg-[#FAF5FF] dark:bg-[#1E1B4B] text-[#6D28D9] dark:text-[#E9D5FF] border border-purple-200 dark:border-purple-800 hover:bg-[#F3E8FF] flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer"
          >
            <Snail className="w-4 h-4 text-[#9333EA]" />
            <span lang="my" className="font-burmese">ဖြည်းဖြည်းနားထောင် (0.7x)</span>
          </button>
        </div>

        {/* Example Sentence Section (if available) */}
        {word.exampleThai && (
          <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/50 border border-[#E2E8F0] dark:border-[#1E293B] mb-4">
            <div className="flex items-center justify-between mb-2">
              <span lang="my" className="text-[11px] font-bold text-[#6D28D9] dark:text-[#C084FC] uppercase tracking-wider flex items-center gap-1.5 font-burmese">
                <BookOpen className="w-3.5 h-3.5" />
                <span>ဥပမာ ဝါကျ (Example Sentence)</span>
              </span>
              <button
                onClick={handlePlayExample}
                className={`p-1.5 rounded-lg text-[#6D28D9] hover:bg-purple-100 dark:hover:bg-purple-900/40 cursor-pointer ${
                  playingExample ? 'animate-bounce text-[#EAB308]' : ''
                }`}
                title="Play example sentence"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div lang="th" className="font-thai font-medium text-base text-[#0F172A] dark:text-white leading-relaxed">
              {word.exampleThai}
            </div>
            {word.examplePhonetic && (
              <div lang="en" className="font-phonetic text-xs text-[#64748B] dark:text-[#94A3B8] my-1">
                {word.examplePhonetic}
              </div>
            )}
            {word.exampleMyanmar && (
              <div lang="my" className="font-burmese text-xs text-[#334155] dark:text-[#CBD5E1] pt-1 border-t border-slate-200 dark:border-slate-800">
                {word.exampleMyanmar}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

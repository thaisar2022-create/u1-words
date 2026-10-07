import React, { useState } from 'react';
import { VocabularyWord } from '../types/vocabulary';
import { audioService } from '../utils/audio';
import { TONE_DETAILS } from '../data/vocabularyData';
import { Volume2, Star, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

interface WordCardProps {
  word: VocabularyWord;
  isStarred: boolean;
  isMastered: boolean;
  onToggleStar: (id: string) => void;
  onToggleMaster: (id: string) => void;
  onSelectWord: (word: VocabularyWord) => void;
  audioSpeed: number;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  isStarred,
  isMastered,
  onToggleStar,
  onToggleMaster,
  onSelectWord,
  audioSpeed,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const toneInfo = TONE_DETAILS[word.tone] || TONE_DETAILS.mid;

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    audioService.speak(
      word.thai,
      audioSpeed,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      () => setIsPlaying(false)
    );
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStar(word.id);
  };

  const handleMasterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMaster(word.id);
  };

  return (
    <div
      onClick={() => onSelectWord(word)}
      className="group relative rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] p-4 sm:p-5 hover:border-[#E9D5FF] dark:hover:border-[#581C87] hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Card Header: Metadata + Action Cluster */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${toneInfo.color}`}>
              {toneInfo.thaiLabel} · {word.toneNameBurmese}
            </span>
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-burmese">
              {word.partOfSpeech}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Button with High-Hit Circular Target */}
            <button
              onClick={handleAudioClick}
              title="အသံထွက် နားထောင်ရန် (Listen)"
              className={`w-9 h-9 rounded-full bg-[#FAF5FF] dark:bg-[#3B0764] text-[#6D28D9] dark:text-[#E9D5FF] hover:bg-[#F3E8FF] dark:hover:bg-[#4A1272] flex items-center justify-center transition-all cursor-pointer ${
                isPlaying ? 'ring-2 ring-[#FED01B] scale-105' : ''
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-[#EAB308]' : ''}`} />
            </button>

            {/* Star Toggle */}
            <button
              onClick={handleStarClick}
              title="သိမ်းဆည်းထားမည် (Favorite)"
              className="w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] transition-colors cursor-pointer"
            >
              <Star className={`w-4 h-4 ${isStarred ? 'fill-[#EAB308] text-[#EAB308]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Block: Thai Headword + Phonetic */}
        <div className="mb-3">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-thai font-extrabold text-2xl sm:text-3xl text-[#0F172A] dark:text-white tracking-wide group-hover:text-[#6D28D9] dark:group-hover:text-[#C084FC] transition-colors">
              {word.thai}
            </h3>
          </div>
          <div className="font-phonetic font-bold text-sm text-[#6D28D9] dark:text-[#C084FC] mt-0.5">
            {word.phonetic}
          </div>
        </div>
      </div>

      {/* Footer Section: Separated by a thin hairline, Burmese translation */}
      <div className="pt-3 border-t border-[#F1F5F9] dark:border-[#1E293B]">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-burmese font-bold text-base text-[#0F172A] dark:text-white">
              {word.burmese}
            </div>
            <div className="font-burmese text-xs text-[#64748B] dark:text-[#94A3B8]">
              {word.burmesePhonetic}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleMasterClick}
              title={isMastered ? 'ကျက်ပြီးသား (Mastered)' : 'ကျက်ပြီးကြောင်း မှတ်သားမည်'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isMastered ? 'text-emerald-600' : 'text-slate-300 dark:text-slate-700 hover:text-emerald-600'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'fill-emerald-600 text-white' : ''}`} />
            </button>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-[#9333EA] transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

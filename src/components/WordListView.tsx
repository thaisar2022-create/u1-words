import React, { useState } from 'react';
import { VocabularyWord, ThaiTone } from '../types/vocabulary';
import { WordCard } from './WordCard';
import { audioService } from '../utils/audio';
import { TONE_DETAILS, CATEGORIES } from '../data/vocabularyData';
import { 
  LayoutGrid, 
  List, 
  Star, 
  CheckCircle2, 
  Volume2, 
  Sparkles,
  SlidersHorizontal,
  Search,
  X
} from 'lucide-react';

interface WordListViewProps {
  words: VocabularyWord[];
  starredIds: string[];
  masteredIds: string[];
  onToggleStar: (id: string) => void;
  onToggleMaster: (id: string) => void;
  onSelectWord: (word: VocabularyWord) => void;
  audioSpeed: number;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const WordListView: React.FC<WordListViewProps> = ({
  words,
  starredIds,
  masteredIds,
  onToggleStar,
  onToggleMaster,
  onSelectWord,
  audioSpeed,
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
}) => {
  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'starred' | 'mastered'>('all');
  const [toneFilter, setToneFilter] = useState<ThaiTone | 'all'>('all');
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  // Apply secondary filters
  const filteredWords = words.filter((word) => {
    if (statusFilter === 'starred' && !starredIds.includes(word.id)) return false;
    if (statusFilter === 'mastered' && !masteredIds.includes(word.id)) return false;
    if (toneFilter !== 'all' && word.tone !== toneFilter) return false;
    return true;
  });

  const handlePlayRowAudio = (word: VocabularyWord, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAudioId(word.id);
    audioService.speak(
      word.thai,
      audioSpeed,
      () => setActiveAudioId(word.id),
      () => setActiveAudioId(null),
      () => setActiveAudioId(null)
    );
  };

  return (
    <div>
      {/* Controls Bar: Filter tabs + View Mode toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
        {/* Sub-filters: Status (All / Starred / Mastered) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] dark:bg-[#1E293B] rounded-xl text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-white shadow-sm font-semibold'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              အားလုံး ({words.length})
            </button>
            <button
              onClick={() => setStatusFilter('starred')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                statusFilter === 'starred'
                  ? 'bg-white dark:bg-[#0F172A] text-[#EAB308] shadow-sm font-semibold'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
              <span>မှတ်သားထား ({words.filter((w) => starredIds.includes(w.id)).length})</span>
            </button>
            <button
              onClick={() => setStatusFilter('mastered')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                statusFilter === 'mastered'
                  ? 'bg-white dark:bg-[#0F172A] text-emerald-600 shadow-sm font-semibold'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>ကျက်ပြီး ({words.filter((w) => masteredIds.includes(w.id)).length})</span>
            </button>
          </div>

          {/* Category Filter dropdown */}
          {onSelectCategory && (
            <div className="flex items-center gap-1">
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="text-xs bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] px-3 py-1.5 rounded-xl border-none focus:ring-1 focus:ring-[#9333EA] font-burmese cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tone Filter dropdown */}
          <div className="flex items-center gap-1">
            <select
              value={toneFilter}
              onChange={(e) => setToneFilter(e.target.value as any)}
              className="text-xs bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] px-3 py-1.5 rounded-xl border-none focus:ring-1 focus:ring-[#9333EA] font-burmese cursor-pointer"
            >
              <option value="all">အသံ ၅ သံ အားလုံး (All Tones)</option>
              <option value="mid">သာမန်သံ (Mid Tone)</option>
              <option value="low">အနိမ့်သံ (Low Tone)</option>
              <option value="falling">သက်သံ (Falling Tone)</option>
              <option value="high">အမြင့်သံ (High Tone)</option>
              <option value="rising">တက်သံ (Rising Tone)</option>
            </select>
          </div>

          {/* Search Box */}
          {onSearchChange && (
            <div className="relative min-w-[160px] sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ရှာဖွေရန် / Search..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#F1F5F9] dark:bg-[#1E293B] text-xs text-[#0F172A] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#9333EA] border-none font-burmese"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* View Mode Toggle: Grid vs Compact List */}
        <div className="flex items-center gap-1 self-end sm:self-auto p-1 bg-[#F1F5F9] dark:bg-[#1E293B] rounded-xl">
          <button
            onClick={() => setLayoutMode('grid')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              layoutMode === 'grid'
                ? 'bg-white dark:bg-[#0F172A] text-[#4A1272] dark:text-[#E9D5FF] shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Card Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLayoutMode('compact')}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              layoutMode === 'compact'
                ? 'bg-white dark:bg-[#0F172A] text-[#4A1272] dark:text-[#E9D5FF] shadow-sm'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
            title="Compact Table List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] p-8">
          <Sparkles className="w-10 h-10 text-[#FED01B] mx-auto mb-3" />
          <h4 className="font-bold text-base text-[#0F172A] dark:text-white">ရလဒ် မတွေ့ပါ</h4>
          <p className="text-xs text-[#64748B] mt-1 font-burmese">
            ရွေးချယ်ထားသော စစ်ထုတ်မှုများနှင့် ကိုက်ညီသည့် ဝေါဟာရ မရှိပါ။
          </p>
        </div>
      ) : layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              isStarred={starredIds.includes(word.id)}
              isMastered={masteredIds.includes(word.id)}
              onToggleStar={onToggleStar}
              onToggleMaster={onToggleMaster}
              onSelectWord={onSelectWord}
              audioSpeed={audioSpeed}
            />
          ))}
        </div>
      ) : (
        /* Compact List View */
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] overflow-hidden divide-y divide-[#F1F5F9] dark:divide-[#1E293B]">
          {filteredWords.map((word) => {
            const toneInfo = TONE_DETAILS[word.tone] || TONE_DETAILS.mid;
            const isStarred = starredIds.includes(word.id);
            const isMastered = masteredIds.includes(word.id);
            const isSpeaking = activeAudioId === word.id;

            return (
              <div
                key={word.id}
                onClick={() => onSelectWord(word)}
                className="p-4 hover:bg-[#FAF5FF] dark:hover:bg-[#1E1B4B]/30 transition-colors flex items-center justify-between gap-4 cursor-pointer"
              >
                {/* Left: Audio + Thai + Phonetic */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    onClick={(e) => handlePlayRowAudio(word, e)}
                    className={`w-9 h-9 rounded-full shrink-0 bg-[#FAF5FF] dark:bg-[#3B0764] text-[#6D28D9] dark:text-[#E9D5FF] hover:bg-[#F3E8FF] flex items-center justify-center transition-all cursor-pointer ${
                      isSpeaking ? 'ring-2 ring-[#FED01B] scale-105' : ''
                    }`}
                    title="Play Thai audio"
                  >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-[#EAB308] animate-pulse' : ''}`} />
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-thai font-bold text-lg text-[#0F172A] dark:text-white truncate">
                        {word.thai}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border shrink-0 ${toneInfo.color}`}>
                        {toneInfo.thaiLabel}
                      </span>
                    </div>
                    <div className="font-phonetic text-xs font-semibold text-[#6D28D9] dark:text-[#C084FC]">
                      {word.phonetic}
                    </div>
                  </div>
                </div>

                {/* Right: Burmese Translation + Star & Check actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="font-burmese font-bold text-sm text-[#0F172A] dark:text-white">
                      {word.burmese}
                    </div>
                    <div className="font-burmese text-[11px] text-[#64748B]">
                      {word.burmesePhonetic}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStar(word.id);
                    }}
                    className="p-1 text-[#64748B] hover:text-[#EAB308] cursor-pointer"
                  >
                    <Star className={`w-4 h-4 ${isStarred ? 'fill-[#EAB308] text-[#EAB308]' : ''}`} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMaster(word.id);
                    }}
                    className={`p-1 transition-colors cursor-pointer ${
                      isMastered ? 'text-emerald-600' : 'text-slate-300 dark:text-slate-700 hover:text-emerald-600'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'fill-emerald-600 text-white' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

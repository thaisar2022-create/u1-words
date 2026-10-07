import React from 'react';
import { ViewMode } from '../types/vocabulary';
import { RoyalEmblem } from './RoyalEmblem';
import { Moon, Sun, Flame, Volume2 } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  streakDays: number;
  audioSpeed: number;
  onToggleAudioSpeed: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  isDark,
  onToggleTheme,
  streakDays,
  audioSpeed,
  onToggleAudioSpeed,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectView('grid')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          aria-label="Go to home"
        >
          <RoyalEmblem size={38} />
          <div className="flex flex-col">
            <span className="font-thai font-extrabold text-base tracking-tight text-[#2F0050] dark:text-[#E9D5FF] group-hover:text-[#6D28D9] transition-colors leading-tight">
              Royal Marigold
            </span>
            <span className="font-burmese text-[11px] text-[#64748B] dark:text-[#94A3B8] leading-tight">
              ထိုင်းစာ ဝေါဟာရ
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Link */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569] dark:text-[#94A3B8]">
          <button
            onClick={() => onSelectView('grid')}
            className={`cursor-pointer whitespace-nowrap transition-colors py-1 border-b-2 ${
              currentView === 'grid' || currentView === 'compact'
                ? 'border-[#9333EA] text-[#2F0050] dark:text-white font-semibold'
                : 'border-transparent hover:text-[#0F172A] dark:hover:text-white'
            }`}
          >
            Dictionary
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Audio Speed Pill */}
          <button
            onClick={onToggleAudioSpeed}
            title={`Voice Speed: ${audioSpeed}x (Click to switch)`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#6D28D9] dark:text-[#C084FC]" />
            <span className="font-mono">{audioSpeed}x</span>
          </button>

          {/* Streak Flame */}
          <div
            title={`Daily Streak: ${streakDays} days!`}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FEF9C3] dark:bg-amber-950/40 text-[#854D0E] dark:text-[#FDE047] border border-[#FDE047]/50"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="font-mono">{streakDays}d</span>
          </div>

          {/* Dark Mode Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4A1272]" />}
          </button>
        </div>
      </div>
    </header>
  );
};

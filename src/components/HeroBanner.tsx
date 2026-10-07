import React from 'react';
import { Sparkles, BookOpen, Star, CheckCircle2 } from 'lucide-react';
import { RoyalEmblem } from './RoyalEmblem';

interface HeroBannerProps {
  totalWords: number;
  starredCount: number;
  masteredCount: number;
  onOpenToneGuide: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalWords,
  starredCount,
  masteredCount,
  onOpenToneGuide,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2F0050] via-[#4A1272] to-[#3B0764] text-white shadow-xl shadow-purple-950/20 mb-8 border border-purple-500/20">
      {/* Background script watermark decorations */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none select-none opacity-[0.06] flex flex-wrap gap-8 p-6 text-6xl font-bold font-thai overflow-hidden"
      >
        <span>สวัสดี</span>
        <span>ကျေးဇူး</span>
        <span>ขอบคุณ</span>
        <span>မင်္ဂလာပါ</span>
        <span>อร่อย</span>
        <span>ခရီးသွား</span>
        <span>ไปไหน</span>
        <span>ဈေးဝယ်</span>
        <span>ทำงาน</span>
        <span>အလုပ်</span>
        <span>ช่วยด้วย</span>
        <span>ဆေးရုံ</span>
      </div>

      <div className="relative z-10 px-6 sm:px-8 py-7">
        {/* Top Section: Emblem + Title + Quick Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <RoyalEmblem size={74} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#FED01B]">
                  Myanmar to Thai Language Mastery
                </span>
                <span className="text-purple-300">·</span>
                <button
                  onClick={onOpenToneGuide}
                  className="text-xs text-purple-200 hover:text-white underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-[#FED01B]" />
                  <span>အသံ ၅ သံ လမ်းညွှန်</span>
                </button>
              </div>
              <h1 className="font-thai font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-baseline gap-2">
                <span>ထိုင်းစကားပြောနှင့် ဝေါဟာရ</span>
                <span className="font-burmese text-base font-normal text-purple-200">
                  (Thai-Myanmar System)
                </span>
              </h1>
              <p className="font-burmese text-xs sm:text-sm text-purple-200/90 mt-1 max-w-xl">
                ထိုင်းစာလုံး၊ တိကျသောအသံထွက်၊ အသံအတက်အကျ (၅ သံ) နှင့် မြန်မာပြန်ဆိုချက်များကို အသံဖိုင်ဖြင့် စနစ်တကျ လေ့လာပါ။
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-200 text-xs mb-0.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>ဝေါဟာရ</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
                {totalWords}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-200 text-xs mb-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>ကျက်ပြီး</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-emerald-300">
                {masteredCount}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-200 text-xs mb-0.5">
                <Star className="w-3.5 h-3.5 text-[#FED01B] fill-[#FED01B]" />
                <span>မှတ်သား</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#FED01B]">
                {starredCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

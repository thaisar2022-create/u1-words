import React, { useState } from 'react';
import { TONE_DETAILS, TONE_CONSONANT_RULES } from '../data/vocabularyData';
import { audioService } from '../utils/audio';
import { Volume2, X, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

interface ToneGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioSpeed: number;
}

export const ToneGuideModal: React.FC<ToneGuideModalProps> = ({
  isOpen,
  onClose,
  audioSpeed,
}) => {
  const [activeTab, setActiveTab] = useState<'tones' | 'consonants'>('tones');
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const toneExamples = [
    { toneKey: 'mid', thai: 'กา', phonetic: 'gaa', burmese: 'ကာ (သာမန်)', burmeseSound: 'ကာ' },
    { toneKey: 'low', thai: 'ก่า', phonetic: 'gàa', burmese: 'ကှာ (အောက်မြစ် အနိမ့်သံ)', burmeseSound: 'ကှာ' },
    { toneKey: 'falling', thai: 'ก้า', phonetic: 'gâa', burmese: 'ကား (သက်သံ အမြင့်မှစိုက်ဆင်း)', burmeseSound: 'ကား' },
    { toneKey: 'high', thai: 'ก๊า', phonetic: 'gáa', burmese: 'ကှား (အမြင့်သံ ဝစ္စပေါက်)', burmeseSound: 'ကှား' },
    { toneKey: 'rising', thai: 'ก๋า', phonetic: 'gǎa', burmese: 'ကာ (တက်သံ မေးခွန်းသံ)', burmeseSound: 'ကာ' },
  ];

  const handlePlaySample = (text: string, key: string) => {
    setPlayingKey(key);
    audioService.speak(
      text,
      audioSpeed,
      () => setPlayingKey(key),
      () => setPlayingKey(null),
      () => setPlayingKey(null)
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#0F172A] rounded-3xl border border-purple-200 dark:border-purple-900/40 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2F0050] to-[#4A1272] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-[#FED01B]" />
            </div>
            <div>
              <h2 className="font-burmese font-bold text-lg sm:text-xl leading-tight">
                ထိုင်းဘာသာ အသံ ၅ သံနှင့် ဗျည်းအုပ်စု လမ်းညွှန်
              </h2>
              <p className="text-xs text-purple-200 mt-0.5">
                Thai Tonal System & Consonant Classes for Myanmar Learners
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-[#E2E8F0] dark:border-[#1E293B] px-6 pt-3 bg-slate-50 dark:bg-[#1E293B]/40">
          <button
            onClick={() => setActiveTab('tones')}
            className={`py-3 px-4 font-burmese text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'tones'
                ? 'border-[#9333EA] text-[#4A1272] dark:text-[#E9D5FF]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            အသံ ၅ သံ သဘောတရား (5 Tones)
          </button>
          <button
            onClick={() => setActiveTab('consonants')}
            className={`py-3 px-4 font-burmese text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'consonants'
                ? 'border-[#9333EA] text-[#4A1272] dark:text-[#E9D5FF]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            ဗျည်း ၃ အုပ်စု ခွဲခြားပုံ (Consonant Classes)
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'tones' ? (
            <>
              {/* Introduction Callout */}
              <div className="p-4 rounded-2xl bg-[#FAF5FF] dark:bg-[#3B0764]/30 border border-purple-200 dark:border-purple-800/40 text-xs text-[#334155] dark:text-[#CBD5E1] font-burmese leading-relaxed">
                <span className="font-bold text-[#4A1272] dark:text-[#E9D5FF]">မှတ်ချက်:</span> ထိုင်းဘာသာစကားတွင် စာလုံးတစ်လုံးတည်းဖြစ်သော်လည်း အသံအတက်အကျ (၅ သံ) ကွဲပြားသည်နှင့် အဓိပ္ပာယ်လုံးဝ ပြောင်းလဲသွားပါသည်။ မြန်မာစကားရှိ သာမန်သံ၊ အောက်မြစ်သံ၊ ဝစ္စပေါက်သံများနှင့် နှိုင်းယှဉ်၍ လေ့လာနိုင်ပါသည်။
              </div>

              {/* Interactive Audio Tone Drill Table */}
              <div>
                <h4 className="font-burmese font-bold text-sm text-[#0F172A] dark:text-white mb-3 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#9333EA]" />
                  <span>အသံ ၅ သံ နှိုင်းယှဉ်ချက် (ကာ ကှာ ကား ကှား ကာ) လက်တွေ့ရွတ်ဆိုသံ</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                  {toneExamples.map((item) => {
                    const isPlaying = playingKey === item.toneKey;
                    const toneMeta = TONE_DETAILS[item.toneKey];
                    return (
                      <div
                        key={item.toneKey}
                        onClick={() => handlePlaySample(item.thai, item.toneKey)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer text-center flex flex-col justify-between ${
                          isPlaying
                            ? 'ring-2 ring-[#FED01B] bg-[#FEF9C3] dark:bg-amber-950/40'
                            : 'bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B] hover:border-purple-300'
                        }`}
                      >
                        <div className="text-[11px] font-semibold text-[#64748B] mb-1 font-burmese">
                          {toneMeta.thaiLabel}
                        </div>
                        <div className="font-thai font-extrabold text-3xl text-[#0F172A] dark:text-white my-1">
                          {item.thai}
                        </div>
                        <div className="font-phonetic font-bold text-xs text-[#6D28D9] dark:text-[#C084FC]">
                          {item.phonetic}
                        </div>
                        <div className="font-burmese text-[11px] text-[#475569] dark:text-[#94A3B8] mt-1">
                          {item.burmeseSound}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center text-[#9333EA]">
                          <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-[#EAB308]' : ''}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Tone Descriptions */}
              <div className="space-y-3">
                {Object.entries(TONE_DETAILS).map(([key, detail]) => (
                  <div
                    key={key}
                    className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${detail.color}`}>
                          {detail.thaiLabel} · {detail.label}
                        </span>
                        <span className="font-mono text-xs text-[#64748B]">
                          {detail.pitch}
                        </span>
                      </div>
                      <div className="font-burmese font-bold text-sm text-[#0F172A] dark:text-white">
                        {detail.burmeseLabel}
                      </div>
                      <p className="font-burmese text-xs text-[#64748B] dark:text-[#94A3B8] max-w-xl">
                        {detail.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => handlePlaySample(key === 'mid' ? 'มา' : key === 'low' ? 'หม่า' : key === 'falling' ? 'ม่า' : key === 'high' ? 'ม้า' : 'หมา', key)}
                      className="shrink-0 p-2.5 rounded-xl bg-[#FAF5FF] dark:bg-[#3B0764] text-[#6D28D9] dark:text-[#E9D5FF] hover:bg-[#F3E8FF] flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>စမ်းသပ်နားထောင်</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* CONSONANTS TAB */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF5FF] dark:bg-[#3B0764]/30 border border-purple-200 dark:border-purple-800/40 text-xs text-[#334155] dark:text-[#CBD5E1] font-burmese leading-relaxed">
                ထိုင်းဗျည်း ၄၄ လုံးကို ၎င်းတို့၏ မူလအသံထွက်ပေါ်မူတည်၍ အုပ်စု ၃ စု ခွဲခြားထားပါသည်။ ဤအုပ်စု ၃ စုကို သိရှိမှသာ အသံ ၅ သံ မည်သို့ ပြောင်းလဲရွတ်ဆိုရမည်ကို တိကျစွာ သတ်မှတ်နိုင်ပါသည်။
              </div>

              {TONE_CONSONANT_RULES.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-burmese font-bold text-base text-[#0F172A] dark:text-white">
                      {rule.class}
                    </h4>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-[#F1F5F9] dark:bg-[#1E293B] text-[#6D28D9] dark:text-[#C084FC]">
                      {rule.count}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-3 font-thai font-bold text-lg text-[#0F172A] dark:text-white tracking-widest leading-loose">
                    {rule.thaiSymbols}
                  </div>

                  <p className="font-burmese text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    {rule.ruleDesc}
                  </p>

                  <div className="mt-2 text-[11px] text-[#64748B] font-burmese">
                    မှတ်မိရန် အလွယ်နည်း: <span className="text-[#9333EA] font-semibold">{rule.mnemonic}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#1E293B]/60 border-t border-[#E2E8F0] dark:border-[#1E293B] text-right">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-[#4A1272] text-[#FED01B] hover:bg-[#3B0764] font-bold text-xs cursor-pointer transition-colors"
          >
            ပိတ်မည် (Close)
          </button>
        </div>
      </div>
    </div>
  );
};

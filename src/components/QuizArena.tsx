import React, { useState, useEffect } from 'react';
import { VocabularyWord, ThaiTone } from '../types/vocabulary';
import { audioService } from '../utils/audio';
import { TONE_DETAILS } from '../data/vocabularyData';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  ArrowRight,
  HelpCircle,
  Headphones
} from 'lucide-react';

interface QuizArenaProps {
  words: VocabularyWord[];
  audioSpeed: number;
  onUpdateHighScore: (score: number) => void;
  onReturnToStudy: () => void;
}

type QuizType = 'thai-to-burmese' | 'burmese-to-thai' | 'listening' | 'tone';

interface Question {
  type: QuizType;
  targetWord: VocabularyWord;
  promptText: string;
  subPrompt?: string;
  options: { label: string; subLabel?: string; isCorrect: boolean }[];
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  words,
  audioSpeed,
  onUpdateHighScore,
  onReturnToStudy,
}) => {
  const [quizType, setQuizType] = useState<QuizType>('thai-to-burmese');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Generate 10 randomized quiz questions
  const generateQuiz = (type: QuizType) => {
    if (words.length < 4) return;
    const shuffledPool = [...words].sort(() => 0.5 - Math.random());
    const selectedBatch = shuffledPool.slice(0, Math.min(10, shuffledPool.length));

    const generated: Question[] = selectedBatch.map((targetWord) => {
      // Pick 3 distractors
      const distractors = words
        .filter((w) => w.id !== targetWord.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      if (type === 'thai-to-burmese') {
        const options = [
          { label: targetWord.burmese, subLabel: targetWord.burmesePhonetic, isCorrect: true },
          ...distractors.map((d) => ({
            label: d.burmese,
            subLabel: d.burmesePhonetic,
            isCorrect: false,
          })),
        ].sort(() => 0.5 - Math.random());

        return {
          type,
          targetWord,
          promptText: targetWord.thai,
          subPrompt: targetWord.phonetic,
          options,
        };
      } else if (type === 'burmese-to-thai') {
        const options = [
          { label: targetWord.thai, subLabel: targetWord.phonetic, isCorrect: true },
          ...distractors.map((d) => ({
            label: d.thai,
            subLabel: d.phonetic,
            isCorrect: false,
          })),
        ].sort(() => 0.5 - Math.random());

        return {
          type,
          targetWord,
          promptText: targetWord.burmese,
          subPrompt: `အသံထွက်: ${targetWord.burmesePhonetic}`,
          options,
        };
      } else if (type === 'listening') {
        const options = [
          { label: targetWord.thai, subLabel: `${targetWord.burmese} (${targetWord.phonetic})`, isCorrect: true },
          ...distractors.map((d) => ({
            label: d.thai,
            subLabel: `${d.burmese} (${d.phonetic})`,
            isCorrect: false,
          })),
        ].sort(() => 0.5 - Math.random());

        return {
          type,
          targetWord,
          promptText: 'ထိုင်းအသံကို နားထောင်ပါ',
          subPrompt: 'အောက်ပါ စကားလုံးများအနက် အသံနှင့် ကိုက်ညီသော စာလုံးကို ရွေးပါ',
          options,
        };
      } else {
        // Tone identification
        const allTones: ThaiTone[] = ['mid', 'low', 'falling', 'high', 'rising'];
        const options = allTones.map((tone) => {
          const detail = TONE_DETAILS[tone];
          return {
            label: `${detail.thaiLabel} · ${detail.burmeseLabel}`,
            subLabel: detail.pitch,
            isCorrect: tone === targetWord.tone,
          };
        });

        return {
          type,
          targetWord,
          promptText: targetWord.thai,
          subPrompt: `${targetWord.phonetic} (${targetWord.burmese}) - ဤစကားလုံးသည် မည်သည့်အသံဖြစ်သနည်း?`,
          options,
        };
      }
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    generateQuiz(quizType);
  }, [quizType, words]);

  const currentQ = questions[currentIndex];

  // Auto-play audio when a listening question appears
  useEffect(() => {
    if (currentQ && currentQ.type === 'listening' && !isAnswered) {
      handlePlayPromptAudio();
    }
  }, [currentIndex, currentQ]);

  const handlePlayPromptAudio = () => {
    if (!currentQ) return;
    setIsPlayingAudio(true);
    audioService.speak(
      currentQ.targetWord.thai,
      audioSpeed,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedOptionIndex(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Play target word audio
    audioService.speak(currentQ.targetWord.thai, audioSpeed);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      // Finished
      setIsCompleted(true);
      const finalScore = score + (questions[currentIndex].options[selectedOptionIndex ?? -1]?.isCorrect ? 0 : 0);
      onUpdateHighScore(finalScore);
      // Trigger confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A1272', '#FED01B', '#EAB308', '#9333EA', '#FAF5FF'],
      });
    }
  };

  if (!currentQ && !isCompleted) {
    return (
      <div className="text-center py-12">
        <Sparkles className="w-8 h-8 text-[#FED01B] mx-auto mb-2 animate-spin" />
        <p className="text-sm text-[#64748B]">ဉာဏ်စမ်းမေးခွန်းများ ပြင်ဆင်နေပါသည်...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Quiz Mode Selector Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F1F5F9] dark:bg-[#1E293B] rounded-2xl mb-6 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setQuizType('thai-to-burmese')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl font-medium transition-colors cursor-pointer ${
            quizType === 'thai-to-burmese'
              ? 'bg-white dark:bg-[#0F172A] text-[#2F0050] dark:text-[#E9D5FF] font-bold shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          ထိုင်း ➔ မြန်မာ
        </button>
        <button
          onClick={() => setQuizType('burmese-to-thai')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl font-medium transition-colors cursor-pointer ${
            quizType === 'burmese-to-thai'
              ? 'bg-white dark:bg-[#0F172A] text-[#2F0050] dark:text-[#E9D5FF] font-bold shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          မြန်မာ ➔ ထိုင်း
        </button>
        <button
          onClick={() => setQuizType('listening')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 ${
            quizType === 'listening'
              ? 'bg-white dark:bg-[#0F172A] text-[#2F0050] dark:text-[#E9D5FF] font-bold shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>အသံနားထောင်</span>
        </button>
        <button
          onClick={() => setQuizType('tone')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-xl font-medium transition-colors cursor-pointer ${
            quizType === 'tone'
              ? 'bg-white dark:bg-[#0F172A] text-[#2F0050] dark:text-[#E9D5FF] font-bold shadow-sm'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          အသံ ၅ သံ
        </button>
      </div>

      {!isCompleted ? (
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] shadow-xl shadow-purple-950/5 p-6 sm:p-8">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F1F5F9] dark:bg-[#1E293B] text-[#64748B] dark:text-[#94A3B8]">
              မေးခွန်း {currentIndex + 1} / {questions.length}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#EAB308]">
              <Trophy className="w-4 h-4 fill-[#FED01B] text-[#EAB308]" />
              <span className="font-mono">ရမှတ်: {score}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#F1F5F9] dark:bg-[#1E293B] h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-[#9333EA] h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Prompt Box */}
          <div className="text-center py-6 px-4 rounded-2xl bg-[#FAF5FF] dark:bg-[#1E1B4B]/30 border border-purple-100 dark:border-purple-900/30 mb-6">
            {currentQ.type === 'listening' ? (
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={handlePlayPromptAudio}
                  className={`w-16 h-16 rounded-full bg-[#4A1272] text-[#FED01B] hover:bg-[#3B0764] flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                    isPlayingAudio ? 'ring-4 ring-[#FED01B] scale-110' : ''
                  }`}
                  title="Play audio again"
                >
                  <Volume2 className="w-8 h-8" />
                </button>
                <span className="font-burmese text-sm font-bold text-[#0F172A] dark:text-white mt-3">
                  အသံကို နားထောင်ပြီး မှန်ကန်သည့်စာလုံး ရွေးပါ
                </span>
                <span className="text-xs text-[#64748B] mt-0.5">
                  (ပြန်လည်နားထောင်ရန် ခလုတ်ကို နှိပ်ပါ)
                </span>
              </div>
            ) : (
              <>
                <h3 className="font-thai font-extrabold text-3xl sm:text-4xl text-[#0F172A] dark:text-white mb-2">
                  {currentQ.promptText}
                </h3>
                {currentQ.subPrompt && (
                  <p className="font-burmese text-sm text-[#6D28D9] dark:text-[#C084FC] font-semibold">
                    {currentQ.subPrompt}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOptionIndex === idx;
              let style = 'bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B] hover:border-purple-300 dark:hover:border-purple-800 text-[#0F172A] dark:text-white';

              if (isAnswered) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-1 ring-emerald-500';
                } else if (isSelected) {
                  style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-100 ring-1 ring-rose-500';
                } else {
                  style = 'opacity-50 border-[#E2E8F0] dark:border-[#1E293B]';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${style}`}
                >
                  <div>
                    <div className="font-burmese font-bold text-base sm:text-lg">
                      {opt.label}
                    </div>
                    {opt.subLabel && (
                      <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                        {opt.subLabel}
                      </div>
                    )}
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Post-Answer Info & Next Button */}
          {isAnswered && (
            <div className="pt-4 border-t border-[#F1F5F9] dark:border-[#1E293B] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPromptAudio}
                  className="p-2 rounded-xl bg-[#FAF5FF] dark:bg-[#3B0764] text-[#6D28D9] dark:text-[#E9D5FF] hover:bg-[#F3E8FF] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>ပြန်နားထောင်မည်</span>
                </button>
              </div>

              <button
                onClick={handleNextQuestion}
                className="py-3 px-6 rounded-2xl bg-[#9333EA] text-white hover:bg-[#7E22CE] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-purple-900/20 active:scale-95"
              >
                <span>{currentIndex + 1 === questions.length ? 'ရလဒ်ကြည့်မည်' : 'ရှေ့သို့'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* QUIZ COMPLETION SCREEN */
        <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] shadow-xl shadow-purple-950/5 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#FEF9C3] dark:bg-amber-950/50 flex items-center justify-center border-2 border-[#FED01B]">
            <Trophy className="w-10 h-10 text-[#EAB308] fill-[#FED01B]" />
          </div>

          <h3 className="font-burmese font-bold text-2xl text-[#0F172A] dark:text-white mb-2">
            ဂုဏ်ယူပါတယ်! လေ့ကျင့်မှု ပြီးဆုံးပါပြီ
          </h3>
          <p className="font-burmese text-sm text-[#64748B] dark:text-[#94A3B8] max-w-sm mx-auto mb-6">
            သင်၏ မှတ်မိနိုင်စွမ်းကို စမ်းသပ်စစ်ဆေးခဲ့ပြီး ရရှိသော ရမှတ်မှာ အောက်ပါအတိုင်း ဖြစ်ပါသည်:
          </p>

          <div className="inline-flex items-baseline gap-2 bg-[#FAF5FF] dark:bg-[#3B0764]/40 px-6 py-4 rounded-2xl border border-purple-200 dark:border-purple-800 mb-8">
            <span className="font-mono text-4xl font-extrabold text-[#9333EA] dark:text-[#C084FC]">
              {score}
            </span>
            <span className="text-xl text-[#64748B] dark:text-[#94A3B8] font-bold">
              / {questions.length}
            </span>
            <span className="ml-2 font-burmese text-sm font-semibold text-[#EAB308]">
              {score >= 8 ? '🌟 အလွန်ထူးချွန်သည်' : score >= 5 ? '👍 ကောင်းမွန်ပါသည်' : '💪 ထပ်မံလေ့ကျင့်ပါ'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => generateQuiz(quizType)}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#9333EA] text-white hover:bg-[#7E22CE] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ထပ်မံစမ်းသပ်မည်</span>
            </button>

            <button
              onClick={onReturnToStudy}
              className="w-full sm:w-auto py-3.5 px-6 rounded-2xl bg-[#F1F5F9] dark:bg-[#1E293B] text-[#334155] dark:text-[#CBD5E1] hover:bg-[#E2E8F0] font-semibold text-sm cursor-pointer transition-colors"
            >
              ကတ်ပြားများသို့ ပြန်သွားမည်
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

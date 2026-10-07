export type CategoryType = "အားလုံး" | "နာမ်စား" | "မိသားစု" | "ကြိယာ" | "နာမ်" | "သိမှတ်ဖွယ်ရာ";

export type ToneType = "Mid Tone" | "Low Tone" | "Falling Tone" | "High Tone" | "Rising Tone";

export interface VocabularyItem {
  id: number;
  thai: string;
  phonetic: string;
  myanmarReading: string;
  meaning: string;
  category: "နာမ်စား" | "မိသားစု" | "ကြိယာ" | "နာမ်" | "သိမှတ်ဖွယ်ရာ";
  tone: "Mid Tone" | "Low Tone" | "Falling Tone" | "High Tone" | "Rising Tone";
  toneMyanmar?: string;
  exampleThai?: string;
  examplePhonetic?: string;
  exampleMyanmar?: string;
}

// Aliases for compatibility across components
export type VocabularyWord = VocabularyItem;
export type ThaiTone = ToneType;

export type ViewMode = 'flashcards' | 'grid' | 'compact' | 'quiz' | 'tone-guide';

export interface UserProgress {
  favorites: number[];     // IDs of starred words
  mastered: number[];      // IDs of mastered words
  streakDays: number;
  lastStudyDate: string;   // YYYY-MM-DD
  quizHighScore: number;
  totalQuizzesTaken: number;
}

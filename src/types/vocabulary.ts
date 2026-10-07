export type ThaiTone = 'mid' | 'low' | 'falling' | 'high' | 'rising';

export interface VocabularyWord {
  id: string;
  thai: string;             // e.g. สวัสดี
  thaiScriptClean: string;  // without tone marks if needed
  phonetic: string;         // e.g. sà-wàt-dii (Paiboon / RTGS)
  burmese: string;          // e.g. မင်္ဂလာပါ
  burmesePhonetic: string;  // e.g. ဆာဝါဒီ (Burmese pronunciation aid)
  tone: ThaiTone;
  toneNameThai: string;     // สามัญ, เอก, โท, ตรี, จัตวา
  toneNameBurmese: string;  // သာမန်သံ, အနိမ့်သံ(အောက်မြစ်), သက်သံ, အမြင့်သံ, တက်သံ
  category: string;
  partOfSpeech: string;     // noun, verb, greeting, adjective, phrase, etc.
  exampleThai: string;      // Thai example sentence
  examplePhonetic: string;  // Phonetic example
  exampleBurmese: string;   // Burmese translation of example
  notes?: string;           // Cultural tip or usage nuance
}

export type ViewMode = 'flashcards' | 'grid' | 'compact' | 'quiz' | 'tone-guide';

export interface UserProgress {
  favorites: string[];     // IDs of starred words
  mastered: string[];      // IDs of mastered words
  streakDays: number;
  lastStudyDate: string;   // YYYY-MM-DD
  quizHighScore: number;
  totalQuizzesTaken: number;
}

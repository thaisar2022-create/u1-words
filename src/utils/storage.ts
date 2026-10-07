import { UserProgress } from '../types/vocabulary';

const STORAGE_KEY = 'royal_marigold_progress_v1';
const THEME_KEY = 'royal_marigold_theme';
const SPEED_KEY = 'royal_marigold_audio_speed';

const DEFAULT_PROGRESS: UserProgress = {
  favorites: [1, 2, 70],
  mastered: [],
  streakDays: 3,
  lastStudyDate: new Date().toISOString().split('T')[0],
  quizHighScore: 0,
  totalQuizzesTaken: 0,
};

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    
    // Check and update daily streak
    const today = new Date().toISOString().split('T')[0];
    const lastDate = parsed.lastStudyDate || today;
    const diffDays = Math.floor(
      (new Date(today).getTime() - new Date(lastDate).getTime()) / (1000 * 3600 * 24)
    );

    let streakDays = parsed.streakDays || 1;
    if (diffDays === 1) {
      // Continuing streak
      streakDays += 1;
    } else if (diffDays > 1) {
      // Missed a day
      streakDays = 1;
    }

    return {
      ...parsed,
      streakDays,
      lastStudyDate: today,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
}

export function loadAudioSpeed(): number {
  if (typeof window === 'undefined') return 0.85;
  const val = localStorage.getItem(SPEED_KEY);
  return val ? parseFloat(val) : 0.85;
}

export function saveAudioSpeed(speed: number): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SPEED_KEY, speed.toString());
}

export function loadTheme(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(THEME_KEY) === 'dark';
}

export function saveTheme(isDark: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

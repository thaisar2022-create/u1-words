/**
 * Audio synthesis helper for Thai language speech
 */

class AudioService {
  private synth: SpeechSynthesis | null = null;
  private thaiVoice: SpeechSynthesisVoice | null = null;
  private voicesLoaded: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Find best Thai voice
    const found = voices.find(v => v.lang === 'th-TH' || v.lang.startsWith('th'));
    if (found) {
      this.thaiVoice = found;
      this.voicesLoaded = true;
    }
  }

  public speak(
    text: string, 
    rate: number = 0.85, 
    onStart?: () => void, 
    onEnd?: () => void, 
    onError?: () => void
  ) {
    if (!this.synth) {
      // Browser doesn't support Web Speech API
      if (onError) onError();
      return;
    }

    // Cancel any previous speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = rate; // 0.7 to 1.0
    utterance.pitch = 1.0;

    if (this.thaiVoice) {
      utterance.voice = this.thaiVoice;
    } else {
      // Refresh voices if not found initially
      this.initVoices();
      if (this.thaiVoice) {
        utterance.voice = this.thaiVoice;
      }
    }

    if (onStart) utterance.onstart = onStart;
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      if (onEnd) onEnd();
      if (onError) onError();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const audioService = new AudioService();

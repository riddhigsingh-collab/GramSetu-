import { useState, useEffect, useCallback } from 'react';
import { SupportedDialect, DIALECTS } from './dialect';

export interface AudioPlaybackState {
  isSpeaking: boolean;
  isPaused: boolean;
  currentTitle: string;
  currentText: string;
  dialect: SupportedDialect;
  speechRate: number;
}

class AudioNarratorService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: ((state: AudioPlaybackState) => void)[] = [];

  private state: AudioPlaybackState = {
    isSpeaking: false,
    isPaused: false,
    currentTitle: '',
    currentText: '',
    dialect: 'hi',
    speechRate: 0.95, // comfortable pace for rural farmers
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (state: AudioPlaybackState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public speak(title: string, text: string, dialect: SupportedDialect = 'hi') {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this environment');
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const langTag = DIALECTS[dialect]?.langTag || 'hi-IN';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langTag;
    utterance.rate = this.state.speechRate;
    utterance.pitch = 1.0;

    // Pick best matching Indic voice if available
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang.startsWith(langTag.slice(0, 2)) || v.name.includes('Hindi') || v.name.includes('India')
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.state = {
        ...this.state,
        isSpeaking: true,
        isPaused: false,
        currentTitle: title,
        currentText: text,
        dialect,
      };
      this.notify();
    };

    utterance.onend = () => {
      this.state = {
        ...this.state,
        isSpeaking: false,
        isPaused: false,
      };
      this.notify();
    };

    utterance.onerror = () => {
      this.state = {
        ...this.state,
        isSpeaking: false,
        isPaused: false,
      };
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isSpeaking) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state = {
        ...this.state,
        isSpeaking: false,
        isPaused: false,
        currentTitle: '',
        currentText: '',
      };
      this.notify();
    }
  }

  public setRate(rate: number) {
    this.state.speechRate = rate;
    this.notify();
  }

  public getState(): AudioPlaybackState {
    return { ...this.state };
  }
}

export const audioNarrator = new AudioNarratorService();

export function useAudioNarrator() {
  const [playback, setPlayback] = useState<AudioPlaybackState>(audioNarrator.getState());

  useEffect(() => {
    return audioNarrator.subscribe(setPlayback);
  }, []);

  const speak = useCallback((title: string, text: string, dialect?: SupportedDialect) => {
    audioNarrator.speak(title, text, dialect);
  }, []);

  const stop = useCallback(() => {
    audioNarrator.stop();
  }, []);

  const pause = useCallback(() => {
    audioNarrator.pause();
  }, []);

  const resume = useCallback(() => {
    audioNarrator.resume();
  }, []);

  const setRate = useCallback((rate: number) => {
    audioNarrator.setRate(rate);
  }, []);

  return {
    ...playback,
    speak,
    stop,
    pause,
    resume,
    setRate,
  };
}

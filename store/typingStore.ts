import { create } from "zustand";

// Types
export type CharStatus = "ghost" | "correct" | "incorrect";

export interface Char {
  value: string;
  status: CharStatus;
}

export interface Word {
  value: string;
  chars: Char[];
  typed: string;
  extraChars: string[];
  isCorrect: boolean | null;
}

interface TypingState {
  words: Word[];
  wordIndex: number;
  charIndex: number;
  startTime: number | null;
  endTime: number | null;
  paused: boolean;
  pausedTime: number; // Total time spent paused
  pauseStartTime: number | null; // When current pause started
}

interface TypingActions {
  reset: (words: string[]) => void;
  startTimer: () => void;
  endTest: () => void;
  pauseTest: () => void;
  resumeTest: () => void;
  typeChar: (char: string) => void;
  backspace: () => void;
  space: () => void;
  getElapsedTime: () => number;
}

type TypingStore = TypingState & TypingActions;

// Helpers
const createWord = (word: string): Word => ({
  value: word,
  typed: "",
  extraChars: [],
  isCorrect: null,
  chars: word.split("").map((c) => ({ value: c, status: "ghost" as const })),
});

const initialState: TypingState = {
  words: [],
  wordIndex: 0,
  charIndex: 0,
  startTime: null,
  endTime: null,
  paused: false,
  pausedTime: 0,
  pauseStartTime: null,
};

// Store
export const useTypingStore = create<TypingStore>((set, get) => ({
  ...initialState,

  reset: (wordList) =>
    set({
      ...initialState,
      words: wordList.map(createWord),
    }),

  startTimer: () => {
    if (!get().startTime) {
      set({
        startTime: Date.now(),
        paused: false,
        pausedTime: 0,
        pauseStartTime: null,
      });
    }
  },

  endTest: () => {
    if (!get().endTime) {
      set({ endTime: Date.now() });
    }
  },

  pauseTest: () => {
    const { startTime, endTime, paused } = get();
    if (startTime && !endTime && !paused) {
      set({ paused: true, pauseStartTime: Date.now() });
    }
  },

  resumeTest: () => {
    const { pauseStartTime, pausedTime } = get();
    if (pauseStartTime) {
      const additionalPausedTime = Date.now() - pauseStartTime;
      set({
        paused: false,
        pausedTime: pausedTime + additionalPausedTime,
        pauseStartTime: null,
      });
    } else {
      set({ paused: false });
    }
  },

  getElapsedTime: () => {
    const { startTime, endTime, pausedTime, pauseStartTime, paused } = get();
    if (!startTime) return 0;

    const end = endTime || Date.now();
    let elapsed = end - startTime - pausedTime;

    // If currently paused, subtract the current pause duration
    if (paused && pauseStartTime) {
      elapsed -= Date.now() - pauseStartTime;
    }

    return Math.max(0, elapsed);
  },

  typeChar: (char) => {
    const { words, wordIndex, charIndex, endTest } = get();
    const word = words[wordIndex];
    if (!word) return;

    // Clone the word to avoid direct mutation
    const updatedWord = { ...word };
    const isExtraChar = charIndex >= word.chars.length;

    if (isExtraChar) {
      updatedWord.extraChars = [...word.extraChars, char];
    } else {
      const expected = word.chars[charIndex].value;
      updatedWord.chars = word.chars.map((c, i) =>
        i === charIndex
          ? { ...c, status: char === expected ? "correct" : "incorrect" }
          : c,
      );
    }
    updatedWord.typed = word.typed + char;

    const newCharIndex = charIndex + 1;
    const isLastWord = wordIndex === words.length - 1;
    const isWordComplete = newCharIndex >= word.chars.length;

    // Update words array
    const updatedWords = words.map((w, i) =>
      i === wordIndex ? updatedWord : w,
    );

    set({ words: updatedWords, charIndex: newCharIndex });

    // Auto-end on last character of last word
    if (isLastWord && isWordComplete) {
      endTest();
    }
  },

  backspace: () => {
    const { words, wordIndex, charIndex } = get();
    if (wordIndex === 0 && charIndex === 0) return;

    // Moving to previous word
    if (charIndex === 0) {
      const prevWord = words[wordIndex - 1];
      set({
        wordIndex: wordIndex - 1,
        charIndex: prevWord.typed.length,
      });
      return;
    }

    // Deleting in current word
    const word = words[wordIndex];
    const isExtraChar = charIndex > word.chars.length;

    const updatedWord = {
      ...word,
      typed: word.typed.slice(0, -1),
      extraChars: isExtraChar ? word.extraChars.slice(0, -1) : word.extraChars,
      chars: isExtraChar
        ? word.chars
        : word.chars.map((c, i) =>
            i === charIndex - 1 ? { ...c, status: "ghost" as const } : c,
          ),
    };

    set({
      words: words.map((w, i) => (i === wordIndex ? updatedWord : w)),
      charIndex: charIndex - 1,
    });
  },

  space: () => {
    const { words, wordIndex, endTest } = get();
    const word = words[wordIndex];
    if (!word) return;

    const updatedWord = { ...word, isCorrect: word.typed === word.value };
    const updatedWords = words.map((w, i) =>
      i === wordIndex ? updatedWord : w,
    );
    const isLastWord = wordIndex === words.length - 1;

    set({
      words: updatedWords,
      wordIndex: wordIndex + 1,
      charIndex: 0,
    });

    if (isLastWord) {
      endTest();
    }
  },
}));

// Selector hooks for better performance
export const useTypingState = () =>
  useTypingStore((s) => ({
    words: s.words,
    wordIndex: s.wordIndex,
    startTime: s.startTime,
    endTime: s.endTime,
    paused: s.paused,
  }));

export const useTypingActions = () =>
  useTypingStore((s) => ({
    reset: s.reset,
    startTimer: s.startTimer,
    pauseTest: s.pauseTest,
    resumeTest: s.resumeTest,
    typeChar: s.typeChar,
    backspace: s.backspace,
    space: s.space,
  }));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Difficulty } from "@/data/quotes";
import { type NaturalLanguage, type CodeLanguage } from "@/data/languages";

export type TestMode = "time" | "word" | "quote" | "code" | "custom";

interface SettingsState {
  mode: TestMode;
  wordCount: number;
  timeLimit: number;
  difficulty: Difficulty;
  language: NaturalLanguage;
  codeLanguage: CodeLanguage;
  customText: string;
  includeNumbers: boolean;
  includePunctuation: boolean;
  includeSpecialCharacters: boolean;
  _hasHydrated: boolean;
}

interface SettingsActions {
  setMode: (mode: TestMode) => void;
  setWordCount: (count: number) => void;
  setTimeLimit: (time: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setLanguage: (language: NaturalLanguage) => void;
  setCodeLanguage: (language: CodeLanguage) => void;
  setCustomText: (text: string) => void;
  setIncludeNumbers: (include: boolean) => void;
  setIncludePunctuation: (include: boolean) => void;
  setIncludeSpecialCharacters: (include: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

type SettingsStore = SettingsState & SettingsActions;

const initialState: SettingsState = {
  mode: "word",
  wordCount: 25,
  timeLimit: 30,
  difficulty: "medium",
  language: "english",
  codeLanguage: "javascript",
  customText: "The quick brown fox jumps over the lazy dog.",
  includeNumbers: false,
  includePunctuation: false,
  includeSpecialCharacters: false,
  _hasHydrated: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialState,

      setMode: (mode) => set({ mode }),
      setWordCount: (wordCount) => set({ wordCount }),
      setTimeLimit: (timeLimit) => set({ timeLimit }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setLanguage: (language) => set({ language }),
      setCodeLanguage: (codeLanguage) => set({ codeLanguage }),
      setCustomText: (customText) => set({ customText }),
      setIncludeNumbers: (includeNumbers) => set({ includeNumbers }),
      setIncludePunctuation: (includePunctuation) =>
        set({ includePunctuation }),
      setIncludeSpecialCharacters: (includeSpecialCharacters) =>
        set({ includeSpecialCharacters }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "zinx-settings",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => {
        // Exclude _hasHydrated from being persisted
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _hasHydrated, setHasHydrated, ...rest } = state;
        return rest;
      },
    },
  ),
);

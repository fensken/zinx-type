import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Difficulty } from "@/data/quotes";

export type TestMode = "time" | "word" | "quote";

interface SettingsState {
  mode: TestMode;
  wordCount: number;
  timeLimit: number;
  difficulty: Difficulty;
  includeNumbers: boolean;
  includePunctuation: boolean;
}

interface SettingsActions {
  setMode: (mode: TestMode) => void;
  setWordCount: (count: number) => void;
  setTimeLimit: (time: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setIncludeNumbers: (include: boolean) => void;
  setIncludePunctuation: (include: boolean) => void;
}

type SettingsStore = SettingsState & SettingsActions;

const initialState: SettingsState = {
  mode: "word",
  wordCount: 25,
  timeLimit: 30,
  difficulty: "medium",
  includeNumbers: false,
  includePunctuation: false,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialState,

      setMode: (mode) => set({ mode }),
      setWordCount: (wordCount) => set({ wordCount }),
      setTimeLimit: (timeLimit) => set({ timeLimit }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setIncludeNumbers: (includeNumbers) => set({ includeNumbers }),
      setIncludePunctuation: (includePunctuation) =>
        set({ includePunctuation }),
    }),
    {
      name: "zinx-settings",
    },
  ),
);

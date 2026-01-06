import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TestResult {
  id: string;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  time: number;
  mode: string;
  timestamp: number;
}

interface HistoryState {
  results: TestResult[];
}

interface HistoryActions {
  addResult: (result: Omit<TestResult, "id" | "timestamp">) => void;
  clearHistory: () => void;
}

type HistoryStore = HistoryState & HistoryActions;

const MAX_RESULTS = 3;

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      results: [],

      addResult: (result) => {
        const newResult: TestResult = {
          ...result,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        };

        set((state) => ({
          results: [newResult, ...state.results].slice(0, MAX_RESULTS),
        }));
      },

      clearHistory: () => set({ results: [] }),
    }),
    {
      name: "zinx-history",
    },
  ),
);

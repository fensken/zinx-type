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
  language?: string;
  timestamp: number;
}

export interface PersonalBest {
  wpm: number;
  accuracy: number;
  timestamp: number;
  mode: string;
}

export interface DailyStats {
  date: string; // YYYY-MM-DD format
  testsCompleted: number;
  averageWpm: number;
  averageAccuracy: number;
  totalTime: number;
  bestWpm: number;
}

interface HistoryState {
  results: TestResult[];
  personalBests: Record<string, PersonalBest>; // keyed by mode (e.g., "time-30", "word-25")
  dailyStats: DailyStats[];
  totalTestsCompleted: number;
  totalTimeTyping: number;
  overallBestWpm: number;
  overallBestAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  lastTestDate: string | null;
}

interface HistoryActions {
  addResult: (result: Omit<TestResult, "id" | "timestamp">) => void;
  clearHistory: () => void;
  getRecentResults: (count: number) => TestResult[];
  getPersonalBest: (mode: string) => PersonalBest | null;
  getAverageWpm: (days?: number) => number;
  getAverageAccuracy: (days?: number) => number;
  getImprovementPercentage: () => number;
  getDailyImprovement: () => number;
}

type HistoryStore = HistoryState & HistoryActions;

const MAX_RESULTS = 10; // Store last 10 results (local storage only)
const MAX_DAILY_STATS = 7; // Keep 7 days of daily stats

function getDateString(timestamp: number): string {
  return new Date(timestamp).toISOString().split("T")[0];
}

function updateStreak(
  lastTestDate: string | null,
  currentStreak: number,
  longestStreak: number,
): { currentStreak: number; longestStreak: number } {
  const today = getDateString(Date.now());
  const yesterday = getDateString(Date.now() - 86400000);

  if (lastTestDate === today) {
    // Already tested today, no change to streak
    return { currentStreak, longestStreak };
  } else if (lastTestDate === yesterday) {
    // Tested yesterday, increment streak
    const newStreak = currentStreak + 1;
    return {
      currentStreak: newStreak,
      longestStreak: Math.max(longestStreak, newStreak),
    };
  } else {
    // Streak broken or first test
    return {
      currentStreak: 1,
      longestStreak: Math.max(longestStreak, 1),
    };
  }
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      results: [],
      personalBests: {},
      dailyStats: [],
      totalTestsCompleted: 0,
      totalTimeTyping: 0,
      overallBestWpm: 0,
      overallBestAccuracy: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastTestDate: null,

      addResult: (result) => {
        const newResult: TestResult = {
          ...result,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        };

        set((state) => {
          const today = getDateString(Date.now());
          const modeKey = result.mode;

          // Update personal best for this mode
          const currentBest = state.personalBests[modeKey];
          const newPersonalBests = { ...state.personalBests };

          if (!currentBest || result.wpm > currentBest.wpm) {
            newPersonalBests[modeKey] = {
              wpm: result.wpm,
              accuracy: result.accuracy,
              timestamp: Date.now(),
              mode: result.mode,
            };
          }

          // Update daily stats
          const existingDayIndex = state.dailyStats.findIndex(
            (d) => d.date === today,
          );
          let newDailyStats = [...state.dailyStats];

          if (existingDayIndex >= 0) {
            const existing = newDailyStats[existingDayIndex];
            const totalTests = existing.testsCompleted + 1;
            newDailyStats[existingDayIndex] = {
              ...existing,
              testsCompleted: totalTests,
              averageWpm:
                (existing.averageWpm * existing.testsCompleted + result.wpm) /
                totalTests,
              averageAccuracy:
                (existing.averageAccuracy * existing.testsCompleted +
                  result.accuracy) /
                totalTests,
              totalTime: existing.totalTime + result.time,
              bestWpm: Math.max(existing.bestWpm, result.wpm),
            };
          } else {
            newDailyStats.unshift({
              date: today,
              testsCompleted: 1,
              averageWpm: result.wpm,
              averageAccuracy: result.accuracy,
              totalTime: result.time,
              bestWpm: result.wpm,
            });
            // Keep only last MAX_DAILY_STATS days
            newDailyStats = newDailyStats.slice(0, MAX_DAILY_STATS);
          }

          // Update streak
          const { currentStreak, longestStreak } = updateStreak(
            state.lastTestDate,
            state.currentStreak,
            state.longestStreak,
          );

          return {
            results: [newResult, ...state.results].slice(0, MAX_RESULTS),
            personalBests: newPersonalBests,
            dailyStats: newDailyStats,
            totalTestsCompleted: state.totalTestsCompleted + 1,
            totalTimeTyping: state.totalTimeTyping + result.time,
            overallBestWpm: Math.max(state.overallBestWpm, result.wpm),
            overallBestAccuracy: Math.max(
              state.overallBestAccuracy,
              result.accuracy,
            ),
            currentStreak,
            longestStreak,
            lastTestDate: today,
          };
        });
      },

      clearHistory: () =>
        set({
          results: [],
          personalBests: {},
          dailyStats: [],
          totalTestsCompleted: 0,
          totalTimeTyping: 0,
          overallBestWpm: 0,
          overallBestAccuracy: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastTestDate: null,
        }),

      getRecentResults: (count: number) => {
        return get().results.slice(0, count);
      },

      getPersonalBest: (mode: string) => {
        return get().personalBests[mode] || null;
      },

      getAverageWpm: (days?: number) => {
        const results = get().results;
        if (results.length === 0) return 0;

        let filtered = results;
        if (days) {
          const cutoff = Date.now() - days * 86400000;
          filtered = results.filter((r) => r.timestamp >= cutoff);
        }

        if (filtered.length === 0) return 0;
        return filtered.reduce((sum, r) => sum + r.wpm, 0) / filtered.length;
      },

      getAverageAccuracy: (days?: number) => {
        const results = get().results;
        if (results.length === 0) return 0;

        let filtered = results;
        if (days) {
          const cutoff = Date.now() - days * 86400000;
          filtered = results.filter((r) => r.timestamp >= cutoff);
        }

        if (filtered.length === 0) return 0;
        return (
          filtered.reduce((sum, r) => sum + r.accuracy, 0) / filtered.length
        );
      },

      getImprovementPercentage: () => {
        const results = get().results;
        if (results.length < 6) return 0;

        // Compare last 3 tests with previous 3 tests
        const recent = results.slice(0, 3);
        const previous = results.slice(3, 6);

        const recentAvg =
          recent.reduce((sum, r) => sum + r.wpm, 0) / recent.length;
        const previousAvg =
          previous.reduce((sum, r) => sum + r.wpm, 0) / previous.length;

        if (previousAvg === 0) return 0;
        return ((recentAvg - previousAvg) / previousAvg) * 100;
      },

      getDailyImprovement: () => {
        const dailyStats = get().dailyStats;
        if (dailyStats.length < 2) return 0;

        // Compare today's average with yesterday's average
        const today = dailyStats[0];
        const yesterday = dailyStats[1];

        if (!today || !yesterday || yesterday.averageWpm === 0) return 0;
        return (
          ((today.averageWpm - yesterday.averageWpm) / yesterday.averageWpm) *
          100
        );
      },
    }),
    {
      name: "zinx-history",
    },
  ),
);

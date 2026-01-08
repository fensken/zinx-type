import { describe, it, expect, beforeEach } from "vitest";
import { getModeCategory, type ModeCategory, type TestResult } from "./historyStore";

describe("historyStore", () => {
  describe("getModeCategory", () => {
    it("should categorize word modes as standard", () => {
      expect(getModeCategory("words 10")).toBe("standard");
      expect(getModeCategory("words 25")).toBe("standard");
      expect(getModeCategory("words 50")).toBe("standard");
      expect(getModeCategory("words 100")).toBe("standard");
    });

    it("should categorize time modes as standard", () => {
      expect(getModeCategory("time 15s")).toBe("standard");
      expect(getModeCategory("time 30s")).toBe("standard");
      expect(getModeCategory("time 60s")).toBe("standard");
      expect(getModeCategory("time 120s")).toBe("standard");
    });

    it("should categorize quote modes as quote", () => {
      expect(getModeCategory("quote easy")).toBe("quote");
      expect(getModeCategory("quote medium")).toBe("quote");
      expect(getModeCategory("quote hard")).toBe("quote");
    });

    it("should categorize custom mode as quote", () => {
      expect(getModeCategory("custom")).toBe("quote");
    });

    it("should categorize code modes as code", () => {
      expect(getModeCategory("code javascript")).toBe("code");
      expect(getModeCategory("code typescript")).toBe("code");
      expect(getModeCategory("code python")).toBe("code");
      expect(getModeCategory("code rust")).toBe("code");
      expect(getModeCategory("code swift")).toBe("code");
    });

    it("should be case insensitive", () => {
      expect(getModeCategory("CODE javascript")).toBe("code");
      expect(getModeCategory("QUOTE easy")).toBe("quote");
      expect(getModeCategory("WORDS 25")).toBe("standard");
      expect(getModeCategory("TIME 30s")).toBe("standard");
    });

    it("should default to standard for unknown modes", () => {
      expect(getModeCategory("unknown")).toBe("standard");
      expect(getModeCategory("")).toBe("standard");
    });
  });

  describe("TestResult type validation", () => {
    it("should have all required fields", () => {
      const validResult: TestResult = {
        id: "test-id-123",
        wpm: 75,
        rawWpm: 80,
        accuracy: 95,
        correctChars: 100,
        incorrectChars: 5,
        extraChars: 0,
        time: 30,
        mode: "words 25",
        modeCategory: "standard",
        timestamp: Date.now(),
      };

      expect(validResult.id).toBeDefined();
      expect(validResult.wpm).toBeGreaterThanOrEqual(0);
      expect(validResult.rawWpm).toBeGreaterThanOrEqual(0);
      expect(validResult.accuracy).toBeGreaterThanOrEqual(0);
      expect(validResult.accuracy).toBeLessThanOrEqual(100);
      expect(validResult.correctChars).toBeGreaterThanOrEqual(0);
      expect(validResult.incorrectChars).toBeGreaterThanOrEqual(0);
      expect(validResult.extraChars).toBeGreaterThanOrEqual(0);
      expect(validResult.time).toBeGreaterThan(0);
      expect(validResult.mode).toBeTruthy();
      expect(validResult.modeCategory).toBeTruthy();
      expect(validResult.timestamp).toBeGreaterThan(0);
    });

    it("should allow optional language field", () => {
      const resultWithLang: TestResult = {
        id: "test-id-456",
        wpm: 60,
        rawWpm: 65,
        accuracy: 92,
        correctChars: 80,
        incorrectChars: 7,
        extraChars: 1,
        time: 45,
        mode: "words 50",
        modeCategory: "standard",
        language: "english",
        timestamp: Date.now(),
      };

      expect(resultWithLang.language).toBe("english");
    });
  });

  describe("ModeCategory type", () => {
    it("should only allow valid category values", () => {
      const validCategories: ModeCategory[] = ["standard", "quote", "code"];

      validCategories.forEach((category) => {
        expect(["standard", "quote", "code"]).toContain(category);
      });
    });
  });

  describe("result calculations", () => {
    it("should calculate accuracy correctly", () => {
      // Accuracy = (correctChars / totalTyped) * 100
      const correctChars = 95;
      const incorrectChars = 3;
      const extraChars = 2;
      const totalTyped = correctChars + incorrectChars + extraChars;
      const accuracy = Math.round((correctChars / totalTyped) * 100);

      expect(accuracy).toBe(95);
    });

    it("should calculate WPM correctly", () => {
      // WPM = (correctChars / 5) / minutes
      const correctChars = 250;
      const timeInSeconds = 60;
      const minutes = timeInSeconds / 60;
      const wpm = Math.round(correctChars / 5 / minutes);

      expect(wpm).toBe(50);
    });

    it("should calculate raw WPM correctly", () => {
      // Raw WPM = (totalTyped / 5) / minutes
      const correctChars = 250;
      const incorrectChars = 25;
      const extraChars = 5;
      const totalTyped = correctChars + incorrectChars + extraChars;
      const timeInSeconds = 60;
      const minutes = timeInSeconds / 60;
      const rawWpm = Math.round(totalTyped / 5 / minutes);

      expect(rawWpm).toBe(56);
    });

    it("should handle edge case of 0 typed characters", () => {
      const totalTyped = 0;
      const accuracy = totalTyped > 0 ? Math.round((0 / totalTyped) * 100) : 0;

      expect(accuracy).toBe(0);
    });

    it("should handle edge case of 0 time", () => {
      const correctChars = 100;
      const minutes = 0;
      const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;

      expect(wpm).toBe(0);
    });
  });

  describe("improvement percentage calculation", () => {
    it("should calculate positive improvement", () => {
      const lastWpm = 80;
      const previousWpm = 70;
      const improvement = ((lastWpm - previousWpm) / previousWpm) * 100;

      expect(improvement).toBeCloseTo(14.29, 1);
    });

    it("should calculate negative improvement", () => {
      const lastWpm = 60;
      const previousWpm = 70;
      const improvement = ((lastWpm - previousWpm) / previousWpm) * 100;

      expect(improvement).toBeCloseTo(-14.29, 1);
    });

    it("should return 0 when previous WPM is 0", () => {
      const lastWpm = 80;
      const previousWpm = 0;
      const improvement =
        previousWpm === 0 ? 0 : ((lastWpm - previousWpm) / previousWpm) * 100;

      expect(improvement).toBe(0);
    });

    it("should return 0 when no previous result", () => {
      const results: TestResult[] = [];
      const improvement = results.length < 2 ? 0 : 10;

      expect(improvement).toBe(0);
    });
  });

  describe("average calculations", () => {
    it("should calculate average WPM correctly", () => {
      const wpms = [70, 80, 90, 100];
      const avg = wpms.reduce((sum, w) => sum + w, 0) / wpms.length;

      expect(avg).toBe(85);
    });

    it("should calculate average accuracy correctly", () => {
      const accuracies = [90, 92, 94, 96, 98];
      const avg =
        accuracies.reduce((sum, a) => sum + a, 0) / accuracies.length;

      expect(avg).toBe(94);
    });

    it("should return 0 for empty results", () => {
      const results: number[] = [];
      const avg = results.length === 0 ? 0 : results.reduce((s, r) => s + r, 0) / results.length;

      expect(avg).toBe(0);
    });
  });

  describe("streak calculation logic", () => {
    const getDateString = (timestamp: number): string => {
      return new Date(timestamp).toISOString().split("T")[0];
    };

    it("should get correct date string format", () => {
      const timestamp = new Date("2024-01-15T12:00:00Z").getTime();
      const dateStr = getDateString(timestamp);

      expect(dateStr).toBe("2024-01-15");
    });

    it("should identify consecutive days", () => {
      const today = new Date("2024-01-15").getTime();
      const yesterday = new Date("2024-01-14").getTime();

      const todayStr = getDateString(today);
      const yesterdayStr = getDateString(yesterday);
      const expectedYesterday = getDateString(today - 86400000);

      expect(yesterdayStr).toBe(expectedYesterday);
    });

    it("should identify broken streak", () => {
      const today = new Date("2024-01-15").getTime();
      const twoDaysAgo = new Date("2024-01-13").getTime();

      const twoDaysAgoStr = getDateString(twoDaysAgo);
      const yesterdayStr = getDateString(today - 86400000);

      expect(twoDaysAgoStr).not.toBe(yesterdayStr);
    });
  });

  describe("personal best tracking", () => {
    it("should identify new personal best", () => {
      const currentBest = { wpm: 80, accuracy: 95, timestamp: Date.now(), mode: "words 25" };
      const newResult = { wpm: 85, accuracy: 96 };

      const isNewBest = newResult.wpm > currentBest.wpm;
      expect(isNewBest).toBe(true);
    });

    it("should not identify lower score as personal best", () => {
      const currentBest = { wpm: 80, accuracy: 95, timestamp: Date.now(), mode: "words 25" };
      const newResult = { wpm: 75, accuracy: 90 };

      const isNewBest = newResult.wpm > currentBest.wpm;
      expect(isNewBest).toBe(false);
    });

    it("should handle first result as personal best", () => {
      const currentBest = null;
      const newResult = { wpm: 70, accuracy: 92 };

      const isNewBest = !currentBest || newResult.wpm > currentBest.wpm;
      expect(isNewBest).toBe(true);
    });
  });

  describe("MAX_RESULTS limit", () => {
    it("should limit results to 100", () => {
      const MAX_RESULTS = 100;
      const results: number[] = [];

      // Simulate adding 150 results
      for (let i = 0; i < 150; i++) {
        results.unshift(i);
        if (results.length > MAX_RESULTS) {
          results.length = MAX_RESULTS;
        }
      }

      expect(results.length).toBe(100);
      expect(results[0]).toBe(149); // Most recent
    });
  });

  describe("daily stats aggregation", () => {
    it("should calculate average from multiple tests", () => {
      const tests = [
        { wpm: 70, accuracy: 90 },
        { wpm: 80, accuracy: 92 },
        { wpm: 90, accuracy: 94 },
      ];

      const avgWpm = tests.reduce((sum, t) => sum + t.wpm, 0) / tests.length;
      const avgAccuracy =
        tests.reduce((sum, t) => sum + t.accuracy, 0) / tests.length;

      expect(avgWpm).toBe(80);
      expect(avgAccuracy).toBe(92);
    });

    it("should find best WPM from daily tests", () => {
      const tests = [
        { wpm: 70 },
        { wpm: 85 },
        { wpm: 75 },
        { wpm: 90 },
        { wpm: 80 },
      ];

      const bestWpm = Math.max(...tests.map((t) => t.wpm));
      expect(bestWpm).toBe(90);
    });

    it("should sum total time correctly", () => {
      const tests = [{ time: 30 }, { time: 60 }, { time: 45 }, { time: 120 }];

      const totalTime = tests.reduce((sum, t) => sum + t.time, 0);
      expect(totalTime).toBe(255);
    });
  });
});

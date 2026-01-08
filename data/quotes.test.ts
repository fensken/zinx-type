import { describe, it, expect } from "vitest";
import {
  getRandomQuote,
  getAllQuotes,
  type Quote,
  type Difficulty,
} from "./quotes";

describe("quotes", () => {
  describe("getRandomQuote", () => {
    it("should return a quote object with text and source", () => {
      const quote = getRandomQuote({ difficulty: "easy" });
      expect(quote).toHaveProperty("text");
      expect(quote).toHaveProperty("source");
      expect(typeof quote.text).toBe("string");
      expect(typeof quote.source).toBe("string");
    });

    it("should return non-empty text and source", () => {
      const difficulties: Difficulty[] = ["easy", "medium", "hard"];
      difficulties.forEach((difficulty) => {
        const quote = getRandomQuote({ difficulty });
        expect(quote.text.length).toBeGreaterThan(0);
        expect(quote.source.length).toBeGreaterThan(0);
      });
    });

    describe("difficulty levels", () => {
      it("should return easy quotes (shorter text)", () => {
        // Test multiple times to get a sample
        for (let i = 0; i < 10; i++) {
          const quote = getRandomQuote({ difficulty: "easy" });
          // Easy quotes should generally be under 150 characters
          expect(quote.text.length).toBeLessThan(150);
        }
      });

      it("should return medium quotes", () => {
        const quote = getRandomQuote({ difficulty: "medium" });
        expect(quote.text.length).toBeGreaterThan(0);
      });

      it("should return hard quotes (longer text)", () => {
        // Test multiple times to get a sample
        for (let i = 0; i < 10; i++) {
          const quote = getRandomQuote({ difficulty: "hard" });
          // Hard quotes should generally be over 150 characters
          expect(quote.text.length).toBeGreaterThan(150);
        }
      });
    });

    it("should return different quotes on subsequent calls (randomness)", () => {
      const quotes: Quote[] = [];
      // Get 20 random easy quotes
      for (let i = 0; i < 20; i++) {
        quotes.push(getRandomQuote({ difficulty: "easy" }));
      }

      // Check that not all quotes are the same
      const uniqueTexts = new Set(quotes.map((q) => q.text));
      expect(uniqueTexts.size).toBeGreaterThan(1);
    });
  });

  describe("getAllQuotes", () => {
    it("should return an object with all difficulty levels", () => {
      const allQuotes = getAllQuotes();
      expect(allQuotes).toHaveProperty("easy");
      expect(allQuotes).toHaveProperty("medium");
      expect(allQuotes).toHaveProperty("hard");
    });

    it("should have arrays of quotes for each difficulty", () => {
      const allQuotes = getAllQuotes();
      expect(Array.isArray(allQuotes.easy)).toBe(true);
      expect(Array.isArray(allQuotes.medium)).toBe(true);
      expect(Array.isArray(allQuotes.hard)).toBe(true);
    });

    it("should have non-empty arrays for each difficulty", () => {
      const allQuotes = getAllQuotes();
      expect(allQuotes.easy.length).toBeGreaterThan(0);
      expect(allQuotes.medium.length).toBeGreaterThan(0);
      expect(allQuotes.hard.length).toBeGreaterThan(0);
    });

    it("should have valid quote objects in each array", () => {
      const allQuotes = getAllQuotes();
      const difficulties: Difficulty[] = ["easy", "medium", "hard"];

      difficulties.forEach((difficulty) => {
        allQuotes[difficulty].forEach((quote) => {
          expect(quote).toHaveProperty("text");
          expect(quote).toHaveProperty("source");
          expect(typeof quote.text).toBe("string");
          expect(typeof quote.source).toBe("string");
          expect(quote.text.length).toBeGreaterThan(0);
          expect(quote.source.length).toBeGreaterThan(0);
        });
      });
    });

    it("should have enough quotes for variety", () => {
      const allQuotes = getAllQuotes();
      // Each difficulty should have at least 10 quotes
      expect(allQuotes.easy.length).toBeGreaterThanOrEqual(10);
      expect(allQuotes.medium.length).toBeGreaterThanOrEqual(10);
      expect(allQuotes.hard.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe("quote content validation", () => {
    it("should not have duplicate quotes within same difficulty", () => {
      const allQuotes = getAllQuotes();
      const difficulties: Difficulty[] = ["easy", "medium", "hard"];

      difficulties.forEach((difficulty) => {
        const texts = allQuotes[difficulty].map((q) => q.text);
        const uniqueTexts = new Set(texts);
        expect(uniqueTexts.size).toBe(texts.length);
      });
    });

    it("should have properly attributed sources", () => {
      const allQuotes = getAllQuotes();
      const difficulties: Difficulty[] = ["easy", "medium", "hard"];

      difficulties.forEach((difficulty) => {
        allQuotes[difficulty].forEach((quote) => {
          // Source should not be empty or just whitespace
          expect(quote.source.trim().length).toBeGreaterThan(0);
        });
      });
    });

    it("easy quotes should be shorter than hard quotes on average", () => {
      const allQuotes = getAllQuotes();

      const avgEasyLength =
        allQuotes.easy.reduce((sum, q) => sum + q.text.length, 0) /
        allQuotes.easy.length;
      const avgHardLength =
        allQuotes.hard.reduce((sum, q) => sum + q.text.length, 0) /
        allQuotes.hard.length;

      expect(avgEasyLength).toBeLessThan(avgHardLength);
    });
  });
});

import { describe, it, expect } from "vitest";
import { generateWords, type WordGeneratorOptions } from "./words";

describe("generateWords", () => {
  describe("basic functionality", () => {
    it("should generate the requested number of words", () => {
      const result = generateWords({ count: 10 });
      expect(result).toHaveLength(10);
    });

    it("should generate different counts correctly", () => {
      expect(generateWords({ count: 5 })).toHaveLength(5);
      expect(generateWords({ count: 25 })).toHaveLength(25);
      expect(generateWords({ count: 50 })).toHaveLength(50);
      expect(generateWords({ count: 100 })).toHaveLength(100);
    });

    it("should return an empty array when count is 0", () => {
      const result = generateWords({ count: 0 });
      expect(result).toHaveLength(0);
    });

    it("should return strings only", () => {
      const result = generateWords({ count: 20 });
      result.forEach((word) => {
        expect(typeof word).toBe("string");
      });
    });

    it("should not return empty strings", () => {
      const result = generateWords({ count: 50 });
      result.forEach((word) => {
        expect(word.length).toBeGreaterThan(0);
      });
    });
  });

  describe("language support", () => {
    it("should default to english", () => {
      const result = generateWords({ count: 10 });
      // English words should be returned by default
      expect(result).toHaveLength(10);
      result.forEach((word) => {
        expect(typeof word).toBe("string");
      });
    });

    it("should generate words for english language", () => {
      const result = generateWords({ count: 10, language: "english" });
      expect(result).toHaveLength(10);
    });

    it("should generate words for spanish language", () => {
      const result = generateWords({ count: 10, language: "spanish" });
      expect(result).toHaveLength(10);
    });

    it("should generate words for french language", () => {
      const result = generateWords({ count: 10, language: "french" });
      expect(result).toHaveLength(10);
    });

    it("should generate words for german language", () => {
      const result = generateWords({ count: 10, language: "german" });
      expect(result).toHaveLength(10);
    });
  });

  describe("punctuation option", () => {
    it("should include punctuation when enabled", () => {
      // Run multiple times to ensure we get punctuation
      let hasPunctuation = false;
      for (let i = 0; i < 10; i++) {
        const result = generateWords({ count: 100, includePunctuation: true });
        const punctuationChars = [".", ",", "?", "!", ";", ":", "'"];
        hasPunctuation = result.some((word) =>
          punctuationChars.some((p) => word.includes(p))
        );
        if (hasPunctuation) break;
      }
      expect(hasPunctuation).toBe(true);
    });

    it("should not include sentence punctuation when disabled", () => {
      const result = generateWords({ count: 100, includePunctuation: false });
      const sentencePunctuation = [".", "?", "!", ";", ":"];
      const hasSentencePunctuation = result.some((word) =>
        sentencePunctuation.some((p) => word.endsWith(p))
      );
      expect(hasSentencePunctuation).toBe(false);
    });
  });

  describe("numbers option", () => {
    it("should include number phrases when enabled", () => {
      // Run multiple times to ensure we get numbers
      let hasNumbers = false;
      for (let i = 0; i < 20; i++) {
        const result = generateWords({ count: 100, includeNumbers: true });
        hasNumbers = result.some((word) => /\d/.test(word));
        if (hasNumbers) break;
      }
      expect(hasNumbers).toBe(true);
    });

    it("should not include numbers when disabled", () => {
      const result = generateWords({ count: 100, includeNumbers: false });
      // Most words should not contain numbers (unless from special chars)
      const wordsWithNumbers = result.filter((word) => /\d/.test(word));
      expect(wordsWithNumbers.length).toBe(0);
    });
  });

  describe("special characters option", () => {
    it("should include special characters when enabled", () => {
      // Run multiple times to ensure we get special characters
      let hasSpecialChars = false;
      for (let i = 0; i < 20; i++) {
        const result = generateWords({
          count: 100,
          includeSpecialCharacters: true,
        });
        const specialChars = [
          "@",
          "#",
          "$",
          "%",
          "&",
          "*",
          "(",
          ")",
          "_",
          "+",
          "=",
          "[",
          "]",
          "{",
          "}",
          "|",
          "\\",
          "/",
          "<",
          ">",
          "~",
          "`",
          "^",
        ];
        hasSpecialChars = result.some((word) =>
          specialChars.some((c) => word.includes(c))
        );
        if (hasSpecialChars) break;
      }
      expect(hasSpecialChars).toBe(true);
    });
  });

  describe("randomness", () => {
    it("should generate different word orders on subsequent calls", () => {
      const result1 = generateWords({ count: 20 });
      const result2 = generateWords({ count: 20 });

      // They should not be exactly the same (extremely unlikely)
      const areIdentical =
        result1.length === result2.length &&
        result1.every((word, i) => word === result2[i]);

      expect(areIdentical).toBe(false);
    });
  });

  describe("combined options", () => {
    it("should work with all options enabled", () => {
      const options: WordGeneratorOptions = {
        count: 100,
        language: "english",
        includeNumbers: true,
        includePunctuation: true,
        includeSpecialCharacters: true,
      };

      const result = generateWords(options);
      expect(result).toHaveLength(100);
      result.forEach((word) => {
        expect(typeof word).toBe("string");
        expect(word.length).toBeGreaterThan(0);
      });
    });
  });
});

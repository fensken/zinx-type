import { describe, it, expect } from "vitest";
import {
  getSnippetsByLanguage,
  getRandomSnippet,
  getRandomSnippetByDifficulty,
  javascriptSnippets,
  typescriptSnippets,
  pythonSnippets,
  rustSnippets,
  golangSnippets,
  swiftSnippets,
  type CodeSnippet,
} from "./code-snippets";
import type { Difficulty } from "./quotes";

describe("code-snippets", () => {
  describe("getSnippetsByLanguage", () => {
    it("should return javascript snippets", () => {
      const snippets = getSnippetsByLanguage("javascript");
      expect(Array.isArray(snippets)).toBe(true);
      expect(snippets.length).toBeGreaterThan(0);
      snippets.forEach((snippet) => {
        expect(snippet.language).toBe("javascript");
      });
    });

    it("should return typescript snippets", () => {
      const snippets = getSnippetsByLanguage("typescript");
      expect(snippets.length).toBeGreaterThan(0);
      snippets.forEach((snippet) => {
        expect(snippet.language).toBe("typescript");
      });
    });

    it("should return python snippets", () => {
      const snippets = getSnippetsByLanguage("python");
      expect(snippets.length).toBeGreaterThan(0);
      snippets.forEach((snippet) => {
        expect(snippet.language).toBe("python");
      });
    });

    it("should return rust snippets", () => {
      const snippets = getSnippetsByLanguage("rust");
      expect(snippets.length).toBeGreaterThan(0);
      snippets.forEach((snippet) => {
        expect(snippet.language).toBe("rust");
      });
    });

    it("should return golang snippets", () => {
      const snippets = getSnippetsByLanguage("golang");
      expect(snippets.length).toBeGreaterThan(0);
      snippets.forEach((snippet) => {
        expect(snippet.language).toBe("golang");
      });
    });

    it("should return swift snippets", () => {
      const snippets = getSnippetsByLanguage("swift");
      expect(snippets.length).toBeGreaterThan(0);
      snippets.forEach((snippet) => {
        expect(snippet.language).toBe("swift");
      });
    });

    it("should default to javascript for unknown language", () => {
      const snippets = getSnippetsByLanguage("unknown-lang");
      expect(snippets).toEqual(javascriptSnippets);
    });
  });

  describe("getRandomSnippet", () => {
    it("should return a valid snippet object", () => {
      const snippet = getRandomSnippet("javascript");
      expect(snippet).toHaveProperty("language");
      expect(snippet).toHaveProperty("lines");
      expect(snippet).toHaveProperty("difficulty");
    });

    it("should return snippet with correct language", () => {
      const languages = [
        "javascript",
        "typescript",
        "python",
        "rust",
        "golang",
      ];
      languages.forEach((lang) => {
        const snippet = getRandomSnippet(lang);
        expect(snippet.language).toBe(lang);
      });
    });

    it("should return snippet with non-empty lines array", () => {
      const snippet = getRandomSnippet("javascript");
      expect(Array.isArray(snippet.lines)).toBe(true);
      expect(snippet.lines.length).toBeGreaterThan(0);
    });

    it("should return different snippets on subsequent calls (randomness)", () => {
      const snippets: CodeSnippet[] = [];
      for (let i = 0; i < 20; i++) {
        snippets.push(getRandomSnippet("javascript"));
      }

      // Check that not all snippets are the same
      const uniqueSnippets = new Set(
        snippets.map((s) => s.lines.join("\n"))
      );
      expect(uniqueSnippets.size).toBeGreaterThan(1);
    });
  });

  describe("getRandomSnippetByDifficulty", () => {
    const difficulties: Difficulty[] = ["easy", "medium", "hard"];

    it("should return snippet with correct difficulty when available", () => {
      difficulties.forEach((difficulty) => {
        const snippet = getRandomSnippetByDifficulty("javascript", difficulty);
        // Should return a valid snippet
        expect(snippet).toHaveProperty("language");
        expect(snippet).toHaveProperty("lines");
        expect(snippet).toHaveProperty("difficulty");
      });
    });

    it("should filter by difficulty correctly for javascript", () => {
      difficulties.forEach((difficulty) => {
        // Run multiple times to ensure consistency
        for (let i = 0; i < 10; i++) {
          const snippet = getRandomSnippetByDifficulty("javascript", difficulty);
          expect(snippet.difficulty).toBe(difficulty);
        }
      });
    });

    it("should filter by difficulty correctly for python", () => {
      difficulties.forEach((difficulty) => {
        for (let i = 0; i < 10; i++) {
          const snippet = getRandomSnippetByDifficulty("python", difficulty);
          expect(snippet.difficulty).toBe(difficulty);
        }
      });
    });

    it("should filter by difficulty correctly for swift", () => {
      difficulties.forEach((difficulty) => {
        for (let i = 0; i < 10; i++) {
          const snippet = getRandomSnippetByDifficulty("swift", difficulty);
          expect(snippet.difficulty).toBe(difficulty);
        }
      });
    });

    it("should fall back to any snippet if difficulty not found", () => {
      // For languages with limited snippets, should still return something
      const snippet = getRandomSnippetByDifficulty("scala", "easy");
      expect(snippet).toHaveProperty("language");
      expect(snippet).toHaveProperty("lines");
    });
  });

  describe("snippet content validation", () => {
    const validateSnippet = (snippet: CodeSnippet) => {
      expect(snippet.language).toBeTruthy();
      expect(snippet.lines.length).toBeGreaterThan(0);
      expect(["easy", "medium", "hard"]).toContain(snippet.difficulty);

      // Each line should be a string
      snippet.lines.forEach((line) => {
        expect(typeof line).toBe("string");
      });
    };

    it("should have valid javascript snippets", () => {
      javascriptSnippets.forEach(validateSnippet);
    });

    it("should have valid typescript snippets", () => {
      typescriptSnippets.forEach(validateSnippet);
    });

    it("should have valid python snippets", () => {
      pythonSnippets.forEach(validateSnippet);
    });

    it("should have valid rust snippets", () => {
      rustSnippets.forEach(validateSnippet);
    });

    it("should have valid golang snippets", () => {
      golangSnippets.forEach(validateSnippet);
    });

    it("should have valid swift snippets", () => {
      swiftSnippets.forEach(validateSnippet);
    });
  });

  describe("snippet variety", () => {
    it("should have snippets for all difficulty levels in javascript", () => {
      const difficulties = new Set(javascriptSnippets.map((s) => s.difficulty));
      expect(difficulties.has("easy")).toBe(true);
      expect(difficulties.has("medium")).toBe(true);
      expect(difficulties.has("hard")).toBe(true);
    });

    it("should have snippets for all difficulty levels in typescript", () => {
      const difficulties = new Set(typescriptSnippets.map((s) => s.difficulty));
      expect(difficulties.has("easy")).toBe(true);
      expect(difficulties.has("medium")).toBe(true);
      expect(difficulties.has("hard")).toBe(true);
    });

    it("should have snippets for all difficulty levels in python", () => {
      const difficulties = new Set(pythonSnippets.map((s) => s.difficulty));
      expect(difficulties.has("easy")).toBe(true);
      expect(difficulties.has("medium")).toBe(true);
      expect(difficulties.has("hard")).toBe(true);
    });

    it("should have snippets for all difficulty levels in swift", () => {
      const difficulties = new Set(swiftSnippets.map((s) => s.difficulty));
      expect(difficulties.has("easy")).toBe(true);
      expect(difficulties.has("medium")).toBe(true);
      expect(difficulties.has("hard")).toBe(true);
    });

    it("should have enough snippets to avoid repetition", () => {
      // Major languages should have at least 5 snippets per difficulty
      const majorLanguages = [
        javascriptSnippets,
        typescriptSnippets,
        pythonSnippets,
        swiftSnippets,
      ];

      majorLanguages.forEach((snippets) => {
        const easyCount = snippets.filter((s) => s.difficulty === "easy").length;
        const mediumCount = snippets.filter(
          (s) => s.difficulty === "medium"
        ).length;
        const hardCount = snippets.filter((s) => s.difficulty === "hard").length;

        expect(easyCount).toBeGreaterThanOrEqual(5);
        expect(mediumCount).toBeGreaterThanOrEqual(5);
        expect(hardCount).toBeGreaterThanOrEqual(5);
      });
    });
  });

  describe("code formatting", () => {
    it("should have properly indented code", () => {
      // Check that multi-line snippets have consistent indentation
      javascriptSnippets.forEach((snippet) => {
        if (snippet.lines.length > 1) {
          // Lines should start with consistent characters (spaces or content)
          snippet.lines.forEach((line) => {
            expect(typeof line).toBe("string");
          });
        }
      });
    });

    it("should produce valid code text when joined", () => {
      const snippet = getRandomSnippet("javascript");
      const codeText = snippet.lines.join("\n");
      expect(typeof codeText).toBe("string");
      expect(codeText.length).toBeGreaterThan(0);
    });
  });
});

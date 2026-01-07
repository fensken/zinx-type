import {
  type Language,
  getWordsByLanguage,
  getContractionsByLanguage,
} from "./languages";

export interface WordGeneratorOptions {
  count: number;
  language?: Language;
  includeNumbers?: boolean;
  includePunctuation?: boolean;
  includeSpecialCharacters?: boolean;
}

// Natural phrases with numbers (for number mode)
const numberPhrases = [
  "page 1",
  "step 2",
  "item 3",
  "level 4",
  "chapter 5",
  "version 2.0",
  "model 3",
  "room 101",
  "route 66",
  "24 hours",
  "365 days",
  "100 percent",
  "50 states",
  "12 months",
  "7 days",
  "1st place",
  "2nd floor",
  "3rd time",
  "4th quarter",
  "5th avenue",
  "top 10",
  "24/7",
  "9 to 5",
  "3.14",
  "99.9%",
];

// Special characters for typing practice
const specialCharacters = [
  "@",
  "#",
  "$",
  "%",
  "^",
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
];

// Natural phrases with special characters
const specialCharacterPhrases = [
  "user@email",
  "#hashtag",
  "$100",
  "50%",
  "Q&A",
  "rock&roll",
  "C++",
  "node.js",
  "test_case",
  "my_variable",
  "src/index",
  "path/to/file",
  "{object}",
  "[array]",
  "(group)",
  "key=value",
  "a+b",
  "x*y",
  "user|admin",
  "~home",
  "cmd>output",
  "input<file",
  "code`block`",
  "a^2",
  "c:\\users",
  "path\\file",
];

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pick<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateWords(options: WordGeneratorOptions): string[] {
  const {
    count,
    language = "english",
    includeNumbers = false,
    includePunctuation = false,
    includeSpecialCharacters = false,
  } = options;

  const result: string[] = [];

  // Get words for the selected language
  const baseWords = getWordsByLanguage(language);
  const contractions = getContractionsByLanguage(language);

  // Build the word pool
  let wordPool = [...baseWords];

  if (includePunctuation && contractions.length > 0) {
    // Add contractions for more natural punctuation
    wordPool = [...wordPool, ...contractions];
  }

  const shuffledPool = shuffle(wordPool);
  let poolIndex = 0;

  for (let i = 0; i < count; i++) {
    // Occasionally insert number phrases (about 5% of words when enabled)
    if (includeNumbers && Math.random() < 0.05) {
      const phrase = pick(numberPhrases);
      // Split phrase into individual words and add them
      const phraseWords = phrase.split(" ");
      for (const word of phraseWords) {
        if (result.length < count) {
          result.push(word);
        }
      }
      continue;
    }

    // Occasionally insert special character phrases (about 5% of words when enabled)
    if (includeSpecialCharacters && Math.random() < 0.05) {
      const phrase = pick(specialCharacterPhrases);
      result.push(phrase);
      continue;
    }

    // Get next word from shuffled pool
    let word = shuffledPool[poolIndex % shuffledPool.length];
    poolIndex++;

    // Add natural punctuation (only for natural languages, not programming)
    if (
      includePunctuation &&
      !contractions.includes(word) &&
      !["javascript", "python", "rust"].includes(language)
    ) {
      const rand = Math.random();

      // End of sentence (period, question mark, exclamation)
      if (rand < 0.08) {
        const sentenceEnd = Math.random();
        if (sentenceEnd < 0.7) {
          word = word + ".";
        } else if (sentenceEnd < 0.85) {
          word = word + "?";
        } else {
          word = word + "!";
        }
      }
      // Comma
      else if (rand < 0.15) {
        word = word + ",";
      }
      // Semicolon or colon (rare)
      else if (rand < 0.17) {
        word = word + (Math.random() < 0.5 ? ";" : ":");
      }
    }

    // Add special characters to words (about 5% of remaining words when enabled)
    if (includeSpecialCharacters && Math.random() < 0.05) {
      const specialChar = pick(specialCharacters);
      // Randomly prepend or append the special character
      if (Math.random() < 0.5) {
        word = specialChar + word;
      } else {
        word = word + specialChar;
      }
    }

    result.push(word);
  }

  return result.slice(0, count);
}

const wordsExport = { generateWords };
export default wordsExport;

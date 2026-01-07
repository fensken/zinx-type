import { englishWords, englishContractions } from "./english";
import { englishUkWords, englishUkContractions } from "./english-uk";
import { spanishWords } from "./spanish";
import { frenchWords } from "./french";
import { germanWords } from "./german";
import { portugueseWords } from "./portuguese";
import { italianWords } from "./italian";
import { dutchWords } from "./dutch";
import { polishWords } from "./polish";
import { swedishWords } from "./swedish";
import { norwegianWords } from "./norwegian";
import { danishWords } from "./danish";
import { finnishWords } from "./finnish";

import { javascriptKeywords } from "./javascript";
import { typescriptKeywords } from "./typescript";
import { pythonKeywords } from "./python";
import { rustKeywords } from "./rust";
import { golangKeywords } from "./golang";
import { javaKeywords } from "./java";
import { cKeywords } from "./c";
import { cppKeywords } from "./cpp";
import { csharpKeywords } from "./csharp";
import { zigKeywords } from "./zig";
import { luaKeywords } from "./lua";
import { rubyKeywords } from "./ruby";
import { phpKeywords } from "./php";
import { swiftKeywords } from "./swift";
import { kotlinKeywords } from "./kotlin";
import { scalaKeywords } from "./scala";

// Natural languages for word/time modes
export type NaturalLanguage =
  | "english"
  | "english-uk"
  | "spanish"
  | "french"
  | "german"
  | "portuguese"
  | "italian"
  | "dutch"
  | "polish"
  | "swedish"
  | "norwegian"
  | "danish"
  | "finnish";

// Programming languages for code mode
export type CodeLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "rust"
  | "golang"
  | "java"
  | "c"
  | "cpp"
  | "csharp"
  | "zig"
  | "lua"
  | "ruby"
  | "php"
  | "swift"
  | "kotlin"
  | "scala";

// Combined type for backwards compatibility
export type Language = NaturalLanguage | CodeLanguage;

export interface LanguageOption {
  id: Language;
  name: string;
  flag?: string;
  category: "natural" | "programming";
}

export const naturalLanguageOptions: LanguageOption[] = [
  { id: "english", name: "English", flag: "🇺🇸", category: "natural" },
  { id: "english-uk", name: "English (UK)", flag: "🇬🇧", category: "natural" },
  { id: "spanish", name: "Spanish", flag: "🇪🇸", category: "natural" },
  { id: "french", name: "French", flag: "🇫🇷", category: "natural" },
  { id: "german", name: "German", flag: "🇩🇪", category: "natural" },
  { id: "portuguese", name: "Portuguese", flag: "🇧🇷", category: "natural" },
  { id: "italian", name: "Italian", flag: "🇮🇹", category: "natural" },
  { id: "dutch", name: "Dutch", flag: "🇳🇱", category: "natural" },
  { id: "polish", name: "Polish", flag: "🇵🇱", category: "natural" },
  { id: "swedish", name: "Swedish", flag: "🇸🇪", category: "natural" },
  { id: "norwegian", name: "Norwegian", flag: "🇳🇴", category: "natural" },
  { id: "danish", name: "Danish", flag: "🇩🇰", category: "natural" },
  { id: "finnish", name: "Finnish", flag: "🇫🇮", category: "natural" },
];

export const codeLanguageOptions: LanguageOption[] = [
  { id: "javascript", name: "JavaScript", category: "programming" },
  { id: "typescript", name: "TypeScript", category: "programming" },
  { id: "python", name: "Python", category: "programming" },
  { id: "rust", name: "Rust", category: "programming" },
  { id: "golang", name: "Go", category: "programming" },
  { id: "java", name: "Java", category: "programming" },
  { id: "c", name: "C", category: "programming" },
  { id: "cpp", name: "C++", category: "programming" },
  { id: "csharp", name: "C#", category: "programming" },
  { id: "zig", name: "Zig", category: "programming" },
  { id: "lua", name: "Lua", category: "programming" },
  { id: "ruby", name: "Ruby", category: "programming" },
  { id: "php", name: "PHP", category: "programming" },
  { id: "swift", name: "Swift", category: "programming" },
  { id: "kotlin", name: "Kotlin", category: "programming" },
  { id: "scala", name: "Scala", category: "programming" },
];

// Combined for backwards compatibility
export const languageOptions: LanguageOption[] = [
  ...naturalLanguageOptions,
  ...codeLanguageOptions,
];

export function getWordsByLanguage(language: Language): string[] {
  switch (language) {
    case "english":
      return englishWords;
    case "english-uk":
      return englishUkWords;
    case "spanish":
      return spanishWords;
    case "french":
      return frenchWords;
    case "german":
      return germanWords;
    case "portuguese":
      return portugueseWords;
    case "italian":
      return italianWords;
    case "dutch":
      return dutchWords;
    case "polish":
      return polishWords;
    case "swedish":
      return swedishWords;
    case "norwegian":
      return norwegianWords;
    case "danish":
      return danishWords;
    case "finnish":
      return finnishWords;

    case "javascript":
      return javascriptKeywords;
    case "typescript":
      return typescriptKeywords;
    case "python":
      return pythonKeywords;
    case "rust":
      return rustKeywords;
    case "golang":
      return golangKeywords;
    case "java":
      return javaKeywords;
    case "c":
      return cKeywords;
    case "cpp":
      return cppKeywords;
    case "csharp":
      return csharpKeywords;
    case "zig":
      return zigKeywords;
    case "lua":
      return luaKeywords;
    case "ruby":
      return rubyKeywords;
    case "php":
      return phpKeywords;
    case "swift":
      return swiftKeywords;
    case "kotlin":
      return kotlinKeywords;
    case "scala":
      return scalaKeywords;
    default:
      return englishWords;
  }
}

export function getContractionsByLanguage(language: Language): string[] {
  switch (language) {
    case "english":
      return englishContractions;
    case "english-uk":
      return englishUkContractions;
    default:
      return [];
  }
}

export {
  englishWords,
  englishContractions,
  englishUkWords,
  englishUkContractions,
  spanishWords,
  frenchWords,
  germanWords,
  portugueseWords,
  italianWords,
  dutchWords,
  polishWords,
  swedishWords,
  norwegianWords,
  danishWords,
  finnishWords,
  javascriptKeywords,
  typescriptKeywords,
  pythonKeywords,
  rustKeywords,
  golangKeywords,
  javaKeywords,
  cKeywords,
  cppKeywords,
  csharpKeywords,
  zigKeywords,
  luaKeywords,
  rubyKeywords,
  phpKeywords,
  swiftKeywords,
  kotlinKeywords,
  scalaKeywords,
};

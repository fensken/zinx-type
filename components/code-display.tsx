"use client";

import { memo } from "react";
import type { Word, Char } from "@/store/typingStore";

interface CodeDisplayProps {
  lines: string[];
  words: Word[];
  wordIndex: number;
  charIndex: number;
  fontClassName: string;
}

// Map words back to their line positions
function mapWordsToLines(lines: string[], words: Word[]) {
  const lineData: {
    lineNumber: number;
    words: { word: Word; globalIndex: number }[];
  }[] = [];
  let wordIdx = 0;

  lines.forEach((line, lineIdx) => {
    const lineWords: { word: Word; globalIndex: number }[] = [];

    if (line.trim() === "") {
      // Empty line - might have an empty word marker
      if (wordIdx < words.length) {
        const word = words[wordIdx];
        // Check if this is an empty line marker or newline
        const wordText = word.chars.map((c) => c.value).join("");
        if (wordText === "" || wordText === "\n") {
          lineWords.push({ word, globalIndex: wordIdx });
          wordIdx++;
        }
      }
      // Skip the newline marker if present
      if (wordIdx < words.length) {
        const nextWord = words[wordIdx];
        const nextText = nextWord.chars.map((c) => c.value).join("");
        if (nextText === "\n") {
          wordIdx++;
        }
      }
    } else {
      // Non-empty line - collect words until we hit a newline
      while (wordIdx < words.length) {
        const word = words[wordIdx];
        const wordText = word.chars.map((c) => c.value).join("");

        if (wordText === "\n") {
          wordIdx++;
          break;
        }

        lineWords.push({ word, globalIndex: wordIdx });
        wordIdx++;
      }
    }

    lineData.push({ lineNumber: lineIdx + 1, words: lineWords });
  });

  return lineData;
}

const CharDisplay = memo(function CharDisplay({
  char,
  isCurrentChar,
}: {
  char: Char;
  isCurrentChar: boolean;
}) {
  // Handle space characters - show visible indicator
  const displayValue = char.value === " " ? "\u00A0" : char.value;

  return (
    <span
      className={`relative ${
        char.status === "correct"
          ? "text-primary"
          : char.status === "incorrect"
            ? "text-destructive"
            : "text-muted-foreground"
      }`}
    >
      {isCurrentChar && (
        <span className="absolute left-0 top-0 w-[2px] h-full bg-caret animate-caret" />
      )}
      {displayValue}
    </span>
  );
});

const WordInLine = memo(function WordInLine({
  word,
  isActive,
  activeCharIdx,
}: {
  word: Word;
  isActive: boolean;
  activeCharIdx: number;
}) {
  const wordText = word.chars.map((c) => c.value).join("");

  // Skip newline markers in display
  if (wordText === "\n") {
    return null;
  }

  // For indentation (spaces only), render with proper spacing
  const isIndent = /^\s+$/.test(wordText);

  return (
    <span className={`relative ${isIndent ? "" : ""}`}>
      {word.chars.map((char, ci) => (
        <CharDisplay
          key={ci}
          char={char}
          isCurrentChar={isActive && ci === activeCharIdx}
        />
      ))}
      {word.extraChars.map((char, i) => {
        const isCurrentExtraChar =
          isActive && i === activeCharIdx - word.chars.length;
        return (
          <span key={`extra-${i}`} className="relative text-destructive/70">
            {isCurrentExtraChar && (
              <span className="absolute left-0 top-0 w-0.5 h-full bg-caret animate-caret" />
            )}
            {char}
          </span>
        );
      })}
      {/* Cursor at end of word */}
      {isActive &&
        activeCharIdx >= word.chars.length + word.extraChars.length && (
          <span className="relative w-0">
            <span className="absolute left-0 top-0 w-0.5 h-full bg-caret animate-caret" />
          </span>
        )}
      {/* Add space after word unless it's indentation */}
      {!isIndent && <span className="text-transparent"> </span>}
    </span>
  );
});

const CodeDisplay = memo(function CodeDisplay({
  lines,
  words,
  wordIndex,
  charIndex,
  fontClassName,
}: CodeDisplayProps) {
  const lineData = mapWordsToLines(lines, words);
  const lineNumberWidth = String(lines.length).length;

  return (
    <div className={`${fontClassName} text-sm sm:text-base`}>
      {lineData.map((line) => (
        <div key={line.lineNumber} className="flex">
          {/* Line number */}
          <div
            className="select-none text-muted-foreground/50 text-right pr-4 shrink-0"
            style={{ width: `${lineNumberWidth + 2}ch` }}
          >
            {line.lineNumber}
          </div>
          {/* Line content */}
          <div className="flex-1 whitespace-pre">
            {line.words.length === 0 ? (
              // Empty line
              <span className="opacity-0">.</span>
            ) : (
              line.words.map(({ word, globalIndex }) => (
                <WordInLine
                  key={globalIndex}
                  word={word}
                  isActive={globalIndex === wordIndex}
                  activeCharIdx={charIndex}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

export default CodeDisplay;

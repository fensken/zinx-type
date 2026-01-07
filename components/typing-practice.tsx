"use client";

import { generateWords } from "@/data/words";
import { getRandomQuote } from "@/data/quotes";
import { getRandomSnippetByDifficulty } from "@/data/code-snippets";
import { useTypingStore } from "@/store/typingStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useFontStore, fontOptions } from "@/store/fontStore";
import { useSound } from "@/hooks/useSound";
import { RotateCcw, AlertTriangle, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeTypingBlock from "@/components/code-typing-block";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  memo,
} from "react";
import type { Word } from "@/store/typingStore";

// Generate words for fast typers (400 WPM)
const getWordsForTime = (seconds: number): number => {
  const wordsPerMinute = 400;
  return Math.ceil((seconds / 60) * wordsPerMinute);
};

// Memoized word component to prevent unnecessary re-renders
const WordDisplay = memo(function WordDisplay({
  word,
  isActive,
  activeCharIdx,
}: {
  word: Word;
  isActive: boolean;
  activeCharIdx: number;
}) {
  return (
    <div className="flex relative leading-[32px]">
      {word.chars.map((char, ci) => {
        const isCurrentChar = isActive && ci === activeCharIdx;
        return (
          <span
            key={ci}
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
            {char.value}
          </span>
        );
      })}

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
    </div>
  );
});

const TypingPractice = () => {
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [quoteSource, setQuoteSource] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [codeText, setCodeText] = useState("");
  const [codeTypedChars, setCodeTypedChars] = useState("");
  const [codeCursorPos, setCodeCursorPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const wordElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentLineRef = useRef<number>(0);

  const words = useTypingStore((state) => state.words);
  const wordIndex = useTypingStore((state) => state.wordIndex);
  const charIndex = useTypingStore((state) => state.charIndex);
  const startTime = useTypingStore((state) => state.startTime);
  const endTime = useTypingStore((state) => state.endTime);
  const paused = useTypingStore((state) => state.paused);
  const reset = useTypingStore((state) => state.reset);
  const startTimer = useTypingStore((state) => state.startTimer);
  const pauseTest = useTypingStore((state) => state.pauseTest);
  const resumeTest = useTypingStore((state) => state.resumeTest);
  const typeChar = useTypingStore((state) => state.typeChar);
  const backspace = useTypingStore((state) => state.backspace);
  const space = useTypingStore((state) => state.space);
  const endTest = useTypingStore((state) => state.endTest);
  const getElapsedTime = useTypingStore((state) => state.getElapsedTime);

  const mode = useSettingsStore((state) => state.mode);
  const wordCount = useSettingsStore((state) => state.wordCount);
  const timeLimit = useSettingsStore((state) => state.timeLimit);
  const difficulty = useSettingsStore((state) => state.difficulty);
  const language = useSettingsStore((state) => state.language);
  const codeLanguage = useSettingsStore((state) => state.codeLanguage);
  const includeNumbers = useSettingsStore((state) => state.includeNumbers);
  const includePunctuation = useSettingsStore(
    (state) => state.includePunctuation,
  );
  const includeSpecialCharacters = useSettingsStore(
    (state) => state.includeSpecialCharacters,
  );
  const customText = useSettingsStore((state) => state.customText);

  const font = useFontStore((state) => state.font);
  const fontClassName =
    fontOptions.find((f) => f.value === font)?.className || "font-geist-mono";

  const { playKeyPress, playError, playCompletion } = useSound();

  const showOverlay = !revealed;
  const testActive =
    startTime !== null && endTime === null && !paused && revealed;

  const generateTest = useCallback(() => {
    if (mode === "quote") {
      const quote = getRandomQuote({ difficulty });
      const quoteWords = quote.text.split(" ");
      setQuoteSource(quote.source);
      reset(quoteWords);
    } else if (mode === "code") {
      // Code mode - use real code snippets with Shiki highlighting
      const snippet = getRandomSnippetByDifficulty(codeLanguage, difficulty);
      const fullCode = snippet.lines.join("\n");
      setCodeText(fullCode);
      setCodeTypedChars("");
      setCodeCursorPos(0);
      setQuoteSource(null);
      reset([]); // Empty words array for code mode
    } else if (mode === "custom") {
      // Custom text mode - use user provided text
      if (customText.trim()) {
        const customWords = customText.trim().split(/\s+/);
        setQuoteSource(null);
        reset(customWords);
      } else {
        // Fallback to word mode if no custom text
        const wordList = generateWords({
          count: wordCount,
          language,
          includeNumbers: false,
          includePunctuation: false,
          includeSpecialCharacters: false,
        });
        setQuoteSource(null);
        reset(wordList);
      }
    } else {
      const count = mode === "time" ? getWordsForTime(timeLimit) : wordCount;
      const wordList = generateWords({
        count,
        language,
        includeNumbers,
        includePunctuation,
        includeSpecialCharacters,
      });
      setQuoteSource(null);
      reset(wordList);
    }
    setRevealed(false);
    setElapsedTime(0);
    setScrollTop(0);
    currentLineRef.current = 0;
    wordElementsRef.current = [];
  }, [
    mode,
    wordCount,
    timeLimit,
    difficulty,
    language,
    codeLanguage,
    customText,
    includeNumbers,
    includePunctuation,
    includeSpecialCharacters,
    reset,
  ]);

  const handleReset = useCallback(() => {
    generateTest();
  }, [generateTest]);

  // Handle line scrolling - keep active word on the second line
  useLayoutEffect(() => {
    const activeWordEl = wordElementsRef.current[wordIndex];
    if (!activeWordEl || !wordsContainerRef.current) return;

    const wordTop = activeWordEl.offsetTop;
    const lineHeight = activeWordEl.offsetHeight + 8; // 8px gap

    // Calculate which line the active word is on (0-indexed)
    const currentLine = Math.floor(wordTop / lineHeight);

    // We want the active word to be on line 1 (second line, 0-indexed)
    if (currentLine >= 2) {
      const targetScroll = (currentLine - 1) * lineHeight;
      setScrollTop(targetScroll);
      currentLineRef.current = currentLine;
    } else if (currentLine < currentLineRef.current) {
      // User went back to a previous line
      const targetScroll = Math.max(0, (currentLine - 1) * lineHeight);
      setScrollTop(targetScroll);
      currentLineRef.current = currentLine;
    }
  }, [wordIndex, words.length]);

  // Initialize on mount and regenerate when words are reset to empty (external reset)
  /* eslint-disable react-hooks/set-state-in-effect -- Intentional initialization and state sync patterns */
  useEffect(() => {
    // When words become empty (from external reset like header click), regenerate test
    // Skip if we're still in initial loading phase
    if (words.length === 0 && !loading) {
      generateTest();
    }
  }, [words.length, loading, generateTest]);

  // Set loading to false on mount
  useEffect(() => {
    setLoading(false);
  }, []);

  // Regenerate words when settings change
  useEffect(() => {
    if (!loading) {
      generateTest();
    }
  }, [
    mode,
    wordCount,
    timeLimit,
    difficulty,
    language,
    codeLanguage,
    customText,
    includeNumbers,
    includePunctuation,
    includeSpecialCharacters,
  ]);

  // Reset revealed state when paused
  useEffect(() => {
    if (paused) {
      setRevealed(false);
    }
  }, [paused]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Timer for time mode
  useEffect(() => {
    if (testActive && mode === "time") {
      timerRef.current = setInterval(() => {
        const elapsed = getElapsedTime();
        setElapsedTime(elapsed);

        if (elapsed >= timeLimit * 1000) {
          endTest();
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        }
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [testActive, mode, timeLimit, getElapsedTime, endTest]);

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = () => {
      if (testActive) {
        pauseTest();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [testActive, pauseTest]);

  // Auto-focus the hidden input for keyboard events (including mobile)
  // Focus on mount and whenever revealed/loading state changes
  useEffect(() => {
    if (!loading) {
      // Always try to focus the input so key presses work
      hiddenInputRef.current?.focus();
    }
  }, [revealed, loading, words.length]);

  // Play completion sound when test ends
  useEffect(() => {
    if (endTime) {
      playCompletion();
    }
  }, [endTime, playCompletion]);

  // Keyboard handler for typing
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Detect Caps Lock state
      if (e.getModifierState) {
        setCapsLockOn(e.getModifierState("CapsLock"));
      }

      if (loading) return;

      // Ctrl+Enter to reset - works anytime, anywhere
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleReset();
        return;
      }

      if (!revealed) {
        setRevealed(true);
        return;
      }

      if (paused) {
        resumeTest();
      }

      if (startTime === null) {
        startTimer();
      }

      // Code mode - character-by-character typing
      if (mode === "code") {
        // Check if test is complete
        if (codeCursorPos >= codeText.length) return;

        if (e.key === "Backspace") {
          e.preventDefault();
          if (codeCursorPos > 0) {
            playKeyPress();
            setCodeTypedChars((prev) => prev.slice(0, -1));
            setCodeCursorPos((prev) => prev - 1);
          }
          return;
        }

        // Handle Enter key as newline - skip leading whitespace on next line
        if (e.key === "Enter") {
          e.preventDefault();
          const expectedChar = codeText[codeCursorPos];
          if (expectedChar === "\n") {
            playKeyPress();

            // Find how much leading whitespace to skip on the next line
            let skipCount = 0;
            let nextPos = codeCursorPos + 1;
            while (
              nextPos < codeText.length &&
              (codeText[nextPos] === " " || codeText[nextPos] === "\t")
            ) {
              skipCount++;
              nextPos++;
            }

            // Add the newline and whitespace as "typed" (auto-completed)
            const autoCompleted =
              "\n" +
              codeText.substring(
                codeCursorPos + 1,
                codeCursorPos + 1 + skipCount,
              );
            setCodeTypedChars((prev) => prev + autoCompleted);
            setCodeCursorPos(codeCursorPos + 1 + skipCount);

            // Check if complete
            if (codeCursorPos + 1 + skipCount >= codeText.length) {
              endTest();
            }
          } else {
            playError();
          }
          return;
        }

        // Handle space key - skip whitespace to next word
        if (e.key === " ") {
          e.preventDefault();
          const expectedChar = codeText[codeCursorPos];

          // If at end of line (expecting newline), just error - don't advance
          if (expectedChar === "\n") {
            playError();
            return;
          }

          // Skip all whitespace (spaces and tabs) until we hit a non-whitespace char or newline
          let skipCount = 0;
          let pos = codeCursorPos;
          while (
            pos < codeText.length &&
            (codeText[pos] === " " || codeText[pos] === "\t")
          ) {
            skipCount++;
            pos++;
          }

          if (skipCount > 0) {
            playKeyPress();
            // Auto-complete all the whitespace
            const skippedChars = codeText.substring(
              codeCursorPos,
              codeCursorPos + skipCount,
            );
            setCodeTypedChars((prev) => prev + skippedChars);
            setCodeCursorPos(codeCursorPos + skipCount);

            // Check if complete
            if (codeCursorPos + skipCount >= codeText.length) {
              endTest();
            }
          } else {
            // No whitespace to skip, play error
            playError();
          }
          return;
        }

        // Regular character (not space)
        if (e.key.length === 1) {
          e.preventDefault();
          const expectedChar = codeText[codeCursorPos];

          if (e.key === expectedChar) {
            playKeyPress();
          } else {
            playError();
          }

          setCodeTypedChars((prev) => prev + e.key);
          setCodeCursorPos((prev) => prev + 1);

          // Check if complete
          if (codeCursorPos + 1 >= codeText.length) {
            endTest();
          }
          return;
        }

        return;
      }

      // Non-code modes (word-based)
      if (endTime) return;

      if (e.key === " ") {
        e.preventDefault();
        playKeyPress();
        space();
        return;
      }

      if (e.key === "Backspace") {
        playKeyPress();
        backspace();
        return;
      }

      if (e.key.length === 1) {
        // Check if the character will be correct or incorrect
        const currentWord = words[wordIndex];
        if (currentWord) {
          const isExtraChar = charIndex >= currentWord.chars.length;
          if (isExtraChar) {
            playError();
          } else {
            const expected = currentWord.chars[charIndex].value;
            if (e.key === expected) {
              playKeyPress();
            } else {
              playError();
            }
          }
        }
        typeChar(e.key);
      }
    },
    [
      loading,
      endTime,
      revealed,
      paused,
      startTime,
      startTimer,
      resumeTest,
      space,
      backspace,
      typeChar,
      handleReset,
      words,
      wordIndex,
      charIndex,
      playKeyPress,
      playError,
      mode,
      codeText,
      codeCursorPos,
      endTest,
    ],
  );

  const handleClick = useCallback(() => {
    if (!revealed) {
      setRevealed(true);
      // Delay focus slightly to ensure state update happens first
      setTimeout(() => hiddenInputRef.current?.focus(), 10);
    } else if (paused) {
      resumeTest();
      hiddenInputRef.current?.focus();
    } else {
      // Just focus if already revealed and not paused
      hiddenInputRef.current?.focus();
    }
  }, [revealed, paused, resumeTest]);

  const progressDisplay = (() => {
    if (!testActive && startTime === null) return null;

    if (mode === "time") {
      const remainingSeconds = Math.max(
        0,
        timeLimit - Math.floor(elapsedTime / 1000),
      );
      return `${remainingSeconds}`;
    } else if (mode === "word" || mode === "quote") {
      return `${wordIndex}/${words.length}`;
    } else if (mode === "code") {
      const percent =
        codeText.length > 0
          ? Math.round((codeCursorPos / codeText.length) * 100)
          : 0;
      return `${percent}%`;
    }
    return null;
  })();

  // Line height calculation
  const lineHeight = 40;

  return (
    <div className="relative w-full mt-16 sm:mt-24 md:mt-32">
      {/* Caps Lock Warning */}
      {capsLockOn && (
        <div className="absolute -top-20 sm:-top-24 md:-top-28 left-1/2 -translate-x-1/2 flex items-center gap-2 text-amber-500 text-sm font-mono animate-pulse">
          <AlertTriangle className="w-4 h-4" />
          <span>Caps Lock is ON</span>
        </div>
      )}

      {/* Progress indicator */}
      {progressDisplay && !showOverlay && (
        <div
          className={`absolute -top-10 sm:-top-12 md:-top-16 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl font-mono flex items-center gap-2 ${paused ? "text-amber-500" : "text-primary"}`}
        >
          {paused && <Pause className="w-6 h-6 sm:w-8 sm:h-8" />}
          {progressDisplay}
        </div>
      )}

      {/* Words container - shows 3 lines */}
      <div
        className={
          mode === "code"
            ? "rounded-lg border border-border bg-card overflow-hidden"
            : ""
        }
      >
        {/* Code editor header */}
        {mode === "code" && (
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-muted-foreground ml-2 font-mono">
              code.
              {codeLanguage === "typescript"
                ? "ts"
                : codeLanguage === "javascript"
                  ? "js"
                  : codeLanguage === "python"
                    ? "py"
                    : codeLanguage === "rust"
                      ? "rs"
                      : codeLanguage === "golang"
                        ? "go"
                        : codeLanguage === "csharp"
                          ? "cs"
                          : codeLanguage === "cpp"
                            ? "cpp"
                            : codeLanguage === "ruby"
                              ? "rb"
                              : codeLanguage === "swift"
                                ? "swift"
                                : codeLanguage === "kotlin"
                                  ? "kt"
                                  : codeLanguage === "scala"
                                    ? "scala"
                                    : codeLanguage === "php"
                                      ? "php"
                                      : codeLanguage === "liquid"
                                        ? "liquid"
                                        : codeLanguage}
            </span>
          </div>
        )}
        <div
          ref={containerRef}
          onClick={handleClick}
          tabIndex={-1}
          className={`relative overflow-hidden outline-none ${mode === "code" ? "p-4" : ""}`}
          style={{
            height: mode === "code" ? "auto" : `${lineHeight * 3}px`,
            maxHeight: mode === "code" ? "400px" : undefined,
          }}
        >
          {/* Hidden input for mobile keyboard support */}
          <input
            ref={hiddenInputRef}
            type="text"
            inputMode="text"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="absolute opacity-0 w-0 h-0 pointer-events-none"
            style={{ position: "absolute", left: "-9999px" }}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              // Re-focus to keep keyboard input working
              // Don't refocus if user clicked away intentionally (e.g., to settings)
              setTimeout(() => {
                const activeElement = document.activeElement;
                const isInteractiveElement =
                  activeElement?.tagName === "BUTTON" ||
                  activeElement?.tagName === "A" ||
                  activeElement?.tagName === "INPUT" ||
                  activeElement?.closest('[role="dialog"]');
                if (!isInteractiveElement) {
                  hiddenInputRef.current?.focus();
                }
              }, 0);
            }}
          />

          {/* Blur overlay when not revealed */}
          {showOverlay && (
            <div className="absolute inset-0 z-10 flex items-center font-bold text-xl text-shadow-2xs justify-center text-muted-foreground backdrop-blur-[2px] bg-background/50">
              {loading
                ? "Loading..."
                : paused
                  ? "Paused! Press any key to continue."
                  : "Click or press any key to start"}
            </div>
          )}

          {/* Code mode - IDE-like display with Shiki */}
          {mode === "code" ? (
            <CodeTypingBlock
              code={codeText}
              language={codeLanguage}
              typedChars={codeTypedChars}
              cursorPosition={codeCursorPos}
            />
          ) : (
            /* Words wrapper - scrolls up */
            <div
              ref={wordsContainerRef}
              className={`flex flex-wrap gap-x-2 sm:gap-x-3 font-medium gap-y-2 text-lg sm:text-xl md:text-2xl ${fontClassName} transition-transform duration-100 ease-out`}
              style={{
                transform: `translateY(-${scrollTop}px)`,
              }}
            >
              {words.map((word, wi) => (
                <div
                  key={wi}
                  ref={(el) => {
                    wordElementsRef.current[wi] = el;
                  }}
                >
                  <WordDisplay
                    word={word}
                    isActive={wi === wordIndex}
                    activeCharIdx={charIndex}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quote source */}
      {mode === "quote" && quoteSource && !showOverlay && (
        <div className="mt-4 text-sm text-muted-foreground text-center">
          — {quoteSource}
        </div>
      )}

      {/* Code mode hints */}
      {mode === "code" && !showOverlay && (
        <div className="mt-3 text-xs text-muted-foreground/70 text-center">
          <span className="text-muted-foreground">space</span> = skip whitespace
          • <span className="text-muted-foreground">enter</span> = new line (at
          end of line) • <span className="text-muted-foreground">tab</span> not
          supported
        </div>
      )}

      {/* Reset button */}
      <div className="flex flex-col items-center mt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw size={18} />
        </Button>
        <p className="mt-3 text-muted-foreground text-sm flex items-center gap-1">
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            CTRL
          </kbd>
          <span>+</span>
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            ENTER
          </kbd>
          <span className="text-muted-foreground/50">/</span>
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            ⌘
          </kbd>
          <span>+</span>
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            ENTER
          </kbd>
          <span>to restart</span>
        </p>
        <p className="mt-2 text-sm flex text-muted-foreground items-center gap-1">
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            ALT
          </kbd>
          <span>+</span>
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            F4
          </kbd>
          <span className="text-muted-foreground/30">/</span>
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            ⌘
          </kbd>
          <span>+</span>
          <kbd className="px-2 py-1 rounded-full bg-primary/15 text-primary font-mono">
            Q
          </kbd>
          <span>to boost WPM 😜</span>
        </p>
      </div>
    </div>
  );
};

export default TypingPractice;

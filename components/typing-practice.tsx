"use client";

import { generateWords } from "@/data/words";
import { getRandomQuote } from "@/data/quotes";
import { useTypingStore } from "@/store/typingStore";
import { useSettingsStore } from "@/store/settingsStore";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  memo,
} from "react";
import { useRouter } from "next/navigation";
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
              <span className="absolute left-0 top-0 w-[2px] h-full bg-caret animate-caret" />
            )}
            {char}
          </span>
        );
      })}

      {/* Cursor at end of word */}
      {isActive &&
        activeCharIdx >= word.chars.length + word.extraChars.length && (
          <span className="relative w-0">
            <span className="absolute left-0 top-0 w-[2px] h-full bg-caret animate-caret" />
          </span>
        )}
    </div>
  );
});

const TypingPractice = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [quoteSource, setQuoteSource] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
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
  const includeNumbers = useSettingsStore((state) => state.includeNumbers);
  const includePunctuation = useSettingsStore(
    (state) => state.includePunctuation
  );

  const showOverlay = !revealed || paused;
  const testActive =
    startTime !== null && endTime === null && !paused && revealed;

  const generateTest = useCallback(() => {
    if (mode === "quote") {
      const quote = getRandomQuote({ difficulty });
      const quoteWords = quote.text.split(" ");
      setQuoteSource(quote.source);
      reset(quoteWords);
    } else {
      const count = mode === "time" ? getWordsForTime(timeLimit) : wordCount;
      const wordList = generateWords({
        count,
        includeNumbers,
        includePunctuation,
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
    includeNumbers,
    includePunctuation,
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

  // Initialize on mount
  useEffect(() => {
    if (words.length === 0) {
      generateTest();
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Regenerate words when settings change
  useEffect(() => {
    if (!loading) {
      generateTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mode,
    wordCount,
    timeLimit,
    difficulty,
    includeNumbers,
    includePunctuation,
  ]);

  // Reset revealed state when paused
  useEffect(() => {
    if (paused) {
      setRevealed(false);
    }
  }, [paused]);

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

  // Navigate to results when test ends
  useEffect(() => {
    if (endTime !== null) {
      router.push("/results");
    }
  }, [endTime, router]);

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

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading || endTime) return;

      // Tab key to reset
      if (e.key === "Tab") {
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

      if (e.key === " ") {
        e.preventDefault();
        space();
        return;
      }

      if (e.key === "Backspace") {
        backspace();
        return;
      }

      if (e.key.length === 1) {
        typeChar(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
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
  ]);

  const handleClick = useCallback(() => {
    if (!revealed) {
      setRevealed(true);
    }
  }, [revealed]);

  const getOverlayMessage = () => {
    if (paused) {
      return "Test paused. Press any key to continue";
    }
    return "Click or press any key to start";
  };

  const progressDisplay = (() => {
    if (!testActive && startTime === null) return null;

    if (mode === "time") {
      const remainingSeconds = Math.max(
        0,
        timeLimit - Math.floor(elapsedTime / 1000)
      );
      return `${remainingSeconds}`;
    } else if (mode === "word") {
      return `${wordIndex}/${words.length}`;
    }
    return null;
  })();

  // Line height calculation
  const lineHeight = 40;

  return (
    <div className="relative w-full mt-16 sm:mt-24 md:mt-32">
      {/* Progress indicator */}
      {progressDisplay && !showOverlay && (
        <div className="absolute -top-10 sm:-top-12 md:-top-16 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl font-mono text-primary">
          {progressDisplay}
        </div>
      )}

      {/* Words container - shows 3 lines */}
      <div
        onClick={handleClick}
        className="relative overflow-hidden"
        style={{ height: `${lineHeight * 3}px` }}
      >
        {/* Blur overlay when paused/not started */}
        {showOverlay && (
          <div className="absolute inset-0 z-10 flex items-center font-bold text-xl text-shadow-2xs justify-center text-muted-foreground backdrop-blur-[2px] bg-background/50">
            {loading ? "Loading..." : getOverlayMessage()}
          </div>
        )}

        {/* Words wrapper - scrolls up */}
        <div
          ref={wordsContainerRef}
          className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-2 text-lg sm:text-xl md:text-2xl font-mono transition-transform duration-100 ease-out"
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
      </div>

      {/* Quote source */}
      {mode === "quote" && quoteSource && !showOverlay && (
        <div className="mt-4 text-sm text-muted-foreground text-center">
          — {quoteSource}
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
        <p className="mt-2 text-muted-foreground text-xs">
          <span className="text-primary">tab</span> to restart
        </p>
      </div>
    </div>
  );
};

export default TypingPractice;

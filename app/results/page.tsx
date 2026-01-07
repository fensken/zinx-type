"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingStore } from "@/store/typingStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useHistoryStore } from "@/store/historyStore";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function ResultsPage() {
  const router = useRouter();
  const hasSavedResult = useRef(false);

  const words = useTypingStore((state) => state.words);
  const startTime = useTypingStore((state) => state.startTime);
  const endTime = useTypingStore((state) => state.endTime);
  const pausedTime = useTypingStore((state) => state.pausedTime);
  const reset = useTypingStore((state) => state.reset);

  const mode = useSettingsStore((state) => state.mode);
  const wordCount = useSettingsStore((state) => state.wordCount);
  const timeLimit = useSettingsStore((state) => state.timeLimit);
  const difficulty = useSettingsStore((state) => state.difficulty);

  const results = useHistoryStore((state) => state.results);
  const addResult = useHistoryStore((state) => state.addResult);

  const getTestTypeLabel = useCallback(() => {
    if (mode === "quote") {
      return `quote ${difficulty}`;
    } else if (mode === "time") {
      return `time ${timeLimit}s`;
    } else {
      return `words ${wordCount}`;
    }
  }, [mode, difficulty, timeLimit, wordCount]);

  // Calculate stats from the completed test
  const stats = useMemo(() => {
    if (!startTime || !endTime || words.length === 0) {
      return null;
    }

    // Subtract paused time from total elapsed time
    const actualTime = endTime - startTime - pausedTime;
    const minutes = actualTime / 60000;
    const timeInSeconds = Math.round(actualTime / 1000);

    let correctChars = 0;
    let incorrectChars = 0;
    let extraChars = 0;

    words.forEach((word) => {
      word.chars.forEach((char) => {
        if (char.status === "correct") correctChars++;
        else if (char.status === "incorrect") incorrectChars++;
      });
      extraChars += word.extraChars.length;
    });

    const totalTyped = correctChars + incorrectChars + extraChars;
    const wpm = minutes > 0 ? Math.round(correctChars / 5 / minutes) : 0;
    const rawWpm = minutes > 0 ? Math.round(totalTyped / 5 / minutes) : 0;
    const accuracy =
      totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;

    return {
      wpm,
      rawWpm,
      accuracy,
      correctChars,
      incorrectChars,
      extraChars,
      time: timeInSeconds,
    };
  }, [words, startTime, endTime, pausedTime]);

  // Save result to history on mount (only once)
  useEffect(() => {
    if (!hasSavedResult.current && stats && stats.wpm > 0) {
      addResult({
        ...stats,
        mode: getTestTypeLabel(),
      });
      hasSavedResult.current = true;
    }
  }, [stats, addResult, getTestTypeLabel]);

  // Redirect to home if no test was completed
  useEffect(() => {
    if (!endTime && results.length === 0) {
      router.push("/");
    }
  }, [endTime, results.length, router]);

  const handleRestart = useCallback(() => {
    reset([]);
    router.push("/");
  }, [reset, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRestart]);

  // Show the most recent result from history if stats not available
  const displayStats = stats || results[0];
  const displayMode = stats ? getTestTypeLabel() : results[0]?.mode || "";
  const previousResults = stats ? results.slice(1) : results.slice(1);

  if (!displayStats) {
    return (
      <main className="my-4 md:my-6 px-4 md:px-6 justify-center flex flex-col items-center max-w-6xl mx-auto">
        <div className="text-muted-foreground">Loading...</div>
      </main>
    );
  }

  return (
    <main className="my-4 md:my-6 px-4 md:px-6 justify-center flex flex-col items-center max-w-6xl mx-auto">
      <div className="w-full max-w-4xl mx-auto font-mono">
        {/* Main Stats */}
        <div className="flex items-start justify-center gap-8 sm:gap-12 md:gap-16 mb-8 md:mb-12">
          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-1">wpm</div>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary">
              {displayStats.wpm}
            </div>
          </div>

          <div className="text-center">
            <div className="text-muted-foreground text-sm mb-1">acc</div>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground">
              {displayStats.accuracy}%
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center mb-8">
          <div>
            <div className="text-muted-foreground text-xs mb-1">test type</div>
            <div className="text-base md:text-lg">{displayMode}</div>
          </div>

          <div>
            <div className="text-muted-foreground text-xs mb-1">raw</div>
            <div className="text-base md:text-lg">{displayStats.rawWpm}</div>
          </div>

          <div>
            <div className="text-muted-foreground text-xs mb-1">characters</div>
            <div className="text-base md:text-lg">
              <span className="text-primary">{displayStats.correctChars}</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-destructive">
                {displayStats.incorrectChars}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">
                {displayStats.extraChars}
              </span>
            </div>
          </div>

          <div>
            <div className="text-muted-foreground text-xs mb-1">time</div>
            <div className="text-base md:text-lg">{displayStats.time}s</div>
          </div>
        </div>

        {/* Restart */}
        <div className="flex justify-center mt-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRestart}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw size={20} />
          </Button>
        </div>

        <p className="mt-4 text-center text-muted-foreground text-sm">
          press <span className="text-primary">ctrl/cmd + enter</span> to
          restart
        </p>

        {/* Recent Tests (Local Storage) */}
        {previousResults.length > 0 && (
          <div className="mt-10 md:mt-16 border-t border-border pt-6 md:pt-8">
            <h3 className="text-muted-foreground text-sm mb-4 text-center">
              recent tests{" "}
              <span className="text-muted-foreground/50">(saved locally)</span>
            </h3>
            <div className="space-y-3">
              {previousResults.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 py-3 bg-card rounded-lg gap-2 sm:gap-0"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-primary font-bold text-lg sm:text-xl">
                      {result.wpm}
                      <span className="text-muted-foreground text-xs ml-1">
                        wpm
                      </span>
                    </div>
                    <div className="text-foreground text-sm sm:text-base">
                      {result.accuracy}%
                      <span className="text-muted-foreground text-xs ml-1">
                        acc
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground text-xs sm:text-sm">
                    <span>{result.mode}</span>
                    <span>{formatTime(result.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

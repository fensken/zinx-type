"use client";

import { useEffect, useMemo, useRef, useCallback } from "react";
import {
  RotateCcw,
  Trophy,
  TrendingUp,
  Flame,
  Target,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTypingStore } from "@/store/typingStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useHistoryStore } from "@/store/historyStore";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

interface ResultsProps {
  onRestart: () => void;
}

const Results = ({ onRestart }: ResultsProps) => {
  const hasSavedResult = useRef(false);

  const words = useTypingStore((state) => state.words);
  const startTime = useTypingStore((state) => state.startTime);
  const endTime = useTypingStore((state) => state.endTime);
  const pausedTime = useTypingStore((state) => state.pausedTime);

  const mode = useSettingsStore((state) => state.mode);
  const wordCount = useSettingsStore((state) => state.wordCount);
  const timeLimit = useSettingsStore((state) => state.timeLimit);
  const difficulty = useSettingsStore((state) => state.difficulty);
  const language = useSettingsStore((state) => state.language);

  const results = useHistoryStore((state) => state.results);
  const addResult = useHistoryStore((state) => state.addResult);
  const personalBests = useHistoryStore((state) => state.personalBests);
  const totalTestsCompleted = useHistoryStore(
    (state) => state.totalTestsCompleted,
  );
  const overallBestWpm = useHistoryStore((state) => state.overallBestWpm);
  const currentStreak = useHistoryStore((state) => state.currentStreak);
  const getAverageWpm = useHistoryStore((state) => state.getAverageWpm);
  const getImprovementPercentage = useHistoryStore(
    (state) => state.getImprovementPercentage,
  );

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

  const modeKey = getTestTypeLabel();
  const personalBest = personalBests[modeKey];
  const isNewPersonalBest =
    stats && personalBest && stats.wpm >= personalBest.wpm;

  // Save result to history on mount (only once)
  useEffect(() => {
    if (!hasSavedResult.current && stats && stats.wpm > 0) {
      addResult({
        ...stats,
        mode: getTestTypeLabel(),
        language,
      });
      hasSavedResult.current = true;
    }
  }, [stats, addResult, getTestTypeLabel, language]);

  // Ctrl+Enter to restart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onRestart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRestart]);

  // Show the most recent result from history if stats not available
  const displayStats = stats || results[0];
  const displayMode = stats ? getTestTypeLabel() : results[0]?.mode || "";
  const previousResults = stats ? results.slice(0, 5) : results.slice(1, 6);

  const averageWpm = getAverageWpm(7);
  const improvement = getImprovementPercentage();

  if (!displayStats) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto font-mono">
      {/* New Personal Best Badge */}
      {isNewPersonalBest && (
        <div className="flex items-center justify-center gap-2 mb-4 text-amber-500">
          <Trophy className="w-5 h-5" />
          <span className="text-sm font-bold">New Personal Best!</span>
          <Trophy className="w-5 h-5" />
        </div>
      )}

      {/* Main Stats */}
      <div className="flex items-start justify-center gap-8 sm:gap-12 md:gap-16 mb-8 md:mb-12 mt-8 md:mt-16">
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

      {/* Personal Stats Summary */}
      {totalTestsCompleted > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center mb-8 p-4 bg-card rounded-lg">
          <div className="flex flex-col items-center gap-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            <div className="text-xs text-muted-foreground">best wpm</div>
            <div className="text-lg font-bold text-amber-500">
              {overallBestWpm}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Target className="w-4 h-4 text-primary" />
            <div className="text-xs text-muted-foreground">avg (7d)</div>
            <div className="text-lg font-bold">{Math.round(averageWpm)}</div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Hash className="w-4 h-4 text-blue-500" />
            <div className="text-xs text-muted-foreground">tests</div>
            <div className="text-lg font-bold text-blue-500">
              {totalTestsCompleted}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <TrendingUp
              className={`w-4 h-4 ${improvement >= 0 ? "text-emerald-500" : "text-destructive"}`}
            />
            <div className="text-xs text-muted-foreground">vs last</div>
            <div
              className={`text-lg font-bold ${improvement >= 0 ? "text-emerald-500" : "text-destructive"}`}
            >
              {improvement === 0
                ? "--"
                : `${improvement >= 0 ? "+" : ""}${Math.round(improvement)}%`}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Flame
              className={`w-4 h-4 ${currentStreak > 0 ? "text-orange-500" : "text-muted-foreground"}`}
            />
            <div className="text-xs text-muted-foreground">streak</div>
            <div
              className={`text-lg font-bold ${currentStreak > 0 ? "text-orange-500" : ""}`}
            >
              {currentStreak} day{currentStreak !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      )}

      {/* Personal Best for Current Mode */}
      {personalBest && !isNewPersonalBest && (
        <div className="text-center mb-6 text-sm text-muted-foreground">
          Personal best for {modeKey}:{" "}
          <span className="text-amber-500 font-bold">{personalBest.wpm}</span>{" "}
          wpm
        </div>
      )}

      {/* Restart */}
      <div className="flex justify-center mt-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRestart}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw size={20} />
        </Button>
      </div>

      <div className="flex flex-col items-center mt-4 gap-2">
        <p className="text-muted-foreground text-sm flex items-center gap-1">
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
        <p className="text-sm flex text-muted-foreground items-center gap-1">
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

      {/* Session History */}
      {previousResults.length > 0 && (
        <div className="mt-10 md:mt-16 border-t border-border pt-6 md:pt-8">
          <h3 className="text-muted-foreground text-sm mb-4 text-center">
            recent history ({totalTestsCompleted} tests completed)
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
                  {result.language && result.language !== "english" && (
                    <span className="text-primary">{result.language}</span>
                  )}
                  <span>{formatTime(result.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;

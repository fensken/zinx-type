"use client";

import {
  AtSign,
  Clock,
  Hash,
  QuoteIcon,
  WholeWordIcon,
  Flame,
  Leaf,
  Gauge,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Separator } from "./ui/separator";
import { useSettingsStore, TestMode } from "@/store/settingsStore";
import { Difficulty } from "@/data/quotes";

const TypingToolbar = () => {
  const timeOptions = [15, 30, 60, 120];
  const wordOptions = [10, 25, 50, 100];

  const mode = useSettingsStore((state) => state.mode);
  const wordCount = useSettingsStore((state) => state.wordCount);
  const timeLimit = useSettingsStore((state) => state.timeLimit);
  const difficulty = useSettingsStore((state) => state.difficulty);
  const includeNumbers = useSettingsStore((state) => state.includeNumbers);
  const includePunctuation = useSettingsStore(
    (state) => state.includePunctuation
  );

  const setMode = useSettingsStore((state) => state.setMode);
  const setWordCount = useSettingsStore((state) => state.setWordCount);
  const setTimeLimit = useSettingsStore((state) => state.setTimeLimit);
  const setDifficulty = useSettingsStore((state) => state.setDifficulty);
  const setIncludeNumbers = useSettingsStore(
    (state) => state.setIncludeNumbers
  );
  const setIncludePunctuation = useSettingsStore(
    (state) => state.setIncludePunctuation
  );

  const handleModeChange = (values: readonly string[]) => {
    const value = values[0];
    if (value) {
      setMode(value as TestMode);
    }
  };

  const handleTimeChange = (values: readonly string[]) => {
    const value = values[0];
    if (value) {
      setTimeLimit(parseInt(value));
    }
  };

  const handleWordCountChange = (values: readonly string[]) => {
    const value = values[0];
    if (value) {
      setWordCount(parseInt(value));
    }
  };

  const handleDifficultyChange = (values: readonly string[]) => {
    const value = values[0];
    if (value) {
      setDifficulty(value as Difficulty);
    }
  };

  const getPunctuationNumbersValue = (): string[] => {
    const values: string[] = [];
    if (includePunctuation) values.push("punctuation");
    if (includeNumbers) values.push("numbers");
    return values;
  };

  const handlePunctuationNumbersChange = (values: readonly string[]) => {
    setIncludePunctuation(values.includes("punctuation"));
    setIncludeNumbers(values.includes("numbers"));
  };

  return (
    <div className="flex items-center justify-center gap-x-2 sm:gap-x-3 gap-y-2 font-mono text-xs flex-wrap">
      {mode !== "quote" && (
        <>
          <ToggleGroup
            multiple
            variant="outline"
            value={getPunctuationNumbersValue()}
            onValueChange={handlePunctuationNumbersChange}
          >
            <ToggleGroupItem
              value="punctuation"
              aria-label="Toggle punctuation"
              className="data-[pressed]:text-primary"
            >
              <AtSign className="w-4 h-4" />
              <span className="hidden sm:inline">punctuation</span>
            </ToggleGroupItem>
            <ToggleGroupItem
              value="numbers"
              aria-label="Toggle numbers"
              className="data-[pressed]:text-primary"
            >
              <Hash className="w-4 h-4" />
              <span className="hidden sm:inline">numbers</span>
            </ToggleGroupItem>
          </ToggleGroup>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />
        </>
      )}

      <ToggleGroup
        variant="outline"
        value={[mode]}
        onValueChange={handleModeChange}
      >
        <ToggleGroupItem
          value="time"
          aria-label="Time mode"
          className="data-[pressed]:text-primary"
        >
          <Clock className="w-4 h-4" />
          <span className="hidden sm:inline">time</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="word"
          aria-label="Word mode"
          className="data-[pressed]:text-primary"
        >
          <WholeWordIcon className="w-4 h-4" />
          <span className="hidden sm:inline">word</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="quote"
          aria-label="Quote mode"
          className="data-[pressed]:text-primary"
        >
          <QuoteIcon className="w-4 h-4" />
          <span className="hidden sm:inline">quote</span>
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="h-6 hidden sm:block" />

      {mode === "time" && (
        <ToggleGroup
          variant="outline"
          value={[timeLimit.toString()]}
          onValueChange={handleTimeChange}
        >
          {timeOptions.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option.toString()}
              aria-label={`${option} seconds`}
              className="data-[pressed]:text-primary"
            >
              {option}s
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}

      {mode === "word" && (
        <ToggleGroup
          variant="outline"
          value={[wordCount.toString()]}
          onValueChange={handleWordCountChange}
        >
          {wordOptions.map((option) => (
            <ToggleGroupItem
              key={option}
              value={option.toString()}
              aria-label={`${option} words`}
              className="data-[pressed]:text-primary"
            >
              {option}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}

      {mode === "quote" && (
        <ToggleGroup
          variant="outline"
          value={[difficulty]}
          onValueChange={handleDifficultyChange}
        >
          <ToggleGroupItem
            value="easy"
            aria-label="Easy difficulty"
            className="data-[pressed]:text-emerald-500"
          >
            <Leaf className="w-4 h-4" />
            <span className="hidden sm:inline">easy</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="medium"
            aria-label="Medium difficulty"
            className="data-[pressed]:text-amber-500"
          >
            <Gauge className="w-4 h-4" />
            <span className="hidden sm:inline">medium</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="hard"
            aria-label="Hard difficulty"
            className="data-[pressed]:text-destructive"
          >
            <Flame className="w-4 h-4" />
            <span className="hidden sm:inline">hard</span>
          </ToggleGroupItem>
        </ToggleGroup>
      )}
    </div>
  );
};

export default TypingToolbar;

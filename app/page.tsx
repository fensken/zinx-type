"use client";

import { useCallback } from "react";
import TypingPractice from "@/components/typing-practice";
import TypingToolbar from "@/components/typing-toolbar";
import Results from "@/components/results";
import { useTypingStore } from "@/store/typingStore";

export default function Page() {
  const endTime = useTypingStore((state) => state.endTime);
  const reset = useTypingStore((state) => state.reset);

  const handleRestart = useCallback(() => {
    reset([]);
  }, [reset]);

  const showResults = endTime !== null;

  return (
    <main
      className={`min-h-full px-3 sm:px-4 md:px-6 flex flex-col items-center justify-center mx-auto py-4 md:py-6 ${showResults ? "max-w-7xl" : "max-w-6xl"}`}
    >
      {showResults ? (
        <Results onRestart={handleRestart} />
      ) : (
        <div className="flex flex-col items-center w-full gap-8 sm:gap-12 md:gap-16">
          <TypingToolbar />
          <TypingPractice />
        </div>
      )}
    </main>
  );
}

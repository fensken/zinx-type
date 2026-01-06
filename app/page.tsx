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
    <main className="my-4 md:my-6 px-3 sm:px-4 md:px-6 justify-center flex flex-col items-center max-w-6xl mx-auto">
      {showResults ? (
        <Results onRestart={handleRestart} />
      ) : (
        <>
          <TypingToolbar />
          <TypingPractice />
        </>
      )}
    </main>
  );
}

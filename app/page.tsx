"use client";

import { useCallback, useSyncExternalStore } from "react";
import TypingPractice from "@/components/typing-practice";
import TypingToolbar from "@/components/typing-toolbar";
import Results from "@/components/results";
import { useTypingStore } from "@/store/typingStore";
import { useSettingsStore } from "@/store/settingsStore";

// Helper to check if mounted on client
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Skeleton component for loading state
function PageSkeleton() {
  return (
    <div className="flex flex-col items-center w-full gap-8 sm:gap-12 md:gap-16 animate-pulse">
      {/* Toolbar skeleton */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="h-8 w-24 sm:w-32 bg-muted/40 rounded-md" />
        <div className="h-8 w-48 sm:w-64 bg-muted/40 rounded-md" />
        <div className="h-8 w-32 sm:w-40 bg-muted/40 rounded-md" />
      </div>
      {/* Typing area skeleton */}
      <div className="w-full max-w-4xl space-y-4">
        <div className="h-8 w-16 bg-muted/40 rounded-md" />
        <div className="space-y-3">
          <div className="h-8 w-full bg-muted/40 rounded-md" />
          <div className="h-8 w-full bg-muted/40 rounded-md" />
          <div className="h-8 w-3/4 bg-muted/40 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const hasHydrated = useSettingsStore((state) => state._hasHydrated);
  const endTime = useTypingStore((state) => state.endTime);
  const reset = useTypingStore((state) => state.reset);

  const handleRestart = useCallback(() => {
    reset([]);
  }, [reset]);

  const isLoading = !mounted || !hasHydrated;
  const showResults = endTime !== null && !isLoading;

  return (
    <main
      className={`min-h-full px-3 sm:px-4 md:px-6 flex flex-col items-center justify-center mx-auto py-4 md:py-6 ${showResults ? "max-w-7xl" : "max-w-6xl"}`}
    >
      {isLoading ? (
        <PageSkeleton />
      ) : showResults ? (
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

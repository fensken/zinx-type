"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  Target,
  Clock,
  Flame,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHistoryStore } from "@/store/historyStore";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${mins}m`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StatsPage() {
  const router = useRouter();

  const results = useHistoryStore((state) => state.results);
  const dailyStats = useHistoryStore((state) => state.dailyStats);
  const totalTestsCompleted = useHistoryStore(
    (state) => state.totalTestsCompleted,
  );
  const totalTimeTyping = useHistoryStore((state) => state.totalTimeTyping);
  const currentStreak = useHistoryStore((state) => state.currentStreak);
  const longestStreak = useHistoryStore((state) => state.longestStreak);
  const getAverageWpm = useHistoryStore((state) => state.getAverageWpm);
  const getAverageAccuracy = useHistoryStore(
    (state) => state.getAverageAccuracy,
  );
  const getImprovementPercentage = useHistoryStore(
    (state) => state.getImprovementPercentage,
  );

  // Calculate stats from the stored results (last 10 tests only)
  const stats = useMemo(() => {
    const avgWpm = getAverageWpm();
    const avgAccuracy = getAverageAccuracy();
    const improvement = getImprovementPercentage();

    // Best WPM and accuracy from stored results
    const bestWpm =
      results.length > 0 ? Math.max(...results.map((r) => r.wpm)) : 0;
    const bestAccuracy =
      results.length > 0 ? Math.max(...results.map((r) => r.accuracy)) : 0;

    return {
      avgWpm: Math.round(avgWpm),
      avgAccuracy: Math.round(avgAccuracy),
      improvement: Math.round(improvement * 10) / 10,
      bestWpm,
      bestAccuracy,
    };
  }, [results, getAverageWpm, getAverageAccuracy, getImprovementPercentage]);

  // Get WPM distribution for simple bar chart (from stored results)
  const wpmDistribution = useMemo(() => {
    if (results.length === 0) return [];

    const testsToShow = results.slice().reverse(); // oldest to newest
    const maxWpm = Math.max(...testsToShow.map((r) => r.wpm), 1);

    return testsToShow.map((r) => ({
      wpm: r.wpm,
      accuracy: r.accuracy,
      height: (r.wpm / maxWpm) * 100,
    }));
  }, [results]);

  // Personal bests as array (from stored results only)
  const personalBestsArray = useMemo(() => {
    // Calculate personal bests from the last 10 stored results
    const bestsByMode: Record<
      string,
      { wpm: number; accuracy: number; timestamp: number; mode: string }
    > = {};

    results.forEach((result) => {
      const modeKey = result.mode;
      if (!bestsByMode[modeKey] || result.wpm > bestsByMode[modeKey].wpm) {
        bestsByMode[modeKey] = {
          wpm: result.wpm,
          accuracy: result.accuracy,
          timestamp: result.timestamp,
          mode: modeKey,
        };
      }
    });

    return Object.values(bestsByMode).sort((a, b) => b.wpm - a.wpm);
  }, [results]);

  if (results.length === 0) {
    return (
      <main className="my-4 md:my-6 px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto">
        <div className="w-full max-w-4xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
            className="mb-6 text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">No Stats Yet</h2>
            <p className="text-muted-foreground mb-2">
              Complete some typing tests to see your statistics here.
            </p>
            <p className="text-muted-foreground/60 text-sm flex items-center justify-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" />
              Stats are saved locally in your browser
            </p>
            <Button
              variant="default"
              className="mt-6"
              onClick={() => router.push("/")}
            >
              Start Typing
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="my-4 md:my-6 px-4 md:px-6 flex flex-col items-center max-w-6xl mx-auto">
      <div className="w-full max-w-4xl font-mono">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          className="mb-6 text-muted-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Your Stats</h1>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Saved locally (last 10 tests)</span>
          </div>
        </div>

        {/* Overview Stats - Based on stored results */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Best WPM
            </div>
            <div className="text-3xl font-bold text-primary">
              {stats.bestWpm}
            </div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              from last {results.length} tests
            </div>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <Target className="w-4 h-4 text-green-500" />
              Best Accuracy
            </div>
            <div className="text-3xl font-bold">{stats.bestAccuracy}%</div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              from last {results.length} tests
            </div>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Time Typing
            </div>
            <div className="text-3xl font-bold">
              {formatDuration(totalTimeTyping)}
            </div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              total session time
            </div>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              Tests Done
            </div>
            <div className="text-3xl font-bold">{totalTestsCompleted}</div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              this session
            </div>
          </div>
        </div>

        {/* Streak and Averages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Current Streak
            </div>
            <div className="text-2xl font-bold">
              {currentStreak}{" "}
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              <Flame className="w-4 h-4 text-red-500" />
              Best Streak
            </div>
            <div className="text-2xl font-bold">
              {longestStreak}{" "}
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="text-muted-foreground text-xs mb-2">Avg WPM</div>
            <div className="text-2xl font-bold">{stats.avgWpm}</div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              last {results.length} tests
            </div>
          </div>

          <div className="bg-card rounded-lg p-4">
            <div className="text-muted-foreground text-xs mb-2">
              Avg Accuracy
            </div>
            <div className="text-2xl font-bold">{stats.avgAccuracy}%</div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              last {results.length} tests
            </div>
          </div>
        </div>

        {/* Improvement indicator */}
        {results.length >= 5 && (
          <div className="bg-card rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
              {stats.improvement >= 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              Recent Trend
            </div>
            <div
              className={`text-2xl font-bold ${stats.improvement >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stats.improvement > 0 ? "+" : ""}
              {stats.improvement}%
            </div>
            <div className="text-xs text-muted-foreground/60 mt-1">
              comparing first vs last 5 tests
            </div>
          </div>
        )}

        {/* WPM Chart (from stored results) */}
        {wpmDistribution.length > 0 && (
          <div className="bg-card rounded-lg p-4 mb-8">
            <h3 className="text-sm text-muted-foreground mb-4">
              Your Last {wpmDistribution.length} Tests
            </h3>
            <div className="flex items-end gap-1 h-32">
              {wpmDistribution.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 group relative"
                  style={{ height: "100%" }}
                >
                  <div
                    className={`absolute bottom-0 w-full rounded-t transition-all ${
                      d.accuracy >= 95
                        ? "bg-primary"
                        : d.accuracy >= 85
                          ? "bg-primary/70"
                          : "bg-primary/40"
                    } group-hover:bg-primary`}
                    style={{ height: `${d.height}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {d.wpm} WPM / {d.accuracy}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground/50 mt-2">
              <span>oldest</span>
              <span>newest</span>
            </div>
          </div>
        )}

        {/* Personal Bests by Mode (from stored results) */}
        {personalBestsArray.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Best Scores by Mode
              <span className="text-muted-foreground/50">(last 10 tests)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalBestsArray.map((pb) => (
                <div
                  key={pb.mode}
                  className="bg-card rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {pb.mode}
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {pb.wpm} <span className="text-sm">WPM</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{pb.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(pb.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily Stats */}
        {dailyStats.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Daily Summary
              <span className="text-muted-foreground/50">(last 7 days)</span>
            </h3>
            <div className="space-y-2">
              {dailyStats.map((day) => (
                <div
                  key={day.date}
                  className="bg-card rounded-lg p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium">{day.date}</div>
                    <div className="text-xs text-muted-foreground">
                      {day.testsCompleted} tests
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">avg:</span>{" "}
                      <span className="font-medium">
                        {Math.round(day.averageWpm)} WPM
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">best:</span>{" "}
                      <span className="font-medium text-primary">
                        {day.bestWpm} WPM
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent History */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-4">
            Test History
            <span className="text-muted-foreground/50 ml-2">
              (last 10 saved)
            </span>
          </h3>
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-card rounded-lg p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="text-primary font-bold">
                    {result.wpm}{" "}
                    <span className="text-xs text-muted-foreground">WPM</span>
                  </div>
                  <div>
                    {result.accuracy}%{" "}
                    <span className="text-xs text-muted-foreground">acc</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{result.mode}</span>
                  <span>{formatDate(result.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local storage notice */}
        <div className="mt-8 pt-4 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/50 flex items-center justify-center gap-1.5">
            <HardDrive className="w-3 h-3" />
            All data is stored locally in your browser. Nothing is sent to any
            server.
          </p>
        </div>
      </div>
    </main>
  );
}

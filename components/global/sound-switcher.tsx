"use client";

import { useState, useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundStore, soundPackOptions } from "@/store/soundStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Helper to check if component is mounted on client
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const SoundSwitcher = () => {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const enabled = useSoundStore((state) => state.enabled);
  const volume = useSoundStore((state) => state.volume);
  const soundPack = useSoundStore((state) => state.soundPack);
  const keySound = useSoundStore((state) => state.keySound);
  const errorSound = useSoundStore((state) => state.errorSound);
  const completionSound = useSoundStore((state) => state.completionSound);

  const toggleSound = useSoundStore((state) => state.toggleSound);
  const setVolume = useSoundStore((state) => state.setVolume);
  const setSoundPack = useSoundStore((state) => state.setSoundPack);
  const setKeySound = useSoundStore((state) => state.setKeySound);
  const setErrorSound = useSoundStore((state) => state.setErrorSound);
  const setCompletionSound = useSoundStore((state) => state.setCompletionSound);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9" disabled>
        <Volume2 className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9"
        aria-label="Sound settings"
        onClick={() => setOpen(true)}
      >
        {enabled ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-3 py-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sound Settings</span>
            </div>
            <Button
              variant={enabled ? "default" : "outline"}
              size="sm"
              onClick={toggleSound}
              className="h-7 text-xs"
            >
              {enabled ? "On" : "Off"}
            </Button>
          </div>

          {enabled && (
            <div className="max-h-[300px] overflow-y-auto py-2">
              {/* Volume Slider */}
              <div className="px-3 py-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Sound Pack Selection */}
              <div className="px-3 py-2 border-t border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Sound Pack
                </span>
                <div className="mt-2 space-y-1">
                  {soundPackOptions
                    .filter((p) => p.id !== "none")
                    .map((pack) => (
                      <button
                        key={pack.id}
                        onClick={() => setSoundPack(pack.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-2 py-1.5 text-sm rounded transition-colors",
                          soundPack === pack.id
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                        )}
                      >
                        <span className="flex-1 text-left">{pack.name}</span>
                        {soundPack === pack.id && (
                          <span className="text-primary text-xs">active</span>
                        )}
                      </button>
                    ))}
                </div>
              </div>

              {/* Individual Sound Toggles */}
              <div className="px-3 py-2 border-t border-border">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  Sound Types
                </span>
                <div className="mt-2 space-y-1">
                  <label className="flex items-center justify-between cursor-pointer px-2 py-1.5 rounded hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">
                      Key press
                    </span>
                    <input
                      type="checkbox"
                      checked={keySound}
                      onChange={(e) => setKeySound(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer px-2 py-1.5 rounded hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">Error</span>
                    <input
                      type="checkbox"
                      checked={errorSound}
                      onChange={(e) => setErrorSound(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer px-2 py-1.5 rounded hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">
                      Completion
                    </span>
                    <input
                      type="checkbox"
                      checked={completionSound}
                      onChange={(e) => setCompletionSound(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-border px-3 py-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Volume2 className="h-3 w-3" />
              <span>{enabled ? "Sound enabled" : "Sound disabled"}</span>
            </div>
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SoundSwitcher;

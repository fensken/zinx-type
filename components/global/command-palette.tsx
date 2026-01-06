"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useTheme } from "next-themes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useThemeStore, themeOptions, ThemeName } from "@/store/themeStore";
import { cn } from "@/lib/utils";
import { Search, Palette } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const { setTheme: setNextTheme } = useTheme();
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredThemes = useMemo(
    () =>
      themeOptions.filter((t) =>
        t.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const applyTheme = useCallback(
    (themeName: ThemeName) => {
      const root = document.documentElement;
      // Remove any existing theme classes
      root.classList.forEach((cls) => {
        if (cls.startsWith("theme-")) {
          root.classList.remove(cls);
        }
      });

      if (themeName === "light") {
        setNextTheme("light");
        root.classList.remove("dark");
      } else if (themeName === "dark") {
        setNextTheme("dark");
        root.classList.add("dark");
      } else {
        setNextTheme("dark");
        root.classList.add("dark");
        root.classList.add(`theme-${themeName}`);
      }
    },
    [setNextTheme],
  );

  const handleSelect = useCallback(
    (themeName: ThemeName) => {
      setTheme(themeName);
      applyTheme(themeName);
      onOpenChange(false);
      setSearch("");
    },
    [setTheme, applyTheme, onOpenChange],
  );

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Reset selectedIndex when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Scroll selected item into view
  useEffect(() => {
    if (open && listRef.current) {
      const selectedElement = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`,
      );
      selectedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => (i < filteredThemes.length - 1 ? i + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => (i > 0 ? i - 1 : filteredThemes.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredThemes[selectedIndex]) {
            handleSelect(filteredThemes[selectedIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          onOpenChange(false);
          break;
      }
    },
    [filteredThemes, selectedIndex, handleSelect, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="flex items-center border-b border-border px-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search themes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[300px] overflow-y-auto py-2">
          {filteredThemes.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No themes found.
            </div>
          ) : (
            filteredThemes.map((t, index) => (
              <button
                key={t.value}
                data-index={index}
                onClick={() => handleSelect(t.value)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                  selectedIndex === index
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <div
                    className="w-4 h-4 rounded-sm border border-border/50"
                    style={{ backgroundColor: t.colors.bg }}
                  />
                  <div
                    className="w-4 h-4 rounded-sm border border-border/50"
                    style={{ backgroundColor: t.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-sm border border-border/50"
                    style={{ backgroundColor: t.colors.text }}
                  />
                </div>
                <span className="flex-1 text-left">{t.label}</span>
                {theme === t.value && (
                  <span className="text-primary text-xs">active</span>
                )}
              </button>
            ))
          )}
        </div>

        <div className="border-t border-border px-3 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Palette className="h-3 w-3" />
            <span>{themeOptions.length} themes</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-[10px]">
              ↑↓
            </kbd>
            <span>navigate</span>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono text-[10px]">
              ↵
            </kbd>
            <span>select</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;

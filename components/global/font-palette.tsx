"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useFontStore, fontOptions, FontName } from "@/store/fontStore";
import { cn } from "@/lib/utils";
import { Search, Type } from "lucide-react";

interface FontPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FontPalette = ({ open, onOpenChange }: FontPaletteProps) => {
  const font = useFontStore((state) => state.font);
  const setFont = useFontStore((state) => state.setFont);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredFonts = useMemo(
    () =>
      fontOptions.filter((f) =>
        f.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const handleSelect = useCallback(
    (fontName: FontName) => {
      setFont(fontName);
      onOpenChange(false);
      setSearch("");
    },
    [setFont, onOpenChange],
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
          setSelectedIndex((i) => (i < filteredFonts.length - 1 ? i + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => (i > 0 ? i - 1 : filteredFonts.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredFonts[selectedIndex]) {
            handleSelect(filteredFonts[selectedIndex].value);
          }
          break;
        case "Escape":
          e.preventDefault();
          onOpenChange(false);
          break;
      }
    },
    [filteredFonts, selectedIndex, handleSelect, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="flex items-center border-b border-border px-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search fonts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[250px] sm:max-h-[300px] overflow-y-auto py-2">
          {filteredFonts.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No fonts found.
            </div>
          ) : (
            filteredFonts.map((f, index) => (
              <button
                key={f.value}
                data-index={index}
                onClick={() => handleSelect(f.value)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                  selectedIndex === index
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className={cn("flex-1 text-left", f.className)}>
                  {f.label}
                </span>
                {font === f.value && (
                  <span className="text-primary text-xs">active</span>
                )}
              </button>
            ))
          )}
        </div>

        <div className="border-t border-border px-3 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Type className="h-3 w-3" />
            <span>{fontOptions.length} fonts</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
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

export default FontPalette;

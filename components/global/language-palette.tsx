"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSettingsStore } from "@/store/settingsStore";
import {
  type NaturalLanguage,
  naturalLanguageOptions,
} from "@/data/languages";
import { cn } from "@/lib/utils";
import { Search, Languages } from "lucide-react";

interface LanguagePaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LanguagePalette = ({ open, onOpenChange }: LanguagePaletteProps) => {
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prevOpenRef = useRef(open);

  const filteredLanguages = useMemo(
    () =>
      naturalLanguageOptions.filter((l) =>
        l.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const handleSelect = useCallback(
    (langId: NaturalLanguage) => {
      setLanguage(langId);
      onOpenChange(false);
      setSearch("");
    },
    [setLanguage, onOpenChange],
  );

  // Reset state when dialog opens and focus input
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(timer);
    }
    prevOpenRef.current = open;
  }, [open]);

  // Handle open change with state reset
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (newOpen) {
        setSearch("");
        setSelectedIndex(0);
      }
      onOpenChange(newOpen);
    },
    [onOpenChange],
  );

  // Reset selectedIndex when search changes
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setSelectedIndex(0);
    },
    [],
  );

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
          setSelectedIndex((i) =>
            i < filteredLanguages.length - 1 ? i + 1 : 0,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) =>
            i > 0 ? i - 1 : filteredLanguages.length - 1,
          );
          break;
        case "Enter":
          e.preventDefault();
          if (filteredLanguages[selectedIndex]) {
            handleSelect(filteredLanguages[selectedIndex].id as NaturalLanguage);
          }
          break;
        case "Escape":
          e.preventDefault();
          onOpenChange(false);
          break;
      }
    },
    [filteredLanguages, selectedIndex, handleSelect, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="flex items-center border-b border-border px-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search languages..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent py-3 px-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          className="max-h-[250px] sm:max-h-[300px] overflow-y-auto py-2"
        >
          {filteredLanguages.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No languages found.
            </div>
          ) : (
            filteredLanguages.map((l, index) => (
              <button
                key={l.id}
                data-index={index}
                onClick={() => handleSelect(l.id as NaturalLanguage)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
                  selectedIndex === index
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="text-lg">{l.flag}</span>
                <span className="flex-1 text-left">{l.name}</span>
                {language === l.id && (
                  <span className="text-primary text-xs">active</span>
                )}
              </button>
            ))
          )}
        </div>

        <div className="border-t border-border px-3 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Languages className="h-3 w-3" />
            <span>{naturalLanguageOptions.length} languages</span>
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

export default LanguagePalette;

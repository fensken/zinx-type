"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/settingsStore";
import { naturalLanguageOptions } from "@/data/languages";
import LanguagePalette from "./language-palette";

const LanguageSwitcher = () => {
  const language = useSettingsStore((state) => state.language);
  const hasHydrated = useSettingsStore((state) => state._hasHydrated);
  const [open, setOpen] = useState(false);

  // Find current language option - only show flag after hydration to prevent flash
  const currentLanguage = hasHydrated
    ? naturalLanguageOptions.find((l) => l.id === language)
    : null;

  // Keyboard shortcut: Ctrl/Cmd + Shift + L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "l"
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setOpen(true)}
        title={currentLanguage?.name || "Language"}
      >
        {currentLanguage?.flag ? (
          <span
            className="text-base"
            style={{
              fontFamily:
                "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiOne Color', sans-serif",
            }}
          >
            {currentLanguage.flag}
          </span>
        ) : (
          <Languages className="h-4 w-4" />
        )}
        <span className="sr-only">Change language</span>
      </Button>
      <LanguagePalette open={open} onOpenChange={setOpen} />
    </>
  );
};

export default LanguageSwitcher;

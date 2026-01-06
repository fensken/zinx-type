"use client";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/themeStore";
import CommandPalette from "./command-palette";

const ThemeSwitcher = () => {
  const { setTheme: setNextTheme } = useTheme();
  const theme = useThemeStore((state) => state.theme);
  const [open, setOpen] = useState(false);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    // Remove any existing theme classes
    root.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        root.classList.remove(cls);
      }
    });

    if (theme === "light") {
      setNextTheme("light");
      root.classList.remove("dark");
    } else if (theme === "dark") {
      setNextTheme("dark");
      root.classList.add("dark");
    } else {
      setNextTheme("dark");
      root.classList.add("dark");
      root.classList.add(`theme-${theme}`);
    }
  }, [theme, setNextTheme]);

  // Keyboard shortcut: Ctrl/Cmd + Shift + T
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "t"
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
      >
        <Palette className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
};

export default ThemeSwitcher;

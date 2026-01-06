"use client";

import { Type } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FontPalette from "./font-palette";

const FontSwitcher = () => {
  const [open, setOpen] = useState(false);

  // Keyboard shortcut: Ctrl/Cmd + Shift + F
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "f"
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
        <Type className="h-4 w-4" />
        <span className="sr-only">Change font</span>
      </Button>
      <FontPalette open={open} onOpenChange={setOpen} />
    </>
  );
};

export default FontSwitcher;

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/settingsStore";

interface CustomTextModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomTextModal({ open, onOpenChange }: CustomTextModalProps) {
  const { customText, setCustomText, setMode } = useSettingsStore();
  const [text, setText] = useState(customText);

  const handleSave = () => {
    if (text.trim().length < 10) {
      return;
    }
    setCustomText(text.trim());
    setMode("custom");
    onOpenChange(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setText(customText);
    }
    onOpenChange(isOpen);
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogTitle>Custom Text</DialogTitle>
        <DialogDescription>
          Paste or type your own text to practice. Minimum 10 characters
          required.
        </DialogDescription>
        <div className="grid gap-4 py-4">
          <textarea
            placeholder="Paste or type your custom text here..."
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            className="min-h-[200px] font-mono text-sm w-full rounded-md border border-border bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={text.trim().length < 10}>
            Start Practice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

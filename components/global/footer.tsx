"use client";

import { Github, Monitor, HardDrive } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto py-4 px-4 sm:py-6 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2 sm:gap-3">
        {/* Desktop only notice - shown on mobile */}
        <div className="flex sm:hidden items-center gap-1.5 text-xs text-muted-foreground/80">
          <Monitor className="h-3 w-3" />
          <span>Desktop/Laptop Only — Physical Keyboard Required</span>
        </div>

        {/* Data storage notice */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground/60">
          <HardDrive className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span>
            Your data is stored locally in your browser — No account required
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <a
            href="https://github.com/fensken"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>@fensken</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

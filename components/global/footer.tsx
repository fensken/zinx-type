"use client";

import { Github, Monitor } from "lucide-react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-2 px-4 sm:py-3 sm:px-6 md:py-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        {/* Desktop only notice - shown on mobile */}
        <div className="flex sm:hidden items-center gap-1.5 text-xs text-muted-foreground/80">
          <Monitor className="h-3 w-3" />
          <span>Desktop/Laptop only — Physical Keyboard Required</span>
        </div>

        <a
          href="https://github.com/fensken"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm"
        >
          <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>@fensken</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

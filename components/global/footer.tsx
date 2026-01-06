"use client";

import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <a
          href="https://github.com/fensken"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <Github className="h-4 w-4" />
          <span>@fensken</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

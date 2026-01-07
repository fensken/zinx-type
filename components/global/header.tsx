"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { useTypingStore } from "@/store/typingStore";
import ThemeSwitcher from "./theme-switcher";
import FontSwitcher from "./font-switcher";
import SoundSwitcher from "./sound-switcher";
import LanguageSwitcher from "./language-switcher";

const Header = () => {
  const pathname = usePathname();
  const reset = useTypingStore((state) => state.reset);

  const handleLogoClick = (e: React.MouseEvent) => {
    // If we're on the home page, reset the test instead of navigating
    if (pathname === "/") {
      e.preventDefault();
      reset([]);
    }
  };

  return (
    <header className="px-4 py-3 sm:p-4 md:p-6 flex items-center justify-between w-full transition-opacity duration-300 sticky top-0 left-0 backdrop-blur-lg max-w-6xl mx-auto">
      <Link
        href="/"
        onClick={handleLogoClick}
        className="text-xl sm:text-2xl font-bold font-mono hover:opacity-80 transition-opacity"
      >
        <span className="text-muted-foreground">zinx</span>
        <span className="text-primary">type</span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/stats"
          className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <BarChart3 className="w-5 h-5" />
        </Link>
        <LanguageSwitcher />
        <SoundSwitcher />
        <FontSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;

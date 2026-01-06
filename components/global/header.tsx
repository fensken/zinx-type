"use client";

import React from "react";
import Link from "next/link";
import ThemeSwitcher from "./theme-switcher";
import FontSwitcher from "./font-switcher";

const Header = () => {
  return (
    <header className="px-4 py-3 sm:p-4 md:p-6 flex items-center justify-between w-full transition-opacity duration-300 sticky top-0 left-0 backdrop-blur-lg max-w-6xl mx-auto">
      <Link
        href="/"
        className="text-xl sm:text-2xl font-bold font-mono hover:opacity-80 transition-opacity"
      >
        <span className="text-muted-foreground">zinx</span>
        <span className="text-primary">type</span>
      </Link>

      <div className="flex items-center gap-2">
        <FontSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;

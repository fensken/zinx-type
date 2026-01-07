"use client";

import { memo, useEffect, useState, useMemo } from "react";
import { codeToTokens, type ThemedToken, type BundledLanguage } from "shiki";
import { useThemeStore, type ThemeName } from "@/store/themeStore";

interface CodeTypingBlockProps {
  code: string;
  language: string;
  typedChars: string;
  cursorPosition: number;
}

// Map our language ids to shiki language ids
function getShikiLanguage(lang: string): BundledLanguage {
  const mapping: Record<string, BundledLanguage> = {
    golang: "go",
    csharp: "csharp",
    cpp: "cpp",
    javascript: "javascript",
    typescript: "typescript",
    python: "python",
    rust: "rust",
    java: "java",
    c: "c",
    ruby: "ruby",
    php: "php",
    swift: "swift",
    kotlin: "kotlin",
    scala: "scala",
    lua: "lua",
    zig: "zig",
  };
  return mapping[lang] || "javascript";
}

// Map zinx themes to shiki themes
function getShikiTheme(
  theme: ThemeName,
):
  | "github-dark"
  | "github-light"
  | "dracula"
  | "nord"
  | "one-dark-pro"
  | "rose-pine"
  | "tokyo-night"
  | "catppuccin-mocha"
  | "solarized-dark"
  | "monokai"
  | "vitesse-dark" {
  const mapping: Record<
    string,
    | "github-dark"
    | "github-light"
    | "dracula"
    | "nord"
    | "one-dark-pro"
    | "rose-pine"
    | "tokyo-night"
    | "catppuccin-mocha"
    | "solarized-dark"
    | "monokai"
    | "vitesse-dark"
  > = {
    light: "github-light",
    dark: "github-dark",
    "serika-dark": "vitesse-dark",
    dracula: "dracula",
    nord: "nord",
    monokai: "monokai",
    carbon: "github-dark",
    olive: "vitesse-dark",
    botanical: "vitesse-dark",
    ocean: "github-dark",
    lavender: "dracula",
    copper: "vitesse-dark",
    midnight: "github-dark",
    "rose-pine": "rose-pine",
    "tokyo-night": "tokyo-night",
    gruvbox: "vitesse-dark",
    catppuccin: "catppuccin-mocha",
    solarized: "solarized-dark",
    "one-dark": "one-dark-pro",
    "ayu-dark": "vitesse-dark",
  };
  return mapping[theme] || "github-dark";
}

// Character status type
type CharStatus = "pending" | "correct" | "incorrect" | "current";

const CodeTypingBlock = memo(function CodeTypingBlock({
  code,
  language,
  typedChars,
  cursorPosition,
}: CodeTypingBlockProps) {
  const theme = useThemeStore((state) => state.theme);
  const [tokens, setTokens] = useState<ThemedToken[][] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const shikiTheme = getShikiTheme(theme);

  // Get shiki tokens
  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        const result = await codeToTokens(code, {
          lang: getShikiLanguage(language),
          theme: shikiTheme,
        });

        if (!cancelled) {
          setTokens(result.tokens);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Shiki highlighting error:", error);
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, language, shikiTheme]);

  // Split code into lines for accurate tracking
  const lines = useMemo(() => code.split("\n"), [code]);

  // Pre-calculate line start positions for accurate character indexing
  const lineStartPositions = useMemo(() => {
    const positions: number[] = [0];
    let pos = 0;
    for (let i = 0; i < lines.length - 1; i++) {
      pos += lines[i].length + 1; // +1 for newline
      positions.push(pos);
    }
    return positions;
  }, [lines]);

  // Calculate character status
  const getCharStatus = (
    charIndex: number,
    expectedChar: string,
  ): CharStatus => {
    if (charIndex === cursorPosition) {
      return "current";
    }
    if (charIndex >= typedChars.length) {
      return "pending";
    }

    const typedChar = typedChars[charIndex];
    return typedChar === expectedChar ? "correct" : "incorrect";
  };

  // Render a character with proper display
  const renderChar = (char: string): string => {
    if (char === "\t") {
      return "    "; // 4 spaces for tab
    }
    if (char === " ") {
      return "\u00A0"; // non-breaking space
    }
    return char;
  };

  if (isLoading || !tokens) {
    return (
      <div className="font-mono text-base p-4 bg-card text-foreground rounded-lg">
        <pre className="opacity-50">{code}</pre>
      </div>
    );
  }

  return (
    <div className="font-mono text-base leading-8 bg-card/50 rounded-lg overflow-hidden border border-border/50">
      <div className="p-4 overflow-x-auto">
        <pre className="m-0">
          {tokens.map((lineTokens, lineIndex) => {
            const lineStartPos = lineStartPositions[lineIndex] ?? 0;
            const lineText = lines[lineIndex] ?? "";
            const isLastLine = lineIndex === tokens.length - 1;

            // Track character offset within line
            let lineCharOffset = 0;

            return (
              <div key={lineIndex} className="flex min-h-[2rem]">
                {/* Line number */}
                <span className="select-none text-muted-foreground/50 text-right pr-4 w-10 shrink-0 text-sm leading-8">
                  {lineIndex + 1}
                </span>
                {/* Line content */}
                <code className="flex-1 whitespace-pre">
                  {lineTokens.length === 0 ? (
                    // Empty line - show cursor if needed
                    (() => {
                      const emptyLinePos = lineStartPos;
                      const status = getCharStatus(emptyLinePos, "\n");
                      return (
                        <span className="relative inline-block min-w-[8px]">
                          {status === "current" && (
                            <span className="absolute left-0 top-0 w-[2px] h-full bg-primary animate-caret z-10" />
                          )}
                          {status === "correct" && (
                            <span className="absolute inset-0 bg-green-500/30" />
                          )}
                          &nbsp;
                        </span>
                      );
                    })()
                  ) : (
                    <>
                      {lineTokens.map((token, tokenIndex) => {
                        // Process each character individually but group by token for color
                        return token.content.split("").map((char, charIdx) => {
                          const globalCharIndex = lineStartPos + lineCharOffset;
                          lineCharOffset++;

                          const status = getCharStatus(globalCharIndex, char);

                          // Determine styles based on status
                          let bgStyle = "";
                          let textOpacity = "";

                          if (status === "correct") {
                            bgStyle = "bg-green-500/30";
                          } else if (status === "incorrect") {
                            bgStyle = "bg-red-500/50";
                          } else if (status === "pending") {
                            textOpacity = "opacity-50";
                          }

                          return (
                            <span
                              key={`${tokenIndex}-${charIdx}`}
                              className={`relative inline-block ${bgStyle} ${textOpacity}`}
                              style={{ color: token.color }}
                            >
                              {status === "current" && (
                                <span className="absolute left-0 top-0 w-[2px] h-full bg-primary animate-caret z-10" />
                              )}
                              {renderChar(char)}
                            </span>
                          );
                        });
                      })}
                      {/* Newline cursor at end of line */}
                      {!isLastLine &&
                        lineText.length > 0 &&
                        (() => {
                          const newlinePos = lineStartPos + lineText.length;
                          const status = getCharStatus(newlinePos, "\n");
                          return (
                            <span className="relative">
                              {status === "current" && (
                                <span className="absolute left-0 top-0 w-[2px] h-full bg-primary animate-caret z-10" />
                              )}
                              {status === "correct" && (
                                <span className="inline-block w-1 bg-green-500/30">
                                  &nbsp;
                                </span>
                              )}
                            </span>
                          );
                        })()}
                    </>
                  )}
                </code>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
});

export default CodeTypingBlock;

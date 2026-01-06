import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeName =
  | "light"
  | "dark"
  | "serika-dark"
  | "dracula"
  | "nord"
  | "monokai"
  | "carbon"
  | "olive"
  | "botanical"
  | "ocean"
  | "lavender"
  | "copper"
  | "midnight"
  | "rose-pine"
  | "tokyo-night"
  | "gruvbox"
  | "catppuccin"
  | "solarized"
  | "one-dark";

export interface ThemeOption {
  value: ThemeName;
  label: string;
  colors: {
    bg: string;
    primary: string;
    text: string;
  };
}

interface ThemeState {
  theme: ThemeName;
}

interface ThemeActions {
  setTheme: (theme: ThemeName) => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "serika-dark",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "zinx-theme",
    },
  ),
);

export const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    colors: { bg: "#ffffff", primary: "#4a9d6b", text: "#1a1a1a" },
  },
  {
    value: "dark",
    label: "Dark",
    colors: { bg: "#1a1a1a", primary: "#6bc98a", text: "#fafafa" },
  },
  {
    value: "serika-dark",
    label: "Serika Dark",
    colors: { bg: "#323437", primary: "#e2b714", text: "#d1d0c5" },
  },
  {
    value: "dracula",
    label: "Dracula",
    colors: { bg: "#282a36", primary: "#bd93f9", text: "#f8f8f2" },
  },
  {
    value: "nord",
    label: "Nord",
    colors: { bg: "#2e3440", primary: "#88c0d0", text: "#eceff4" },
  },
  {
    value: "monokai",
    label: "Monokai",
    colors: { bg: "#272822", primary: "#a6e22e", text: "#f8f8f2" },
  },
  {
    value: "carbon",
    label: "Carbon",
    colors: { bg: "#161616", primary: "#78a9ff", text: "#f4f4f4" },
  },
  {
    value: "olive",
    label: "Olive",
    colors: { bg: "#1a1c16", primary: "#92946f", text: "#c6c8be" },
  },
  {
    value: "botanical",
    label: "Botanical",
    colors: { bg: "#1e2720", primary: "#7fa87f", text: "#c0ccc3" },
  },
  {
    value: "ocean",
    label: "Ocean",
    colors: { bg: "#1b2838", primary: "#66c0f4", text: "#c7d5e0" },
  },
  {
    value: "lavender",
    label: "Lavender",
    colors: { bg: "#221f2e", primary: "#b4a7d6", text: "#d4d0e0" },
  },
  {
    value: "copper",
    label: "Copper",
    colors: { bg: "#1f1a17", primary: "#c9956c", text: "#d4c4b8" },
  },
  {
    value: "midnight",
    label: "Midnight",
    colors: { bg: "#0d1117", primary: "#58a6ff", text: "#c9d1d9" },
  },
  {
    value: "rose-pine",
    label: "Rosé Pine",
    colors: { bg: "#191724", primary: "#ebbcba", text: "#e0def4" },
  },
  {
    value: "tokyo-night",
    label: "Tokyo Night",
    colors: { bg: "#1a1b26", primary: "#7aa2f7", text: "#c0caf5" },
  },
  {
    value: "gruvbox",
    label: "Gruvbox",
    colors: { bg: "#282828", primary: "#fabd2f", text: "#ebdbb2" },
  },
  {
    value: "catppuccin",
    label: "Catppuccin",
    colors: { bg: "#1e1e2e", primary: "#cba6f7", text: "#cdd6f4" },
  },
  {
    value: "solarized",
    label: "Solarized",
    colors: { bg: "#002b36", primary: "#b58900", text: "#839496" },
  },
  {
    value: "one-dark",
    label: "One Dark",
    colors: { bg: "#282c34", primary: "#61afef", text: "#abb2bf" },
  },
];

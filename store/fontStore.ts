import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FontName =
  | "geist-mono"
  | "jetbrains-mono"
  | "fira-code"
  | "source-code-pro"
  | "ibm-plex-mono"
  | "roboto-mono"
  | "ubuntu-mono"
  | "inconsolata"
  | "space-mono"
  | "dm-mono"
  | "courier-prime"
  | "overpass-mono"
  | "red-hat-mono"
  | "azeret-mono"
  | "martian-mono"
  | "sono"
  | "share-tech-mono"
  | "anonymous-pro"
  | "pt-mono"
  | "major-mono";

export interface FontOption {
  value: FontName;
  label: string;
  className: string;
}

interface FontState {
  font: FontName;
}

interface FontActions {
  setFont: (font: FontName) => void;
}

type FontStore = FontState & FontActions;

export const useFontStore = create<FontStore>()(
  persist(
    (set) => ({
      font: "geist-mono",
      setFont: (font) => set({ font }),
    }),
    {
      name: "zinx-font",
    },
  ),
);

export const fontOptions: FontOption[] = [
  {
    value: "geist-mono",
    label: "Geist Mono",
    className: "font-geist-mono",
  },
  {
    value: "jetbrains-mono",
    label: "JetBrains Mono",
    className: "font-jetbrains",
  },
  {
    value: "fira-code",
    label: "Fira Code",
    className: "font-fira-code",
  },
  {
    value: "source-code-pro",
    label: "Source Code Pro",
    className: "font-source-code",
  },
  {
    value: "ibm-plex-mono",
    label: "IBM Plex Mono",
    className: "font-ibm-plex",
  },
  {
    value: "roboto-mono",
    label: "Roboto Mono",
    className: "font-roboto-mono",
  },
  {
    value: "ubuntu-mono",
    label: "Ubuntu Mono",
    className: "font-ubuntu-mono",
  },
  {
    value: "inconsolata",
    label: "Inconsolata",
    className: "font-inconsolata",
  },
  {
    value: "space-mono",
    label: "Space Mono",
    className: "font-space-mono",
  },
  {
    value: "dm-mono",
    label: "DM Mono",
    className: "font-dm-mono",
  },
  {
    value: "courier-prime",
    label: "Courier Prime",
    className: "font-courier-prime",
  },
  {
    value: "overpass-mono",
    label: "Overpass Mono",
    className: "font-overpass-mono",
  },
  {
    value: "red-hat-mono",
    label: "Red Hat Mono",
    className: "font-red-hat-mono",
  },
  {
    value: "azeret-mono",
    label: "Azeret Mono",
    className: "font-azeret-mono",
  },
  {
    value: "martian-mono",
    label: "Martian Mono",
    className: "font-martian-mono",
  },
  {
    value: "sono",
    label: "Sono",
    className: "font-sono",
  },
  {
    value: "share-tech-mono",
    label: "Share Tech Mono",
    className: "font-share-tech",
  },
  {
    value: "anonymous-pro",
    label: "Anonymous Pro",
    className: "font-anonymous-pro",
  },
  {
    value: "pt-mono",
    label: "PT Mono",
    className: "font-pt-mono",
  },
  {
    value: "major-mono",
    label: "Major Mono Display",
    className: "font-major-mono",
  },
];

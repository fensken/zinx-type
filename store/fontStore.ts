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
  _hasHydrated: boolean;
}

interface FontActions {
  setFont: (font: FontName) => void;
  setHasHydrated: (state: boolean) => void;
}

type FontStore = FontState & FontActions;

export const useFontStore = create<FontStore>()(
  persist(
    (set) => ({
      font: "geist-mono",
      _hasHydrated: false,
      setFont: (font) => set({ font }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "zinx-font",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _hasHydrated, setHasHydrated, ...rest } = state;
        return rest;
      },
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

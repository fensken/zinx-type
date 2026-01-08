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
  | "major-mono"
  | "victor-mono"
  | "recursive-mono"
  | "noto-sans-mono"
  | "ubuntu-sans-mono"
  | "oxygen-mono"
  | "cutive-mono"
  | "b612-mono"
  | "xanh-mono"
  | "syne-mono"
  | "nova-mono";

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

// O(1) lookup map for font class names
const fontClassNameMap = new Map<FontName, string>();

/** Get font className with O(1) lookup */
export const getFontClassName = (font: FontName): string =>
  fontClassNameMap.get(font) ?? "font-geist-mono";

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
  // New fonts from Google Fonts
  {
    value: "victor-mono",
    label: "Victor Mono",
    className: "font-victor-mono",
  },
  {
    value: "recursive-mono",
    label: "Recursive Mono",
    className: "font-recursive-mono",
  },
  {
    value: "noto-sans-mono",
    label: "Noto Sans Mono",
    className: "font-noto-sans-mono",
  },
  {
    value: "ubuntu-sans-mono",
    label: "Ubuntu Sans Mono",
    className: "font-ubuntu-sans-mono",
  },
  {
    value: "oxygen-mono",
    label: "Oxygen Mono",
    className: "font-oxygen-mono",
  },
  {
    value: "cutive-mono",
    label: "Cutive Mono",
    className: "font-cutive-mono",
  },
  {
    value: "b612-mono",
    label: "B612 Mono",
    className: "font-b612-mono",
  },
  {
    value: "xanh-mono",
    label: "Xanh Mono",
    className: "font-xanh-mono",
  },
  {
    value: "syne-mono",
    label: "Syne Mono",
    className: "font-syne-mono",
  },
  {
    value: "nova-mono",
    label: "Nova Mono",
    className: "font-nova-mono",
  },
];

// Populate the lookup map
fontOptions.forEach((font) => {
  fontClassNameMap.set(font.value, font.className);
});

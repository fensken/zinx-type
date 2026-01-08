import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SoundPack =
  | "none"
  | "typewriter"
  | "mechanical"
  | "mechanical-heavy"
  | "soft"
  | "pop"
  | "bubble"
  | "click"
  | "nk-cream"
  | "holy-panda"
  | "gateron-ink"
  | "topre"
  | "box-jade"
  | "silent-alpaca"
  | "membrane";

export interface SoundSettings {
  enabled: boolean;
  volume: number; // 0-1
  soundPack: SoundPack;
  keySound: boolean;
  errorSound: boolean;
  completionSound: boolean;
}

interface SoundActions {
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setSoundPack: (pack: SoundPack) => void;
  setKeySound: (enabled: boolean) => void;
  setErrorSound: (enabled: boolean) => void;
  setCompletionSound: (enabled: boolean) => void;
  toggleSound: () => void;
}

type SoundStore = SoundSettings & SoundActions;

const initialState: SoundSettings = {
  enabled: false,
  volume: 0.5,
  soundPack: "mechanical",
  keySound: true,
  errorSound: true,
  completionSound: true,
};

export const soundPackOptions: {
  id: SoundPack;
  name: string;
  description?: string;
}[] = [
  { id: "none", name: "None", description: "No sound" },
  { id: "typewriter", name: "Typewriter", description: "Classic typewriter" },
  { id: "mechanical", name: "Mechanical", description: "Cherry MX style" },
  {
    id: "mechanical-heavy",
    name: "Mech Heavy",
    description: "Thocky deep sound",
  },
  { id: "soft", name: "Soft", description: "Quiet membrane" },
  { id: "pop", name: "Pop", description: "Satisfying pop" },
  { id: "bubble", name: "Bubble", description: "Soft bubble" },
  { id: "click", name: "Click", description: "Sharp click" },
  { id: "nk-cream", name: "NK Cream", description: "Smooth linear" },
  { id: "holy-panda", name: "Holy Panda", description: "Tactile thock" },
  // New sound packs
  { id: "gateron-ink", name: "Gateron Ink", description: "Deep smooth linear" },
  { id: "topre", name: "Topre", description: "Rubber dome thock" },
  { id: "box-jade", name: "Box Jade", description: "Crispy clicky" },
  { id: "silent-alpaca", name: "Silent Alpaca", description: "Muted linear" },
  { id: "membrane", name: "Membrane", description: "Mushy office kb" },
];

export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      ...initialState,

      setEnabled: (enabled) => set({ enabled }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
      setSoundPack: (soundPack) => set({ soundPack }),
      setKeySound: (keySound) => set({ keySound }),
      setErrorSound: (errorSound) => set({ errorSound }),
      setCompletionSound: (completionSound) => set({ completionSound }),
      toggleSound: () => set((state) => ({ enabled: !state.enabled })),
    }),
    {
      name: "zinx-sound",
    },
  ),
);

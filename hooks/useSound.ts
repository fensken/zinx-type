import { useCallback, useRef, useEffect } from "react";
import { useSoundStore, type SoundPack } from "@/store/soundStore";

// Audio context for better performance
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    )();
  }
  return audioContext;
}

// Generate sounds programmatically for different packs
function generateKeySound(
  pack: SoundPack,
  volume: number,
  isError: boolean = false,
): void {
  if (pack === "none") return;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (pack) {
      case "typewriter": {
        // Typewriter: classic mechanical click with metallic resonance
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const gain2 = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        osc2.connect(gain2);
        filter.connect(gain);
        gain.connect(ctx.destination);
        gain2.connect(ctx.destination);

        // Main clack sound
        osc.type = "square";
        filter.type = "bandpass";
        filter.frequency.value = isError ? 400 : 3000;
        filter.Q.value = 8;

        osc.frequency.setValueAtTime(isError ? 180 : 1200, now);
        osc.frequency.exponentialRampToValueAtTime(
          isError ? 90 : 600,
          now + 0.03,
        );
        gain.gain.setValueAtTime(volume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        // Metallic ping resonance
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(isError ? 300 : 4500, now);
        osc2.frequency.exponentialRampToValueAtTime(
          isError ? 200 : 3000,
          now + 0.06,
        );
        gain2.gain.setValueAtTime(volume * 0.08, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.start(now);
        osc.stop(now + 0.04);
        osc2.start(now);
        osc2.stop(now + 0.08);
        break;
      }

      case "mechanical": {
        // Mechanical: Cherry MX style snappy click
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const gain2 = ctx.createGain();

        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(ctx.destination);
        gain2.connect(ctx.destination);

        // Sharp click
        osc.type = "square";
        osc.frequency.setValueAtTime(isError ? 200 : 2200, now);
        osc.frequency.exponentialRampToValueAtTime(
          isError ? 100 : 1100,
          now + 0.015,
        );
        gain.gain.setValueAtTime(volume * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        // Bottom out thud
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(isError ? 80 : 180, now + 0.01);
        osc2.frequency.exponentialRampToValueAtTime(
          isError ? 40 : 90,
          now + 0.04,
        );
        gain2.gain.setValueAtTime(0, now);
        gain2.gain.linearRampToValueAtTime(volume * 0.15, now + 0.01);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.start(now);
        osc.stop(now + 0.02);
        osc2.start(now);
        osc2.stop(now + 0.04);
        break;
      }

      case "mechanical-heavy": {
        // Mechanical Heavy: deep thocky sound with bass
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        const gain3 = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.connect(gain1);
        osc2.connect(gain2);
        osc3.connect(gain3);
        gain1.connect(filter);
        gain2.connect(filter);
        gain3.connect(ctx.destination);
        filter.connect(ctx.destination);

        filter.type = "lowpass";
        filter.frequency.value = 600;

        // Deep bass thock
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(isError ? 60 : 100, now);
        osc1.frequency.exponentialRampToValueAtTime(
          isError ? 30 : 50,
          now + 0.12,
        );

        // Mid thud
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(isError ? 80 : 200, now);
        osc2.frequency.exponentialRampToValueAtTime(
          isError ? 40 : 100,
          now + 0.06,
        );

        // Initial click
        osc3.type = "square";
        osc3.frequency.setValueAtTime(isError ? 150 : 800, now);
        osc3.frequency.exponentialRampToValueAtTime(
          isError ? 75 : 400,
          now + 0.02,
        );

        gain1.gain.setValueAtTime(volume * 0.35, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        gain2.gain.setValueAtTime(volume * 0.2, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        gain3.gain.setValueAtTime(volume * 0.12, now);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc1.start(now);
        osc1.stop(now + 0.12);
        osc2.start(now);
        osc2.stop(now + 0.06);
        osc3.start(now);
        osc3.stop(now + 0.025);
        break;
      }

      case "soft": {
        // Soft: quiet membrane keyboard - muted and gentle
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        filter.type = "lowpass";
        filter.frequency.value = 400;
        filter.Q.value = 0.5;

        osc.type = "sine";
        osc.frequency.setValueAtTime(isError ? 200 : 350, now);
        osc.frequency.exponentialRampToValueAtTime(
          isError ? 100 : 175,
          now + 0.08,
        );
        gain.gain.setValueAtTime(volume * 0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case "pop": {
        // Pop: satisfying pop sound - quick attack with resonance
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const gain2 = ctx.createGain();

        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(ctx.destination);
        gain2.connect(ctx.destination);

        // Main pop
        osc.type = "sine";
        osc.frequency.setValueAtTime(isError ? 300 : 1800, now);
        osc.frequency.exponentialRampToValueAtTime(
          isError ? 150 : 600,
          now + 0.03,
        );
        gain.gain.setValueAtTime(volume * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        // Sub bass for body
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(isError ? 100 : 250, now);
        osc2.frequency.exponentialRampToValueAtTime(
          isError ? 50 : 125,
          now + 0.05,
        );
        gain2.gain.setValueAtTime(volume * 0.15, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.04);
        osc2.start(now);
        osc2.stop(now + 0.05);
        break;
      }

      case "bubble": {
        // Bubble: soft bubbly water drop sound
        const osc = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const gain2 = ctx.createGain();

        osc.connect(gain);
        osc2.connect(gain2);
        gain.connect(ctx.destination);
        gain2.connect(ctx.destination);

        // Rising bubble
        osc.type = "sine";
        osc.frequency.setValueAtTime(isError ? 400 : 600, now);
        osc.frequency.exponentialRampToValueAtTime(
          isError ? 800 : 1400,
          now + 0.04,
        );
        osc.frequency.exponentialRampToValueAtTime(
          isError ? 200 : 500,
          now + 0.1,
        );
        gain.gain.setValueAtTime(volume * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        // Subtle harmonic
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(isError ? 600 : 900, now);
        osc2.frequency.exponentialRampToValueAtTime(
          isError ? 1200 : 2100,
          now + 0.03,
        );
        gain2.gain.setValueAtTime(volume * 0.06, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.1);
        osc2.start(now);
        osc2.stop(now + 0.05);
        break;
      }

      case "click": {
        // Click: very short sharp digital click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        filter.type = "highpass";
        filter.frequency.value = 1000;

        osc.type = "square";
        osc.frequency.setValueAtTime(isError ? 300 : 4000, now);
        osc.frequency.exponentialRampToValueAtTime(
          isError ? 150 : 2000,
          now + 0.008,
        );
        gain.gain.setValueAtTime(volume * 0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

        osc.start(now);
        osc.stop(now + 0.01);
        break;
      }

      case "nk-cream": {
        // NK Cream: smooth linear switch sound
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(filter);
        gain2.connect(filter);
        filter.connect(ctx.destination);

        filter.type = "lowpass";
        filter.frequency.value = 2000;
        filter.Q.value = 1;

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(isError ? 200 : 600, now);
        osc1.frequency.exponentialRampToValueAtTime(
          isError ? 100 : 300,
          now + 0.04,
        );

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(isError ? 150 : 400, now);
        osc2.frequency.exponentialRampToValueAtTime(
          isError ? 75 : 200,
          now + 0.05,
        );

        gain1.gain.setValueAtTime(volume * 0.15, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        gain2.gain.setValueAtTime(volume * 0.1, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc1.start(now);
        osc1.stop(now + 0.04);
        osc2.start(now);
        osc2.stop(now + 0.05);
        break;
      }

      case "holy-panda": {
        // Holy Panda: tactile thock with bump feel
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        const gain2 = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(filter);
        gain2.connect(filter);
        filter.connect(ctx.destination);

        filter.type = "bandpass";
        filter.frequency.value = 1200;
        filter.Q.value = 2;

        // Main thock
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(isError ? 100 : 250, now);
        osc1.frequency.exponentialRampToValueAtTime(
          isError ? 50 : 120,
          now + 0.06,
        );

        // Tactile bump click
        osc2.type = "square";
        osc2.frequency.setValueAtTime(isError ? 180 : 900, now);
        osc2.frequency.exponentialRampToValueAtTime(
          isError ? 90 : 450,
          now + 0.02,
        );

        gain1.gain.setValueAtTime(volume * 0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        gain2.gain.setValueAtTime(volume * 0.12, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

        osc1.start(now);
        osc1.stop(now + 0.06);
        osc2.start(now);
        osc2.stop(now + 0.02);
        break;
      }
    }
  } catch {
    // Audio context not available or failed
  }
}

function generateCompletionSound(volume: number): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Play a pleasant chord
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(freq, now + i * 0.05);

      gainNode.gain.setValueAtTime(0, now + i * 0.05);
      gainNode.gain.linearRampToValueAtTime(
        volume * 0.15,
        now + i * 0.05 + 0.05,
      );
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);

      oscillator.start(now + i * 0.05);
      oscillator.stop(now + i * 0.05 + 0.4);
    });
  } catch {
    // Audio context not available or failed
  }
}

export function useSound() {
  const enabled = useSoundStore((state) => state.enabled);
  const volume = useSoundStore((state) => state.volume);
  const soundPack = useSoundStore((state) => state.soundPack);
  const keySound = useSoundStore((state) => state.keySound);
  const errorSound = useSoundStore((state) => state.errorSound);
  const completionSound = useSoundStore((state) => state.completionSound);

  // Track if we've initialized audio context (needs user interaction)
  const hasInteracted = useRef(false);

  // Resume audio context on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted.current && audioContext?.state === "suspended") {
        audioContext.resume();
      }
      hasInteracted.current = true;
    };

    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  const playKeyPress = useCallback(() => {
    if (!enabled || !keySound || soundPack === "none") return;
    generateKeySound(soundPack, volume, false);
  }, [enabled, keySound, soundPack, volume]);

  const playError = useCallback(() => {
    if (!enabled || !errorSound || soundPack === "none") return;
    generateKeySound(soundPack, volume, true);
  }, [enabled, errorSound, soundPack, volume]);

  const playCompletion = useCallback(() => {
    if (!enabled || !completionSound) return;
    generateCompletionSound(volume);
  }, [enabled, completionSound, volume]);

  return {
    playKeyPress,
    playError,
    playCompletion,
    enabled,
  };
}

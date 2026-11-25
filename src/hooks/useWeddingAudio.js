import { useEffect, useRef } from 'react';

const DEFAULT_AUDIO_SRC = '/audio/wedding-music.mp3';
const INITIAL_VOLUME = 0.3;
const ACTIVATION_EVENTS = ['touchend', 'pointerup', 'click', 'keydown'];

/**
 * Manages a single persistent HTMLAudioElement instance for the wedding invitation.
 * - Preloads unmuted, looping audio at 30% volume on mount.
 * - Attempts unmuted autoplay immediately where browser policies allow.
 * - If autoplay is blocked (e.g. iOS Safari / Android Chrome), starts unmuted playback
 *   synchronously inside the visitor's first qualifying user interaction.
 * - Survives React rerenders and page/section transitions without restarting.
 */
export function useWeddingAudio(src = DEFAULT_AUDIO_SRC) {
  const audioRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    let isDisposed = false;

    const audio = new Audio(src);
    audio.loop = true;
    audio.muted = false;
    audio.volume = INITIAL_VOLUME;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.load();
    audioRef.current = audio;

    const removeListeners = () => {
      ACTIVATION_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, handleFirstInteraction, true);
      });
    };

    const handlePlay = () => {
      if (isDisposed) return;
      hasStartedRef.current = true;
      removeListeners();
    };

    audio.addEventListener('play', handlePlay);

    const tryPlay = () => {
      if (isDisposed || hasStartedRef.current || !audio.paused) return;
      audio.muted = false;
      audio.volume = INITIAL_VOLUME;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isDisposed) return;
            hasStartedRef.current = true;
            removeListeners();
          })
          .catch(() => {
            // Autoplay blocked or gesture didn't qualify (e.g. scroll); keep listeners.
          });
      }
    };

    const handleFirstInteraction = () => {
      tryPlay();
    };

    ACTIVATION_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, handleFirstInteraction, {
        capture: true,
        passive: true,
      });
    });

    // Attempt unmuted autoplay on mount; if blocked, first interaction listeners stay active.
    tryPlay();

    return () => {
      isDisposed = true;
      removeListeners();
      audio.removeEventListener('play', handlePlay);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      hasStartedRef.current = false;
    };
  }, [src]);
}

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_AUDIO_SRC = '/audio/wedding-music.mp3';
const INITIAL_VOLUME = 0.3;

/**
 * Manages a single persistent HTMLAudioElement instance for the wedding invitation.
 * - Initialized at 30% volume with continuous looping.
 * - Attempts automatic playback on mount wherever browser policies allow.
 * - If autoplay is blocked, tracks `isAutoplayBlocked` and unlocks seamlessly on the
 *   visitor's first interaction (or via FloatingMusicControl).
 * - Survives React rerenders and section transitions without restarting.
 */
export function useWeddingAudio(src = DEFAULT_AUDIO_SRC) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isDisposed = false;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = INITIAL_VOLUME;
    audio.preload = 'auto';

    const handlePlay = () => {
      if (isDisposed) return;
      setIsPlaying(true);
      setIsAutoplayBlocked(false);
    };
    const handlePause = () => {
      if (isDisposed) return;
      setIsPlaying(false);
    };
    const handleError = () => {
      if (isDisposed) return;
      setHasError(true);
      setIsPlaying(false);
      setIsAutoplayBlocked(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    // Attempt autoplay immediately when the invitation opens.
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (isDisposed || err?.name === 'AbortError') return;
        setIsPlaying(false);
        setIsAutoplayBlocked(true);
      });
    }

    return () => {
      isDisposed = true;
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src]);

  // If browser blocked autoplay, unlock audio on the visitor's first gesture anywhere.
  useEffect(() => {
    if (!isAutoplayBlocked || hasError) return undefined;

    const unlockOnGesture = (event) => {
      // Let FloatingMusicControl's own click handler manage clicks inside it.
      if (event.target instanceof Element && event.target.closest('[data-music-control]')) {
        return;
      }
      const audio = audioRef.current;
      if (!audio || !audio.paused) return;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Still blocked; keep listener or let user click FloatingMusicControl.
        });
      }
    };

    document.addEventListener('pointerdown', unlockOnGesture, { passive: true });
    document.addEventListener('keydown', unlockOnGesture, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', unlockOnGesture);
      document.removeEventListener('keydown', unlockOnGesture);
    };
  }, [isAutoplayBlocked, hasError]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      setIsAutoplayBlocked(false);
      audio.pause();
    }
  }, [hasError]);

  return {
    isPlaying,
    isAutoplayBlocked,
    hasError,
    toggle,
  };
}

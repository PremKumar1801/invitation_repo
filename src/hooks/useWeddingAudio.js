import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_AUDIO_SRC = '/audio/wedding-music.mp3';
const INITIAL_VOLUME = 0.3;

/**
 * Manages a single persistent HTMLAudioElement instance for the wedding invitation.
 * - Initialized at 30% volume with continuous looping.
 * - Starts only on explicit user interaction (e.g. envelope click) to respect autoplay policies.
 * - Survives React rerenders and section transitions without restarting.
 */
export function useWeddingAudio(src = DEFAULT_AUDIO_SRC) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = INITIAL_VOLUME;
    audio.preload = 'auto';

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [src]);

  const start = useCallback(() => {
    setHasStarted(true);
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented; user can resume manually via the floating control.
          setIsPlaying(false);
        });
      }
    }
  }, [hasError]);

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
      audio.pause();
    }
  }, [hasError]);

  return {
    isPlaying,
    hasStarted,
    hasError,
    start,
    toggle,
  };
}

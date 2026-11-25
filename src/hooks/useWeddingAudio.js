import { useEffect, useRef } from 'react';

const DEFAULT_AUDIO_SRC = '/audio/wedding-music.mp3';
const INITIAL_VOLUME = 0.3;

/**
 * Manages a single persistent HTMLAudioElement for the wedding invitation.
 *
 * Strategy (works on iOS Safari, Android Chrome, and desktop):
 *  1. On mount, attempt unmuted autoplay — works on desktops that allow it.
 *  2. If blocked, register capture-phase listeners for the visitor's first tap/click/key.
 *     Inside that handler, create a *fresh* Audio element and call play() synchronously
 *     so iOS Safari treats it as user-initiated.
 *  3. Once playing, remove all listeners. Music loops continuously.
 *  4. No visible controls — music is always unmuted.
 */
export function useWeddingAudio(src = DEFAULT_AUDIO_SRC) {
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let disposed = false;

    // ── helpers ──────────────────────────────────────────────────────────
    const events = ['touchstart', 'touchend', 'pointerdown', 'pointerup', 'click', 'keydown'];

    const detach = () => {
      events.forEach((e) => document.removeEventListener(e, onGesture, true));
    };

    const markStarted = () => {
      if (disposed) return;
      startedRef.current = true;
      detach();
    };

    // ── build an Audio element ──────────────────────────────────────────
    const createAudio = () => {
      const a = new Audio(src);
      a.loop = true;
      a.muted = false;
      a.volume = INITIAL_VOLUME;
      a.preload = 'auto';
      a.setAttribute('playsinline', '');
      return a;
    };

    // ── gesture handler (runs inside user-activation on mobile) ─────────
    const onGesture = () => {
      if (startedRef.current) return;

      // If the pre-created element is still paused, try it first.
      let audio = audioRef.current;
      if (audio && !audio.paused) {
        markStarted();
        return;
      }

      // On iOS Safari the safest path is a fresh Audio created inside the
      // gesture callback — the browser marks it as user-initiated.
      if (!audio || audio.paused) {
        if (audio) {
          // Dispose the pre-created one that couldn't autoplay.
          audio.pause();
          audio.removeAttribute('src');
          audio.load();
        }
        audio = createAudio();
        audioRef.current = audio;
      }

      audio.muted = false;
      audio.volume = INITIAL_VOLUME;

      const p = audio.play();
      if (p !== undefined) {
        p.then(markStarted).catch(() => {
          // This particular event type didn't qualify; keep listeners for the next one.
        });
      } else {
        markStarted();
      }
    };

    // ── mount: preload + try autoplay ───────────────────────────────────
    const audio = createAudio();
    audio.load();
    audioRef.current = audio;

    const p = audio.play();
    if (p !== undefined) {
      p.then(markStarted).catch(() => {
        // Autoplay blocked — gesture listeners will handle it.
      });
    }

    // Register gesture listeners (capture phase, passive so we don't block scrolling).
    events.forEach((e) => {
      document.addEventListener(e, onGesture, { capture: true, passive: true });
    });

    // ── cleanup ─────────────────────────────────────────────────────────
    return () => {
      disposed = true;
      detach();
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.removeAttribute('src');
        a.load();
        audioRef.current = null;
      }
      startedRef.current = false;
    };
  }, [src]);
}

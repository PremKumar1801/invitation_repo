import { useEffect, useRef } from 'react';

const DEFAULT_AUDIO_SRC = '/audio/wedding-music.mp3';
const INITIAL_VOLUME = 0.3;

/**
 * Wedding background music — instant playback on first tap.
 *
 * How it works:
 *  1. The MP3 is already downloading thanks to <link rel="preload"> in index.html.
 *  2. On mount we create a single Audio element with preload="auto" so the browser
 *     starts decoding from the preloaded cache immediately.
 *  3. We attempt unmuted autoplay — succeeds on most desktops.
 *  4. If autoplay is blocked (all mobile browsers), we listen for the visitor's very
 *     first touch/click/key and call play() on the SAME pre-buffered element.
 *     Because the MP3 is already in memory, playback starts in <50 ms.
 *  5. Once playing, all listeners are removed. Music loops continuously, no controls.
 *
 * iOS Safari note: play() just needs to be called synchronously inside a user-gesture
 * handler. The Audio element itself can (and should) be pre-created so the buffer is
 * ready. Creating a fresh Audio inside the handler forces a re-download — that's slow.
 */
export function useWeddingAudio(src = DEFAULT_AUDIO_SRC) {
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    let disposed = false;

    // ── Gesture events that qualify as user-activation on every browser ──
    const events = ['touchstart', 'touchend', 'click', 'keydown'];

    const detach = () => {
      events.forEach((e) => document.removeEventListener(e, onGesture, true));
    };

    const markStarted = () => {
      if (disposed) return;
      startedRef.current = true;
      detach();
    };

    // ── Create ONE Audio element on mount — reuse it everywhere ─────────
    const audio = new Audio(src);
    audio.loop = true;
    audio.muted = false;
    audio.volume = INITIAL_VOLUME;
    audio.preload = 'auto';
    audio.setAttribute('playsinline', '');
    audio.load(); // triggers buffering from the preloaded cache
    audioRef.current = audio;

    // ── First-gesture handler: play the pre-buffered element ────────────
    const onGesture = () => {
      if (startedRef.current || disposed) return;

      const a = audioRef.current;
      if (!a) return;

      // Already playing (e.g. autoplay succeeded between events)
      if (!a.paused) {
        markStarted();
        return;
      }

      // Ensure unmuted, full volume, then play synchronously in this handler.
      a.muted = false;
      a.volume = INITIAL_VOLUME;

      try {
        const p = a.play();
        if (p && typeof p.then === 'function') {
          p.then(markStarted).catch(() => {
            // This event type didn't qualify; keep listeners for the next one.
          });
        } else {
          markStarted();
        }
      } catch {
        // play() threw synchronously — keep listeners.
      }
    };

    // Register capture-phase, passive listeners for the earliest possible moment.
    events.forEach((e) => {
      document.addEventListener(e, onGesture, { capture: true, passive: true });
    });

    // ── Desktop autoplay attempt ────────────────────────────────────────
    try {
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(markStarted).catch(() => {
          // Blocked on this browser — gesture listeners will handle it.
        });
      }
    } catch {
      // Synchronous throw — gesture listeners remain.
    }

    // ── Cleanup ─────────────────────────────────────────────────────────
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

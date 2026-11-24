/**
 * Shared phases, timing and easing for the opening sequence.
 * Every opening component reads from this file so the cinematic stays in step.
 */

export const PHASES = Object.freeze({
  IDLE: 'idle',
  OPENING: 'opening',
  REVEALING: 'revealing',
  HOLDING: 'holding',
  EXITING: 'exiting',
});

export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1];

/** Milestones of the sequence, in milliseconds at full motion. */
export const TIMELINE_MS = Object.freeze({
  reveal: 900,   // envelope flap opens, invitation card begins to rise
  hold: 1800,   // card settled and displayed (held for ~0.9s)
  exit: 2700,   // scene begins smooth dissolve (reduced from 4000ms to eliminate pause)
  complete: 3350, // onComplete fires as dissolve finishes, transitioning smoothly
});

/**
 * Converts the user's reduced-motion preference into motion settings.
 * speed scales every duration and milestone.
 * distance scales every travel (translation, rotation, scale punch), so a
 * reduced-motion visitor still sees the same story, told with fades and
 * shorter timing rather than movement.
 */
export function getMotionConfig(reduceMotion) {
  return {
    speed: reduceMotion ? 0.5 : 1,
    distance: reduceMotion ? 0 : 1,
  };
}

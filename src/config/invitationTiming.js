// All animation timing lives here (seconds). Tune these, not the components.

export const EASE_CINEMATIC = [0.22, 1, 0.36, 1]; // long, soft landing
export const EASE_SOFT = [0.45, 0, 0.2, 1];       // gentle in-out for fades

// "You Are Cordially Invited"
// Total on screen = fadeIn + hold + fadeOut (about 2.45s).
// The next section can start at fadeIn + hold (see onExitStart), so the
// two crossfade instead of waiting for each other.
export const INVITE_TIMING = {
  fadeIn: 0.8,
  hold: 1.0,
  fadeOut: 0.65,
  reduced: { fadeIn: 0.3, hold: 0.9, fadeOut: 0.3 },
};

// Photograph reveals
export const PHOTO_TIMING = {
  // Individual portraits
  portraitDuration: 1.1,
  portraitStagger: 0.22,      // groom follows bride by this much
  portraitDelay: 0.05,
  portraitRise: 26,           // px of upward travel
  portraitStartScale: 0.985,
  imageSettleScale: 1.07,     // photo inside frame eases from this to 1
  imageSettleDuration: 1.7,

  // Couple photograph
  coupleDelay: 0.15,
  coupleDuration: 1.5,
  coupleStartScale: 0.94,
  coupleImageSettleScale: 1.05,
  coupleImageSettleDuration: 1.9,

  // Trigger when 25% of the element is in view, once only
  viewportAmount: 0.25,

  reduced: { duration: 0.4 },
};

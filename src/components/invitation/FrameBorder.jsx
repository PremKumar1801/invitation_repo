/**
 * Reusable filigree corner. The position prop mirrors the artwork into one of
 * four corners; positioning and offsets come from OpeningScene.css.
 */
export function CornerOrnament({ position = 'tl', className = '' }) {
  return (
    <svg
      className={`corner-ornament corner-ornament--${position} ${className}`.trim()}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 78 V22 Q3 3 22 3 H78" />
      <path d="M11 70 V26 Q11 11 26 11 H70" strokeOpacity="0.55" />
      <path d="M22 40 Q22 22 40 22" strokeOpacity="0.8" />
      <circle cx="25" cy="25" r="5" strokeOpacity="0.9" />
      <circle cx="25" cy="25" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="3" cy="3" r="2.6" fill="currentColor" stroke="none" />
      <path d="M44 3 Q50 11 44 19 Q38 11 44 3Z" fill="currentColor" fillOpacity="0.35" stroke="none" />
      <path d="M3 44 Q11 50 19 44 Q11 38 3 44Z" fill="currentColor" fillOpacity="0.35" stroke="none" />
    </svg>
  );
}

export default function FrameBorder() {
  return (
    <div className="scene-frame" aria-hidden="true">
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />
    </div>
  );
}

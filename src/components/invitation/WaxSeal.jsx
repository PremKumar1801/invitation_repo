import { useId } from 'react';

const RIM_SEGMENTS = 180;
const RIM_LOBES = 18;
const PETAL_ANGLES = Array.from({ length: 12 }, (_, index) => index * 30);

/**
 * Builds the scalloped outline of a poured wax seal as an SVG path.
 * Radius follows the absolute cosine so the rim forms soft lobes.
 */
function buildScallopPath(cx, cy, baseRadius, depth, lobes) {
  let path = '';

  for (let step = 0; step <= RIM_SEGMENTS; step += 1) {
    const angle = (step / RIM_SEGMENTS) * Math.PI * 2;
    const radius = baseRadius + depth * Math.abs(Math.cos((lobes * angle) / 2));
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    path += `${step === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return `${path}Z`;
}

const SEAL_OUTLINE = buildScallopPath(100, 100, 84, 5, RIM_LOBES);

export default function WaxSeal({ className = '' }) {
  // useId keeps gradient ids unique when two seal halves render on the page.
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      className={`wax-seal ${className}`.trim()}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${uid}-body`} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#fff3c6" />
          <stop offset="26%" stopColor="#f2cd62" />
          <stop offset="60%" stopColor="#b5841c" />
          <stop offset="100%" stopColor="#5e3b08" />
        </radialGradient>
        <radialGradient id={`${uid}-relief`} cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#ffe9a2" />
          <stop offset="100%" stopColor="#8f5f14" />
        </radialGradient>
        <linearGradient id={`${uid}-sheen`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={SEAL_OUTLINE} fill={`url(#${uid}-body)`} />
      <path d={SEAL_OUTLINE} fill="none" stroke="#4a2c05" strokeOpacity="0.45" strokeWidth="1.2" />

      <circle cx="100" cy="100" r="66" fill="none" stroke="#4a2c05" strokeOpacity="0.35" strokeWidth="1.6" />
      <circle cx="100" cy="100" r="62.5" fill="none" stroke="#fff4c8" strokeOpacity="0.45" strokeWidth="0.9" />

      <g fill={`url(#${uid}-relief)`} stroke="#6b4310" strokeOpacity="0.35" strokeWidth="0.6">
        {PETAL_ANGLES.map((angle) => (
          <ellipse
            key={angle}
            cx="100"
            cy="60"
            rx="8.5"
            ry="19"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
      </g>

      <circle cx="100" cy="100" r="24" fill={`url(#${uid}-relief)`} stroke="#6b4310" strokeOpacity="0.4" strokeWidth="1" />
      <circle cx="100" cy="100" r="9" fill="#fff6d2" fillOpacity="0.85" />

      <path d={SEAL_OUTLINE} fill={`url(#${uid}-sheen)`} />
    </svg>
  );
}

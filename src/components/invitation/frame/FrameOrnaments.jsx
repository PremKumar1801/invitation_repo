// Inline SVG ornaments. No dependencies, no image files.
// Gradients use userSpaceOnUse so thin straight strokes still render.

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function GoldDefs({ id }) {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="#f0dc9c" />
          <stop offset="0.5" stopColor="#c9a24b" />
          <stop offset="1" stopColor="#8a6a22" />
        </linearGradient>
        <linearGradient id={`${id}-l`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="48" y2="16">
          <stop offset="0" stopColor="#f0dc9c" />
          <stop offset="0.55" stopColor="#c9a24b" />
          <stop offset="1" stopColor="#8a6a22" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Top-left corner motif. CSS mirrors it for the other three corners. */
export function Corner({ gid, className = '' }) {
  const gold = `url(#${gid})`;
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g fill="none" stroke={gold} strokeLinecap="round">
        <path d="M3 61V17C3 8.7 8.7 3 17 3H61" strokeWidth="2.2" />
        <path d="M10 42V25C10 16.7 16.7 10 25 10H42" strokeWidth="1" opacity="0.75" />
      </g>

      <g fill={gold}>
        <circle cx="61" cy="3" r="2" />
        <circle cx="3" cy="61" r="2" />
        <circle cx="34" cy="6.5" r="0.9" />
        <circle cx="44" cy="6.5" r="0.9" />
        <circle cx="6.5" cy="34" r="0.9" />
        <circle cx="6.5" cy="44" r="0.9" />
      </g>

      {/* Eight-petal rosette */}
      <g>
        {PETAL_ANGLES.map((a) => (
          <ellipse
            key={a}
            cx="24"
            cy="19.4"
            rx="1.8"
            ry="3.4"
            transform={`rotate(${a} 24 24)`}
            fill={gold}
            fillOpacity="0.28"
            stroke={gold}
            strokeWidth="0.8"
          />
        ))}
        <circle cx="24" cy="24" r="2.1" fill={gold} />
      </g>
    </svg>
  );
}

/** Small lotus crest that sits on the top/bottom border of the grand frame. */
export function LotusCrest({ gid, className = '' }) {
  const gold = `url(#${gid}-l)`;
  const petal = { fill: '#3a0a14', stroke: gold, strokeWidth: 0.9, strokeLinejoin: 'round' };
  return (
    <svg className={className} viewBox="0 0 48 16" aria-hidden="true" focusable="false">
      <path d="M24 14C16 15 8 13 3 9C10 8 18 10 24 14Z" {...petal} />
      <path d="M24 14C32 15 40 13 45 9C38 8 30 10 24 14Z" {...petal} />
      <path d="M24 14C19 13 14 10 12 5C17 5 21 8 24 14Z" {...petal} />
      <path d="M24 14C29 13 34 10 36 5C31 5 27 8 24 14Z" {...petal} />
      <path d="M24 1C27 5 27 10 24 14C21 10 21 5 24 1Z" {...petal} />
    </svg>
  );
}

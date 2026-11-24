import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT_SOFT = [0.22, 1, 0.36, 1];
const GOLD = '#e5bd5f';

const OUTER_FRAME = 'M6 594 V190 C6 110 70 72 150 8 C230 72 294 110 294 190 V594 Z';
const INNER_FRAME = 'M18 582 V192 C18 126 76 92 150 30 C224 92 282 126 282 192 V582 Z';
const BASE_BAND = 'M18 548 H282';
const ROSETTES = [
  { cx: 6, cy: 594 },
  { cx: 294, cy: 594 },
  { cx: 150, cy: 8 },
];

/**
 * Builds the draw-in animation props for one stroke. When the visitor
 * prefers reduced motion, the frame is returned fully drawn with no props.
 */
function drawProps(reduceMotion, delay, duration) {
  if (reduceMotion) return {};

  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration, delay, ease: EASE_OUT_SOFT },
        opacity: { duration: 0.6, delay },
      },
    },
    viewport: { once: true, amount: 0.3 },
  };
}

export default function OrnamentalFrame() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className="royal-invitation__frame"
      viewBox="0 0 300 600"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <motion.path
        d={OUTER_FRAME}
        fill="none"
        stroke={GOLD}
        strokeWidth="1.4"
        {...drawProps(reduceMotion, 0, 2.4)}
      />
      <motion.path
        d={INNER_FRAME}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.9"
        strokeOpacity="0.7"
        {...drawProps(reduceMotion, 0.9, 2)}
      />
      <motion.path
        d={BASE_BAND}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.8"
        strokeOpacity="0.6"
        {...drawProps(reduceMotion, 1.6, 1.2)}
      />
      {ROSETTES.map((rosette, index) => (
        <motion.circle
          key={`${rosette.cx}-${rosette.cy}`}
          cx={rosette.cx}
          cy={rosette.cy}
          r="4.5"
          fill={GOLD}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT_SOFT, delay: 2.2 + index * 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
        />
      ))}
    </svg>
  );
}

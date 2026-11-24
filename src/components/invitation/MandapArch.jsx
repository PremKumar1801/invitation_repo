import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT_SOFT = [0.22, 1, 0.36, 1];
const GOLD = '#e6c06a';

/**
 * Each entry is one stroke of the illustration. Strokes are drawn in order
 * (outer forms first, detail last) so the arch appears to be built up.
 */
const STROKES = [
  { d: 'M8 488 H392', width: 1.8 },
  { d: 'M30 498 H370', width: 0.9 },
  {
    d: 'M70 488 V240 C70 170 118 140 150 96 C168 72 184 50 200 26 C216 50 232 72 250 96 C282 140 330 170 330 240 V488 Z',
    width: 1.8,
    fill: 'rgba(255, 215, 140, 0.05)',
  },
  {
    d: 'M104 488 V258 C104 200 140 176 168 138 C182 118 192 102 200 84 C208 102 218 118 232 138 C260 176 296 200 296 258 V488',
    width: 1.2,
  },
  { d: 'M200 26 V6', width: 1.4 },
  { d: 'M196 4 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0', width: 1.2, fill: GOLD },
  { d: 'M30 488 V330 H54 V488', width: 1.4 },
  { d: 'M22 330 H62 V318 H22 Z', width: 1.2 },
  { d: 'M346 488 V330 H370 V488', width: 1.4 },
  { d: 'M338 330 H378 V318 H338 Z', width: 1.2 },
  { d: 'M124 350 H276', width: 0.8 },
  { d: 'M150 290 Q200 250 250 290', width: 0.9 },
  { d: 'M150 404 Q200 444 250 404', width: 0.9 },
];

export default function MandapArch() {
  const reduceMotion = useReducedMotion();

  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {STROKES.map((stroke, index) => {
        const drawProps = reduceMotion
          ? {}
          : {
              initial: { pathLength: 0, opacity: 0 },
              whileInView: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: {
                    duration: 2.2,
                    ease: EASE_OUT_SOFT,
                    delay: index * 0.12,
                  },
                  opacity: { duration: 0.6, delay: index * 0.12 },
                },
              },
              viewport: { once: true, amount: 0.2 },
            };

        return (
          <motion.path
            key={stroke.d}
            d={stroke.d}
            fill={stroke.fill ?? 'none'}
            stroke={GOLD}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...drawProps}
          />
        );
      })}
    </svg>
  );
}

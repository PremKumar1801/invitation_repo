import { useState } from 'react';
import { motion } from 'framer-motion';

const MOTE_COUNT = 16;

const randomBetween = (min, max) => min + Math.random() * (max - min);

function createMotes() {
  return Array.from({ length: MOTE_COUNT }, (_, index) => ({
    id: index,
    left: randomBetween(0, 100),
    top: randomBetween(0, 100),
    size: randomBetween(2, 4),
    duration: randomBetween(18, 32),
    delay: randomBetween(-32, 0),
    drift: randomBetween(-24, 24),
    peak: randomBetween(0.3, 0.8),
  }));
}

export default function GlowMotes({ y }) {
  const [motes] = useState(createMotes);

  return (
    <motion.div className="glow-motes" style={{ y }} aria-hidden="true">
      {motes.map((mote) => (
        <span
          key={mote.id}
          className="glow-mote"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
            '--drift': mote.drift.toFixed(1),
            '--peak': mote.peak.toFixed(2),
          }}
        />
      ))}
    </motion.div>
  );
}

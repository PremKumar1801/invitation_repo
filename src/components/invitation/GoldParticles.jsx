import { useState } from 'react';

const PARTICLE_COUNT = 24;

const randomBetween = (min, max) => min + Math.random() * (max - min);

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
    id: index,
    left: randomBetween(0, 100),
    top: randomBetween(0, 100),
    size: randomBetween(2, 4.6),
    duration: randomBetween(16, 30),
    delay: randomBetween(-30, 0),
    drift: randomBetween(-30, 30),
    peak: randomBetween(0.35, 0.95),
  }));
}

export default function GoldParticles() {
  const [particles] = useState(createParticles);

  return (
    <div className="gold-particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="gold-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            '--drift': particle.drift.toFixed(1),
            '--peak': particle.peak.toFixed(2),
          }}
        />
      ))}
    </div>
  );
}

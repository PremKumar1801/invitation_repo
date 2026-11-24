import { useState } from 'react';

const PETAL_COUNT = 14;

const PALETTE = [
  { petal: '#b8435e', light: '#e27f93' },
  { petal: '#d9a441', light: '#f4d68a' },
  { petal: '#e7b9b0', light: '#fbe6e0' },
  { petal: '#8f2a43', light: '#c25a72' },
];

const randomBetween = (min, max) => min + Math.random() * (max - min);

function createPetals() {
  return Array.from({ length: PETAL_COUNT }, (_, index) => {
    const tint = PALETTE[index % PALETTE.length];
    const size = randomBetween(9, 15);

    return {
      id: index,
      left: randomBetween(0, 100),
      size,
      fallDuration: randomBetween(14, 26),
      fallDelay: randomBetween(-26, 0),
      swayDuration: randomBetween(3.5, 6.5),
      swayDelay: randomBetween(-6, 0),
      ...tint,
    };
  });
}

export default function FallingPetals() {
  const [petals] = useState(createPetals);

  return (
    <div className="falling-petals" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="falling-petal"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.fallDuration}s`,
            animationDelay: `${petal.fallDelay}s`,
          }}
        >
          <span
            className="falling-petal__body"
            style={{
              width: `${petal.size}px`,
              height: `${petal.size * 0.72}px`,
              '--petal': petal.petal,
              '--petal-light': petal.light,
              animationDuration: `${petal.swayDuration}s`,
              animationDelay: `${petal.swayDelay}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/** Hindi (primary) + English (supporting), stacked with deliberate spacing. */
export function Bilingual({ hi, en, as: Tag = "p", className = "", id }) {
  return (
    <Tag id={id} className={`wi-bi ${className}`}>
      <span className="wi-hi" lang="hi">
        {hi}
      </span>
      <span className="wi-en" lang="en">
        {en}
      </span>
    </Tag>
  );
}

/** Scroll-triggered fade/rise. Respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 22, as = "div", className = "" }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Gold rule with a small lotus-diamond motif; draws outward on scroll. */
export function GoldDivider({ className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`wi-divider ${className}`}
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, scaleX: 0.35 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: EASE }}
    >
      <span className="wi-divider__line" />
      <svg className="wi-divider__motif" viewBox="0 0 64 24" fill="none">
        <path d="M32 2 L40 12 L32 22 L24 12 Z" fill="currentColor" />
        <path d="M32 7 L36 12 L32 17 L28 12 Z" fill="var(--wi-burgundy-deep)" />
        <circle cx="14" cy="12" r="2.4" fill="currentColor" />
        <circle cx="50" cy="12" r="2.4" fill="currentColor" />
        <circle cx="4" cy="12" r="1.4" fill="currentColor" />
        <circle cx="60" cy="12" r="1.4" fill="currentColor" />
      </svg>
      <span className="wi-divider__line" />
    </motion.div>
  );
}

/** Quiet five-petal flower used in section corners. Purely decorative. */
export function Floral({ className = "" }) {
  return (
    <svg className={`wi-floral ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        {[0, 72, 144, 216, 288].map((r) => (
          <path key={r} transform={`rotate(${r} 50 50)`} d="M50 50 C38 36 38 18 50 8 C62 18 62 36 50 50 Z" />
        ))}
        <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
        <path d="M50 58 C48 74 40 86 24 94" />
        <path d="M44 76 C34 74 28 68 26 60" />
      </g>
    </svg>
  );
}

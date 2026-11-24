import { motion } from 'framer-motion';

/**
 * Warm golden light that drifts slowly behind the content.
 * The y prop is a motion value from the parent's scroll progress, so the
 * light also shifts as the section scrolls.
 */
export default function AmbientGlow({ y, reduceMotion = false }) {
  return (
    <div className="royal-invitation__glow-wrap" aria-hidden="true">
      <motion.div className="royal-invitation__glow-anchor" style={{ y }}>
        <motion.span
          className="royal-invitation__glow-core"
          animate={
            reduceMotion
              ? undefined
              : { x: ['-5%', '5%'], y: ['-3%', '3%'], opacity: [0.75, 1] }
          }
          transition={{
            duration: 16,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </motion.div>
    </div>
  );
}

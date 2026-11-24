import { motion } from 'framer-motion';
import WaxSeal from './WaxSeal';
import { EASE_IN_OUT_SOFT, EASE_OUT_SOFT, PHASES } from './openingConfig';

export default function RoyalEnvelope({ phase, label, onOpen, speed, distance }) {
  const isIdle = phase === PHASES.IDLE;
  const isFloating = isIdle && distance > 0;

  const stageVariants = {
    hidden: { opacity: 0, y: 56 * distance, scale: 0.92, rotateX: 14 * distance },
    [PHASES.IDLE]: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { duration: 1.5 * speed, ease: EASE_OUT_SOFT, delay: 0.3 * speed },
    },
    [PHASES.OPENING]: {
      opacity: 1,
      y: 0,
      scale: 1.02,
      rotateX: 0,
      transition: { duration: 0.7 * speed, ease: EASE_OUT_SOFT },
    },
    [PHASES.REVEALING]: {
      opacity: 0,
      y: -24 * distance,
      scale: 1.08,
      transition: { duration: 0.9 * speed, ease: EASE_OUT_SOFT, delay: 0.1 * speed },
    },
    [PHASES.HOLDING]: { opacity: 0, transition: { duration: 0 } },
    [PHASES.EXITING]: { opacity: 0, transition: { duration: 0 } },
  };

  const floatVariants = {
    float: {
      y: [0, -8, 0],
      transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
    },
    still: {
      y: 0,
      transition: { duration: 0.6 * speed, ease: EASE_OUT_SOFT },
    },
  };

  // The flap hinges at its top edge. It sits in front while closed, then
  // swings back behind the card once it is edge-on (about 90 degrees).
  const flapVariants = {
    closed: { rotateX: 0, opacity: 1, zIndex: 4, transition: { duration: 0 } },
    open: {
      rotateX: 180 * distance,
      opacity: distance > 0 ? 1 : 0,
      zIndex: 0,
      transition: {
        rotateX: { duration: 1.1 * speed, ease: EASE_IN_OUT_SOFT, delay: 0.2 * speed },
        opacity: { duration: 0.6 * speed, delay: 0.2 * speed },
        zIndex: { duration: 0, delay: 0.75 * speed },
      },
    },
  };

  const lightVariants = {
    [PHASES.IDLE]: { opacity: 0, scale: 0.4 },
    [PHASES.OPENING]: {
      opacity: [0, 0.95, 0.72],
      scale: distance > 0 ? [0.4, 1.25, 1.6] : 1,
      transition: { duration: 1.8 * speed, ease: 'easeOut', delay: 0.35 * speed },
    },
    [PHASES.REVEALING]: {
      opacity: 0,
      scale: distance > 0 ? 1.9 : 1,
      transition: { duration: 1.1 * speed, ease: 'easeOut' },
    },
    [PHASES.HOLDING]: { opacity: 0, transition: { duration: 0 } },
    [PHASES.EXITING]: { opacity: 0, transition: { duration: 0 } },
  };

  const sealState = phase === PHASES.IDLE ? 'idle' : phase === PHASES.OPENING ? 'opening' : 'rest';

  const createSealHalfVariants = (direction) => ({
    idle: { x: 0, rotate: 0, opacity: 1 },
    opening: {
      x: [0, 4 * direction * distance, 30 * direction * distance],
      rotate: [0, 3 * direction * distance, 16 * direction * distance],
      opacity: [1, 1, 0],
      transition: { duration: 0.9 * speed, ease: EASE_IN_OUT_SOFT, times: [0, 0.35, 1] },
    },
    rest: {
      x: 30 * direction * distance,
      rotate: 16 * direction * distance,
      opacity: 0,
      transition: { duration: 0 },
    },
  });

  const sealLeftVariants = createSealHalfVariants(-1);
  const sealRightVariants = createSealHalfVariants(1);

  return (
    <motion.div
      className="royal-envelope-stage"
      variants={stageVariants}
      initial="hidden"
      animate={phase}
    >
      <span className="royal-envelope-stage__halo" aria-hidden="true" />

      <motion.div
        className="royal-envelope-stage__float"
        variants={floatVariants}
        animate={isFloating ? 'float' : 'still'}
      >
        <button
          type="button"
          className="royal-envelope"
          onClick={onOpen}
          disabled={!isIdle}
          aria-label={label}
        >
          <span className="royal-envelope__back" aria-hidden="true" />
          <span className="royal-envelope__pocket" aria-hidden="true" />

          <motion.span
            className="royal-envelope__flap"
            aria-hidden="true"
            variants={flapVariants}
            initial="closed"
            animate={isIdle ? 'closed' : 'open'}
          />

          <motion.span
            className="royal-envelope__light"
            aria-hidden="true"
            variants={lightVariants}
            initial={PHASES.IDLE}
            animate={phase}
          />

          <span className="royal-envelope__seal" aria-hidden="true">
            <motion.span
              className="royal-envelope__seal-half royal-envelope__seal-half--left"
              style={{ transformOrigin: '100% 50%' }}
              variants={sealLeftVariants}
              initial="idle"
              animate={sealState}
            >
              <WaxSeal />
            </motion.span>

            <motion.span
              className="royal-envelope__seal-half royal-envelope__seal-half--right"
              style={{ transformOrigin: '0% 50%' }}
              variants={sealRightVariants}
              initial="idle"
              animate={sealState}
            >
              <WaxSeal />
            </motion.span>
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}

import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT_SOFT = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.5 };

/**
 * Stacks the two names around the ampersand. Children inherit the
 * container's 'hidden' and 'show' states, so the stagger is orchestrated
 * from one place.
 */
export default function CoupleNames({ brideName, connector = '&', groomName }) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.25,
        staggerChildren: reduceMotion ? 0.15 : 0.4,
      },
    },
  };

  const nameFrom = (fromX) =>
    reduceMotion
      ? {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.6 } },
        }
      : {
          hidden: { opacity: 0, x: fromX, filter: 'blur(8px)' },
          show: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: { duration: 1.5, ease: EASE_OUT_SOFT },
          },
        };

  const connectorVariants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.6 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.6 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 1.2, ease: EASE_OUT_SOFT },
        },
      };

  return (
    <motion.div
      className="couple-names"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.p className="couple-names__name" variants={nameFrom(-28)}>
        {brideName}
      </motion.p>

      <motion.span className="couple-names__connector" variants={connectorVariants}>
        {connector}
      </motion.span>

      <motion.p className="couple-names__name" variants={nameFrom(28)}>
        {groomName}
      </motion.p>
    </motion.div>
  );
}

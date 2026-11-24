import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import AmbientGlow from './AmbientGlow';
import CoupleNames from './CoupleNames';
import FallingPetals from './FallingPetals';
import GlowMotes from './GlowMotes';
import MandapArch from './MandapArch';
import OrnamentalFrame from './OrnamentalFrame';
import { invitationContent } from './invitationContent';
import './RoyalInvitation.css';

const EASE_OUT_SOFT = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.35 };

function RoyalInvitation({ content: overrides }) {
  const content = { ...invitationContent, ...overrides };
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Progress runs from the moment the section enters the bottom of the
  // viewport until it leaves the top. Each layer moves at its own rate, so
  // the mandap drifts slowest and the glow and motes move faster, which
  // gives depth without any scroll-jacking.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const archY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [70, -70]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-100, 100]);
  const moteY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [50, -50]);
  const panelY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [30, -30]);

  const fadeIn = (delay) =>
    reduceMotion
      ? {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { duration: 0.6 } },
        }
      : {
          hidden: { opacity: 0, y: 14 },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.4, ease: EASE_OUT_SOFT, delay },
          },
        };

  return (
    <section
      ref={sectionRef}
      className="royal-invitation"
      aria-labelledby="royal-invitation-heading"
    >
      <div className="royal-invitation__texture" aria-hidden="true" />
      <AmbientGlow y={glowY} reduceMotion={reduceMotion} />

      <div className="royal-invitation__arch-wrap" aria-hidden="true">
        <motion.div className="royal-invitation__arch" style={{ y: archY }}>
          <MandapArch />
        </motion.div>
      </div>

      <GlowMotes y={moteY} />
      <FallingPetals />

      <motion.div className="royal-invitation__panel" style={{ y: panelY }}>
        <OrnamentalFrame />

        <div className="royal-invitation__content">
          <motion.p
            className="royal-invitation__families"
            variants={fadeIn(0)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {content.familiesLine}
          </motion.p>

          <motion.h2
            id="royal-invitation-heading"
            className="royal-invitation__request"
            variants={fadeIn(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {content.requestLine}
          </motion.h2>

          <CoupleNames
            brideName={content.brideName}
            connector={content.connector}
            groomName={content.groomName}
          />

          <motion.p
            className="royal-invitation__occasion"
            variants={fadeIn(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {content.occasionLine}
          </motion.p>

          <motion.p
            className="royal-invitation__date"
            variants={fadeIn(0.35)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {content.weddingDate}
          </motion.p>

          <motion.p
            className="royal-invitation__closing"
            variants={fadeIn(0.5)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {content.closingLine}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

export default RoyalInvitation;

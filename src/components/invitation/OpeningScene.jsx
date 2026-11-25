import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import FrameBorder from './FrameBorder';
import GoldParticles from './GoldParticles';
import InvitationCard from './InvitationCard';
import RoyalEnvelope from './RoyalEnvelope';
import { EASE_OUT_SOFT, PHASES, TIMELINE_MS, getMotionConfig } from './openingConfig';
import './OpeningScene.css';

const CARD_VISIBLE_PHASES = [PHASES.REVEALING, PHASES.HOLDING, PHASES.EXITING];

function fadeUpVariants({ delay, speed, distance }) {
  return {
    hidden: { opacity: 0, y: 18 * distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.3 * speed, ease: EASE_OUT_SOFT, delay: delay * speed },
    },
    hide: {
      opacity: 0,
      y: -12 * distance,
      transition: { duration: 0.6 * speed, ease: EASE_OUT_SOFT },
    },
  };
}

function OpeningScene({
  title = 'A Celebration of Love',
  cardHeading = 'You Are Cordially Invited',
  onComplete,
}) {
  const [phase, setPhase] = useState(PHASES.IDLE);
  const reduceMotion = useReducedMotion();
  const { speed, distance } = getMotionConfig(reduceMotion);

  const hasStartedRef = useRef(false);
  const timersRef = useRef([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startOpening = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      setPhase(PHASES.OPENING);

      const milestones = [
        [TIMELINE_MS.reveal, PHASES.REVEALING],
        [TIMELINE_MS.hold, PHASES.HOLDING],
        [TIMELINE_MS.exit, PHASES.EXITING],
      ];

      milestones.forEach(([at, nextPhase]) => {
        timersRef.current.push(window.setTimeout(() => setPhase(nextPhase), at * speed));
      });

      timersRef.current.push(
        window.setTimeout(() => onCompleteRef.current?.(), TIMELINE_MS.complete * speed)
      );
    };

    // Wait for the envelope & title entrance to settle, then open automatically.
    const autoOpenTimer = window.setTimeout(startOpening, 1800 * speed);

    return () => {
      window.clearTimeout(autoOpenTimer);
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
      hasStartedRef.current = false;
    };
  }, [speed]);

  const isIdle = phase === PHASES.IDLE;
  const isCardVisible = CARD_VISIBLE_PHASES.includes(phase);

  const sceneVariants = {
    enter: { opacity: 1, transition: { duration: 1.2 * speed, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.65 * speed, ease: [0.45, 0, 0.2, 1] } },
  };

  const titleVariants = fadeUpVariants({ delay: 0.9, speed, distance });

  return (
    <motion.section
      className="opening-scene"
      aria-label="Wedding invitation opening"
      initial={{ opacity: 0 }}
      animate={phase === PHASES.EXITING ? 'exit' : 'enter'}
      variants={sceneVariants}
    >
      <div className="opening-scene__backdrop" aria-hidden="true" />
      <GoldParticles />
      <FrameBorder />

      <div className="opening-scene__content">
        <motion.h1
          className="opening-scene__title"
          variants={titleVariants}
          initial="hidden"
          animate={isIdle ? 'show' : 'hide'}
        >
          {title}
        </motion.h1>

        <RoyalEnvelope
          phase={phase}
          speed={speed}
          distance={distance}
        />
      </div>

      <div className="opening-scene__card-layer">
        <InvitationCard
          heading={cardHeading}
          visible={isCardVisible}
          speed={speed}
          distance={distance}
        />
      </div>
    </motion.section>
  );
}

export default OpeningScene;

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import OrnateFrame from './frame/OrnateFrame';
import { EASE_CINEMATIC, PHOTO_TIMING as P } from '../../config/invitationTiming';

/**
 * Call this while "You Are Cordially Invited" is on screen so the photos
 * are already decoded when they fade in (prevents pop-in).
 */
export function preloadCouplePhotos(...sources) {
  sources.filter(Boolean).forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });
}

function buildVariants(reduce) {
  const empty = { hidden: {}, show: {} };

  if (reduce) {
    const fade = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: P.reduced.duration } },
    };
    return {
      group: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
      portrait: fade,
      portraitImg: empty,
      couple: fade,
      coupleImg: empty,
    };
  }

  return {
    group: {
      hidden: {},
      show: { transition: { staggerChildren: P.portraitStagger, delayChildren: P.portraitDelay } },
    },
    portrait: {
      hidden: { opacity: 0, y: P.portraitRise, scale: P.portraitStartScale },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: P.portraitDuration, ease: EASE_CINEMATIC },
      },
    },
    portraitImg: {
      hidden: { scale: P.imageSettleScale },
      show: { scale: 1, transition: { duration: P.imageSettleDuration, ease: EASE_CINEMATIC } },
    },
    couple: {
      hidden: { opacity: 0, scale: P.coupleStartScale },
      show: {
        opacity: 1,
        scale: 1,
        transition: { duration: P.coupleDuration, delay: P.coupleDelay, ease: EASE_CINEMATIC },
      },
    },
    coupleImg: {
      hidden: { scale: P.coupleImageSettleScale },
      show: {
        scale: 1,
        transition: { duration: P.coupleImageSettleDuration, ease: EASE_CINEMATIC },
      },
    },
  };
}

/**
 * bride / groom / couple: { src, alt, width, height, caption? }
 * caption can be any node, so your existing names and Hindi text pass through untouched.
 * DOM order is bride, groom: bride reveals first. Swap the two frames to flip sides.
 */
export default function CouplePhotos({ bride, groom, couple, className = '' }) {
  const reduce = useReducedMotion();
  const v = useMemo(() => buildVariants(reduce), [reduce]);
  const viewport = { once: true, amount: P.viewportAmount };

  return (
    <section className={`rw-photos ${className}`.trim()} aria-label="Wedding photographs / दूल्हा-दुल्हन">
      <motion.div
        className="rw-photos__portraits"
        variants={v.group}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <OrnateFrame
          variant="portrait"
          {...bride}
          frameVariants={v.portrait}
          imageVariants={v.portraitImg}
        />
        <OrnateFrame
          variant="portrait"
          {...groom}
          frameVariants={v.portrait}
          imageVariants={v.portraitImg}
        />
      </motion.div>

      <motion.div
        className="rw-photos__couple"
        variants={{ hidden: {}, show: {} }}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        <OrnateFrame
          variant="couple"
          loading="lazy"
          {...couple}
          frameVariants={v.couple}
          imageVariants={v.coupleImg}
        />
      </motion.div>
    </section>
  );
}

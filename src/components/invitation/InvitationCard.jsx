import { motion } from 'framer-motion';
import { CornerOrnament } from './FrameBorder';
import { EASE_OUT_SOFT } from './openingConfig';

function OrnamentDivider() {
  return (
    <div className="ornament-divider" aria-hidden="true">
      <span className="ornament-divider__line" />
      <span className="ornament-divider__gem" />
      <span className="ornament-divider__line" />
    </div>
  );
}

export default function InvitationCard({ heading, visible, speed, distance, children }) {
  const variants = {
    hidden: {
      opacity: 0,
      scale: 1 - 0.14 * distance,
      y: 70 * distance,
      clipPath: 'inset(100% 0% 0% 0%)',
    },
    revealed: {
      opacity: 1,
      scale: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 1.2 * speed, ease: EASE_OUT_SOFT },
    },
  };

  return (
    <motion.article
      className={`invitation-card${visible ? ' is-revealed' : ''}`}
      variants={variants}
      initial="hidden"
      animate={visible ? 'revealed' : 'hidden'}
    >
      <CornerOrnament position="tl" className="invitation-card__corner" />
      <CornerOrnament position="tr" className="invitation-card__corner" />
      <CornerOrnament position="bl" className="invitation-card__corner" />
      <CornerOrnament position="br" className="invitation-card__corner" />

      <h2 className="invitation-card__heading">{heading}</h2>
      <OrnamentDivider />
      {children}
    </motion.article>
  );
}

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { INVITE_TIMING, EASE_SOFT } from '../../config/invitationTiming';

/**
 * Single-pass fade in -> hold -> fade out.
 *
 * onExitStart fires when the fade-out begins: mount the next section then,
 * so it fades in while this one fades out (no dead air between sections).
 * onComplete fires when this message is fully gone: unmount it then.
 *
 * Pass your existing display font through textClassName
 * (e.g. textClassName="font-display"); the text itself is unchanged.
 */
export default function CordiallyInvited({
  text = 'You Are Cordially Invited',
  onExitStart,
  onComplete,
  fullscreen = true,
  className = '',
  textClassName = '',
}) {
  const reduce = useReducedMotion();
  const { fadeIn, hold, fadeOut } = reduce ? INVITE_TIMING.reduced : INVITE_TIMING;
  const total = fadeIn + hold + fadeOut;
  const times = [0, fadeIn / total, (fadeIn + hold) / total, 1];

  // Keep latest callbacks without restarting the timers
  const callbacks = useRef({ onExitStart, onComplete });
  callbacks.current = { onExitStart, onComplete };

  useEffect(() => {
    const exitTimer = setTimeout(() => callbacks.current.onExitStart?.(), (fadeIn + hold) * 1000);
    const doneTimer = setTimeout(() => callbacks.current.onComplete?.(), total * 1000);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [fadeIn, hold, total]);

  return (
    <div className={`rw-invite ${fullscreen ? 'rw-invite--full' : ''} ${className}`.trim()}>
      <motion.h2
        className={`rw-invite__text ${textClassName}`.trim()}
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: reduce ? 0 : [10, 0, 0, -6],
        }}
        transition={{ duration: total, times, ease: EASE_SOFT }}
      >
        {text}
      </motion.h2>
    </div>
  );
}

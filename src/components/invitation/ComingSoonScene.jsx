import React from 'react';
import { motion } from 'framer-motion';

/**
 * Temporary placeholder displayed after the OpeningScene completes.
 * Replace this with the actual invitation flow once storyline content is ready.
 */
export default function ComingSoonScene() {
  return (
    <motion.div
      className="coming-soon-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse 80% 62% at 50% 42%, #7b1a31 0%, #55102a 45%, #26060f 100%)',
        color: '#fbf3df',
        fontFamily: "'Cormorant Garamond', 'Times New Roman', Georgia, serif",
        textAlign: 'center',
        padding: '24px',
        zIndex: 60,
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 42%, rgba(255,205,110,0.14) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Ornament */}
        <svg
          viewBox="0 0 60 20"
          fill="none"
          stroke="#d4af37"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ width: '80px', margin: '0 auto 20px', display: 'block', opacity: 0.75 }}
        >
          <line x1="0" y1="10" x2="22" y2="10" />
          <polygon points="30,2 38,10 30,18 22,10" fill="rgba(212,175,55,0.2)" stroke="#d4af37" />
          <line x1="38" y1="10" x2="60" y2="10" />
        </svg>

        <p
          style={{
            margin: '0 0 12px',
            fontSize: '0.78rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#d4af37',
            fontWeight: 500,
          }}
        >
          The Celebration Awaits
        </p>

        <h2
          style={{
            margin: '0 0 16px',
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            fontWeight: 600,
            lineHeight: 1.12,
            color: '#fbf3df',
            textShadow: '0 2px 20px rgba(255,200,100,0.22)',
          }}
        >
          Invitation Coming Soon
        </h2>

        <p
          style={{
            margin: '0 0 32px',
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: '#f7e4a6',
            opacity: 0.8,
          }}
        >
          The wedding invitation story is being prepared.
        </p>

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            justifyContent: 'center',
            opacity: 0.6,
          }}
        >
          <span style={{ flex: 1, maxWidth: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4af37)' }} />
          <span
            style={{
              width: '8px',
              height: '8px',
              background: '#f6e3a6',
              border: '1px solid #b8862b',
              transform: 'rotate(45deg)',
              display: 'block',
            }}
          />
          <span style={{ flex: 1, maxWidth: '60px', height: '1px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

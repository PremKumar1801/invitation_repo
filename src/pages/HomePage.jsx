import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OpeningScene from '../components/invitation/OpeningScene';
import RoyalInvitation from '../components/invitation/RoyalInvitation';
import WeddingInvitationBody from '../components/invitation/WeddingInvitationBody';
import FloatingMusicControl from '../components/invitation/FloatingMusicControl';
import { useWeddingAudio } from '../hooks/useWeddingAudio';
import { weddingConfig, weddingContent } from '../weddingConfig';

/**
 * HomePage orchestrates the complete royal cinematic wedding invitation flow:
 *
 *   Phase 1: OpeningScene
 *     Cinematic envelope reveal with wax seal break, golden light burst & invitation card
 *
 *   Phase 2: Main Invitation Experience
 *     1. RoyalInvitation - The grand mandap hero scene with parallax golden glow & couple names
 *     2. WeddingInvitationBody - Complete bilingual (Hindi + English) story:
 *        - Ganesh Vandana & Welcome invocation
 *        - Couple presentation
 *        - Real photographs gallery (Bride, Groom, Couple)
 *        - 4 Sacred wedding events timeline (Tilak, Haldi, Mehendi & Sangeet, Vivah)
 *        - Wedding date milestone
 *        - Auspicious venue with map directions
 *        - Warm family closing blessing
 */
export default function HomePage() {
  const [openingDone, setOpeningDone] = useState(false);
  const { isPlaying, hasStarted, hasError, start: startMusic, toggle: toggleMusic } = useWeddingAudio('/audio/wedding-music.mp3');

  // Stable reference prevents re-subscribing timers inside OpeningScene
  const handleOpeningComplete = useCallback(() => {
    setOpeningDone(true);
  }, []);

  return (
    <>
      {/* ── Phase 1: Cinematic envelope opening ── */}
      <AnimatePresence>
        {!openingDone && (
          <OpeningScene
            key="opening"
            title={weddingConfig.openingTitle}
            ctaLabel={weddingConfig.openingCta}
            cardHeading={weddingConfig.openingCardText}
            onOpenStart={startMusic}
            onComplete={handleOpeningComplete}
          />
        )}
      </AnimatePresence>

      {/* ── Phase 2: Complete Wedding Invitation Experience ── */}
      {openingDone && (
        <motion.div
          key="invitation-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full min-h-screen bg-[#1F060A]"
        >
          {/* Royal Mandap Hero Section */}
          <RoyalInvitation
            content={{
              familiesLine: weddingConfig.familiesLine,
              requestLine: weddingConfig.requestLine,
              brideName: weddingConfig.brideName,
              connector: weddingConfig.connector,
              groomName: weddingConfig.groomName,
              occasionLine: weddingConfig.occasionLine,
              weddingDate: weddingConfig.weddingDateFormatted,
              closingLine: weddingConfig.closingLine,
            }}
          />

          {/* Bilingual Hindi + English Story & Events Timeline */}
          <WeddingInvitationBody content={weddingContent} />
        </motion.div>
      )}

      {/* ── Persistent Floating Music Control ── */}
      <FloatingMusicControl
        visible={hasStarted && !hasError}
        isPlaying={isPlaying}
        onToggle={toggleMusic}
      />
    </>
  );
}

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

/**
 * Floating antique-gold & burgundy music toggle button anchored to bottom-right.
 * Displays a subtle golden pulse and animated icon motion while music is playing.
 */
export default function FloatingMusicControl({ visible, isPlaying, onToggle }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]"
          style={{
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            paddingRight: 'env(safe-area-inset-right, 0px)',
          }}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
            aria-pressed={isPlaying}
            title={isPlaying ? 'Pause music' : 'Play music'}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#d4af37]/65 bg-gradient-to-br from-[#4a0e1b]/95 via-[#320813]/95 to-[#21040b]/95 text-[#f0dc9c] shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_14px_rgba(212,175,55,0.22)] backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:border-[#f0dc9c]/85 hover:shadow-[0_10px_28px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.38)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0dc9c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f060a] cursor-pointer"
          >
            {/* Subtle breathing gold halo while playing */}
            {isPlaying && !reduceMotion && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-full border border-[#d4af37]/50"
                initial={{ opacity: 0.65, scale: 1 }}
                animate={{ opacity: [0.65, 0, 0.65], scale: [1, 1.32, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Inner hairline antique-gold ring */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[3px] rounded-full border border-[#d4af37]/25"
            />

            {/* Icon with subtle floating/sway animation while playing */}
            <motion.span
              className="relative flex items-center justify-center"
              animate={
                isPlaying && !reduceMotion
                  ? { rotate: [-4, 4, -4], scale: [1, 1.07, 1] }
                  : { rotate: 0, scale: 1 }
              }
              transition={
                isPlaying && !reduceMotion
                  ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.25 }
              }
            >
              {isPlaying ? (
                <Music className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#f0dc9c]" strokeWidth={1.8} />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#c9a24b]/80" strokeWidth={1.8} />
              )}
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

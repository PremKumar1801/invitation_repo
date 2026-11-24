import React, { useEffect } from 'react';
import CouplePhotos, { preloadCouplePhotos } from './CouplePhotos';
import { weddingContent } from '../../weddingContent';

export default function CouplePortraits({
  photos = weddingContent.photos,
  couple = weddingContent.couple,
}) {
  const brideSrc = photos?.bride || '/images/bride.jpg';
  const groomSrc = photos?.groom || '/images/groom.jpg';
  const coupleSrc = photos?.couple || '/images/couple.jpg';

  // Preload photos for smooth entrance
  useEffect(() => {
    preloadCouplePhotos(brideSrc, groomSrc, coupleSrc);
  }, [brideSrc, groomSrc, coupleSrc]);

  const brideData = {
    src: brideSrc,
    alt: 'Bride — AYUSHI PREETI KUMARI',
    width: 773,
    height: 1024,
    caption: (
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-serif text-sm sm:text-base font-medium tracking-wider uppercase text-[#F7E4A6]">
          AYUSHI PREETI KUMARI
        </span>
      </div>
    ),
  };

  const groomData = {
    src: groomSrc,
    alt: 'Groom — PRAVEEN KUMAR',
    width: 772,
    height: 1024,
    caption: (
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-serif text-sm sm:text-base font-medium tracking-wider uppercase text-[#F7E4A6]">
          PRAVEEN KUMAR
        </span>
      </div>
    ),
  };

  const coupleData = {
    src: coupleSrc,
    alt: 'Couple — AYUSHI PREETI KUMARI & PRAVEEN KUMAR',
    width: 1024,
    height: 682,
    caption: (
      <div className="flex flex-col items-center gap-1">
        <span className="font-serif text-base sm:text-lg font-medium tracking-wider uppercase text-[#F7E4A6]">
          AYUSHI PREETI KUMARI &amp; PRAVEEN KUMAR
        </span>
        <span className="font-serif text-xs sm:text-sm tracking-widest uppercase text-[#ECC870]/80">
          Together in Love &amp; Harmony
        </span>
      </div>
    ),
  };

  return (
    <section className="wi-section wi-portraits py-4 sm:py-8" aria-label="Couple photographs / दूल्हा-दुल्हन">
      <div className="max-w-4xl mx-auto px-4">
        <CouplePhotos bride={brideData} groom={groomData} couple={coupleData} />
      </div>
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { weddingContent } from "../../weddingContent";
import { Bilingual, GoldDivider, Floral, Reveal } from "./ornaments";
import "./WeddingEventsSection.css";

/* 1 ─ Welcome + invitation ------------------------------------------------ */
export function WelcomeSection({ content = weddingContent.opening }) {
  return (
    <section className="wi-section wi-welcome" aria-labelledby="wi-welcome-heading">
      <Floral className="wi-floral--tl" />
      <Floral className="wi-floral--br" />
      <div className="wi-container wi-center">
        <Reveal>
          <p className="wi-invocation" lang="hi">
            {content.invocation.hi}
          </p>
          <Bilingual hi={content.blessing.hi} en={content.blessing.en} className="wi-lead" />
        </Reveal>

        <GoldDivider />

        <Reveal delay={0.1}>
          <Bilingual
            as="h2"
            id="wi-welcome-heading"
            hi={content.invitationTitle.hi}
            en={content.invitationTitle.en}
            className="wi-heading"
          />
          <Bilingual hi={content.invitationBody.hi} en={content.invitationBody.en} className="wi-body-copy" />
        </Reveal>
      </div>
    </section>
  );
}

/* 2 ─ Couple --------------------------------------------------------------- */
export function CoupleSection({ content = weddingContent.couple }) {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="wi-section wi-couple" aria-label="The couple / वर-वधू">
      <div className="wi-container wi-center">
        <motion.div {...rise(0)} className="wi-name">
          <span className="wi-name__hi" lang="hi">
            {content.bride.hi}
          </span>
          <span className="wi-name__en" lang="en">
            {content.bride.en}
          </span>
        </motion.div>

        <motion.div {...rise(0.25)} className="wi-connector" aria-hidden="true">
          <span className="wi-divider__line" />
          <span className="wi-connector__word" lang="hi">
            {content.connector.hi}
          </span>
          <span className="wi-divider__line" />
        </motion.div>

        <motion.div {...rise(0.5)} className="wi-name">
          <span className="wi-name__hi" lang="hi">
            {content.groom.hi}
          </span>
          <span className="wi-name__en" lang="en">
            {content.groom.en}
          </span>
        </motion.div>

        <Reveal delay={0.2}>
          <Bilingual hi={content.tagline.hi} en={content.tagline.en} className="wi-tagline" />
        </Reveal>
      </div>
    </section>
  );
}

/* 4 ─ Wedding date --------------------------------------------------------- */
export function WeddingDateSection({ content = weddingContent.weddingDate }) {
  return (
    <section className="wi-section wi-date" aria-label="Wedding date / विवाह तिथि">
      <div className="wi-container wi-center">
        <Reveal>
          <time className="wi-bigdate" dateTime={content.iso}>
            <span className="wi-bigdate__day">{content.day}</span>
            <span className="wi-bigdate__month" lang="hi">
              {content.month.hi}
            </span>
            <span className="wi-bigdate__year">{content.year}</span>
          </time>
          <Bilingual hi={content.hi} en={content.en} className="wi-datelines" />
        </Reveal>
      </div>
    </section>
  );
}

/* 5 ─ Venue with decorative map placeholder -------------------------------- */
function MapIllustration() {
  return (
    <svg className="wi-map" viewBox="0 0 400 240" role="img" aria-label="Decorative map illustration">
      <rect x="1" y="1" width="398" height="238" rx="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g fill="none" stroke="currentColor" strokeLinecap="round" opacity="0.55">
        <path d="M0 150 C80 120 140 190 220 140 S340 90 400 120" strokeWidth="10" opacity="0.35" />
        <path d="M60 0 C90 70 70 150 130 240" strokeWidth="6" opacity="0.3" />
        <path d="M250 0 C240 80 300 150 280 240" strokeWidth="4" opacity="0.3" />
        <path d="M0 60 L400 40" strokeWidth="3" opacity="0.25" strokeDasharray="6 8" />
      </g>
      <g transform="translate(200 104)">
        <circle r="26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle r="38" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <path d="M0 22 C-14 4 -14 -12 0 -18 C14 -12 14 4 0 22 Z" fill="currentColor" />
        <circle cy="-5" r="4.5" fill="var(--wi-burgundy-deep)" />
      </g>
    </svg>
  );
}

export function VenueSection({ content = weddingContent.venue }) {
  return (
    <section className="wi-section wi-venue" aria-labelledby="wi-venue-heading">
      <div className="wi-container wi-center">
        <Reveal>
          <Bilingual
            as="h2"
            id="wi-venue-heading"
            hi={content.heading.hi}
            en={content.heading.en}
            className="wi-heading"
          />
          <GoldDivider />
        </Reveal>

        <Reveal delay={0.1} className="wi-venue__card">
          <MapIllustration />
          <Bilingual as="h3" hi={content.name.hi} en={content.name.en} className="wi-venue__name" />
          <Bilingual hi={content.address.hi} en={content.address.en} className="wi-venue__address" />
          {content.mapUrl && (
            <a className="wi-button" href={content.mapUrl} target="_blank" rel="noopener noreferrer">
              <span lang="hi">{content.directionsLabel.hi}</span>
              <span className="wi-button__en" lang="en">
                {content.directionsLabel.en}
              </span>
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* 6 ─ Closing -------------------------------------------------------------- */
export function ClosingSection({ content = weddingContent.closing }) {
  return (
    <section className="wi-section wi-closing" aria-label="Closing message / समापन">
      <Floral className="wi-floral--tl" />
      <Floral className="wi-floral--br" />
      <div className="wi-container wi-center">
        <Reveal>
          <GoldDivider />
          <Bilingual hi={content.hi} en={content.en} className="wi-lead" />
          <Bilingual hi={content.blessing.hi} en={content.blessing.en} className="wi-body-copy" />
        </Reveal>
      </div>
    </section>
  );
}

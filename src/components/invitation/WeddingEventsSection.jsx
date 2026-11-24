import { motion, useReducedMotion } from "framer-motion";
import { weddingContent } from "../../weddingContent";
import { Bilingual, GoldDivider, Floral, Reveal } from "./ornaments";
import "./WeddingEventsSection.css";

const EASE = [0.22, 1, 0.36, 1];

function EventCard({ event, index }) {
  const reduce = useReducedMotion();
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.li
      className={`wi-event wi-event--${side}${event.isMain ? " wi-event--main" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span className="wi-event__node" aria-hidden="true" />

      <article className="wi-event__card">
        <time className="wi-event__date" dateTime={event.iso}>
          <span className="wi-event__day">{event.day}</span>
          <span className="wi-event__month" lang="hi">
            {event.month.hi}
          </span>
          <span className="wi-event__month-en" lang="en">
            {event.month.en} {event.year}
          </span>
        </time>

        <div className="wi-event__body">
          <Bilingual as="h3" hi={event.title.hi} en={event.title.en} className="wi-event__title" />
          <p className="wi-event__weekday">
            <span lang="hi">{event.weekday.hi}</span>
            <span className="wi-event__sep" aria-hidden="true" />
            <span lang="en">{event.weekday.en}</span>
          </p>
          {event.time && (
            <p className="wi-event__time">
              <span lang="hi">{event.time.hi}</span>
              <span lang="en">{event.time.en}</span>
            </p>
          )}
        </div>
      </article>
    </motion.li>
  );
}

export default function WeddingEventsSection({ content = weddingContent.events }) {
  const reduce = useReducedMotion();

  return (
    <section className="wi-section wi-events" aria-labelledby="wi-events-heading">
      <Floral className="wi-floral--tl" />
      <Floral className="wi-floral--br" />

      <div className="wi-container">
        <Reveal>
          <Bilingual
            as="h2"
            id="wi-events-heading"
            hi={content.heading.hi}
            en={content.heading.en}
            className="wi-heading"
          />
          <GoldDivider />
        </Reveal>

        <ol className="wi-timeline">
          <motion.span
            className="wi-timeline__line"
            aria-hidden="true"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
          {content.items.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

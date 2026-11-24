import { weddingContent } from "../../weddingContent";
import {
  WelcomeSection,
  CoupleSection,
  WeddingDateSection,
  VenueSection,
  ClosingSection,
} from "./InvitationSections";
import WeddingEventsSection from "./WeddingEventsSection";
import CouplePortraits from "./CouplePortraits";

/**
 * Renders the complete bilingual wedding invitation experience in sequence:
 * welcome → couple → portraits → events timeline → wedding date → venue → closing.
 */
export default function WeddingInvitationBody({ content = weddingContent }) {
  return (
    <main className="wi-root">
      <WelcomeSection content={content.opening} />
      <CoupleSection content={content.couple} />
      <CouplePortraits photos={content.photos} couple={content.couple} />
      <WeddingEventsSection content={content.events} />
      <WeddingDateSection content={content.weddingDate} />
      <VenueSection content={content.venue} />
      <ClosingSection content={content.closing} />
    </main>
  );
}

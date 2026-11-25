/**
 * weddingConfig.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central single-source-of-truth configuration for the wedding invitation.
 * Stores all bilingual (Hindi + English) details, event schedule, venue,
 * couple metadata, and photographs.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const weddingConfig = Object.freeze({
  // ── Couple ───────────────────────────────────────────────────────────────
  couple: {
    bride: {
      hi: 'आयुषी प्रिती कुमारी',
      en: 'Ayushi Preeti Kumari',
    },
    groom: {
      hi: 'चिरंजीवी प्रवीण कुमार',
      en: 'Praveen Kumar',
    },
    connector: {
      hi: 'संग',
      en: 'with',
    },
    tagline: {
      hi: 'दो दिल, एक सुंदर सफ़र, उम्र भर का साथ।',
      en: 'Two hearts, one beautiful journey, a lifetime of togetherness.',
    },
  },

  // ── Opening Envelope & Hero Copy ──────────────────────────────────────────
  opening: {
    invocation: {
      hi: 'श्री गणेशाय नमः',
      en: 'Shri Ganeshaya Namah',
    },
    blessing: {
      hi: 'ईश्वर एवं परिवारजनों के आशीर्वाद से',
      en: 'With the blessings of the Almighty and our beloved families',
    },
    invitationTitle: {
      hi: 'सादर आमंत्रण',
      en: 'Warm Invitation',
    },
    invitationBody: {
      hi: 'आपकी गरिमामयी उपस्थिति एवं शुभाशीष हमारे लिए अनमोल होंगे।',
      en: 'We cordially invite you to join us and bless the couple on their wedding celebration.',
    },
    title: 'A Celebration of Love',
    ctaLabel: 'Tap to Open Invitation',
    cardHeading: 'You Are Cordially Invited',
    familiesLine: 'Together with their families',
    requestLine: 'Request the pleasure of your presence',
    occasionLine: 'On the auspicious occasion of their wedding',
    closingLine: 'Join us as we celebrate love, laughter and a lifetime of togetherness.',
  },

  // ── Wedding Date ──────────────────────────────────────────────────────────
  weddingDate: {
    iso: '2026-12-05',
    day: '05',
    month: {
      hi: 'दिसंबर',
      en: 'December',
    },
    year: '2026',
    weekday: {
      hi: 'शनिवार',
      en: 'Saturday',
    },
    formatted: {
      hi: '05 दिसंबर 2026 | शनिवार',
      en: 'Saturday, 05 December 2026',
    },
  },

  // ── Four Sacred Wedding Events ────────────────────────────────────────────
  events: {
    heading: {
      hi: 'मंगल कार्यक्रम',
      en: 'Wedding Celebrations',
    },
    items: [
      {
        id: 'tilak',
        title: {
          hi: 'शुभ तिलक',
          en: 'Shubh Tilak Ceremony',
        },
        iso: '2026-12-01',
        day: '01',
        month: {
          hi: 'दिसंबर',
          en: 'December',
        },
        weekday: {
          hi: 'मंगलवार',
          en: 'Tuesday',
        },
        year: '2026',
      },
      {
        id: 'haldi',
        title: {
          hi: 'हल्दी मंडप',
          en: 'Haldi Ceremony',
        },
        iso: '2026-12-03',
        day: '03',
        month: {
          hi: 'दिसंबर',
          en: 'December',
        },
        weekday: {
          hi: 'गुरुवार',
          en: 'Thursday',
        },
        year: '2026',
      },
      {
        id: 'mehendi-sangeet',
        title: {
          hi: 'मेहंदी एवं संगीत',
          en: 'Mehendi & Sangeet',
        },
        iso: '2026-12-04',
        day: '04',
        month: {
          hi: 'दिसंबर',
          en: 'December',
        },
        weekday: {
          hi: 'शुक्रवार',
          en: 'Friday',
        },
        year: '2026',
      },
      {
        id: 'vivah',
        title: {
          hi: 'शुभ विवाह',
          en: 'Wedding Ceremony',
        },
        iso: '2026-12-05',
        day: '05',
        month: {
          hi: 'दिसंबर',
          en: 'December',
        },
        weekday: {
          hi: 'शनिवार',
          en: 'Saturday',
        },
        year: '2026',
        isMain: true,
      },
    ],
  },

  // ── Venue ─────────────────────────────────────────────────────────────────
  venue: {
    heading: {
      hi: 'शुभ स्थान',
      en: 'The Venue',
    },
    name: {
      hi: 'शिव शंकर उत्सव पैलेस',
      en: 'Shiv Shankar Utsav Palace',
    },
    address: {
      hi: 'ब्रह्मपुर चौरस्ता, आरा रोड, जिला बक्सर, बिहार',
      en: 'Brahmapur Chaurasta, Ara Road, Buxar, Bihar',
    },
    mapUrl: 'https://maps.google.com/?q=Shiv+Shankar+Utsav+Palace+Brahmapur+Buxar+Bihar',
    directionsLabel: {
      hi: 'मार्ग देखें (Google Maps)',
      en: 'View Directions',
    },
  },

  // ── Closing Blessing ──────────────────────────────────────────────────────
  closing: {
    hi: 'आपके आगमन की प्रतीक्षा में',
    en: 'We look forward to celebrating with you.',
    blessing: {
      hi: 'आपकी गरिमामयी उपस्थिति एवं शुभाशीष हमारे लिए अनमोल होंगे।',
      en: 'Your presence and blessings will be treasured.',
    },
  },

  // ── Real Photographs (public/images/) ─────────────────────────────────────
  photos: {
    bride: '/images/bride.jpg',
    groom: '/images/groom.jpg',
    couple: '/images/couple.jpg',
  },

  // ── Flat convenience getters for legacy component props ───────────────────
  brideName: 'आयुषी प्रिती कुमारी',
  groomName: 'चिरंजीवी प्रवीण कुमार',
  connector: '&',
  familiesLine: 'Together with their families',
  requestLine: 'Request the pleasure of your company',
  occasionLine: 'On the auspicious occasion of their wedding',
  weddingDateFormatted: '05 December 2026 (Saturday)',
  closingLine: 'Join us as we celebrate love, laughter and a lifetime of togetherness.',
  openingTitle: 'A Celebration of Love',
  openingCta: 'Tap to Open Invitation',
  openingCardText: 'You Are Cordially Invited',
});

/**
 * Shape expected by WeddingInvitationBody and individual sections
 */
export const weddingContent = {
  opening: weddingConfig.opening,
  couple: weddingConfig.couple,
  events: weddingConfig.events,
  weddingDate: {
    iso: weddingConfig.weddingDate.iso,
    hi: weddingConfig.weddingDate.formatted.hi,
    en: weddingConfig.weddingDate.formatted.en,
    day: weddingConfig.weddingDate.day,
    month: weddingConfig.weddingDate.month,
    year: weddingConfig.weddingDate.year,
  },
  venue: weddingConfig.venue,
  closing: weddingConfig.closing,
  photos: weddingConfig.photos,
};

export default weddingConfig;

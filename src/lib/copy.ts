// Bilingual copy for the Mundhe Banni Forum pre-launch survey.
// Tech terms, brand names, and proper nouns are intentionally kept in English
// in both languages (Bengaluru, WhatsApp, MVP, NPS, ROI, iSPIRT, TiE, etc.).
//
// Storage rule: option `value` is ALWAYS the English form — that's what
// lands in Supabase. The `kn` field is purely display.

export type Lang = "en" | "kn";

export type Persona = "EF" | "SC" | "AF" | "SP" | "MI";

export type Opt = { value: string; en: string; kn: string };

const o = (en: string, kn: string): Opt => ({ value: en, en, kn });

export const COPY = {
  // Top-level form chrome
  chrome: {
    formTitle: {
      en: "Help us build the Mundhe Banni Forum",
      kn: "Mundhe Banni Forum ನಿರ್ಮಾಣಕ್ಕೆ ಸಹಾಯ ಮಾಡಿ",
    },
    formSubtitle: {
      en: "6 sections · ~5 minutes",
      kn: "6 ವಿಭಾಗಗಳು · ~5 ನಿಮಿಷ",
    },
    pillMobile: { en: "Pre-launch", kn: "Pre-launch" },
    sectionCount: { en: "Section", kn: "ವಿಭಾಗ" },
    of: { en: "of", kn: "/" },
    continue: { en: "Continue →", kn: "ಮುಂದೆ →" },
    back: { en: "← Back", kn: "← ಹಿಂದೆ" },
    submit: {
      en: "Submit & Unlock Founding Member Access →",
      kn: "Submit ಮಾಡಿ · Founding Member access unlock →",
    },
    submitting: { en: "Submitting…", kn: "Submit ಆಗ್ತಿದೆ…" },
    unlockHint: {
      en: "Submitting will unlock your founding-member confirmation",
      kn: "Submit ಮಾಡಿದ ತಕ್ಷಣ founding member access unlock ಆಗ್ತದೆ",
    },
    pickTop3: { en: "Pick top 3", kn: "ಪ್ರಮುಖ 3 ಆಯ್ಕೆ ಮಾಡಿ" },
    checkAll: { en: "Check all that apply", kn: "ಸೂಕ್ತವಾದದನ್ನು ಎಲ್ಲ ಆಯ್ಕೆ ಮಾಡಿ" },
    specify: { en: "Please specify…", kn: "ನಮೂದಿಸಿ…" },
    somethingWrong: {
      en: "Something went wrong — please try again.",
      kn: "ಏನೋ ತಪ್ಪಾಗಿದೆ — ಮತ್ತೆ try ಮಾಡಿ.",
    },
  },

  sections: [
    { en: "Hello — let's start", kn: "ನಮಸ್ಕಾರ — ಪ್ರಾರಂಭಿಸೋಣ" },
    { en: "About you", kn: "ನಿಮ್ಮ ಬಗ್ಗೆ" },
    { en: "Your biggest challenges", kn: "ನಿಮ್ಮ ಪ್ರಮುಖ ಸವಾಲುಗಳು" },
    { en: "How you'd engage", kn: "ನೀವು ಹೇಗೆ engage ಆಗ್ತೀರಿ" },
    { en: "Events & content", kn: "Events ಮತ್ತು content" },
    { en: "Final thoughts", kn: "ಕೊನೆಯ ಮಾತುಗಳು" },
  ],

  // Contact fields
  contact: {
    fullName: { en: "Full name *", kn: "ಪೂರ್ಣ ಹೆಸರು *" },
    fullNamePh: { en: "e.g. Anitha R.", kn: "ಉದಾ. ಅನಿತಾ ಆರ್." },
    city: { en: "City *", kn: "ನಗರ *" },
    cityPh: { en: "e.g. Bengaluru", kn: "ಉದಾ. Bengaluru" },
    email: { en: "Email *", kn: "Email *" },
    emailPh: { en: "name@email.com", kn: "name@email.com" },
    phone: { en: "Phone *", kn: "Phone *" },
    phoneSub: { en: "WhatsApp number preferred", kn: "WhatsApp number ಸೂಕ್ತ" },
    phonePh: { en: "+91 98765 43210", kn: "+91 98765 43210" },
  },

  errors: {
    name: { en: "Please enter your full name.", kn: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ." },
    city: { en: "Please enter your city.", kn: "ನಿಮ್ಮ ನಗರ ನಮೂದಿಸಿ." },
    email: { en: "Please enter a valid email.", kn: "ಸರಿಯಾದ email ನಮೂದಿಸಿ." },
    phone: {
      en: "Please enter a valid phone number.",
      kn: "ಸರಿಯಾದ phone ನಂಬರ್ ನಮೂದಿಸಿ.",
    },
    persona: {
      en: "Please pick the option that best describes you.",
      kn: "ನಿಮಗೆ ಸರಿಯಾಗೋ option ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    q2: { en: "Please choose your primary location.", kn: "ನಿಮ್ಮ ಮುಖ್ಯ ಸ್ಥಳ ಆಯ್ಕೆ ಮಾಡಿ." },
    q2Other: {
      en: "Please specify your city / region.",
      kn: "ನಿಮ್ಮ ನಗರ / ಪ್ರದೇಶ ನಮೂದಿಸಿ.",
    },
    q3: { en: "Please choose your venture stage.", kn: "ನಿಮ್ಮ venture ಹಂತ ಆಯ್ಕೆ ಮಾಡಿ." },
    q4: { en: "Pick at least one challenge (up to 3).", kn: "ಕನಿಷ್ಠ ಒಂದು challenge ಆಯ್ಕೆ ಮಾಡಿ (3 ತನಕ)." },
    q4Other: {
      en: "Please specify your 'Other' challenge.",
      kn: "'Other' challenge ನಮೂದಿಸಿ.",
    },
    q5: {
      en: "Please rate every factor on the 1–5 scale.",
      kn: "ಪ್ರತಿ factor ಗೆ 1–5 scale ನಲ್ಲಿ rate ಮಾಡಿ.",
    },
    q6: { en: "Pick at least one — up to 3.", kn: "ಕನಿಷ್ಠ ಒಂದು ಆಯ್ಕೆ ಮಾಡಿ — 3 ತನಕ." },
    q7: {
      en: "Please pick how you'd like to interact.",
      kn: "ನೀವು ಹೇಗೆ interact ಆಗ್ತೀರಿ ಎಂದು ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    q8: {
      en: "Please pick what would make you contribute.",
      kn: "ನೀವು ಯಾಕೆ contribute ಮಾಡ್ತೀರಿ ಎಂದು ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    q9: {
      en: "Please pick your price willingness.",
      kn: "Price willingness ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    q10: {
      en: "Pick at least one community (or 'None — I don't belong…').",
      kn: "ಕನಿಷ್ಠ ಒಂದು community ಆಯ್ಕೆ ಮಾಡಿ (ಅಥವಾ 'None…').",
    },
    q11: { en: "Please pick your reason.", kn: "ನಿಮ್ಮ ಕಾರಣ ಆಯ್ಕೆ ಮಾಡಿ." },
    q12: {
      en: "Please pick a score from 1 to 10.",
      kn: "1 ರಿಂದ 10 ರ ತನಕ score ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    q13: { en: "Pick up to 3 event types.", kn: "3 event types ತನಕ ಆಯ್ಕೆ ಮಾಡಿ." },
    q14: { en: "Please pick a frequency.", kn: "Frequency ಆಯ್ಕೆ ಮಾಡಿ." },
    q15: { en: "Pick up to 3 content types.", kn: "3 content types ತನಕ ಆಯ್ಕೆ ಮಾಡಿ." },
    q16: {
      en: "Please pick what would make you an active member.",
      kn: "ಯಾವುದು ನಿಮ್ಮನ್ನು active member ಮಾಡುತ್ತದೆ ಎಂದು ಆಯ್ಕೆ ಮಾಡಿ.",
    },
    q17: {
      en: "Please share what's missing.",
      kn: "ಯಾವುದು missing ಎಂದು share ಮಾಡಿ.",
    },
    q18: {
      en: "Please describe your best community experience.",
      kn: "ನಿಮ್ಮ ಅತ್ಯುತ್ತಮ community experience describe ಮಾಡಿ.",
    },
    q19: { en: "Pick up to 3.", kn: "3 ತನಕ ಆಯ್ಕೆ ಮಾಡಿ." },
  },

  // Q1 — Persona selector
  q1: {
    prompt: {
      en: "Which best describes you? *",
      kn: "ನೀವು ಯಾರು — ಸರಿಯಾದದನ್ನು ಆಯ್ಕೆ ಮಾಡಿ *",
    },
    personas: [
      {
        code: "EF" as Persona,
        label: { en: "Early Founder", kn: "Early Founder" },
        sub: {
          en: "0–2 yrs · pre-revenue or early traction",
          kn: "0–2 ವರ್ಷ · pre-revenue ಅಥವಾ early traction",
        },
      },
      {
        code: "SC" as Persona,
        label: { en: "Scale-up Founder/CEO", kn: "Scale-up Founder/CEO" },
        sub: {
          en: "Series A+ or Rs.1Cr+ ARR",
          kn: "Series A+ ಅಥವಾ Rs.1Cr+ ARR",
        },
      },
      {
        code: "AF" as Persona,
        label: { en: "Aspiring Founder", kn: "Aspiring Founder" },
        sub: { en: "Planning · not started yet", kn: "Plan ಮಾಡ್ತಿದ್ದೇನೆ · ಇನ್ನೂ ಶುರು ಆಗಿಲ್ಲ" },
      },
      {
        code: "SP" as Persona,
        label: { en: "Service Provider", kn: "Service Provider" },
        sub: {
          en: "Agency, freelancer, consultant",
          kn: "Agency, freelancer, consultant",
        },
      },
      {
        code: "MI" as Persona,
        label: { en: "Mentor / Investor", kn: "Mentor / Investor" },
        sub: { en: "Angel, VC, advisor", kn: "Angel, VC, advisor" },
      },
    ],
  },

  q2: {
    prompt: {
      en: "Where is your company or primary work based? *",
      kn: "ನಿಮ್ಮ ಕಂಪನಿ ಅಥವಾ ಪ್ರಮುಖ ಕೆಲಸ ಎಲ್ಲಿ? *",
    },
    options: [
      o("Bengaluru", "Bengaluru"),
      o("Mysuru", "Mysuru"),
      o("Hubballi / Dharwad", "Hubballi / Dharwad"),
      o("Mangaluru", "Mangaluru"),
      o("Other Karnataka city", "Karnataka ದ ಬೇರೆ ನಗರ"),
      o(
        "Outside Karnataka but have strong KA ties",
        "Karnataka ಹೊರಗೆ ಆದರೆ KA ಗೆ ಬಲವಾದ ನಂಟು"
      ),
    ],
  },

  q3: {
    prompt: {
      en: "What is your venture's current stage? *",
      kn: "ನಿಮ್ಮ venture ಈಗ ಯಾವ ಹಂತದಲ್ಲಿದೆ? *",
    },
    options: [
      o(
        "Idea / pre-product — nothing shipped yet",
        "Idea / pre-product — ಏನೂ ship ಆಗಿಲ್ಲ"
      ),
      o("MVP live — testing with early users", "MVP live — early users ಜೊತೆ test ಆಗ್ತಿದೆ"),
      o(
        "Revenue generating — paying customers",
        "Revenue ಬರ್ತಿದೆ — paying customers ಇದ್ದಾರೆ"
      ),
      o(
        "Scaling — Series A+ or Rs.1Cr+ ARR",
        "Scaling — Series A+ ಅಥವಾ Rs.1Cr+ ARR"
      ),
      o("Exited / post-venture", "Exited / post-venture"),
      o("I am a service provider", "ನಾನು service provider"),
    ],
  },

  q4: {
    prompt: {
      en: "Your single biggest challenge right now? *",
      kn: "ಈಗ ನಿಮ್ಮ ಅತಿ ದೊಡ್ಡ challenge ಯಾವುದು? *",
    },
    byPersona: {
      EF: [
        o(
          "Finding first 10 paying customers",
          "ಮೊದಲ 10 paying customers ಸಿಗಿಸುವುದು"
        ),
        o("Honest feedback on product", "Product ಬಗ್ಗೆ ಪ್ರಾಮಾಣಿಕ feedback"),
        o(
          "Finding co-founder or early team",
          "Co-founder ಅಥವಾ early team ಸಿಗಿಸುವುದು"
        ),
        o("Raising first round", "ಮೊದಲ round funding ಎತ್ತುವುದು"),
        o(
          "Managing runway and burn rate",
          "Runway ಮತ್ತು burn rate manage ಮಾಡುವುದು"
        ),
        o("Loneliness of building alone", "ಒಂಟಿಯಾಗಿ build ಮಾಡುವ ಒಂಟಿತನ"),
        o("Not knowing what I don't know", "ಏನು ಗೊತ್ತಿಲ್ಲ ಎಂದು ಗೊತ್ತಿಲ್ಲ"),
        o("Other", "ಇತರೆ"),
      ],
      AF: [
        o(
          "Finding first 10 paying customers",
          "ಮೊದಲ 10 paying customers ಸಿಗಿಸುವುದು"
        ),
        o("Honest feedback on product", "Product ಬಗ್ಗೆ ಪ್ರಾಮಾಣಿಕ feedback"),
        o(
          "Finding co-founder or early team",
          "Co-founder ಅಥವಾ early team ಸಿಗಿಸುವುದು"
        ),
        o("Raising first round", "ಮೊದಲ round funding ಎತ್ತುವುದು"),
        o(
          "Managing runway and burn rate",
          "Runway ಮತ್ತು burn rate manage ಮಾಡುವುದು"
        ),
        o("Loneliness of building alone", "ಒಂಟಿಯಾಗಿ build ಮಾಡುವ ಒಂಟಿತನ"),
        o("Not knowing what I don't know", "ಏನು ಗೊತ್ತಿಲ್ಲ ಎಂದು ಗೊತ್ತಿಲ್ಲ"),
        o("Other", "ಇತರೆ"),
      ],
      SC: [
        o(
          "Hiring senior talent outside Bengaluru",
          "Bengaluru ಹೊರಗೆ senior talent hire ಮಾಡುವುದು"
        ),
        o("Breaking into Tier 2/3 markets", "Tier 2/3 markets ಗೆ enter ಆಗುವುದು"),
        o("Peer-level advice not mentors", "Mentors ಅಲ್ಲ — peer-level advice"),
        o(
          "Growth plateau or stalled metrics",
          "Growth plateau ಅಥವಾ metrics stall ಆಗಿವೆ"
        ),
        o(
          "Finding investors for next round",
          "ಮುಂದಿನ round ಗೆ investors ಸಿಗಿಸುವುದು"
        ),
        o("Board and investor dynamics", "Board ಮತ್ತು investor dynamics"),
        o("Working capital", "Working capital"),
        o("Other", "ಇತರೆ"),
      ],
      SP: [
        o(
          "Consistent pipeline of quality startup clients",
          "Quality startup clients ಗಳ ಸತತ pipeline"
        ),
        o(
          "Being seen as long-term partner not vendor",
          "Vendor ಅಂತ ಅಲ್ಲ, long-term partner ಅಂತ ನೋಡಲ್ಪಡುವುದು"
        ),
        o(
          "Competing with larger agencies",
          "ದೊಡ್ಡ agencies ಜೊತೆ compete ಮಾಡುವುದು"
        ),
        o("Late payments and scope creep", "Late payments ಮತ್ತು scope creep"),
        o("Building digital presence", "Digital presence build ಮಾಡುವುದು"),
        o(
          "Getting referrals consistently",
          "Consistent ಆಗಿ referrals ಪಡೆಯುವುದು"
        ),
      ],
      MI: [
        o(
          "Finding quality deal flow outside existing network",
          "Existing network ಹೊರಗೆ quality deal flow ಹುಡುಕುವುದು"
        ),
        o(
          "Distinguishing genuine founders from pitch tourists",
          "Pitch tourists ಮತ್ತು genuine founders ನಡುವೆ ವ್ಯತ್ಯಾಸ"
        ),
        o(
          "Structured impactful mentorship",
          "Structured ಮತ್ತು impactful mentorship"
        ),
        o(
          "Finding angels to co-invest with",
          "Co-invest ಮಾಡಲು angels ಸಿಗಿಸುವುದು"
        ),
        o("Staying current on KA startups", "KA startups ಬಗ್ಗೆ update ಆಗಿರುವುದು"),
        o(
          "Building thought-leadership platform",
          "Thought-leadership platform build ಮಾಡುವುದು"
        ),
      ],
    } as Record<Persona, Opt[]>,
    otherPlaceholder: {
      en: "Tell us more about your 'Other' challenge…",
      kn: "ನಿಮ್ಮ 'Other' challenge ಬಗ್ಗೆ ಹೆಚ್ಚು ಹೇಳಿ…",
    },
  },

  q5: {
    prompt: {
      en: "How much do these factors limit your progress? *",
      kn: "ಈ factors ನಿಮ್ಮ progress ಯನ್ನು ಎಷ್ಟು ತಡೆಯುತ್ತವೆ? *",
    },
    helper: {
      en: "1 = not at all · 3 = moderately · 5 = severely limits progress",
      kn: "1 = ಇಲ್ಲವೇ ಇಲ್ಲ · 3 = ಮಧ್ಯಮ · 5 = ತೀವ್ರವಾಗಿ ತಡೆಯುತ್ತದೆ",
    },
    factors: [
      o("Lack of right connections", "ಸರಿಯಾದ connections ಇಲ್ಲದಿರುವುದು"),
      o("Not knowing where to find advice", "Advice ಎಲ್ಲಿ ಸಿಗ್ತದೆ ಎಂದು ಗೊತ್ತಿಲ್ಲ"),
      o("Feeling isolated as founder", "Founder ಆಗಿ ಒಂಟಿಯಾಗಿರೋ ಭಾವನೆ"),
      o(
        "Limited access to capital / investors",
        "Capital / investors ಗೆ ಸೀಮಿತ access"
      ),
      o(
        "Weak local startup support infrastructure",
        "ದುರ್ಬಲ local startup support infrastructure"
      ),
    ],
  },

  q6: {
    prompt: {
      en: "If this community could only do ONE thing for you, what would it be? *",
      kn: "ಈ community ನಿಮಗೆ ಒಂದೇ ಕೆಲಸ ಮಾಡಬೇಕು ಅಂದ್ರೆ — ಯಾವುದು? *",
    },
    options: [
      o(
        "Make warm introductions to people I cannot reach on my own",
        "ನಾನು reach ಮಾಡಲಾಗದ ಜನರಿಗೆ warm introductions ಮಾಡಿಸುವುದು"
      ),
      o(
        "Give me honest, brutal feedback on my business",
        "ನನ್ನ business ಬಗ್ಗೆ ಪ್ರಾಮಾಣಿಕ, ನೇರ feedback ಕೊಡುವುದು"
      ),
      o(
        "Help me find my next hire or co-founder",
        "ಮುಂದಿನ hire ಅಥವಾ co-founder ಹುಡುಕಲು ಸಹಾಯ"
      ),
      o(
        "Connect me with investors genuinely interested in KA companies",
        "KA companies ಬಗ್ಗೆ ಆಸಕ್ತಿ ಇರೋ investors ಜೊತೆ connect"
      ),
      o(
        "Give me a safe space to talk about the hard parts of building",
        "Build ಮಾಡೋ ಕಷ್ಟದ ಭಾಗಗಳ ಬಗ್ಗೆ ಮಾತಾಡಲು safe space"
      ),
      o(
        "Keep me updated on what is actually happening in the KA ecosystem",
        "KA ecosystem ನಲ್ಲಿ ನಿಜವಾಗಿ ಏನು ಆಗ್ತಿದೆ ಎಂದು update ಇಡುವುದು"
      ),
      o(
        "Help me find early customers or strategic partnerships",
        "Early customers ಅಥವಾ strategic partnerships ಹುಡುಕಲು ಸಹಾಯ"
      ),
      o(
        "Give me access to legal, CA, or operational expertise on demand",
        "Legal, CA, ಅಥವಾ operational expertise ಗೆ on-demand access"
      ),
    ],
  },

  q7: {
    prompt: {
      en: "How do you prefer to interact day-to-day? *",
      kn: "ದಿನನಿತ್ಯ ನೀವು ಹೇಗೆ engage ಆಗಲು ಇಷ್ಟ? *",
    },
    options: [
      o(
        "A dedicated platform — organised by topic",
        "Topic ಪ್ರಕಾರ organise ಆದ dedicated platform"
      ),
      o(
        "Monthly in-person events only — I don't want an online presence",
        "Monthly in-person events ಮಾತ್ರ — online presence ಬೇಡ"
      ),
      o(
        "Weekly curated newsletter — I read, I don't post",
        "Weekly curated newsletter — ಓದ್ತೀನಿ, post ಮಾಡಲ್ಲ"
      ),
      o(
        "A mix — online async + monthly in-person",
        "Mix — online async + monthly in-person"
      ),
    ],
  },

  q8: {
    prompt: {
      en: "What would make you actively contribute? *",
      kn: "ಯಾವುದು ನಿಮ್ಮನ್ನು actively contribute ಮಾಡಲು ಪ್ರೇರೇಪಿಸುತ್ತದೆ? *",
    },
    byPersona: {
      SC: [
        o(
          "Speaker / thought-leadership platform",
          "Speaker / thought-leadership platform"
        ),
        o(
          "Exclusive roundtable — peer CEO dinners",
          "Exclusive roundtable — peer CEO dinners"
        ),
        o("Recognition as domain expert", "Domain expert ಆಗಿ recognition"),
        o(
          "Mentorship to early and aspiring founders",
          "Early ಮತ್ತು aspiring founders ಗೆ mentorship"
        ),
        o("1:1 AMA for early founders", "Early founders ಗೆ 1:1 AMA"),
      ],
      MI: [
        o(
          "Curated deal flow — vetted founders",
          "Curated deal flow — vetted founders"
        ),
        o(
          "Evaluate pitch decks, 1:1 AMA with early founders",
          "Pitch decks evaluate, early founders ಜೊತೆ 1:1 AMA"
        ),
        o(
          "Speaker / thought-leadership platform",
          "Speaker / thought-leadership platform"
        ),
        o("Recognition as domain expert", "Domain expert ಆಗಿ recognition"),
        o(
          "Personal satisfaction of watching founders grow",
          "Founders grow ಆಗೋದು ನೋಡೋ personal satisfaction"
        ),
      ],
    } as Partial<Record<Persona, Opt[]>>,
  },

  q9: {
    prompt: { en: "Membership — what would you pay? *", kn: "Membership — ಎಷ್ಟು ಕೊಡ್ತೀರಿ? *" },
    options: [
      o("Won't pay", "ಕೊಡಲ್ಲ"),
      o("Up to Rs.200/month", "ತಿಂಗಳಿಗೆ Rs.200 ತನಕ"),
      o("Up to Rs.500/month", "ತಿಂಗಳಿಗೆ Rs.500 ತನಕ"),
      o("Up to Rs.2,000/month", "ತಿಂಗಳಿಗೆ Rs.2,000 ತನಕ"),
      o(
        "Rs.5,000+/month if ROI is clear",
        "ROI clear ಇದ್ರೆ ತಿಂಗಳಿಗೆ Rs.5,000+"
      ),
    ],
  },

  q10: {
    prompt: {
      en: "Which communities are you currently active in? *",
      kn: "ನೀವು ಈಗ ಯಾವ communities ನಲ್ಲಿ active ಇದ್ದೀರಿ? *",
    },
    options: [
      o("TiE Bangalore", "TiE Bangalore"),
      o("iSPIRT / SaaSBOOMi", "iSPIRT / SaaSBOOMi"),
      o(
        "Local WhatsApp / Telegram founder groups",
        "Local WhatsApp / Telegram founder groups"
      ),
      o(
        "LinkedIn groups or DM networks",
        "LinkedIn groups ಅಥವಾ DM networks"
      ),
      o(
        "YourStory / Inc42 community circles",
        "YourStory / Inc42 community circles"
      ),
      o(
        "Government schemes like Startup Karnataka / KBITS programs",
        "Startup Karnataka / KBITS ಂಥ government schemes"
      ),
      o(
        "None — I don't belong to a formal community right now",
        "ಯಾವುದೂ ಇಲ್ಲ — ಯಾವುದೇ formal community ಯಲ್ಲಿಲ್ಲ"
      ),
    ],
  },

  q11: {
    prompt: {
      en: "If you left a community in the past — main reason? *",
      kn: "ಹಿಂದೆ ಯಾವುದಾದರೂ community ಬಿಟ್ಟಿದ್ರೆ — ಮುಖ್ಯ ಕಾರಣ? *",
    },
    options: [
      o(
        "Too much noise — irrelevant posts and self-promotion",
        "ತುಂಬಾ noise — irrelevant posts ಮತ್ತು self-promotion"
      ),
      o(
        "The conversations weren't at my level",
        "Conversations ನನ್ನ level ನಲ್ಲಿ ಇರಲಿಲ್ಲ"
      ),
      o(
        "Events were too infrequent or not worth the travel",
        "Events ತುಂಬಾ infrequent ಆಗಿತ್ತು ಅಥವಾ travel worth ಇರಲಿಲ್ಲ"
      ),
      o(
        "No clear value — I never made a useful connection",
        "Clear value ಇರಲಿಲ್ಲ — useful connection ಆಗಲೇ ಇಲ್ಲ"
      ),
      o(
        "I didn't have time to participate actively",
        "Active ಆಗಿ participate ಮಾಡೋ ಸಮಯ ಇರಲಿಲ್ಲ"
      ),
      o(
        "I haven't left any community — still active in all",
        "ನಾನು ಯಾವ community ಯನ್ನೂ ಬಿಟ್ಟಿಲ್ಲ — ಎಲ್ಲಾ ಕಡೆ active"
      ),
    ],
  },

  q12: {
    prompt: {
      en: "How likely are you to recommend a community you love? *",
      kn: "ನೀವು ಇಷ್ಟಪಟ್ಟ community ಯನ್ನು recommend ಮಾಡೋ likelihood ಎಷ್ಟು? *",
    },
    helper: {
      en: "1 = not at all likely · 10 = extremely likely",
      kn: "1 = ಬಿಲ್ಕುಲ್ ಇಲ್ಲ · 10 = ಖಂಡಿತಾ",
    },
  },

  q13: {
    prompt: {
      en: "Which event types would you actually show up for? *",
      kn: "ಯಾವ event types ಗೆ ನೀವು ನಿಜವಾಗಿ ಬರ್ತೀರಿ? *",
    },
    options: [
      o("Founder Fireside", "Founder Fireside"),
      o("Demo Day", "Demo Day"),
      o("Peer CEO Roundtable", "Peer CEO Roundtable"),
      o("Hackathon / Build Day", "Hackathon / Build Day"),
      o("Office Hours", "Office Hours"),
      o("Workshop", "Workshop"),
      o("Annual KA Founders Summit", "Annual KA Founders Summit"),
      o("Casual founder dinner", "Casual founder dinner"),
    ],
  },

  q14: {
    prompt: {
      en: "Realistic event frequency? *",
      kn: "ವಾಸ್ತವಿಕ event frequency? *",
    },
    options: [
      o("Every week", "ಪ್ರತಿ ವಾರ"),
      o("Once a month", "ತಿಂಗಳಿಗೊಮ್ಮೆ"),
      o("Once a quarter", "3 ತಿಂಗಳಿಗೊಮ್ಮೆ"),
      o("Only flagship events", "Flagship events ಮಾತ್ರ"),
      o("Rarely — prefer async", "ಅಪರೂಪವಾಗಿ — async ಬೇಕು"),
    ],
  },

  q15: {
    prompt: {
      en: "Content you'd actually consume? *",
      kn: "ನೀವು ನಿಜವಾಗಿ ಓದೋ / ನೋಡೋ content? *",
    },
    options: [
      o("Failure post-mortems", "Failure post-mortems"),
      o(
        "Founder interviews in Kannada and English",
        "Kannada ಮತ್ತು English ನಲ್ಲಿ founder interviews"
      ),
      o("Weekly digest", "Weekly digest"),
      o("Playbooks", "Playbooks"),
      o(
        "State of KA Startups annual report",
        "State of KA Startups annual report"
      ),
      o("Member spotlights", "Member spotlights"),
      o("Vendor / service provider reviews", "Vendor / service provider reviews"),
    ],
  },

  q16: {
    prompt: {
      en: "What would make you an active contributing member? *",
      kn: "ನಿಮ್ಮನ್ನು active contributing member ಮಾಡೋದು ಯಾವುದು? *",
    },
    helper: { en: "Service providers only", kn: "Service providers ಗೆ ಮಾತ್ರ" },
    options: [
      o("Verified directory listing", "Verified directory listing"),
      o("Spotlight post", "Spotlight post"),
      o("Structured referral system", "Structured referral system"),
      o(
        "Discounted rates for community contribution",
        "Community contribution ಗೆ discounted rates"
      ),
      o("Speaking slots", "Speaking slots"),
    ],
  },

  q17: {
    prompt: {
      en: "What is the one thing Karnataka's startup ecosystem is genuinely missing? *",
      kn: "Karnataka startup ecosystem ಗೆ ನಿಜವಾಗಿ ಸಿಗದ ಒಂದು ವಿಷಯ ಯಾವುದು? *",
    },
    sub: {
      en: "Something no existing community or program is solving.",
      kn: "ಯಾವ community ಅಥವಾ program ಸಹ solve ಮಾಡ್ತಿಲ್ಲದ ವಿಷಯ.",
    },
    placeholder: {
      en: "The thing that no existing community or program is solving…",
      kn: "ಯಾವ community ಅಥವಾ program ಸಹ solve ಮಾಡ್ತಿಲ್ಲದ ವಿಷಯ…",
    },
  },

  q18: {
    prompt: {
      en: "Describe the best community experience you've ever had. *",
      kn: "ನೀವು ಅನುಭವಿಸಿದ ಅತ್ಯುತ್ತಮ community experience ಯಾವುದು? *",
    },
    sub: {
      en: "What made it so good — the people, the format, the rituals?",
      kn: "ಯಾಕೆ ಒಳ್ಳೆಯದಾಗಿತ್ತು — ಜನ, format, rituals?",
    },
    placeholder: {
      en: "What made it so good — the people, the format, the rituals?",
      kn: "ಯಾಕೆ ಒಳ್ಳೆಯದಾಗಿತ್ತು — ಜನ, format, rituals?",
    },
  },

  q19: {
    prompt: {
      en: "Which features would matter most to you? *",
      kn: "ನಿಮಗೆ ಯಾವ features ಹೆಚ್ಚು ಮುಖ್ಯ? *",
    },
    options: [
      o("Community discussions", "Community discussions"),
      o("New idea submission and validation", "New idea submission ಮತ್ತು validation"),
      o("Getting first customer validation", "First customer validation"),
      o("Closed location-based community", "Closed location-based community"),
      o("Learning and expert sessions", "Learning ಮತ್ತು expert sessions"),
      o("Networking events", "Networking events"),
      o("Downloadable resources", "Downloadable resources"),
      o("Verified service provider pool", "Verified service provider pool"),
      o("Access to AI tools for business", "Business ಗೆ AI tools access"),
    ],
  },

  // Thank-you page
  thanks: {
    thanksTitle: { en: "Thank you", kn: "ಧನ್ಯವಾದಗಳು" },
    thanksKn: {
      en: "ನಿಮ್ಮ ಅಮೂಲ್ಯವಾದ ಅನಿಸಿಕೆಗಳಿಗಾಗಿ ಧನ್ಯವಾದಗಳು.",
      kn: "ನಿಮ್ಮ ಅಮೂಲ್ಯವಾದ ಅನಿಸಿಕೆಗಳಿಗಾಗಿ ಧನ್ಯವಾದಗಳು.",
    },
    sub: {
      en: "We're building this with you.",
      kn: "ನಿಮ್ಮ ಜೊತೆ ಇದನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ.",
    },
    unlockedLabel: { en: "What you've unlocked", kn: "ನೀವು unlock ಮಾಡಿದ್ದು" },
    rewards: [
      {
        title: { en: "Founding Member status", kn: "Founding Member status" },
        detail: {
          en: "Permanent badge · You will get priority access at launch",
          kn: "ಶಾಶ್ವತ badge · Launch ನಲ್ಲಿ priority access",
        },
      },
      {
        title: {
          en: "Pre-launch updates · WhatsApp invite",
          kn: "Pre-launch updates · WhatsApp invite",
        },
        detail: {
          en: "We'll reach you on the number you shared.",
          kn: "ನೀವು ಕೊಟ್ಟ number ಗೆ ನಾವು ತಲುಪುತ್ತೇವೆ.",
        },
      },
      {
        title: {
          en: "First look at the “State of Munde Banni” report",
          kn: "“State of Munde Banni” report ನ ಮೊದಲ ನೋಟ",
        },
        detail: {
          en: "Built from these responses · exclusive to founding members",
          kn: "ಈ responses ಂದ ತಯಾರಾಗಿರೋ report · founding members ಗೆ ಮಾತ್ರ",
        },
      },
    ],
    footerBy: { en: "By Mundhe Banni", kn: "Mundhe Banni ಂದ" },
    refer: { en: "Refer another founder →", kn: "ಇನ್ನೊಬ್ಬ founder ಗೆ refer →" },
  },
} as const;

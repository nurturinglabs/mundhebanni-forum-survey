"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Persona = "EF" | "SC" | "AF" | "SP" | "MI";

const PERSONA_OPTIONS: { code: Persona; label: string; sub: string }[] = [
  { code: "EF", label: "Early Founder", sub: "0–2 yrs · pre-revenue or early traction" },
  { code: "SC", label: "Scale-up Founder/CEO", sub: "Series A+ or Rs.1Cr+ ARR" },
  { code: "AF", label: "Aspiring Founder", sub: "Planning · not started yet" },
  { code: "SP", label: "Service Provider", sub: "Agency, freelancer, consultant" },
  { code: "MI", label: "Mentor / Investor", sub: "Angel, VC, advisor" },
];

const Q2_OPTIONS = [
  "Bengaluru",
  "Mysuru",
  "Hubballi / Dharwad",
  "Mangaluru",
  "Other Karnataka city",
  "Outside Karnataka but have strong KA ties",
];

const Q3_OPTIONS = [
  "Idea / pre-product — nothing shipped yet",
  "MVP live — testing with early users",
  "Revenue generating — paying customers",
  "Scaling — Series A+ or Rs.1Cr+ ARR",
  "Exited / post-venture",
  "I am a service provider",
];

const Q4_OPTIONS: Record<Persona, string[]> = {
  EF: [
    "Finding first 10 paying customers",
    "Honest feedback on product",
    "Finding co-founder or early team",
    "Raising first round",
    "Managing runway and burn rate",
    "Loneliness of building alone",
    "Not knowing what I don't know",
    "Other",
  ],
  AF: [
    "Finding first 10 paying customers",
    "Honest feedback on product",
    "Finding co-founder or early team",
    "Raising first round",
    "Managing runway and burn rate",
    "Loneliness of building alone",
    "Not knowing what I don't know",
    "Other",
  ],
  SC: [
    "Hiring senior talent outside Bengaluru",
    "Breaking into Tier 2/3 markets",
    "Peer-level advice not mentors",
    "Growth plateau or stalled metrics",
    "Finding investors for next round",
    "Board and investor dynamics",
    "Working capital",
    "Other",
  ],
  SP: [
    "Consistent pipeline of quality startup clients",
    "Being seen as long-term partner not vendor",
    "Competing with larger agencies",
    "Late payments and scope creep",
    "Building digital presence",
    "Getting referrals consistently",
  ],
  MI: [
    "Finding quality deal flow outside existing network",
    "Distinguishing genuine founders from pitch tourists",
    "Structured impactful mentorship",
    "Finding angels to co-invest with",
    "Staying current on KA startups",
    "Building thought-leadership platform",
  ],
};

const Q5_FACTORS = [
  "Lack of right connections",
  "Not knowing where to find advice",
  "Feeling isolated as founder",
  "Limited access to capital / investors",
  "Weak local startup support infrastructure",
];

const Q6_OPTIONS = [
  "Make warm introductions to people I cannot reach on my own",
  "Give me honest, brutal feedback on my business",
  "Help me find my next hire or co-founder",
  "Connect me with investors genuinely interested in KA companies",
  "Give me a safe space to talk about the hard parts of building",
  "Keep me updated on what is actually happening in the KA ecosystem",
  "Help me find early customers or strategic partnerships",
  "Give me access to legal, CA, or operational expertise on demand",
];

const Q7_OPTIONS = [
  "A dedicated platform — organised by topic",
  "Monthly in-person events only — I don't want an online presence",
  "Weekly curated newsletter — I read, I don't post",
  "A mix — online async + monthly in-person",
];

const Q8_OPTIONS: Partial<Record<Persona, string[]>> = {
  SC: [
    "Speaker / thought-leadership platform",
    "Exclusive roundtable — peer CEO dinners",
    "Recognition as domain expert",
    "Mentorship to early and aspiring founders",
    "1:1 AMA for early founders",
  ],
  MI: [
    "Curated deal flow — vetted founders",
    "Evaluate pitch decks, 1:1 AMA with early founders",
    "Speaker / thought-leadership platform",
    "Recognition as domain expert",
    "Personal satisfaction of watching founders grow",
  ],
};

const Q9_OPTIONS = [
  "Won't pay",
  "Up to Rs.200/month",
  "Up to Rs.500/month",
  "Up to Rs.2,000/month",
  "Rs.5,000+/month if ROI is clear",
];

const Q10_OPTIONS = [
  "TiE Bangalore",
  "iSPIRT / SaaSBOOMi",
  "Local WhatsApp / Telegram founder groups",
  "LinkedIn groups or DM networks",
  "YourStory / Inc42 community circles",
  "Government schemes like Startup Karnataka / KBITS programs",
  "None — I don't belong to a formal community right now",
];

const Q11_OPTIONS = [
  "Too much noise — irrelevant posts and self-promotion",
  "The conversations weren't at my level",
  "Events were too infrequent or not worth the travel",
  "No clear value — I never made a useful connection",
  "I didn't have time to participate actively",
  "I haven't left any community — still active in all",
];

const Q13_OPTIONS = [
  "Founder Fireside",
  "Demo Day",
  "Peer CEO Roundtable",
  "Hackathon / Build Day",
  "Office Hours",
  "Workshop",
  "Annual KA Founders Summit",
  "Casual founder dinner",
];

const Q14_OPTIONS = [
  "Every week",
  "Once a month",
  "Once a quarter",
  "Only flagship events",
  "Rarely — prefer async",
];

const Q15_OPTIONS = [
  "Failure post-mortems",
  "Founder interviews in Kannada and English",
  "Weekly digest",
  "Playbooks",
  "State of KA Startups annual report",
  "Member spotlights",
  "Vendor / service provider reviews",
];

const Q16_OPTIONS = [
  "Verified directory listing",
  "Spotlight post",
  "Structured referral system",
  "Discounted rates for community contribution",
  "Speaking slots",
];

const Q19_OPTIONS = [
  "Community discussions",
  "New idea submission and validation",
  "Getting first customer validation",
  "Closed location-based community",
  "Learning and expert sessions",
  "Networking events",
  "Downloadable resources",
  "Verified service provider pool",
  "Access to AI tools for business",
];

const SECTION_TITLES = [
  { en: "Hello — let's start", kn: "ನಮಸ್ಕಾರ" },
  { en: "About you", kn: "ನಿಮ್ಮ ಬಗ್ಗೆ" },
  { en: "Your biggest challenges", kn: "ನಿಮ್ಮ ಪ್ರಮುಖ ಸವಾಲುಗಳು" },
  { en: "How you'd engage", kn: "ನೀವು ಹೇಗೆ ಭಾಗವಹಿಸುತ್ತೀರಿ" },
  { en: "Events & content", kn: "Events ಮತ್ತು content" },
  { en: "Final thoughts", kn: "ಕೊನೆಯ ಮಾತುಗಳು" },
];

export default function KFFSurveyForm() {
  const router = useRouter();
  const [section, setSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Section 1
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [persona, setPersona] = useState<Persona | "">("");

  // Section 2
  const [q2, setQ2] = useState("");
  const [q2Other, setQ2Other] = useState("");
  const [q3, setQ3] = useState("");

  // Section 3
  const [q4, setQ4] = useState<string[]>([]);
  const [q4Other, setQ4Other] = useState("");
  const [q5, setQ5] = useState<Record<string, number>>({});
  const [q6, setQ6] = useState<string[]>([]);

  // Section 4
  const [q7, setQ7] = useState("");
  const [q8, setQ8] = useState("");
  const [q9, setQ9] = useState("");
  const [q10, setQ10] = useState<string[]>([]);
  const [q11, setQ11] = useState("");

  // Section 5
  const [q12, setQ12] = useState<number | null>(null);
  const [q13, setQ13] = useState<string[]>([]);
  const [q14, setQ14] = useState("");
  const [q15, setQ15] = useState<string[]>([]);
  const [q16, setQ16] = useState("");

  // Section 6
  const [q17, setQ17] = useState("");
  const [q18, setQ18] = useState("");
  const [q19, setQ19] = useState<string[]>([]);

  const showQ3 = persona !== "MI";
  const showQ8 = persona === "SC" || persona === "MI";
  const showQ16 = persona === "SP";
  const q4Options = persona ? Q4_OPTIONS[persona] : [];
  const q8Options = persona && Q8_OPTIONS[persona] ? Q8_OPTIONS[persona]! : [];
  const showQ2Other =
    q2 === "Other Karnataka city" ||
    q2 === "Outside Karnataka but have strong KA ties";
  const q4HasOther = q4Options.includes("Other") && q4.includes("Other");

  const togglePick = (
    value: string,
    state: string[],
    setState: (v: string[]) => void,
    max?: number
  ) => {
    if (state.includes(value)) {
      setState(state.filter((v) => v !== value));
    } else {
      if (max && state.length >= max) return;
      setState([...state, value]);
    }
  };

  const validateSection = (): string => {
    if (section === 0) {
      if (!name.trim()) return "Please enter your full name.";
      if (!city.trim()) return "Please enter your city.";
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return "Please enter a valid email.";
      if (!phone.trim() || phone.replace(/\D/g, "").length < 7)
        return "Please enter a valid phone number.";
      if (!persona) return "Please pick the option that best describes you.";
      return "";
    }
    if (section === 1) {
      if (!q2) return "Please choose your primary location.";
      if (showQ2Other && !q2Other.trim())
        return "Please specify your city / region.";
      if (showQ3 && !q3) return "Please choose your venture stage.";
      return "";
    }
    if (section === 2) {
      if (q4.length === 0) return "Pick at least one challenge (up to 3).";
      if (q4HasOther && !q4Other.trim())
        return "Please specify your 'Other' challenge.";
      const missing = Q5_FACTORS.filter((f) => !q5[f]);
      if (missing.length > 0)
        return "Please rate every factor on the 1–5 scale.";
      if (q6.length === 0) return "Pick at least one — up to 3.";
      return "";
    }
    if (section === 3) {
      if (!q7) return "Please pick how you'd like to interact.";
      if (showQ8 && !q8) return "Please pick what would make you contribute.";
      if (!q9) return "Please pick your price willingness.";
      if (q10.length === 0)
        return "Pick at least one community (or 'None — I don't belong…').";
      if (!q11) return "Please pick your reason.";
      return "";
    }
    if (section === 4) {
      if (q12 === null) return "Please pick a score from 1 to 10.";
      if (q13.length === 0) return "Pick up to 3 event types.";
      if (!q14) return "Please pick a frequency.";
      if (q15.length === 0) return "Pick up to 3 content types.";
      if (showQ16 && !q16)
        return "Please pick what would make you an active member.";
      return "";
    }
    if (section === 5) {
      if (!q17.trim()) return "Please share what's missing.";
      if (!q18.trim()) return "Please describe your best community experience.";
      if (q19.length === 0) return "Pick up to 3.";
      return "";
    }
    return "";
  };

  const handleNext = () => {
    const err = validateSection();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setSection((s) => Math.min(s + 1, 5));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setError("");
    setSection((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateSection();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/kff-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          city,
          email,
          phone,
          persona,
          q1: persona,
          q2,
          q2_other: showQ2Other ? q2Other : null,
          q3: showQ3 ? q3 : null,
          q4,
          q4_other: q4HasOther ? q4Other : null,
          q5,
          q6,
          q7,
          q8: showQ8 ? q8 : null,
          q9,
          q10,
          q11,
          q12,
          q13,
          q14,
          q15,
          q16: showQ16 ? q16 : null,
          q17,
          q18,
          q19,
        }),
      });

      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("kff_unlocked", "true");
        sessionStorage.setItem("kff_name", name);
        sessionStorage.setItem("kff_persona", persona);
        router.push("/thank-you");
      } else {
        setError(data.error || "Something went wrong — please try again.");
      }
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  };

  // shared classes
  const inputClass =
    "w-full h-10 border border-[#E8E6DC] rounded-lg px-3 text-sm bg-white focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-[#141413]";
  const textareaClass =
    "w-full min-h-[88px] border border-[#E8E6DC] rounded-lg px-3 py-2 text-sm bg-white focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-[#141413] resize-y";
  const labelClass = "text-xs font-medium text-[#141413] mb-1 block";
  const subLabelClass = "text-[11px] text-[#B0AEA5] font-kannada mb-2 block";
  const sectionH = "font-outfit font-semibold text-[15px] text-[#141413]";
  const helperText = "text-[11px] text-[#B0AEA5] mb-3";

  const chip = (selected: boolean) =>
    `border-[1.5px] rounded-lg px-4 py-2 cursor-pointer text-sm transition-colors text-left ${
      selected
        ? "border-[#2D6A4F] bg-[#E8F3EC] text-[#1B4332] font-semibold"
        : "border-[#E0DDD8] bg-white text-[#141413] hover:border-[#2D6A4F]"
    }`;

  const chipDisabled = (selected: boolean, disabled: boolean) =>
    `border-[1.5px] rounded-lg px-4 py-2 text-sm transition-colors text-left ${
      selected
        ? "border-[#2D6A4F] bg-[#E8F3EC] text-[#1B4332] font-semibold cursor-pointer"
        : disabled
        ? "border-[#ECEAE5] bg-white text-[#B0AEA5] cursor-not-allowed"
        : "border-[#E0DDD8] bg-white text-[#141413] hover:border-[#2D6A4F] cursor-pointer"
    }`;

  const scaleBtn = (active: boolean) =>
    `h-11 w-11 rounded-md text-sm font-semibold border transition-colors ${
      active
        ? "border-[#2D6A4F] bg-[#2D6A4F] text-white"
        : "border-[#E0DDD8] bg-white text-[#141413] hover:border-[#2D6A4F]"
    }`;

  const npsBtn = (active: boolean) =>
    `h-10 w-10 sm:h-11 sm:w-11 rounded-md text-sm font-semibold border transition-colors ${
      active
        ? "border-[#2D6A4F] bg-[#2D6A4F] text-white"
        : "border-[#E0DDD8] bg-white text-[#141413] hover:border-[#2D6A4F]"
    }`;

  const Pill = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-block bg-[#E8F3EC] text-[#1B4332] text-[10px] font-semibold tracking-wider uppercase rounded-full px-2.5 py-0.5">
      {children}
    </span>
  );

  // Progress
  const progressPct = useMemo(
    () => Math.round(((section + 1) / 6) * 100),
    [section]
  );

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[11px] font-semibold text-[#1B4332] uppercase tracking-wider">
            Section {section + 1} of 6 · {SECTION_TITLES[section].en}
          </p>
          <p className="text-[11px] text-[#B0AEA5] font-kannada">
            {SECTION_TITLES[section].kn}
          </p>
        </div>
        <div className="w-full h-1.5 bg-[#ECEAE5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2D6A4F] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-0">
        {/* SECTION 1 — Hello */}
        {section === 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
              <div>
                <label className={labelClass}>Full name *</label>
                <span className={subLabelClass}>ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Anitha R."
                />
              </div>
              <div>
                <label className={labelClass}>City *</label>
                <span className={subLabelClass}>ನಿಮ್ಮ ನಗರ</span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Bengaluru"
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <span className={subLabelClass}>Email ವಿಳಾಸ</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="name@email.com"
                />
              </div>
              <div>
                <label className={labelClass}>Phone *</label>
                <span className={subLabelClass}>WhatsApp number ಸೂಕ್ತ</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q1</Pill>
                <label className={sectionH}>
                  Which best describes you? *
                </label>
              </div>
              <span className={subLabelClass}>
                ನೀವು ಯಾರು ಎಂಬುದನ್ನು ಆಯ್ಕೆ ಮಾಡಿ
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PERSONA_OPTIONS.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => setPersona(p.code)}
                    className={chip(persona === p.code)}
                  >
                    <div className="font-semibold">{p.label}</div>
                    <div className="text-[11px] text-[#B0AEA5] mt-0.5 font-normal">
                      {p.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SECTION 2 — About you */}
        {section === 1 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q2</Pill>
                <label className={sectionH}>
                  Where is your company or primary work based? *
                </label>
              </div>
              <span className={subLabelClass}>
                ನಿಮ್ಮ ಕಂಪನಿ / ಕೆಲಸ ಎಲ್ಲಿ?
              </span>
              <div className="flex flex-wrap gap-2">
                {Q2_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ2(opt)}
                    className={chip(q2 === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showQ2Other && (
                <input
                  type="text"
                  value={q2Other}
                  onChange={(e) => setQ2Other(e.target.value)}
                  className={`${inputClass} mt-3`}
                  placeholder="Please specify…"
                />
              )}
            </div>

            {showQ3 && (
              <>
                <div className="border-t border-[#ECEAE5] my-5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Pill>Q3</Pill>
                    <label className={sectionH}>
                      What is your venture&apos;s current stage? *
                    </label>
                  </div>
                  <span className={subLabelClass}>
                    ನಿಮ್ಮ venture ಯ ಪ್ರಸ್ತುತ ಹಂತ ಯಾವುದು?
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {Q3_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQ3(opt)}
                        className={chip(q3 === opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* SECTION 3 — Pains */}
        {section === 2 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q4</Pill>
                <label className={sectionH}>
                  Your single biggest challenge right now? *
                </label>
              </div>
              <p className={helperText}>
                Pick top 3 · ನಿಮ್ಮ ಪ್ರಮುಖ 3 ಆಯ್ಕೆ ಮಾಡಿ
                <span className="ml-1 font-semibold">({q4.length}/3)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {q4Options.map((opt) => {
                  const selected = q4.includes(opt);
                  const disabled = !selected && q4.length >= 3;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt, q4, setQ4, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {q4HasOther && (
                <input
                  type="text"
                  value={q4Other}
                  onChange={(e) => setQ4Other(e.target.value)}
                  className={`${inputClass} mt-3`}
                  placeholder="Tell us more about your 'Other' challenge…"
                />
              )}
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q5</Pill>
                <label className={sectionH}>
                  How much do these factors limit your progress? *
                </label>
              </div>
              <p className={helperText}>
                1 = not at all · 3 = moderately · 5 = severely limits progress
              </p>

              <div className="border border-[#ECEAE5] rounded-lg overflow-hidden">
                {Q5_FACTORS.map((factor, idx) => (
                  <div
                    key={factor}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2.5 ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#FAF9F5]"
                    }`}
                  >
                    <span className="text-[13px] text-[#141413] flex-1">
                      {factor}
                    </span>
                    <div className="flex gap-1.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() =>
                            setQ5({ ...q5, [factor]: n })
                          }
                          className={scaleBtn(q5[factor] === n)}
                          aria-label={`${factor} = ${n}`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q6</Pill>
                <label className={sectionH}>
                  If this community could only do ONE thing for you, what would it be? *
                </label>
              </div>
              <p className={helperText}>
                Pick top 3 · ಪ್ರಮುಖ 3
                <span className="ml-1 font-semibold">({q6.length}/3)</span>
              </p>
              <div className="flex flex-col gap-1.5">
                {Q6_OPTIONS.map((opt) => {
                  const selected = q6.includes(opt);
                  const disabled = !selected && q6.length >= 3;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt, q6, setQ6, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* SECTION 4 — Engagement */}
        {section === 3 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q7</Pill>
                <label className={sectionH}>
                  How do you prefer to interact day-to-day? *
                </label>
              </div>
              <span className={subLabelClass}>
                ದಿನನಿತ್ಯ ಹೇಗೆ engage ಆಗಲು ಇಷ್ಟ?
              </span>
              <div className="flex flex-col gap-1.5">
                {Q7_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ7(opt)}
                    className={chip(q7 === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {showQ8 && (
              <>
                <div className="border-t border-[#ECEAE5] my-5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Pill>Q8</Pill>
                    <label className={sectionH}>
                      What would make you actively contribute? *
                    </label>
                  </div>
                  <span className={subLabelClass}>
                    Active contribution ಗೆ ಯಾವುದು ಪ್ರೇರೇಪಿಸುತ್ತದೆ?
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {q8Options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQ8(opt)}
                        className={chip(q8 === opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q9</Pill>
                <label className={sectionH}>
                  Membership — what would you pay? *
                </label>
              </div>
              <span className={subLabelClass}>Membership ಗೆ ಎಷ್ಟು ಕೊಡುತ್ತೀರಿ?</span>
              <div className="flex flex-col gap-1.5">
                {Q9_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ9(opt)}
                    className={chip(q9 === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q10</Pill>
                <label className={sectionH}>
                  Which communities are you currently active in? *
                </label>
              </div>
              <p className={helperText}>Check all that apply</p>
              <div className="flex flex-col gap-1.5">
                {Q10_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => togglePick(opt, q10, setQ10)}
                    className={chip(q10.includes(opt))}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q11</Pill>
                <label className={sectionH}>
                  If you left a community in the past — main reason? *
                </label>
              </div>
              <span className={subLabelClass}>
                ಹಿಂದೆ ಯಾವುದಾದರೂ community ಬಿಟ್ಟಿದ್ದರೆ — ಕಾರಣ?
              </span>
              <div className="flex flex-col gap-1.5">
                {Q11_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ11(opt)}
                    className={chip(q11 === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SECTION 5 — Events & content */}
        {section === 4 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q12</Pill>
                <label className={sectionH}>
                  How likely are you to recommend a community you love? *
                </label>
              </div>
              <p className={helperText}>
                1 = not at all likely · 10 = extremely likely
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => {
                  const n = i + 1;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setQ12(n)}
                      className={npsBtn(q12 === n)}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q13</Pill>
                <label className={sectionH}>
                  Which event types would you actually show up for? *
                </label>
              </div>
              <p className={helperText}>
                Pick top 3
                <span className="ml-1 font-semibold">({q13.length}/3)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {Q13_OPTIONS.map((opt) => {
                  const selected = q13.includes(opt);
                  const disabled = !selected && q13.length >= 3;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt, q13, setQ13, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q14</Pill>
                <label className={sectionH}>
                  Realistic event frequency? *
                </label>
              </div>
              <span className={subLabelClass}>Events ಎಷ್ಟು ಬಾರಿ?</span>
              <div className="flex flex-wrap gap-2">
                {Q14_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setQ14(opt)}
                    className={chip(q14 === opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q15</Pill>
                <label className={sectionH}>
                  Content you&apos;d actually consume? *
                </label>
              </div>
              <p className={helperText}>
                Pick top 3
                <span className="ml-1 font-semibold">({q15.length}/3)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {Q15_OPTIONS.map((opt) => {
                  const selected = q15.includes(opt);
                  const disabled = !selected && q15.length >= 3;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt, q15, setQ15, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {showQ16 && (
              <>
                <div className="border-t border-[#ECEAE5] my-5" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Pill>Q16</Pill>
                    <label className={sectionH}>
                      What would make you an active contributing member? *
                    </label>
                  </div>
                  <span className={subLabelClass}>
                    Service providers ಗೆ ಮಾತ್ರ
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {Q16_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setQ16(opt)}
                        className={chip(q16 === opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* SECTION 6 — Open */}
        {section === 5 && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q17</Pill>
                <label className={sectionH}>
                  What is the one thing Karnataka&apos;s startup ecosystem is genuinely missing? *
                </label>
              </div>
              <span className={subLabelClass}>
                ಯಾವ ಕೊರತೆ ಇದೆ — ಇಲ್ಲಿ ಯಾರೂ solve ಮಾಡುತ್ತಿಲ್ಲ?
              </span>
              <textarea
                value={q17}
                onChange={(e) => setQ17(e.target.value)}
                className={textareaClass}
                placeholder="The thing that no existing community or program is solving…"
              />
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q18</Pill>
                <label className={sectionH}>
                  Describe the best community experience you&apos;ve ever had. *
                </label>
              </div>
              <span className={subLabelClass}>
                ಯಾವ community ಅತ್ಯುತ್ತಮ ಎನಿಸಿತ್ತು — ಯಾಕೆ?
              </span>
              <textarea
                value={q18}
                onChange={(e) => setQ18(e.target.value)}
                className={textareaClass}
                placeholder="What made it so good — the people, the format, the rituals?"
              />
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q19</Pill>
                <label className={sectionH}>
                  Which features would matter most to you? *
                </label>
              </div>
              <p className={helperText}>
                Pick top 3
                <span className="ml-1 font-semibold">({q19.length}/3)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {Q19_OPTIONS.map((opt) => {
                  const selected = q19.includes(opt);
                  const disabled = !selected && q19.length >= 3;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt, q19, setQ19, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Nav + submit */}
        <div className="pt-6">
          {error && (
            <p className="text-red-600 text-xs text-center mb-3">{error}</p>
          )}

          <div className="flex items-center gap-3">
            {section > 0 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className="h-12 px-5 rounded-[10px] border border-[#E0DDD8] text-sm font-semibold text-[#141413] hover:border-[#2D6A4F] hover:text-[#1B4332] transition-colors"
              >
                ← Back
              </button>
            )}
            {section < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className="flex-1 h-12 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold rounded-[10px] text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Continue → ({section + 1}/6)
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold rounded-[10px] text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  "Submit & Unlock Founding Member Access →"
                )}
              </button>
            )}
          </div>

          <p className="text-xs text-[#999] text-center mt-3 font-kannada">
            Submit ಮಾಡಿದ ತಕ್ಷಣ founding member access unlock ಆಗ್ತದೆ
          </p>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { COPY, type Lang, type Opt, type Persona } from "@/lib/copy";
import LangToggle from "./LangToggle";

const text = (s: { en: string; kn: string }, lang: Lang) =>
  lang === "kn" ? s.kn : s.en;
const optText = (op: Opt, lang: Lang) => (lang === "kn" ? op.kn : op.en);

export default function KFFSurveyForm() {
  const router = useRouter();
  const [section, setSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState<Lang>("en");

  // Restore lang from sessionStorage (after mount to avoid hydration mismatch)
  useEffect(() => {
    const stored = sessionStorage.getItem("kff_lang") as Lang | null;
    if (stored === "en" || stored === "kn") setLang(stored);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("kff_lang", lang);
  }, [lang]);

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
  const q4Options: Opt[] = persona ? COPY.q4.byPersona[persona] : [];
  const q8Options: Opt[] = persona && COPY.q8.byPersona[persona] ? COPY.q8.byPersona[persona]! : [];
  const showQ2Other =
    q2 === "Other Karnataka city" ||
    q2 === "Outside Karnataka but have strong KA ties";
  const q4HasOther = q4.includes("Other");

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
    const e = COPY.errors;
    if (section === 0) {
      if (!name.trim()) return text(e.name, lang);
      if (!city.trim()) return text(e.city, lang);
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        return text(e.email, lang);
      if (!phone.trim() || phone.replace(/\D/g, "").length < 7)
        return text(e.phone, lang);
      if (!persona) return text(e.persona, lang);
      return "";
    }
    if (section === 1) {
      if (!q2) return text(e.q2, lang);
      if (showQ2Other && !q2Other.trim()) return text(e.q2Other, lang);
      if (showQ3 && !q3) return text(e.q3, lang);
      return "";
    }
    if (section === 2) {
      if (q4.length === 0) return text(e.q4, lang);
      if (q4HasOther && !q4Other.trim()) return text(e.q4Other, lang);
      const missing = COPY.q5.factors.filter((f) => !q5[f.value]);
      if (missing.length > 0) return text(e.q5, lang);
      if (q6.length === 0) return text(e.q6, lang);
      return "";
    }
    if (section === 3) {
      if (!q7) return text(e.q7, lang);
      if (showQ8 && !q8) return text(e.q8, lang);
      if (!q9) return text(e.q9, lang);
      if (q10.length === 0) return text(e.q10, lang);
      if (!q11) return text(e.q11, lang);
      return "";
    }
    if (section === 4) {
      if (q12 === null) return text(e.q12, lang);
      if (q13.length === 0) return text(e.q13, lang);
      if (!q14) return text(e.q14, lang);
      if (q15.length === 0) return text(e.q15, lang);
      if (showQ16 && !q16) return text(e.q16, lang);
      return "";
    }
    if (section === 5) {
      if (!q17.trim()) return text(e.q17, lang);
      if (!q18.trim()) return text(e.q18, lang);
      if (q19.length === 0) return text(e.q19, lang);
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
        setError(data.error || text(COPY.chrome.somethingWrong, lang));
      }
    } catch {
      setError(text(COPY.chrome.somethingWrong, lang));
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
  const sectionH = `font-outfit font-semibold text-[15px] text-[#141413] ${lang === "kn" ? "font-kannada" : ""}`;
  const helperText = `text-[11px] text-[#B0AEA5] mb-3 ${lang === "kn" ? "font-kannada" : ""}`;
  const knBody = lang === "kn" ? "font-kannada" : "";

  const chip = (selected: boolean) =>
    `border-[1.5px] rounded-lg px-4 py-2 cursor-pointer text-sm transition-colors text-left ${knBody} ${
      selected
        ? "border-[#2D6A4F] bg-[#E8F3EC] text-[#1B4332] font-semibold"
        : "border-[#E0DDD8] bg-white text-[#141413] hover:border-[#2D6A4F]"
    }`;

  const chipDisabled = (selected: boolean, disabled: boolean) =>
    `border-[1.5px] rounded-lg px-4 py-2 text-sm transition-colors text-left ${knBody} ${
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

  const c = COPY.chrome;

  return (
    <div>
      {/* Progress + Lang toggle */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
          <p className={`text-[11px] font-semibold text-[#1B4332] uppercase tracking-wider ${knBody}`}>
            {text(c.sectionCount, lang)} {section + 1} {text(c.of, lang)} 6 · {text(COPY.sections[section], lang)}
          </p>
          <LangToggle value={lang} onChange={setLang} />
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
                <label className={`${labelClass} ${knBody}`}>{text(COPY.contact.fullName, lang)}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder={text(COPY.contact.fullNamePh, lang)}
                />
              </div>
              <div>
                <label className={`${labelClass} ${knBody}`}>{text(COPY.contact.city, lang)}</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                  placeholder={text(COPY.contact.cityPh, lang)}
                />
              </div>
              <div>
                <label className={`${labelClass} ${knBody}`}>
                  {text(COPY.contact.email, lang)}
                  <span className={`ml-1.5 text-[10px] font-normal text-[#B0AEA5] ${knBody}`}>
                    ({text(COPY.contact.emailHint, lang)})
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder={text(COPY.contact.emailPh, lang)}
                />
              </div>
              <div>
                <label className={`${labelClass} ${knBody}`}>{text(COPY.contact.phone, lang)}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder={text(COPY.contact.phonePh, lang)}
                />
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Pill>Q1</Pill>
                <label className={sectionH}>{text(COPY.q1.prompt, lang)}</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {COPY.q1.personas.map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => setPersona(p.code)}
                    className={chip(persona === p.code)}
                  >
                    <div className="font-semibold">{text(p.label, lang)}</div>
                    <div className={`text-[11px] text-[#B0AEA5] mt-0.5 font-normal ${knBody}`}>
                      {text(p.sub, lang)}
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
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q2</Pill>
                <label className={sectionH}>{text(COPY.q2.prompt, lang)}</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {COPY.q2.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQ2(opt.value)}
                    className={chip(q2 === opt.value)}
                  >
                    {optText(opt, lang)}
                  </button>
                ))}
              </div>
              {showQ2Other && (
                <input
                  type="text"
                  value={q2Other}
                  onChange={(e) => setQ2Other(e.target.value)}
                  className={`${inputClass} mt-3`}
                  placeholder={text(c.specify, lang)}
                />
              )}
            </div>

            {showQ3 && (
              <>
                <div className="border-t border-[#ECEAE5] my-5" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Pill>Q3</Pill>
                    <label className={sectionH}>{text(COPY.q3.prompt, lang)}</label>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {COPY.q3.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setQ3(opt.value)}
                        className={chip(q3 === opt.value)}
                      >
                        {optText(opt, lang)}
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
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q4</Pill>
                <label className={sectionH}>{text(COPY.q4.prompt, lang)}</label>
              </div>
              <p className={helperText}>
                {text(c.pickTop3, lang)}
                <span className="ml-1 font-semibold">({q4.length}/3)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {q4Options.map((opt) => {
                  const selected = q4.includes(opt.value);
                  const disabled = !selected && q4.length >= 3;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt.value, q4, setQ4, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {optText(opt, lang)}
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
                  placeholder={text(COPY.q4.otherPlaceholder, lang)}
                />
              )}
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q5</Pill>
                <label className={sectionH}>{text(COPY.q5.prompt, lang)}</label>
              </div>
              <p className={helperText}>{text(COPY.q5.helper, lang)}</p>

              <div className="border border-[#ECEAE5] rounded-lg overflow-hidden">
                {COPY.q5.factors.map((factor, idx) => (
                  <div
                    key={factor.value}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2.5 ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#FAF9F5]"
                    }`}
                  >
                    <span className={`text-[13px] text-[#141413] flex-1 ${knBody}`}>
                      {optText(factor, lang)}
                    </span>
                    <div className="flex gap-1.5 shrink-0">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setQ5({ ...q5, [factor.value]: n })}
                          className={scaleBtn(q5[factor.value] === n)}
                          aria-label={`${optText(factor, lang)} = ${n}`}
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
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q6</Pill>
                <label className={sectionH}>{text(COPY.q6.prompt, lang)}</label>
              </div>
              <p className={helperText}>
                {text(c.pickTop3, lang)}
                <span className="ml-1 font-semibold">({q6.length}/3)</span>
              </p>
              <div className="flex flex-col gap-1.5">
                {COPY.q6.options.map((opt) => {
                  const selected = q6.includes(opt.value);
                  const disabled = !selected && q6.length >= 3;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt.value, q6, setQ6, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {optText(opt, lang)}
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
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q7</Pill>
                <label className={sectionH}>{text(COPY.q7.prompt, lang)}</label>
              </div>
              <div className="flex flex-col gap-1.5">
                {COPY.q7.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQ7(opt.value)}
                    className={chip(q7 === opt.value)}
                  >
                    {optText(opt, lang)}
                  </button>
                ))}
              </div>
            </div>

            {showQ8 && (
              <>
                <div className="border-t border-[#ECEAE5] my-5" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Pill>Q8</Pill>
                    <label className={sectionH}>{text(COPY.q8.prompt, lang)}</label>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {q8Options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setQ8(opt.value)}
                        className={chip(q8 === opt.value)}
                      >
                        {optText(opt, lang)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q9</Pill>
                <label className={sectionH}>{text(COPY.q9.prompt, lang)}</label>
              </div>
              <div className="flex flex-col gap-1.5">
                {COPY.q9.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQ9(opt.value)}
                    className={chip(q9 === opt.value)}
                  >
                    {optText(opt, lang)}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q10</Pill>
                <label className={sectionH}>{text(COPY.q10.prompt, lang)}</label>
              </div>
              <p className={helperText}>{text(c.checkAll, lang)}</p>
              <div className="flex flex-col gap-1.5">
                {COPY.q10.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => togglePick(opt.value, q10, setQ10)}
                    className={chip(q10.includes(opt.value))}
                  >
                    {optText(opt, lang)}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q11</Pill>
                <label className={sectionH}>{text(COPY.q11.prompt, lang)}</label>
              </div>
              <div className="flex flex-col gap-1.5">
                {COPY.q11.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQ11(opt.value)}
                    className={chip(q11 === opt.value)}
                  >
                    {optText(opt, lang)}
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
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q12</Pill>
                <label className={sectionH}>{text(COPY.q12.prompt, lang)}</label>
              </div>
              <p className={helperText}>{text(COPY.q12.helper, lang)}</p>
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
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q13</Pill>
                <label className={sectionH}>{text(COPY.q13.prompt, lang)}</label>
              </div>
              <p className={helperText}>
                {text(c.pickTop3, lang)}
                <span className="ml-1 font-semibold">({q13.length}/3)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {COPY.q13.options.map((opt) => {
                  const selected = q13.includes(opt.value);
                  const disabled = !selected && q13.length >= 3;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt.value, q13, setQ13, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {optText(opt, lang)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q14</Pill>
                <label className={sectionH}>{text(COPY.q14.prompt, lang)}</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {COPY.q14.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQ14(opt.value)}
                    className={chip(q14 === opt.value)}
                  >
                    {optText(opt, lang)}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q15</Pill>
                <label className={sectionH}>{text(COPY.q15.prompt, lang)}</label>
              </div>
              <p className={helperText}>
                {text(c.pickTop3, lang)}
                <span className="ml-1 font-semibold">({q15.length}/3)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {COPY.q15.options.map((opt) => {
                  const selected = q15.includes(opt.value);
                  const disabled = !selected && q15.length >= 3;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => togglePick(opt.value, q15, setQ15, 3)}
                      className={chipDisabled(selected, disabled)}
                    >
                      {optText(opt, lang)}
                    </button>
                  );
                })}
              </div>
            </div>

            {showQ16 && (
              <>
                <div className="border-t border-[#ECEAE5] my-5" />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Pill>Q16</Pill>
                    <label className={sectionH}>{text(COPY.q16.prompt, lang)}</label>
                  </div>
                  <p className={helperText}>{text(COPY.q16.helper, lang)}</p>
                  <div className="flex flex-col gap-1.5">
                    {COPY.q16.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setQ16(opt.value)}
                        className={chip(q16 === opt.value)}
                      >
                        {optText(opt, lang)}
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
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q17</Pill>
                <label className={sectionH}>{text(COPY.q17.prompt, lang)}</label>
              </div>
              <textarea
                value={q17}
                onChange={(e) => setQ17(e.target.value)}
                className={`${textareaClass} ${knBody}`}
                placeholder={text(COPY.q17.placeholder, lang)}
              />
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q18</Pill>
                <label className={sectionH}>{text(COPY.q18.prompt, lang)}</label>
              </div>
              <textarea
                value={q18}
                onChange={(e) => setQ18(e.target.value)}
                className={`${textareaClass} ${knBody}`}
                placeholder={text(COPY.q18.placeholder, lang)}
              />
            </div>

            <div className="border-t border-[#ECEAE5] my-5" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pill>Q19</Pill>
                <label className={sectionH}>{text(COPY.q19.prompt, lang)}</label>
              </div>
              <p className={`${helperText} font-kannada`}>
                ನಿಮಗೆ ಬೇಕಾದಷ್ಟು select ಮಾಡಿ · <span className="font-inter">Select all that apply</span>
                <span className="ml-1 font-semibold font-inter">({q19.length})</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {COPY.q19.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => togglePick(opt.value, q19, setQ19)}
                    className={chip(q19.includes(opt.value))}
                  >
                    {optText(opt, lang)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Nav + submit */}
        <div className="pt-6">
          {error && (
            <p className={`text-red-600 text-xs text-center mb-3 ${knBody}`}>{error}</p>
          )}

          <div className="flex items-center gap-3">
            {section > 0 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={loading}
                className={`h-12 px-5 rounded-[10px] border border-[#E0DDD8] text-sm font-semibold text-[#141413] hover:border-[#2D6A4F] hover:text-[#1B4332] transition-colors ${knBody}`}
              >
                {text(c.back, lang)}
              </button>
            )}
            {section < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={loading}
                className={`flex-1 h-12 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold rounded-[10px] text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${knBody}`}
              >
                {text(c.continue, lang)} ({section + 1}/6)
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 h-12 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold rounded-[10px] text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${knBody}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {text(c.submitting, lang)}
                  </>
                ) : (
                  text(c.submit, lang)
                )}
              </button>
            )}
          </div>

          <p className={`text-xs text-[#999] text-center mt-3 ${knBody}`}>
            {text(c.unlockHint, lang)}
          </p>
        </div>
      </form>
    </div>
  );
}

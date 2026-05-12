"use client";

import type { Lang } from "@/lib/copy";

interface Props {
  value: Lang;
  onChange: (v: Lang) => void;
  className?: string;
}

export default function LangToggle({ value, onChange, className = "" }: Props) {
  const base =
    "px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors leading-none";
  const active = "bg-[#2D6A4F] text-white";
  const inactive = "text-[#5A5A55] hover:text-[#1B4332]";

  return (
    <div
      role="group"
      aria-label="Language toggle"
      className={`inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-[#E0DDD8] bg-white ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={value === "en"}
        className={`${base} ${value === "en" ? active : inactive}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("kn")}
        aria-pressed={value === "kn"}
        className={`${base} font-kannada ${value === "kn" ? active : inactive}`}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}

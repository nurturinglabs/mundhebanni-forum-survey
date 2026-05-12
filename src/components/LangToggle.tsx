"use client";

import type { Lang } from "@/lib/copy";

interface Props {
  value: Lang;
  onChange: (v: Lang) => void;
  className?: string;
}

export default function LangToggle({ value, onChange, className = "" }: Props) {
  const base =
    "px-4 py-2 text-[14px] font-semibold rounded-md transition-colors leading-none min-w-[56px]";
  const active = "bg-[#2D6A4F] text-white shadow-sm";
  const inactive = "text-[#5A5A55] hover:text-[#1B4332]";

  return (
    <div
      role="group"
      aria-label="Language toggle"
      className={`inline-flex items-center gap-1 p-1 rounded-lg border border-[#E0DDD8] bg-white ${className}`}
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

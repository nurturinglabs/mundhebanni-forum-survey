"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const REWARDS = [
  {
    title: "Founding Member status",
    detail: "Permanent badge · You will get priority access at launch",
  },
  {
    title: "Pre-launch updates · WhatsApp invite",
    detail: "We'll reach you on the number you shared.",
  },
  {
    title: "First look at the “State of Munde Banni” report",
    detail: "Built from these responses · exclusive to founding members",
  },
];

function LockOpenIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

export default function ThankYouPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const unlocked = sessionStorage.getItem("kff_unlocked");
    if (!unlocked) {
      router.replace("/");
      return;
    }
    setName(sessionStorage.getItem("kff_name") || "");
  }, [router]);

  const firstName = name.trim().split(/\s+/)[0] || "";

  return (
    <main className="min-h-screen w-screen dot-grid flex items-center justify-center p-4 lg:p-8">
      <div className="relative z-10 w-full max-w-[640px]">
        {/* Heading block */}
        <div className="reveal-up mb-7">
          <h1 className="font-outfit font-extrabold text-[30px] sm:text-[36px] leading-[1.15] text-[#141413] mb-3">
            Thank you{firstName ? `, ${firstName}` : ""}.
          </h1>
          <p className="font-kannada text-[#1B4332]/80 text-[17px] sm:text-[18px] leading-snug mb-5">
            ನಿಮ್ಮ ಅಮೂಲ್ಯವಾದ ಅನಿಸಿಕೆಗಳಿಗಾಗಿ ಧನ್ಯವಾದಗಳು.
          </p>
          <p className="text-[15px] text-[#5A5A55]">
            We&apos;re building this with you.
          </p>
        </div>

        {/* Section label */}
        <div
          className="reveal-up flex items-center gap-2 mb-3"
          style={{ animationDelay: "0.08s" }}
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            <span className="absolute inset-0 rounded-full bg-[#2D6A4F]/30 pulse-ring" />
            <span className="relative inline-block w-2 h-2 rounded-full bg-[#2D6A4F]" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#2D6A4F] font-semibold">
            What you&apos;ve unlocked
          </p>
        </div>

        {/* Reward cards */}
        <div className="space-y-3">
          {REWARDS.map((r, i) => (
            <div
              key={r.title}
              className="reveal-up bg-white border border-[#E8E6DC] rounded-[14px] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(45,106,79,0.18)] hover:shadow-[0_2px_0_rgba(0,0,0,0.02),0_12px_28px_-10px_rgba(45,106,79,0.28)] transition-shadow"
              style={{ animationDelay: `${0.18 + i * 0.12}s` }}
            >
              <div className="flex items-stretch">
                {/* Left accent rail with icon */}
                <div className="relative bg-gradient-to-b from-[#E8F3EC] to-[#D4E9DC] flex items-center justify-center px-4 sm:px-5">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2D6A4F]" />
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#CFE6D7] text-[#2D6A4F]">
                    <LockOpenIcon className="w-[18px] h-[18px]" />
                  </span>
                </div>

                {/* Body */}
                <div className="flex-1 px-4 sm:px-5 py-4">
                  <p className="font-outfit font-semibold text-[15px] text-[#141413] leading-snug mb-1">
                    {r.title}
                  </p>
                  <p className="text-[13px] text-[#5A5A55] leading-relaxed">
                    {r.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="reveal-up mt-8 flex flex-col sm:flex-row items-center gap-3 justify-between border-t border-[#ECEAE5] pt-5"
          style={{ animationDelay: `${0.18 + REWARDS.length * 0.12}s` }}
        >
          <p className="text-xs text-[#999]">
            By Mundhe Banni ·{" "}
            <span className="font-kannada">ಮುಂದೆ ಬನ್ನಿ</span>
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem("kff_unlocked");
              sessionStorage.removeItem("kff_name");
              sessionStorage.removeItem("kff_persona");
              router.push("/");
            }}
            className="text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] underline-offset-2 hover:underline"
          >
            Refer another founder →
          </button>
        </div>
      </div>
    </main>
  );
}

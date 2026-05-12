"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [persona, setPersona] = useState("");

  useEffect(() => {
    const unlocked = sessionStorage.getItem("kff_unlocked");
    if (!unlocked) {
      router.replace("/");
      return;
    }
    setName(sessionStorage.getItem("kff_name") || "");
    setPersona(sessionStorage.getItem("kff_persona") || "");
  }, [router]);

  const personaLabel: Record<string, string> = {
    EF: "Early Founder",
    SC: "Scale-up Founder/CEO",
    AF: "Aspiring Founder",
    SP: "Service Provider",
    MI: "Mentor / Investor",
  };

  return (
    <main className="min-h-screen w-screen dot-grid flex items-center justify-center p-4 lg:p-8">
      <div className="relative z-10 w-full max-w-[640px] bg-white border border-[#E8E6DC] rounded-xl p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <span className="inline-block bg-[#E8F3EC] text-[#1B4332] text-[10px] font-semibold tracking-wider uppercase rounded-full px-2.5 py-1">
            🌱 Founding Member
          </span>
          {persona && (
            <span className="inline-block bg-[#FAF9F5] text-[#141413] text-[10px] font-semibold tracking-wider uppercase rounded-full px-2.5 py-1 border border-[#E8E6DC]">
              {personaLabel[persona] || persona}
            </span>
          )}
        </div>

        <h1 className="font-outfit font-extrabold text-[28px] lg:text-[34px] leading-tight text-[#141413] mb-2">
          {name ? `Thank you, ${name.split(" ")[0]}.` : "You're in."}
        </h1>
        <p className="font-kannada text-[#1B4332] text-base mb-6">
          ನಿಮ್ಮ ಧ್ವನಿ ಕೇಳಿಸಿತು. We&apos;re building this with you.
        </p>

        <div className="bg-[#F6FBF7] border border-[#CFE6D7] rounded-[10px] p-5 mb-6">
          <p className="text-[10px] uppercase tracking-widest text-[#2D6A4F] font-semibold mb-3">
            🔓 What you&apos;ve unlocked
          </p>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="text-[#2D6A4F] mt-1">●</span>
              <div>
                <p className="text-sm font-semibold text-[#141413]">
                  Founding Member status
                </p>
                <p className="text-xs text-[#5A5A55]">
                  Permanent badge · priority access at launch
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2D6A4F] mt-1">●</span>
              <div>
                <p className="text-sm font-semibold text-[#141413]">
                  Direct line to the people building KFF
                </p>
                <p className="text-xs text-[#5A5A55]">
                  Your responses go straight into v1 — no committee in between
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2D6A4F] mt-1">●</span>
              <div>
                <p className="text-sm font-semibold text-[#141413]">
                  Pre-launch updates · WhatsApp invite
                </p>
                <p className="text-xs text-[#5A5A55]">
                  We&apos;ll reach you on the number you shared. ಮುಂದೆ ಭೇಟಿ.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2D6A4F] mt-1">●</span>
              <div>
                <p className="text-sm font-semibold text-[#141413]">
                  First look at the &quot;State of Mundhe Banni&quot; report
                </p>
                <p className="text-xs text-[#5A5A55]">
                  Built from these responses · exclusive to founding members
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="border-t border-[#ECEAE5] pt-5 mb-2">
          <p className="text-[10px] uppercase tracking-widest text-[#B0AEA5] font-semibold mb-2">
            What happens next
          </p>
          <ol className="space-y-1.5 text-sm text-[#141413] list-decimal list-inside">
            <li>We close the survey + cluster what we hear.</li>
            <li>You&apos;ll get a short note with the headline findings.</li>
            <li>Founding members get early access before the Mundhe Banni Forum public launch.</li>
          </ol>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 justify-between">
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

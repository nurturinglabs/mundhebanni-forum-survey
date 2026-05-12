"use client";

import KFFSurveyForm from "@/components/KFFSurveyForm";

export default function Home() {
  return (
    <main className="min-h-screen w-screen dot-grid flex lg:h-screen lg:overflow-hidden">
      {/* Left panel — branding */}
      <div className="relative z-10 hidden lg:flex flex-col justify-between w-[380px] shrink-0 bg-[#0E2A1F] text-white p-8">
        <div>
          <h1 className="font-outfit font-extrabold text-[32px] leading-tight mb-3 mt-2">
            Mundhe Banni Forum
          </h1>
          <p className="text-sm text-white/55 mb-2">
            Pre-Launch Survey
          </p>
          <p className="text-sm text-white/40 font-kannada mb-2">
            ಮುಂದಿನ ಹೆಜ್ಜೆ ನಿಮ್ಮಿಂದ
          </p>
          <p className="text-sm text-white/55 mb-6">
            Help us build this right.
          </p>

          <div className="border-t border-white/10 pt-5">
            <p className="text-[10px] uppercase tracking-widest text-[#74C69D] mb-3">
              WHY WE&apos;RE ASKING
            </p>

            <div className="bg-[rgba(116,198,157,0.08)] border border-[rgba(116,198,157,0.2)] rounded-[10px] p-4 mb-6">
              <p className="text-[13px] font-bold text-[#74C69D] mb-2">
                🌱 You shape what we build
              </p>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="text-[#74C69D] text-xs mt-0.5">●</span>
                  <span className="text-xs text-white/70">Founding member status</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#74C69D] text-xs mt-0.5">●</span>
                  <span className="text-xs text-white/70">First access at launch</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#74C69D] text-xs mt-0.5">●</span>
                  <span className="text-xs text-white/70">Direct line to the founders building this</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#74C69D] text-xs mt-0.5">●</span>
                  <span className="text-xs text-white/70">Your priorities go into v1</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-[#74C69D] mb-3">
              WHO THIS IS FOR
            </p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <span className="text-[#74C69D] text-xs mt-0.5">●</span>
                <span className="text-xs text-white/70">Founders building in Karnataka</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#74C69D] text-xs mt-0.5">●</span>
                <span className="text-xs text-white/70">Mentors, investors, service providers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#74C69D] text-xs mt-0.5">●</span>
                <span className="text-xs text-white/70">Aspiring founders ready to start</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/30">
          By Mundhe Banni · <span className="font-kannada">ಮುಂದೆ ಬನ್ನಿ</span>
        </p>
      </div>

      {/* Right panel — form */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="w-full max-w-[860px] mx-auto bg-white border border-[#E8E6DC] rounded-xl p-5 lg:p-8">
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-outfit font-semibold text-lg text-[#141413]">
                  Help us build the Mundhe Banni Forum
                </h2>
                <p className="font-inter text-[12px] text-[#B0AEA5]">
                  <span className="font-kannada">ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಕೊಡಿ</span> · 6 sections · ~5 minutes
                </p>
              </div>
              <span className="lg:hidden inline-block bg-[#2D6A4F] text-white rounded-full px-3 py-1 text-[10px] font-medium shrink-0">
                Pre-launch
              </span>
            </div>
          </div>

          {/* Form */}
          <KFFSurveyForm />
        </div>
      </div>
    </main>
  );
}

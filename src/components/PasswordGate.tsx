"use client";

import { useState } from "react";

interface PasswordGateProps {
  onAuthenticated: () => void;
}

export default function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("dash_auth", "true");
        onAuthenticated();
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen dot-grid flex items-center justify-center px-4"
      style={{ backgroundColor: "#FAF9F5" }}
    >
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white border border-[#E8E6DC] rounded-xl p-8 text-center">
          <div
            className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#E8F3EC", color: "#2D6A4F" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>

          <h2 className="font-outfit font-semibold text-xl mb-1 text-[#141413]">
            Admin Access
          </h2>
          <p className="text-xs text-[#B0AEA5] mb-6">
            Mundhe Banni Forum · <span className="font-kannada">ಮುಂದೆ ಬನ್ನಿ</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full h-12 border border-[#E8E6DC] rounded-lg px-4 text-sm bg-white focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-[#141413]"
            />

            {error && <p className="text-red-600 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 bg-[#2D6A4F] hover:bg-[#1B4332]"
            >
              {loading ? "Checking…" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

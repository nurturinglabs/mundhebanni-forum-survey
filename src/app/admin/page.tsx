"use client";

import { useEffect, useState } from "react";
import PasswordGate from "@/components/PasswordGate";
import KFFDashboard from "@/components/KFFDashboard";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem("dash_auth") === "true");
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <p className="text-xs text-[#B0AEA5]">Loading…</p>
      </div>
    );
  }

  if (!authed) {
    return <PasswordGate onAuthenticated={() => setAuthed(true)} />;
  }

  return <KFFDashboard />;
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LabelList,
} from "recharts";

type Persona = "EF" | "SC" | "AF" | "SP" | "MI";

interface KFFResponse {
  id: string;
  created_at: string;
  name: string;
  city: string;
  email: string | null;
  phone: string;
  persona: Persona;
  q1: string | null;
  q2: string | null;
  q2_other: string | null;
  q3: string | null;
  q4: string[] | null;
  q4_other: string | null;
  q5: Record<string, number> | null;
  q6: string[] | null;
  q7: string | null;
  q8: string | null;
  q9: string | null;
  q10: string[] | null;
  q11: string | null;
  q12: number | null;
  q13: string[] | null;
  q14: string | null;
  q15: string[] | null;
  q16: string | null;
  q17: string | null;
  q18: string | null;
  q19: string[] | null;
}

const BRAND = {
  bg: "#FAF9F5",
  card: "#FFFFFF",
  border: "#E8E6DC",
  text: "#141413",
  muted: "#5A5A55",
  subtle: "#B0AEA5",
  primary: "#2D6A4F",
  primaryDark: "#1B4332",
  primaryLight: "#E8F3EC",
};

const PALETTE = [
  "#2D6A4F",
  "#52B788",
  "#74C69D",
  "#40916C",
  "#1B4332",
  "#95D5B2",
  "#B7E4C7",
  "#D8F3DC",
];

const PERSONAS: { code: Persona | "ALL"; label: string }[] = [
  { code: "ALL", label: "All" },
  { code: "EF", label: "Early" },
  { code: "SC", label: "Scale-up" },
  { code: "AF", label: "Aspiring" },
  { code: "SP", label: "Service" },
  { code: "MI", label: "Mentor / Inv" },
];

const PERSONA_FULL: Record<Persona, string> = {
  EF: "Early Founder",
  SC: "Scale-up Founder/CEO",
  AF: "Aspiring Founder",
  SP: "Service Provider",
  MI: "Mentor / Investor",
};

// -- helpers ----------------------------------------------------------------

function countSingle(arr: KFFResponse[], key: keyof KFFResponse) {
  const counts: Record<string, number> = {};
  arr.forEach((r) => {
    const v = r[key];
    if (typeof v === "string" && v) counts[v] = (counts[v] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function countMulti(arr: KFFResponse[], key: keyof KFFResponse) {
  const counts: Record<string, number> = {};
  arr.forEach((r) => {
    const v = r[key];
    if (Array.isArray(v)) {
      v.forEach((opt) => {
        if (opt) counts[opt] = (counts[opt] || 0) + 1;
      });
    }
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function avgQ5(arr: KFFResponse[]) {
  const sums: Record<string, { sum: number; n: number }> = {};
  arr.forEach((r) => {
    if (!r.q5) return;
    Object.entries(r.q5).forEach(([factor, score]) => {
      if (typeof score === "number") {
        const s = sums[factor] || { sum: 0, n: 0 };
        s.sum += score;
        s.n += 1;
        sums[factor] = s;
      }
    });
  });
  return Object.entries(sums)
    .map(([name, { sum, n }]) => ({
      name,
      avg: n ? +(sum / n).toFixed(2) : 0,
      n,
    }))
    .sort((a, b) => b.avg - a.avg);
}

function npsBuckets(arr: KFFResponse[]) {
  return Array.from({ length: 10 }, (_, i) => {
    const n = i + 1;
    return {
      name: String(n),
      count: arr.filter((r) => r.q12 === n).length,
    };
  });
}

function npsScore(arr: KFFResponse[]) {
  const scored = arr.filter((r) => typeof r.q12 === "number");
  if (!scored.length) return null;
  const promoters = scored.filter((r) => (r.q12 as number) >= 9).length;
  const detractors = scored.filter((r) => (r.q12 as number) <= 6).length;
  return Math.round(((promoters - detractors) / scored.length) * 100);
}

function avgNps(arr: KFFResponse[]) {
  const scored = arr.filter((r) => typeof r.q12 === "number");
  if (!scored.length) return null;
  const total = scored.reduce((s, r) => s + (r.q12 as number), 0);
  return +(total / scored.length).toFixed(1);
}

function downloadCSV(rows: KFFResponse[]) {
  const headers = [
    "created_at", "name", "city", "email", "phone", "persona",
    "q2", "q2_other", "q3",
    "q4", "q4_other",
    "q5",
    "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16",
    "q17", "q18", "q19",
  ];
  const esc = (v: unknown): string => {
    if (v === null || v === undefined) return "";
    if (Array.isArray(v)) return v.join("; ");
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const v = esc((r as unknown as Record<string, unknown>)[h]);
          return `"${v.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `kff_responses_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// -- small UI helpers --------------------------------------------------------

function Card({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border rounded-xl p-4 ${className}`}
      style={{ borderColor: BRAND.border }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-[10px] uppercase tracking-widest font-semibold"
          style={{ color: BRAND.muted }}
        >
          {title}
        </h3>
        {subtitle && (
          <span className="text-[10px]" style={{ color: BRAND.subtle }}>
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function KPI({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div
      className="bg-white border rounded-xl px-4 py-3.5"
      style={{ borderColor: BRAND.border }}
    >
      <p
        className="text-[9px] uppercase tracking-widest font-semibold mb-1"
        style={{ color: BRAND.subtle }}
      >
        {label}
      </p>
      <p
        className="text-[28px] font-bold leading-none"
        style={{ color: BRAND.text, fontFamily: "var(--font-outfit)" }}
      >
        {value}
      </p>
      {sub && (
        <p className="text-[11px] mt-1" style={{ color: BRAND.muted }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
  suffix,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
  suffix?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white border rounded-lg px-3 py-2 shadow-lg max-w-[260px]"
        style={{ borderColor: BRAND.border }}
      >
        <p className="text-xs font-medium" style={{ color: BRAND.text }}>
          {label}
        </p>
        <p
          className="text-sm font-bold"
          style={{ color: BRAND.primary }}
        >
          {payload[0].value}
          {suffix ? ` ${suffix}` : ""}
        </p>
      </div>
    );
  }
  return null;
}

function HBar({
  data,
  color = BRAND.primary,
  yWidth = 240,
  suffix,
}: {
  data: { name: string; count?: number; avg?: number }[];
  color?: string;
  yWidth?: number;
  suffix?: string;
}) {
  const valueKey = data[0] && "avg" in data[0] ? "avg" : "count";
  const height = Math.max(data.length * 30, 80);
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 4, right: 36, top: 4, bottom: 4 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            width={yWidth}
            tick={{ fontSize: 10, fill: BRAND.muted }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<ChartTooltip suffix={suffix} />}
            cursor={{ fill: "rgba(45,106,79,0.06)" }}
          />
          <Bar
            dataKey={valueKey}
            fill={color}
            radius={[0, 6, 6, 0]}
            barSize={14}
          >
            <LabelList
              dataKey={valueKey}
              position="right"
              style={{ fontSize: 10, fill: BRAND.muted, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function VBar({
  data,
  color = BRAND.primary,
}: {
  data: { name: string; count: number }[];
  color?: string;
}) {
  return (
    <div style={{ height: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 4 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: BRAND.muted }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: "rgba(45,106,79,0.06)" }}
          />
          <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} barSize={20}>
            <LabelList
              dataKey="count"
              position="top"
              style={{ fontSize: 10, fill: BRAND.muted, fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Donut({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  const total = data.reduce((s, d) => s + d.count, 0);
  return (
    <div className="flex items-center gap-4">
      <div style={{ width: 160, height: 160 }} className="shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="flex-1 space-y-1.5 min-w-0">
        {data.map((d, i) => (
          <li
            key={d.name}
            className="flex items-center gap-2 text-[11px]"
            style={{ color: BRAND.text }}
          >
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
            />
            <span className="flex-1 truncate" title={d.name}>
              {d.name}
            </span>
            <span className="font-semibold tabular-nums">{d.count}</span>
            <span style={{ color: BRAND.subtle }} className="tabular-nums">
              {total ? Math.round((d.count / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimeAgo({ since }: { since: Date }) {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    setSec(0);
    const t = setInterval(
      () => setSec(Math.floor((Date.now() - since.getTime()) / 1000)),
      1000
    );
    return () => clearInterval(t);
  }, [since]);
  return <span>Updated {sec}s ago</span>;
}

// -- main --------------------------------------------------------------------

export default function KFFDashboard() {
  const [rows, setRows] = useState<KFFResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date());
  const [filter, setFilter] = useState<Persona | "ALL">("ALL");
  const [drawer, setDrawer] = useState<KFFResponse | null>(null);

  const load = useCallback(async () => {
    try {
      setError("");
      const res = await fetch("/api/admin/responses", {
        credentials: "same-origin",
      });
      if (res.status === 401) {
        sessionStorage.removeItem("dash_auth");
        if (typeof window !== "undefined") window.location.reload();
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const { data } = (await res.json()) as { data: KFFResponse[] };
      setRows(data || []);
      setUpdatedAt(new Date());
    } catch (e) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      setError(
        `Failed to load responses: ${msg}. Check SUPABASE_SERVICE_ROLE_KEY + DASHBOARD_PASSWORD env vars.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, [load]);

  const filtered = useMemo(
    () => (filter === "ALL" ? rows : rows.filter((r) => r.persona === filter)),
    [rows, filter]
  );

  // KPIs
  const total = rows.length;
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return rows.filter((r) => new Date(r.created_at) >= d).length;
  }, [rows]);
  const decisionMakers = useMemo(
    () => rows.filter((r) => r.persona === "SC" || r.persona === "MI").length,
    [rows]
  );
  const nps = useMemo(() => npsScore(filtered), [filtered]);
  const npsAvg = useMemo(() => avgNps(filtered), [filtered]);

  // Charts
  const personaData = useMemo(() => {
    const c: Record<string, number> = {};
    rows.forEach((r) => {
      const label = PERSONA_FULL[r.persona] || r.persona;
      c[label] = (c[label] || 0) + 1;
    });
    return Object.entries(c)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [rows]);

  const q2 = useMemo(() => countSingle(filtered, "q2"), [filtered]);
  const q3 = useMemo(() => countSingle(filtered, "q3"), [filtered]);
  const q4 = useMemo(() => countMulti(filtered, "q4"), [filtered]);
  const q5avg = useMemo(() => avgQ5(filtered), [filtered]);
  const q6 = useMemo(() => countMulti(filtered, "q6"), [filtered]);
  const q7 = useMemo(() => countSingle(filtered, "q7"), [filtered]);
  const q9 = useMemo(() => countSingle(filtered, "q9"), [filtered]);
  const q10 = useMemo(() => countMulti(filtered, "q10"), [filtered]);
  const q11 = useMemo(() => countSingle(filtered, "q11"), [filtered]);
  const q12dist = useMemo(() => npsBuckets(filtered), [filtered]);
  const q13 = useMemo(() => countMulti(filtered, "q13"), [filtered]);
  const q14 = useMemo(() => countSingle(filtered, "q14"), [filtered]);
  const q15 = useMemo(() => countMulti(filtered, "q15"), [filtered]);
  const q19 = useMemo(() => countMulti(filtered, "q19"), [filtered]);

  const openResponses = useMemo(
    () =>
      filtered.filter((r) => (r.q17 && r.q17.trim()) || (r.q18 && r.q18.trim())),
    [filtered]
  );

  if (error && !rows.length) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: BRAND.bg }}
      >
        <div
          className="bg-white border rounded-xl p-6 max-w-md text-center"
          style={{ borderColor: BRAND.border }}
        >
          <p className="text-red-600 mb-4 text-sm">{error}</p>
          <button
            onClick={load}
            className="text-white font-semibold rounded-lg px-5 py-2 text-sm"
            style={{ backgroundColor: BRAND.primary }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND.bg }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 lg:py-7 space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <h1
                className="font-bold text-[22px] lg:text-[26px] leading-none"
                style={{
                  color: BRAND.text,
                  fontFamily: "var(--font-outfit)",
                }}
              >
                Mundhe Banni Forum — Admin
              </h1>
              {!loading && (
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: BRAND.primary, color: "white" }}
                >
                  {rows.length}
                </span>
              )}
            </div>
            <p
              className="text-[11px] mt-1.5"
              style={{ color: BRAND.muted }}
            >
              <TimeAgo since={updatedAt} /> · Auto-refreshes every 60s ·{" "}
              <span className="font-kannada">ಮುಂದೆ ಬನ್ನಿ</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="border rounded-lg px-3 py-1.5 text-xs hover:bg-white transition-colors"
              style={{ borderColor: BRAND.border, color: BRAND.muted }}
            >
              ↻ Refresh
            </button>
            <button
              onClick={() => downloadCSV(filtered)}
              disabled={loading || !filtered.length}
              className="text-white rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-40"
              style={{ backgroundColor: BRAND.primary }}
            >
              CSV ({filtered.length})
            </button>
          </div>
        </div>

        {/* Persona filter */}
        <div
          className="flex flex-wrap items-center gap-1.5 p-1 border rounded-xl bg-white"
          style={{ borderColor: BRAND.border, width: "fit-content" }}
        >
          {PERSONAS.map((p) => {
            const c =
              p.code === "ALL"
                ? rows.length
                : rows.filter((r) => r.persona === p.code).length;
            const active = filter === p.code;
            return (
              <button
                key={p.code}
                onClick={() => setFilter(p.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  active
                    ? "text-white"
                    : "hover:bg-[#F4F2EC]"
                }`}
                style={{
                  backgroundColor: active ? BRAND.primary : "transparent",
                  color: active ? "white" : BRAND.muted,
                }}
              >
                {p.label}{" "}
                <span
                  className="ml-1 text-[10px] tabular-nums"
                  style={{
                    color: active ? "rgba(255,255,255,0.8)" : BRAND.subtle,
                  }}
                >
                  {c}
                </span>
              </button>
            );
          })}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KPI
            label="Total responses"
            value={total}
            sub={filter === "ALL" ? "all personas" : `${filtered.length} in view`}
          />
          <KPI
            label="Today"
            value={today}
            sub="since midnight local"
          />
          <KPI
            label="Decision makers"
            value={`${decisionMakers}`}
            sub={
              total
                ? `${Math.round((decisionMakers / total) * 100)}% SC + MI`
                : "—"
            }
          />
          <KPI
            label="NPS proxy"
            value={nps === null ? "—" : `${nps}`}
            sub={npsAvg === null ? "no Q12 yet" : `avg ${npsAvg} / 10`}
          />
        </div>

        {error && (
          <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
            {error}
          </div>
        )}

        {/* Row 1 — Persona donut + NPS distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card title="Persona mix" subtitle="all responses">
            {personaData.length ? (
              <Donut data={personaData} />
            ) : (
              <p className="text-xs" style={{ color: BRAND.subtle }}>
                No data yet.
              </p>
            )}
          </Card>
          <Card title="Q12 — NPS distribution (1–10)" subtitle="filtered">
            <VBar data={q12dist} />
          </Card>
        </div>

        {/* Q5 matrix */}
        <Card
          title="Q5 — How much do these factors limit progress? (avg)"
          subtitle="1 = not at all · 5 = severely limits"
        >
          {q5avg.length ? (
            <HBar data={q5avg} yWidth={260} suffix="/ 5" />
          ) : (
            <p className="text-xs" style={{ color: BRAND.subtle }}>
              No Q5 responses yet.
            </p>
          )}
        </Card>

        {/* Row 2 — Challenges + Wishes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card
            title="Q4 — Biggest challenges"
            subtitle="all picks, top of mind"
          >
            <HBar data={q4} color={PALETTE[1]} yWidth={300} />
          </Card>
          <Card
            title="Q6 — One thing this community should do"
            subtitle="top picks"
          >
            <HBar data={q6} color={PALETTE[3]} yWidth={300} />
          </Card>
        </div>

        {/* Row 3 — Stage + Location */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card title="Q3 — Venture stage" subtitle="filtered">
            <HBar data={q3} color={PALETTE[2]} yWidth={260} />
          </Card>
          <Card title="Q2 — Primary location" subtitle="filtered">
            <HBar data={q2} color={PALETTE[0]} yWidth={260} />
          </Card>
        </div>

        {/* Row 4 — Price + Frequency + Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card title="Q9 — Membership price">
            <HBar data={q9} color={PALETTE[4]} yWidth={170} />
          </Card>
          <Card title="Q14 — Event frequency">
            <HBar data={q14} color={PALETTE[1]} yWidth={170} />
          </Card>
          <Card title="Q7 — Interaction style">
            <HBar data={q7} color={PALETTE[3]} yWidth={220} />
          </Card>
        </div>

        {/* Row 5 — Events + Content + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card title="Q13 — Events they'd show up for">
            <HBar data={q13} color={PALETTE[0]} yWidth={170} />
          </Card>
          <Card title="Q15 — Content preferences">
            <HBar data={q15} color={PALETTE[2]} yWidth={220} />
          </Card>
          <Card title="Q19 — Most-wanted features">
            <HBar data={q19} color={PALETTE[5]} yWidth={220} />
          </Card>
        </div>

        {/* Row 6 — Q10 + Q11 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card title="Q10 — Communities currently in">
            <HBar data={q10} color={PALETTE[3]} yWidth={300} />
          </Card>
          <Card title="Q11 — Why they left a past community">
            <HBar data={q11} color={PALETTE[4]} yWidth={300} />
          </Card>
        </div>

        {/* Open responses */}
        <Card
          title={`Open responses — Q17 missing · Q18 best community (${openResponses.length})`}
          subtitle="newest first"
        >
          {openResponses.length === 0 ? (
            <p className="text-xs" style={{ color: BRAND.subtle }}>
              No open-text responses yet.
            </p>
          ) : (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {openResponses.map((r) => (
                <div
                  key={r.id}
                  className="border rounded-lg p-3"
                  style={{ borderColor: BRAND.border }}
                >
                  <div className="flex items-center gap-2 text-[11px] mb-1.5">
                    <span
                      className="font-semibold"
                      style={{ color: BRAND.text }}
                    >
                      {r.name}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: BRAND.primaryLight,
                        color: BRAND.primaryDark,
                      }}
                    >
                      {r.persona}
                    </span>
                    <span style={{ color: BRAND.subtle }}>· {r.city}</span>
                    <span style={{ color: BRAND.subtle }}>
                      · {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {r.q17 && r.q17.trim() && (
                    <p
                      className="text-[13px] mb-1.5"
                      style={{ color: BRAND.text }}
                    >
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider mr-1.5"
                        style={{ color: BRAND.subtle }}
                      >
                        Missing
                      </span>
                      {r.q17}
                    </p>
                  )}
                  {r.q18 && r.q18.trim() && (
                    <p className="text-[13px]" style={{ color: BRAND.text }}>
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider mr-1.5"
                        style={{ color: BRAND.subtle }}
                      >
                        Best
                      </span>
                      {r.q18}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Response table */}
        <Card
          title={`All responses (${filtered.length})`}
          subtitle="click row for details"
        >
          {filtered.length === 0 ? (
            <p className="text-xs" style={{ color: BRAND.subtle }}>
              No responses for this filter.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ color: BRAND.subtle }}>
                    {[
                      "When",
                      "Name",
                      "Persona",
                      "City",
                      "Phone",
                      "Email",
                      "NPS",
                      "Price",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left font-semibold uppercase tracking-wider text-[9px] py-2 px-2"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setDrawer(r)}
                      className="cursor-pointer hover:bg-[#F4F2EC] border-t"
                      style={{ borderColor: BRAND.border, color: BRAND.text }}
                    >
                      <td
                        className="py-2 px-2 whitespace-nowrap tabular-nums"
                        style={{ color: BRAND.muted }}
                      >
                        {new Date(r.created_at).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2 px-2 font-semibold">{r.name}</td>
                      <td className="py-2 px-2">
                        <span
                          className="px-1.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider"
                          style={{
                            backgroundColor: BRAND.primaryLight,
                            color: BRAND.primaryDark,
                          }}
                        >
                          {r.persona}
                        </span>
                      </td>
                      <td className="py-2 px-2">{r.city}</td>
                      <td className="py-2 px-2 tabular-nums">{r.phone}</td>
                      <td
                        className="py-2 px-2 truncate max-w-[180px]"
                        title={r.email || ""}
                      >
                        {r.email || (
                          <span style={{ color: BRAND.subtle }}>—</span>
                        )}
                      </td>
                      <td className="py-2 px-2 tabular-nums">
                        {r.q12 ?? "—"}
                      </td>
                      <td className="py-2 px-2 text-[11px]">{r.q9 || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Drawer */}
      {drawer && (
        <div
          className="fixed inset-0 z-40 bg-black/40 flex justify-end"
          onClick={() => setDrawer(null)}
        >
          <div
            className="w-full max-w-[560px] h-full overflow-y-auto bg-white"
            style={{ borderLeft: `1px solid ${BRAND.border}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="sticky top-0 bg-white border-b z-10 px-5 py-4 flex items-center justify-between"
              style={{ borderColor: BRAND.border }}
            >
              <div>
                <p
                  className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                  style={{ color: BRAND.subtle }}
                >
                  {new Date(drawer.created_at).toLocaleString()}
                </p>
                <h2
                  className="text-lg font-bold"
                  style={{ color: BRAND.text, fontFamily: "var(--font-outfit)" }}
                >
                  {drawer.name}
                </h2>
                <p className="text-xs mt-0.5" style={{ color: BRAND.muted }}>
                  {PERSONA_FULL[drawer.persona]} · {drawer.city}
                </p>
              </div>
              <button
                onClick={() => setDrawer(null)}
                className="text-2xl leading-none"
                style={{ color: BRAND.muted }}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="px-5 py-4 space-y-3.5">
              <Row k="Phone" v={drawer.phone} />
              <Row k="Email" v={drawer.email || "—"} />
              <Row k="Q2 location" v={drawer.q2 || "—"} />
              {drawer.q2_other && <Row k="Q2 (other)" v={drawer.q2_other} />}
              {drawer.q3 && <Row k="Q3 stage" v={drawer.q3} />}
              {drawer.q4 && drawer.q4.length > 0 && (
                <Row k="Q4 challenges" v={drawer.q4.join(" · ")} />
              )}
              {drawer.q4_other && <Row k="Q4 (other)" v={drawer.q4_other} />}
              {drawer.q5 && (
                <Row
                  k="Q5 limiting factors"
                  v={Object.entries(drawer.q5)
                    .map(([f, n]) => `${f}: ${n}`)
                    .join(" · ")}
                />
              )}
              {drawer.q6 && drawer.q6.length > 0 && (
                <Row k="Q6 community wishes" v={drawer.q6.join(" · ")} />
              )}
              {drawer.q7 && <Row k="Q7 interaction" v={drawer.q7} />}
              {drawer.q8 && <Row k="Q8 contribute" v={drawer.q8} />}
              {drawer.q9 && <Row k="Q9 price" v={drawer.q9} />}
              {drawer.q10 && drawer.q10.length > 0 && (
                <Row k="Q10 communities" v={drawer.q10.join(" · ")} />
              )}
              {drawer.q11 && <Row k="Q11 why left" v={drawer.q11} />}
              {typeof drawer.q12 === "number" && (
                <Row k="Q12 NPS" v={`${drawer.q12} / 10`} />
              )}
              {drawer.q13 && drawer.q13.length > 0 && (
                <Row k="Q13 events" v={drawer.q13.join(" · ")} />
              )}
              {drawer.q14 && <Row k="Q14 frequency" v={drawer.q14} />}
              {drawer.q15 && drawer.q15.length > 0 && (
                <Row k="Q15 content" v={drawer.q15.join(" · ")} />
              )}
              {drawer.q16 && <Row k="Q16 SP rewards" v={drawer.q16} />}
              {drawer.q17 && <Row k="Q17 missing" v={drawer.q17} long />}
              {drawer.q18 && <Row k="Q18 best community" v={drawer.q18} long />}
              {drawer.q19 && drawer.q19.length > 0 && (
                <Row k="Q19 features" v={drawer.q19.join(" · ")} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v, long = false }: { k: string; v: string; long?: boolean }) {
  return (
    <div>
      <p
        className="text-[10px] uppercase tracking-widest font-semibold mb-1"
        style={{ color: BRAND.subtle }}
      >
        {k}
      </p>
      <p
        className={`${long ? "text-[13px] leading-relaxed" : "text-[12px]"}`}
        style={{ color: BRAND.text }}
      >
        {v}
      </p>
    </div>
  );
}

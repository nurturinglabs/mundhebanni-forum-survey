# Mundhe Banni Forum — Pre-Launch Survey

A bilingual (Kanglish), single-page Next.js survey for the **Mundhe Banni Forum** pre-launch.
By **Mundhe Banni · ಮುಂದೆ ಬನ್ನಿ**.

> ಮುಂದಿನ ಹೆಜ್ಜೆ ನಿಮ್ಮಿಂದ — Help us build this right.

---

## What's inside

- **6 sections, 19 questions** with conditional routing based on persona (Q1)
- **Personas**: Early Founder (EF), Scale-up Founder/CEO (SC), Aspiring Founder (AF), Service Provider (SP), Mentor/Investor (MI)
- **Conditional logic**:
  - Q3: hidden for MI
  - Q4: 4 different option sets (EF/AF, SC, SP, MI)
  - Q8: SC and MI only
  - Q16: SP only
- **Submit-to-unlock**: founding-member confirmation + invite to next steps
- **Stack**: Next.js 14, TypeScript, Tailwind, Supabase, Vercel Analytics

---

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in Supabase creds
npm run dev
```

Visit `http://localhost:3000`.

---

## Environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY

# /admin dashboard password
DASHBOARD_PASSWORD=pick-a-strong-password
```

Use the **same Supabase project as the original Mundhe Banni survey app** (just add the new table below).

`DASHBOARD_PASSWORD` is server-side only (no `NEXT_PUBLIC_` prefix). Set it in Vercel → Environment Variables for the deployed version. Without it, `/admin` returns a 500.

---

## Supabase schema

Run this SQL in the Supabase SQL editor:

```sql
create table if not exists kff_survey_responses (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  -- contact
  name         text not null,
  city         text not null,
  email        text not null,
  phone        text not null,

  -- routing
  persona      text not null,   -- EF | SC | AF | SP | MI
  q1           text,            -- mirror of persona

  -- about you
  q2           text,            -- single select
  q2_other     text,            -- free text if "Other KA city" / "Outside KA"
  q3           text,            -- single select; null for MI

  -- challenges
  q4           jsonb,           -- multi (top 3) — options vary by persona
  q4_other     text,            -- free text if "Other" picked
  q5           jsonb,           -- { factor: 1..5 } matrix
  q6           jsonb,           -- multi (top 3)

  -- engagement
  q7           text,            -- single
  q8           text,            -- single; null unless SC | MI
  q9           text,            -- single (price)
  q10          jsonb,           -- multi
  q11          text,            -- single

  -- events & content
  q12          int,             -- NPS 1..10
  q13          jsonb,           -- multi (top 3)
  q14          text,            -- single
  q15          jsonb,           -- multi (top 3)
  q16          text,            -- single; null unless SP

  -- open
  q17          text,            -- long text
  q18          text,            -- long text
  q19          jsonb            -- multi (top 3)
);

-- Allow anon inserts (the form submits via the anon key)
alter table kff_survey_responses enable row level security;

create policy "anon insert kff_survey_responses"
  on kff_survey_responses
  for insert
  to anon
  with check (true);

-- Optional: indexes for analysis
create index if not exists kff_survey_responses_persona_idx
  on kff_survey_responses (persona);
create index if not exists kff_survey_responses_created_at_idx
  on kff_survey_responses (created_at desc);
```

---

## Routing summary

| Persona | Sees |
|---|---|
| **EF** | Contact + Q1–Q7 (Q4 EF) + Q9–Q19 *(no Q8)* |
| **AF** | Same as EF |
| **SC** | Contact + Q1–Q8 (Q4 SC, Q8 SC) + Q9–Q19 |
| **SP** | Contact + Q1–Q7 (Q4 SP, no Q3) + Q9–Q16 (Q16 SP) + Q17–Q19 *(no Q8)* |
| **MI** | Contact + Q1–Q8 (Q4 MI, Q8 MI, no Q3) + Q9–Q19 |

---

## Deployment to Vercel

1. Push to GitHub.
2. Import repo in Vercel.
3. Set the two `NEXT_PUBLIC_SUPABASE_*` env vars (Production + Preview).
4. Deploy.

Suggested URL: **`mundhebanni-forum-survey.vercel.app`**

In Vercel → Project → Settings → Domains, add `mundhebanni-forum-survey.vercel.app`.

---

## File map

```
src/
  app/
    page.tsx                      → KFF survey landing
    layout.tsx                    → metadata + fonts
    thank-you/page.tsx            → submit-to-unlock confirmation
    admin/page.tsx                → password-gated dashboard
    api/kff-survey/route.ts       → POST → Supabase insert
    api/auth/route.ts             → POST → checks DASHBOARD_PASSWORD
  components/
    KFFSurveyForm.tsx             → multi-step 6-section form
    KFFDashboard.tsx              → admin dashboard (charts + table + drawer)
    PasswordGate.tsx              → password screen for /admin
    LangToggle.tsx                → EN | ಕನ್ನಡ toggle
  lib/
    supabase.ts                   → shared Supabase client
    copy.ts                       → bilingual EN/KN dictionary
```

## Admin dashboard

Visit `/admin`. Enter `DASHBOARD_PASSWORD`. Session is held in `sessionStorage('dash_auth')`.

What you get:
- Persona filter (All / EF / SC / AF / SP / MI) — re-scopes every chart.
- KPI strip: total · today · decision-makers (SC+MI) · NPS proxy from Q12.
- Persona donut, NPS distribution, Q5 limiting-factor averages, Q4/Q6 challenge & wish bars, Q2/Q3 location & stage, Q7/Q9/Q14 single-selects, Q10/Q11/Q13/Q15/Q19 multi-selects.
- Open-text panel: Q17 missing + Q18 best community, newest first, with persona + city.
- Sortable response table — click any row for a per-respondent drawer.
- CSV export of the currently filtered view.
- Auto-refresh every 60 seconds.

(Legacy webinar-survey routes from the original Mundhe Banni app remain in the repo — `/pre`, `/dashboard*`, `/prompts`, `/api/post-survey` — but are unlinked from the new flow. Delete if you don't need them.)

---

## Branding

- Accent green: `#2D6A4F` (forest) · hover `#1B4332`
- Light accent: `#E8F3EC` · dark left panel `#0E2A1F`
- Bilingual: English primary, Kannada secondary in `font-kannada` (Noto Sans Kannada)
- Progress bar shows current section / 6

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get("dash_auth")?.value;
  const password = process.env.DASHBOARD_PASSWORD;

  if (!password) {
    return NextResponse.json(
      { error: "Dashboard password not configured" },
      { status: 500 }
    );
  }
  if (cookieValue !== password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json(
      {
        error:
          "Service role not configured. Set SUPABASE_SERVICE_ROLE_KEY in env.",
      },
      { status: 500 }
    );
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin
    .from("kff_survey_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("admin/responses Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

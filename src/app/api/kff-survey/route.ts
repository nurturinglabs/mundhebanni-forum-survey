import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      city,
      email,
      phone,
      persona,
      q1,
      q2,
      q2_other,
      q3,
      q4,
      q4_other,
      q5,
      q6,
      q7,
      q8,
      q9,
      q10,
      q11,
      q12,
      q13,
      q14,
      q15,
      q16,
      q17,
      q18,
      q19,
    } = body;

    if (!name || !city || !phone || !persona) {
      return NextResponse.json(
        { error: "Name, city, phone, and persona are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("kff_survey_responses").insert([
      {
        name,
        city,
        email: email || "",
        phone,
        persona,
        q1: q1 || persona,
        q2: q2 || null,
        q2_other: q2_other || null,
        q3: q3 || null,
        q4: q4 || null,
        q4_other: q4_other || null,
        q5: q5 || null,
        q6: q6 || null,
        q7: q7 || null,
        q8: q8 || null,
        q9: q9 || null,
        q10: q10 || null,
        q11: q11 || null,
        q12: q12 ?? null,
        q13: q13 || null,
        q14: q14 || null,
        q15: q15 || null,
        q16: q16 || null,
        q17: q17 || null,
        q18: q18 || null,
        q19: q19 || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("KFF survey error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

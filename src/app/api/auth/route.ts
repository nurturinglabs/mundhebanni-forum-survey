import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.DASHBOARD_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: "Dashboard password not configured" },
        { status: 500 }
      );
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { success: false, error: "Incorrect password" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("dash_auth", correctPassword, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 hours
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

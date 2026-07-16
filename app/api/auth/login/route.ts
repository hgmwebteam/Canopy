import { NextResponse } from "next/server";
import { DASH_COOKIE, DASH_USER, dashToken } from "@/lib/dash-auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    return NextResponse.json({ error: "Dashboard is not configured" }, { status: 503 });
  }
  if (username !== DASH_USER || password !== expected) {
    return NextResponse.json({ error: "Incorrect username or password" }, { status: 401 });
  }

  const token = await dashToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(DASH_COOKIE, token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase";

const TRACKED_PATHS = new Set(["/", "/reservation", "/checkout", "/reserved"]);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const path = typeof body?.path === "string" ? body.path : "";
  if (!TRACKED_PATHS.has(path)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const referrer =
    typeof body?.referrer === "string" && body.referrer
      ? body.referrer.slice(0, 300)
      : null;

  const supabase = getSupabaseServer();
  const { error } = await supabase.from("page_views").insert({ path, referrer });
  if (error) console.error("[track] insert failed:", error);
  return NextResponse.json({ ok: true });
}

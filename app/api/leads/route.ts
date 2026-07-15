import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getSupabaseServer } from "@/lib/supabase";
import { upsertGhlContact } from "@/lib/ghl";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  const source = typeof body?.source === "string" ? body.source.slice(0, 100) : null;
  const utm = body?.utm && typeof body.utm === "object" ? body.utm : null;

  // Generate the id locally: the insert-only RLS policy has no SELECT,
  // so we can't read the row back.
  const id = randomUUID();
  const supabase = getSupabaseServer();
  const { error } = await supabase.from("leads").insert({ id, email, source, utm });

  let leadId: string | null = id;
  if (error) {
    // 23505 = duplicate email: already on the waitlist, treat as success.
    if (error.code === "23505") {
      leadId = null;
    } else {
      console.error("[leads] insert failed:", error);
      return NextResponse.json(
        { error: "Could not save your email — please try again" },
        { status: 500 }
      );
    }
  }

  await upsertGhlContact({
    email,
    tags: ["canopy-waitlist"],
    source: source ? `canopy-${source}` : "canopy-landing",
  });

  return NextResponse.json({ ok: true, leadId });
}

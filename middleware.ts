import { NextRequest, NextResponse } from "next/server";
import { DASH_COOKIE, dashToken } from "@/lib/dash-auth";

export const config = { matcher: ["/dashboard/:path*", "/dashboard"] };

/** Cookie-session gate for the internal dashboard; unauthenticated → /login. */
export async function middleware(req: NextRequest) {
  const expected = await dashToken();
  if (!expected) {
    return new NextResponse("Dashboard is not configured", { status: 503 });
  }
  if (req.cookies.get(DASH_COOKIE)?.value === expected) {
    return NextResponse.next();
  }
  const login = new URL("/login", req.url);
  return NextResponse.redirect(login);
}

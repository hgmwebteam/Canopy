import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/dashboard/:path*", "/dashboard"] };

/**
 * HTTP Basic Auth for the internal dashboard (it shows customer emails).
 * Username: canopy · Password: DASHBOARD_PASSWORD env var.
 */
export function middleware(req: NextRequest) {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    return new NextResponse("Dashboard is not configured", { status: 503 });
  }
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const [user, ...rest] = atob(auth.slice(6)).split(":");
      if (user === "canopy" && rest.join(":") === expected) {
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Canopy Dashboard"' },
  });
}

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (host.includes("vercel.app") || host.includes(".preview.")) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|favicon.ico|api).*)",
};

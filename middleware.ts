import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/manage"],
};

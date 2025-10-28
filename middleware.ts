// middleware.ts
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authSession")?.value;

  if (!token) {
    // redirect if no token found
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!signup|api|_next/static|_next/image|favicon.ico|$))",
    "/user/:path*",
  ],
};

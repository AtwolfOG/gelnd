import { adminAuth } from "@/lib/firebaseadmin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // revoking session cookie in firebase global and deleting cookie
    const cookie = await cookies();
    const authSession = cookie.get("authSession")?.value;
    if (!authSession) throw new Error();
    const decodedClaim = await adminAuth.verifySessionCookie(authSession);
    const sub = decodedClaim.sub;
    await adminAuth.revokeRefreshTokens(sub);
    cookie.delete("authSession");
    return NextResponse.json(
      { message: "User successfully logged out" },
      { status: 200 }
    );
  } catch (error) {
    let errorMsg = "Unexpected server error";
    if (error instanceof Error) errorMsg = error.message;
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
}

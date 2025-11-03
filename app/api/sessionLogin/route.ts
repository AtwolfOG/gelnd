import connectDB from "@/lib/connectDB";
import { adminAuth } from "@/lib/firebaseadmin";
import { User } from "@/lib/schema";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { idToken } = await req.json();
    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!decoded) throw new Error("No user");
    const existingUser = await User.findOne({ email: decoded.email });
    if (!existingUser) throw new Error("No user");
    const session = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 14 * 24 * 60 * 60 * 1000,
    });
    const cookie = await cookies();
    cookie.set("authSession", session, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    return NextResponse.json(
      { message: "User has successfully logged in" },
      { status: 200 }
    );
  } catch (error) {
    let errMessage = "unexpected server error";
    if (error instanceof Error) {
      errMessage = error.message;
    }
    console.log(error);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

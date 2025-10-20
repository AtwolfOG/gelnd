import connectDB from "@/lib/connectDB";
import { sendverification } from "@/lib/mail";
import User from "@/lib/schema";
import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { adminAuth } from "@/lib/firebaseadmin";

async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { IdToken, username } = await req.json();
    const decoded = await adminAuth.verifyIdToken(IdToken);

    if (!decoded) throw new Error("No user");
    const existingUser = await User.findOne({ email: decoded.email });
    if (existingUser) throw new Error("User with this email already exist");
    const user = new User({
      email: decoded.email,
      username: username,
    });
    const session = await adminAuth.createSessionCookie(IdToken, {
      expiresIn: 14 * 24 * 60 * 60 * 1000,
    });
    await user.save();
    const cookie = await cookies();
    cookie.set("authSession", session, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (err) {
    let errMessage = "unexpected server error";
    if (err instanceof Error) {
      errMessage = err.message;
    }
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

export { POST };

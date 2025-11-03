import connectDB from "@/lib/connectDB";
import { User } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseadmin";

async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { idToken, username, provider } = await req.json();
    const decoded = await adminAuth.verifyIdToken(idToken);

    if (!decoded) throw new Error("No user");
    const existingUser = await User.findOne({ email: decoded.email });
    if (existingUser && provider == "google") {
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
    }
    if (existingUser) throw new Error("User with this email already exist");
    const user = new User({
      email: decoded.email,
      username: username,
    });
    const session = await adminAuth.createSessionCookie(idToken, {
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
    console.log(err);
    if (err instanceof Error) {
      errMessage = err.message;
    }
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

export { POST };

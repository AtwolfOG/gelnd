import connectDB from "@/lib/connectDB";
import { sendverification } from "@/lib/mail";
import User from "@/lib/schema";
import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";
import { NextRequest, NextResponse } from "next/server";

async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { username, email, password } = await request.json();
    const existingUser = await User.find({ $or: [{ email }, { username }] });
    console.log(existingUser);
    if (existingUser.length > 0)
      throw new Error("A user with this email or username already exist");
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = String(Math.floor(Math.random() * 1000000));
    const user = new User({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationtoken: token,
      verificationtokenexp: Date.now() + 10 * 60 * 1000,
    });
    await sendverification(token, email);
    await user.save();
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    let errMessage = "unexpected internal error";
    if (err instanceof Error) {
      errMessage = err.message;
    }
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}

export { POST };

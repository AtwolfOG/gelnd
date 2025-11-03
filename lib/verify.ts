"use server";

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseadmin";

export async function verifySession() {
  try {
    const token = (await cookies()).get("authSession")?.value;

    if (!token) throw Error("User not loggedin");

    const decoded = await adminAuth.verifySessionCookie(token);
    return decoded; // contains user info like uid, email, etc.
  } catch (err) {
    throw err;
  }
}

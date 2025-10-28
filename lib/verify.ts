"use server";

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseadmin";

export async function verifySession() {
  const token = (await cookies()).get("authSession")?.value;

  if (!token) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(token);
    return decoded; // contains user info like uid, email, etc.
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

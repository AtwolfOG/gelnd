import { getUserId } from "@/lib/analytics";
import Signup from "./signup";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
};

export default async function page() {
  try {
    const userId = await getUserId();
    if (userId) {
      redirect("/user/dashboard");
    }
  } catch (error) {
    if (error instanceof Error && error.message == "NEXT_REDIRECT") {
      throw error;
    }
  }
  return <Signup />;
}

import { getUserId } from "@/lib/analytics";
import Login from "./login";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
};
export default async function Page() {
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
  return <Login />;
}

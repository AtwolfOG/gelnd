import { getUserId } from "@/lib/analytics";
import Login from "./login";
import { redirect } from "next/navigation";

export default async function Page() {
  try {
    const userId = await getUserId();
    if (userId) {
      redirect("/user/dashboard");
    }
  } catch (error) {
    if (error.message == "NEXT_REDIRECT") {
      throw error;
    }
  }
  return <Login />;
}

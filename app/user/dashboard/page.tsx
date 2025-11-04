import { getUser } from "@/lib/analytics";
import Recent from "./recent";
import Session from "./session";
import Stats from "./stats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View the progress of your growth spiritual with ease",
};

export default async function Page() {
  const { time, lastActive, streak, username } = await getUser();
  const name: string = username.split(" ")[0];
  return (
    <div className="">
      <h1>Welcome Back {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <p>continue your spiritual journey</p>
      <Stats time={time} lastActive={lastActive} streak={streak} />
      <Session />
      <Recent />
    </div>
  );
}

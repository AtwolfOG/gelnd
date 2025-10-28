import { ReactNode } from "react";
import Sidebar from "./sidebar";
import SidebarCon from "./sidebarcon";
import { verifySession } from "@/lib/verify";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await verifySession();
  if (!user) {
    redirect("/signup");
  }
  return (
    <div className="h-dvh flex max-w-[1500px] m-auto">
      <SidebarCon>
        <Sidebar />
      </SidebarCon>
      <div className="h-dvh grow px-3 md:px-7 py-12 max-w-[1100px] max-h-[100dvh] overflow-y-scroll ">
        {children}
      </div>
    </div>
  );
}

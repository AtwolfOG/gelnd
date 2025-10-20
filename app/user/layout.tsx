import { ReactNode } from "react";
import Sidebar from "./sidebar";
import SidebarCon from "./sidebarcon";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh flex">
      <SidebarCon>
        <Sidebar />
      </SidebarCon>
      <div className="h-dvh">{children}</div>
    </div>
  );
}

import { PiBookOpenThin } from "react-icons/pi";
import { JSX } from "react";
import { Links, NLink, Settings, Signout } from "./links";

export default function Sidebar() {
  return (
    <div className="flex flex-col  h-[100svh] px-2 py-5 w-[250px] bg-(--bg-light)">
      <h1 className="flex items-center gap-2 max-h-10/100">
        <PiBookOpenThin className="inline text-(--border-muted)" />{" "}
        <span className="logo">GELND</span>
      </h1>
      <div className="flex flex-col grow justify-center max-h-full border-y-1 border-y-white/30">
        <Links />
      </div>
      <div className="flex flex-col max-h-10/100">
        {/* <Settings /> */}
        <Signout />
      </div>
    </div>
  );
}

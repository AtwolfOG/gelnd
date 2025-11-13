"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdTime } from "react-icons/io";
import { IconType } from "react-icons";
import { LuLayoutDashboard, LuChartColumn, LuPenLine } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight } from "react-icons/pi";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toastError, toastSuccess } from "@/components/toast";

interface LinkType {
  text: string;
  Icon: IconType;
}
const links: LinkType[] = [
  { text: "Dashboard", Icon: LuLayoutDashboard },
  { text: "Timer", Icon: IoMdTime },
  { text: "Analytics", Icon: LuChartColumn },
  { text: "Journey", Icon: LuPenLine },
];

export function NLink({ text, Icon }: LinkType) {
  const pathname = usePathname();
  const href = "/user/" + text.toLowerCase();
  return (
    <Link href={href} className={`px-2 py-0.5`}>
      <h2
        className={`flex items-center gap-2 hover:bg-(--bg-dark) p-3 duration-100 rounded-lg ${
          pathname == href ? "bg-(--bg-dark)" : ""
        }`}
      >
        <Icon className="inline" />
        {text}
      </h2>
    </Link>
  );
}
export function Links() {
  return links.map(({ text, Icon }) => (
    <NLink key={text} text={text} Icon={Icon} />
  ));
}
export function Settings() {
  return <NLink text="Settings" Icon={CiSettings} />;
}

export function Signout() {
  const router = useRouter();
  async function handleSignOut() {
    try {
      await signOut(auth);
      const res = await fetch("/api/sessionLogout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        toastSuccess("User Successfully logged out");
        router.push("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      let errorMsg = "An unexpected error occured";
      if (error instanceof Error) errorMsg = error.message;
      toastError("Network error");
    }
  }
  return (
    <button className="px-2" onClick={handleSignOut}>
      <h2 className="flex items-center gap-2 hover:bg-(--bg-dark) p-3 duration-100 rounded-lg">
        <PiSignOutLight /> <span>Sign Out</span>
      </h2>
    </button>
  );
}

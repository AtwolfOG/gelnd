"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function JoinBtn({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  function handleClick() {
    router.push("login");
  }
  return (
    <button
      onClick={handleClick}
      className=" border-[#daa06d41] bg-[#8b2e0079] border-1 px-4 py-3 rounded-2xl text-[#ffffffd0]"
    >
      {children}
    </button>
  );
}

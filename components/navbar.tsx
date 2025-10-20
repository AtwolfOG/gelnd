"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export default function Navbar() {
  return (
    <div className="sticky top-0">
      <div className="absolute w-full flex justify-between py-3 px-2 backdrop-blur-2xl md:px-6">
        <h1 className="logo">GELND</h1>
        <ul className="flex justify-center items-center">
          <Item>Features</Item>
          <Item>Guide</Item>
          <Item>Benefits</Item>
        </ul>
        <JoinBtn>Sign in</JoinBtn>
      </div>
    </div>
  );
}

function Item({ children }: { children: ReactNode }) {
  return (
    <a href="" className="text-white/80 duration-200 hover:text-white p-2">
      <li>{children}</li>
    </a>
  );
}
function JoinBtn({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  function handleClick() {
    router.push("signup");
  }
  return (
    <button
      onClick={handleClick}
      className=" border-[#daa06d41] bg-[#8b2e0079] border-1 px-2 py-3 rounded-2xl text-[#ffffffd0]"
    >
      {children}
    </button>
  );
}

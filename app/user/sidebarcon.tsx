"use client";
import { RxHamburgerMenu as Open } from "react-icons/rx";
import { IoCloseOutline as Close } from "react-icons/io5";
import { ReactNode, useEffect, useState } from "react";

export default function SidebarCon({ children }: { children: ReactNode }) {
  const [toggle, setToggle] = useState(false);
  // const {} = use
  return (
    <>
      <button
        onClick={() => setToggle((state) => !state)}
        className="bg-(--bg-dark) rounded-xl backdrop-blur-xl absolute right-0 p-2 size-12 text-3xl text-(--border-muted) m-1 md:hidden "
      >
        {toggle ? <Close /> : <Open />}
      </button>

      <div
        className={`w-max sidebar -left-full md:block md:left-0 duration-500 ${
          toggle ? "left-0" : ""
        }`}
      >
        {children}
      </div>
    </>
  );
}

// function getWindowDimension() {
//   const { innerWidth: width } = window;
//   return { width };
// }

// function useWindowDimensions() {
//   const [windowWidth, setWindowWidth] = useState(getWindowDimension);
//   useEffect(() => {
//     function handleResize() {
//       setWindowWidth();
//     }
//   }, []);
// }

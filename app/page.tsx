import Image from "next/image";
import { Cards } from "../components/card";
import JoinBtn from "@/components/joinBtn";
import Guide from "@/components/guide";
import Benefits from "@/components/benefits";
import CTA from "@/components/cta";
import { PiBookOpenThin } from "react-icons/pi";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Home",
  description: "Homepage for GELND",
};

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="w-full min-h-[300px] h-[80vh]  bg-cover bg-center flex flex-col justify-center px-5 sm:px-10 items-start hero">
        <div className="mb-3">
          <h1 className="text-(--accent-color)!">Deepen Your Faith,</h1>
          <h1 className="text-(--accent-color)!">
            Track Your Spiritual Growth
          </h1>
        </div>
        <p className="max-w-[40ch] mb-6 text-(--text-accent)!">
          Transform your spiritual practice with intentional time tracking,
          meaningful insights, and a digital journal for your journey with God.
        </p>
        <JoinBtn>Start Your Journey Today</JoinBtn>
      </div>
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,_minmax(320px,500px))] p-10 py-20 justify-center md:grid-cols-[minmax(375px,400px)_350px] md:mt-15 lg:grid-cols-[460px_350px]">
        <div className="flex flex-col max-w-[470px] py-3 px-2 gap-3">
          <h2>Build a Consistent and Meaningful Spiritual Life</h2>
          <p className="">
            Staying consistent in your spiritual journey can be challenging,
            distractions, busy schedules, and lack of structure can make it hard
            to grow.
          </p>
          <p>
            This app gives you a personal space to focus, reflect, and stay
            accountable to your walk with God.
          </p>
        </div>
        <Image src={"/images/hero1.png"} width={350} height={400} alt="" />
      </div>
      <Cards />
      <Guide />
      <Benefits />
      <CTA />
      <Footer />
    </>
  );
}

import { FC } from "react";
import { IoMdTime } from "react-icons/io";
import { LuChartColumn, LuPenLine, LuTrendingUp } from "react-icons/lu";
import { PiNotepadLight } from "react-icons/pi";
import { GoGoal } from "react-icons/go";

interface cardType {
  Icon: FC;
  title: string;
  text: string;
}
const cardData: cardType[] = [
  {
    Icon: IoMdTime,
    title: "Time Tracking",
    text: "Measure the time you spend in Bible study and prayer with simple, intuitive timers. See exactly how you're investing in your faith.",
  },
  {
    Icon: LuChartColumn,
    title: "Daily Analytics",
    text: "Visualize your spiritual habits with beautiful charts and insights. Track trends, celebrate consistency, and identify areas for growth.",
  },
  {
    Icon: LuPenLine,
    title: "Study Notes",
    text: "Document revelations, insights, and prayers in one organized place. Never lose track of what God is teaching you.",
  },
  {
    Icon: PiNotepadLight,
    title: "Journey Timeline",
    text: "Build a comprehensive record of your spiritual walk. Look back and see how far you've come in your faith.",
  },
  {
    Icon: GoGoal,
    title: "Goals & Remainders",
    text: "Set meaningful spiritual goals and receive gentle reminders to help you stay committed to your daily devotions.",
  },
  {
    Icon: LuTrendingUp,
    title: "Progress Insights",
    text: "Get personalized insights into your spiritual patterns and discover opportunities to deepen your relationship with God.",
  },
];

export function Card({
  Icon,
  title,
  text,
}: {
  Icon: FC<{ className: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className=" rounded-2xl shadow-xl bg-(--bg-dark) hover:-translate-y-2 hover:shadow-2xl transition-all duration-200 ">
      <Icon className="text-5xl m-5 mt-7 text-(--border-muted)" />
      <div className="px-5 pt-6 pb-9">
        <h3>{title}</h3>
        <p className="mt-2">{text}</p>
      </div>
    </div>
  );
}

export function Cards() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] gap-x-5 gap-y-10 justify-center my-10 mx-auto max-w-[1200px] ">
      {cardData.map((data) => (
        <Card
          key={data.title}
          Icon={data.Icon}
          title={data.title}
          text={data.text}
        />
      ))}
    </div>
  );
}

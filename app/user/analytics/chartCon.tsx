"use client";

import { useState } from "react";
import MonthChart, { type monthlyDataType } from "./monthChart";
import { SessionChart } from "./piechart";
import WeekChart, { type weeklyDataType } from "./weekchart";

export default function Charts({
  weeklyData,
  monthlyData,
  sessionData,
}: {
  weeklyData: weeklyDataType[];
  monthlyData: monthlyDataType[];
  sessionData: { type: string; time: number }[];
}) {
  const [chart, setChart] = useState("week");
  function handleClick(type: string) {
    setChart(type);
  }
  return (
    <div className="max-w-[900px]">
      <div className="flex gap-3 my-10">
        <button
          className={`border p-2 border-(--border) hover:bg-(--bg-dark) rounded-2xl text-(--text-light) duration-200 ${
            chart === "week" && "bg-(--bg-dark)!"
          }`}
          onClick={() => handleClick("week")}
        >
          This Week
        </button>
        <button
          className={`border p-2 border-(--border) hover:bg-(--bg-dark) rounded-2xl text-(--text-light) duration-200 ${
            chart === "month" && "bg-(--bg-dark)!"
          }`}
          onClick={() => handleClick("month")}
        >
          This Month
        </button>
        <button
          className={`border p-2 border-(--border) hover:bg-(--bg-dark) rounded-2xl text-(--text-light) duration-200 ${
            chart === "session" && "bg-(--bg-dark)!"
          }`}
          onClick={() => handleClick("session")}
        >
          Breakdown
        </button>
      </div>
      {chart === "week" && <WeekChart weekData={weeklyData} />}
      {chart === "month" && <MonthChart monthData={monthlyData} />}
      {chart === "session" && <SessionChart chartData={sessionData} />}
    </div>
  );
}

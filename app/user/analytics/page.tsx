import { allSession, monthlyChartData, weeklyChartData } from "./getanalytics";
import { getProgress, getTime } from "./utils";
import Container from "@/components/container";
import Charts from "./chartCon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Analyze your progress consciously",
};

export default async function Page() {
  // all these fetched data can be undefined or an array without any elements
  const { weeklyData, currentWeekTime, lastWeekTime } = await weeklyChartData();
  const { monthlyData, currentMonthTime, lastMonthTime } =
    await monthlyChartData();
  const { session, count, sessionData } = await allSession();
  return (
    <div>
      <h1>Analytics & Insights</h1>
      <p>Track your spiritual growth over time.</p>
      <div className="flex flex-wrap max-w-[1200px] gap-4">
        <Container className="sm:max-w-55">
          <div className="flex flex-col gap-3 pl-1 ">
            <h3 className="w-max">This week</h3>
            <p className="w-max">{getTime(currentWeekTime)}</p>
            <p className="w-max">
              {getProgress(lastWeekTime, currentWeekTime)} from last week
            </p>
          </div>
        </Container>
        <Container className="sm:max-w-55">
          <div className="flex flex-col gap-3 pl-1 ">
            <h3 className="w-max">This month</h3>
            <p className="w-max">{getTime(currentMonthTime)}</p>
            <p className="w-max">
              {getProgress(lastMonthTime, currentMonthTime)} from last month
            </p>
          </div>
        </Container>
        <Container className="sm:max-w-55">
          <div className="flex flex-col gap-3 pl-1 ">
            <h3 className="w-max">Average/Session</h3>
            <p className="w-max">
              {getTime((session.bible + session.prayer) / count || 0)}
            </p>
            <p className="w-max">Across all session</p>
          </div>
        </Container>
        <Container className="sm:max-w-55">
          <div className="flex flex-col gap-3 pl-1 ">
            <h3 className="w-max">Total Sessions</h3>
            <p className="w-max">{count || 0}</p>
            <p className="w-max">Since you started</p>
          </div>
        </Container>
      </div>
      <Charts
        weeklyData={weeklyData}
        monthlyData={monthlyData}
        sessionData={sessionData}
      />
    </div>
  );
}

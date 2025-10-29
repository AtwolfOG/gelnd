import { getWeekTime } from "@/lib/analytics";
import WeekChart from "./weekchart";
import { weeklyChartData } from "./getanalytics";
import { getProgress, getTime } from "./utils";
import Container from "@/components/container";

export default async function Page() {
  const { weeklyData, currentWeekTime, lastWeekTime } = await weeklyChartData();
  return (
    <div>
      <h1>Analytics & Insights</h1>
      <p>Track your spiritual growth over time.</p>
      <div className="flex flex-wrap max-w-[1200px] gap-4">
        <Container>
          <div>
            <h3>This week</h3>
            <p>{getTime(currentWeekTime)}</p>
            <p>{getProgress(lastWeekTime, currentWeekTime)} from last week</p>
          </div>
        </Container>
      </div>
      <div>
        <WeekChart weekData={weeklyData} />
      </div>
    </div>
  );
}

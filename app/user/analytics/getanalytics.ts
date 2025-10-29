import { getLastWeekTime, getMonthlydata, getWeekTime } from "@/lib/analytics";
import type { weeklyDataType } from "./weekchart";

const now = new Date();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export async function weeklyChartData() {
  try {
    const currentWeek = new Date();
    currentWeek.setDate(currentWeek.getDate() - now.getDay());
    currentWeek.setHours(0, 0, 0, 0);
    const lastWeek = new Date(currentWeek);
    lastWeek.setDate(currentWeek.getDate() - 7);
    const weekData = await getWeekTime(currentWeek, timezone);
    console.log(weekData);
    const lastWeekTime = await getLastWeekTime(lastWeek, currentWeek, timezone);
    const { weeklyData, totalWeekTime } = formatWeekly(weekData);
    return { weeklyData, currentWeekTime: totalWeekTime, lastWeekTime };
  } catch (error) {
    throw error;
  }
}
function formatWeekly(weeklyData: weeklyDataType[]) {
  // filling the array up with missing days
  const newWeekData = [];
  for (let i = 0; i <= 6; i++) {
    const day = week[i];
    newWeekData.push(
      weeklyData.find((val) => val.day === day) || { day, bible: 0, prayer: 0 }
    );
  }
  const totalWeek = weeklyData.reduce(
    (acc, current) => {
      acc.bible += current.bible;
      acc.prayer += current.prayer;
      return acc;
    },
    { bible: 0, prayer: 0 }
  );
  const totalWeekTime = totalWeek.bible + totalWeek.prayer;
  return { weeklyData: newWeekData, totalWeekTime };
}
export async function monthlyChartData() {
  const thisMonth = new Date();
  thisMonth.setDate(0);
  thisMonth.setHours(0, 0, 0, 0);
  const monthlyData = await getMonthlydata(thisMonth, timezone);
}

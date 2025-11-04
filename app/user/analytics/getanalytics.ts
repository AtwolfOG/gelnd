import {
  getAllSession,
  getLastMonthdata,
  getLastWeekTime,
  getMonthlydata,
  getWeekTime,
} from "@/lib/analytics";
import type { weeklyDataType } from "./weekchart";

const now = new Date();
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
// remember the time from the db is in minutes
export async function weeklyChartData() {
  try {
    const currentWeek = new Date();
    currentWeek.setDate(currentWeek.getDate() - now.getDay());
    currentWeek.setHours(0, 0, 0, 0);
    const lastWeek = new Date(currentWeek);
    lastWeek.setDate(currentWeek.getDate() - 7);
    const weekData = await getWeekTime(currentWeek, timezone);
    const lastWeekTime = await getLastWeekTime(lastWeek, currentWeek);
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
  try {
    const currentMonth = new Date();
    currentMonth.setDate(0);
    currentMonth.setHours(0, 0, 0, 0);
    const lastMonth = new Date(currentMonth);
    lastMonth.setMonth(currentMonth.getMonth() - 1);
    const monthData = await getMonthlydata(currentMonth, timezone);
    const lastMonthTime: number = await getLastMonthdata(
      currentMonth,
      lastMonth
    );
    const { monthlyData, totalMonthTime } = formatMonthly(monthData);
    return { monthlyData, currentMonthTime: totalMonthTime, lastMonthTime };
  } catch (error) {
    throw error;
  }
}

function formatMonthly(
  monthlyData: { week: number; bible: number; prayer: number }[]
) {
  const newMonthlyData = [];
  let totalMonthTime = 0;
  for (let i = 0; i <= 4; i++) {
    newMonthlyData.push(
      monthlyData.find((val) => val.week == i + 1) || {
        week: i + 1,
        bible: 0,
        prayer: 0,
      }
    );
    totalMonthTime += newMonthlyData[i].bible + newMonthlyData[i].prayer;
  }
  const formattedMonth = newMonthlyData.map((val) => ({
    ...val,
    week: `week ${val.week}`,
  }));
  return { monthlyData: formattedMonth, totalMonthTime };
}

export async function allSession() {
  try {
    const { session, count } = await getAllSession();
    const sessionData = [
      { type: "bible", time: session.bible },
      { type: "prayer", time: session.prayer },
    ];
    return { sessionData, session, count };
  } catch (error) {
    throw error;
  }
}

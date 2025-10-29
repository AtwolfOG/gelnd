"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export interface weeklyDataType {
  day: string;
  bible: number;
  prayer: number;
}
const config = {
  bible: {
    label: "Bible",
    color: "#9d2400",
  },
  prayer: {
    label: "Prayer",
    color: "#0074d3",
  },
};
export default function WeekChart({
  weekData,
}: {
  weekData: weeklyDataType[];
}) {
  return (
    <ChartContainer config={config} className="min-h-[100px] w-full">
      <BarChart accessibilityLayer data={weekData}>
        <CartesianGrid />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey="bible" fill="var(--chart-bible)" radius={4} />
        <Bar dataKey="prayer" fill="var(--chart-prayer)" radius={4} />
        <ChartTooltip content={<ChartTooltipContent />} />
      </BarChart>
    </ChartContainer>
  );
}

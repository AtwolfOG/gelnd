"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label list";

const chartConfig = {
  time: { label: "Time" },
  bible: { label: "Bible", color: "#9d2400" }, // reddish-brown
  prayer: { label: "Prayer", color: "#0074d3" }, // blue
} satisfies ChartConfig;

export function SessionChart({
  chartData,
}: {
  chartData: { type: string; time: number }[];
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          <h3>Session Distribution</h3>
        </CardTitle>
        <CardDescription>Spiritual activities summary</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="time"
                  className="bg-(--bg-dark)"
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="time"
              nameKey="type"
              innerRadius={50}
              outerRadius={100}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.type}
                  fill={
                    chartConfig[entry.type as keyof typeof chartConfig]
                      ?.color || "#ccc"
                  }
                  stroke="none"
                />
              ))}
              <LabelList
                dataKey="type"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total activity time for all sessions
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export interface monthlyDataType {
  week: string;
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
export default function MonthChart({
  monthData,
}: {
  monthData: monthlyDataType[];
}) {
  return (
    <ChartContainer config={config} className="min-h-[100px] w-full">
      <BarChart accessibilityLayer data={monthData}>
        <CartesianGrid />
        <XAxis
          dataKey="week"
          tickLine={true}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey="bible" fill="var(--chart-bible)" radius={4} />
        <Bar dataKey="prayer" fill="var(--chart-prayer)" radius={4} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="bg-(--bg-dark) text-(--text-light)"
              formatter={(value, name, item, index) => (
                <>
                  <div
                    className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg) text-foreground "
                    style={
                      {
                        "--color-bg": `var(--chart-${name})`,
                      } as React.CSSProperties
                    }
                  />
                  <span className="inline text-foreground">
                    {config[name]?.label || name}
                  </span>
                  <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                    {value}
                    <span className="text-muted-foreground font-normal">
                      min
                    </span>
                  </div>
                  {/* Add this after the last item */}
                  {index === 1 && (
                    <div className="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                      Total
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                        {item.payload.bible + item.payload.prayer}
                        <span className="text-muted-foreground font-normal">
                          min
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            />
          }
        />
      </BarChart>
    </ChartContainer>
  );
}

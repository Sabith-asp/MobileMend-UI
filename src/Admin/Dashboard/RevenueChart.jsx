import { TrendingUp } from "lucide-react";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#1fcc00",
  },
  expense: {
    label: "Expense",
    color: "#ff0000",
  },
};

const RevenueChart = ({ revenueData }) => {
  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <BarChart accessibilityLayer data={revenueData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="revenue" fill="#1fcc00" radius={4} />
        <Bar dataKey="expense" fill="#ff0000" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default RevenueChart;

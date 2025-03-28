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
const chartData = [
  { month: "January", revenue: 12000, expense: 8000 },
  { month: "February", revenue: 15000, expense: 9500 },
  { month: "March", revenue: 18000, expense: 12000 },
  { month: "April", revenue: 14000, expense: 11000 },
  { month: "May", revenue: 20000, expense: 15000 },
  { month: "June", revenue: 22000, expense: 16000 },
];

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

const RevenueChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <BarChart accessibilityLayer data={chartData}>
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

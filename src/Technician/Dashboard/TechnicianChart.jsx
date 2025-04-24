import React from "react";
// import { ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

// Updated chartData with revenue and completed bookings
// const chartData = [
//   { month: "January", revenue: 6000, bookings: 30 },
//   { month: "February", revenue: 4000, bookings: 20 },
//   { month: "March", revenue: 3000, bookings: 15 },
//   { month: "April", revenue: 2000, bookings: 12 },
//   { month: "May", revenue: 4500, bookings: 25 },
//   { month: "June", revenue: 5000, bookings: 28 },
//   { month: "July", revenue: 5500, bookings: 32 },
//   { month: "August", revenue: 6200, bookings: 35 },
// ];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb", // Blue for revenue
  },
  bookings: {
    label: "Completed Bookings",
    color: "#fcd303", // Yellow for bookings
  },
};

const TechnicianChart = ({ chartData }) => {
  return (
    <div className="container">
      <div className="sm:m-2 m-2 border p-5 rounded-2xl border-gray-400">
        <h5 className="text-xl font-semibold">
          Revenue and Completed Bookings Overview
        </h5>
        <p className="text-sm text-secondarygray mt-1 mb-3">
          Monthly revenue and completed bookings count
        </p>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Shorten month name
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            {/* Bar for Revenue */}
            <Bar
              dataKey="revenue"
              fill={chartConfig.revenue.color}
              radius={4}
            />
            {/* Bar for Completed Bookings */}
            <Bar
              dataKey="bookings"
              fill={chartConfig.bookings.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TechnicianChart;

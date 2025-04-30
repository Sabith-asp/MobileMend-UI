import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer } from "@/Components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/Components/ui/chart";
import { ImSpinner2 } from "react-icons/im"; // Optional spinner icon
import Loader1 from "@/Components/Loader/Loader1";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  bookings: {
    label: "Completed Bookings",
    color: "#fcd303",
  },
};

const TechnicianChart = ({ chartData, isLoading }) => {
  return (
    <div className="container">
      <div className="sm:m-2 m-2 border p-5 rounded-2xl border-gray-400 relative">
        <h5 className="text-xl font-semibold">
          Revenue and Completed Bookings Overview
        </h5>
        <p className="text-sm text-secondarygray mt-1 mb-3">
          Monthly revenue and completed bookings count
        </p>

        {/* Chart container */}
        <div className="relative h-[400px] w-full">
          {isLoading && (
            <div className="text-center h-[100%] p-5 flex justify-center items-center">
              <Loader1 />
            </div>
          )}

          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="revenue"
                fill={chartConfig.revenue.color}
                radius={4}
              />
              <Bar
                dataKey="bookings"
                fill={chartConfig.bookings.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default TechnicianChart;

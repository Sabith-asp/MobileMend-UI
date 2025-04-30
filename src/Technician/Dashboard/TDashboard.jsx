import React from "react";
import TechnicianHeader from "../TechnicianHeader";
import TechnicianTabs from "../TechnicianTabs";
import TechnicianOverview from "./TechnicianOverview";
import TechnicianChart from "./TechnicianChart";
import { useQuery } from "@tanstack/react-query";
import { getTechnicianDashboardData } from "@/Api/technicianApi";

const TDashboard = () => {
  const { data: technicianDashboardData, isLoading } = useQuery({
    queryKey: ["technicianDashboard"],
    queryFn: () => getTechnicianDashboardData(),
    select: (data) => data?.data,
  });
  return (
    <div className="container mx-auto">
      <TechnicianOverview
        isLoading={isLoading}
        technicanOverview={technicianDashboardData}
      />
      <TechnicianChart
        isLoading={isLoading}
        chartData={technicianDashboardData?.technicianRevenueChartData}
      />
    </div>
  );
};

export default TDashboard;

import React from "react";
import TechnicianHeader from "../TechnicianHeader";
import TechnicianTabs from "../TechnicianTabs";
import TechnicianOverview from "./TechnicianOverview";
import TechnicianChart from "./TechnicianChart";
import { useQuery } from "@tanstack/react-query";
import { getTechnicianDashboardData } from "@/Api/technicianApi";

const TDashboard = () => {
  const { data: technicianDashboardData } = useQuery({
    queryKey: ["technicianDashboard"],
    queryFn: () => getTechnicianDashboardData(),
    select: (data) => data?.data,
  });
  return (
    <div className="container mx-auto">
      <TechnicianOverview technicanOverview={technicianDashboardData} />
      <TechnicianChart
        chartData={technicianDashboardData?.technicianRevenueChartData}
      />
    </div>
  );
};

export default TDashboard;

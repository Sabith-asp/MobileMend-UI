import React from "react";
import TechnicianHeader from "../TechnicianHeader";
import TechnicianTabs from "../TechnicianTabs";
import TechnicianOverview from "./TechnicianOverview";
import TechnicianChart from "./TechnicianChart";

const TDashboard = () => {
  return (
    <div className="container mx-auto">
      <TechnicianOverview />
      <TechnicianChart />
    </div>
  );
};

export default TDashboard;

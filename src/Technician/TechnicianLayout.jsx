import React from "react";
import { Outlet } from "react-router-dom";
import TechnicianHeader from "./Dashboard/TechnicianHeader";
import TechnicianTabs from "./TechnicianTabs";

const TechnicianLayout = () => {
  return (
    <div className="container mx-auto">
      <TechnicianHeader />
      <TechnicianTabs />
      <Outlet />
    </div>
  );
};

export default TechnicianLayout;

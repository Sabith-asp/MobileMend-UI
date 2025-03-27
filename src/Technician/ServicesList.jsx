import React from "react";
import TDashboard from "./Dashboard/TDashboard";
import AssignedTable from "./Assigned/AssignedTable";
import InProgressTable from "./InProgress/InProgressTable";

const ServicesList = ({ type }) => {
  return (
    <>
      {type == "dashboard" && <TDashboard />}
      {type == "assigned" && <AssignedTable />}
      {type == "in-progress" && <InProgressTable />}
    </>
  );
};

export default ServicesList;

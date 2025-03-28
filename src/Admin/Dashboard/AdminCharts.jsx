import React from "react";
import RevenueChart from "./RevenueChart";
import PopularChart from "./PopularChart";

const AdminCharts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className=" border p-5 rounded-2xl border-gray-400">
        <h6 className="text-lg font-bold">Revenue Overview</h6>
        <span className="text-secondarygray text-sm">
          Monthly revenue and expenses for this year
        </span>
        <RevenueChart />
      </div>
      <div className=" border p-5 rounded-2xl border-gray-400">
        <h6 className="text-lg font-bold">Popular Services</h6>
        <span className="text-secondarygray text-sm">
          Most requested repair services
        </span>
        <PopularChart />
      </div>
      <div></div>
    </div>
  );
};

export default AdminCharts;

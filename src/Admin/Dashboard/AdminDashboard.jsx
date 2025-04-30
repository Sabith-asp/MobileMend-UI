import React from "react";
import AdminOverview from "./AdminOverview";
import AdminCharts from "./AdminCharts";
import { GoDotFill } from "react-icons/go";
import { getDashBoardData } from "@/Api/adminApi";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const { data: AdminDashboardData, isLoading } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: () => getDashBoardData(),
    select: (data) => data?.data,
  });
  return (
    <>
      <AdminOverview
        isLoading={isLoading}
        AdminDashboardData={AdminDashboardData}
      />
      <AdminCharts
        isLoading={isLoading}
        AdminDashboardData={AdminDashboardData}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="col-span-1 border p-3 rounded-2xl border-gray-400">
          <h6>Today Repairs by Status</h6>
          <div className="flex flex-col">
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-yellow-600 mr-1" />{" "}
                  Accepted
                </span>
                <span>{AdminDashboardData?.todayBookingCounts?.accepted}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-blue-600 mr-1" /> In
                  Progress
                </span>
                <span>
                  {AdminDashboardData?.todayBookingCounts?.inProgress}
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-green-600 mr-1" />{" "}
                  Completed
                </span>
                <span>{AdminDashboardData?.todayBookingCounts?.completed}</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-red-600 mr-1" /> Rejected
                </span>
                <span>{AdminDashboardData?.todayBookingCounts?.rejected}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

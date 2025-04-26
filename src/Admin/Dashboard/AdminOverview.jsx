import React from "react";

const AdminOverview = ({ AdminDashboardData }) => {
  console.log(AdminDashboardData);

  return (
    <div className="container">
      <div className="w-[100%]">
        <div className="overview grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Total Revenue</h5>
            <h3 className="text-3xl font-extrabold">
              {AdminDashboardData?.totalRevenue.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Total Profit</h5>
            <h3 className="text-3xl font-extrabold">
              {AdminDashboardData?.totalProfit.toFixed(2)}
            </h3>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Online Technicians</h5>
            <h3 className="text-3xl font-extrabold">
              {AdminDashboardData?.activeTechnicians}
            </h3>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Completed Bookings</h5>
            <h3 className="text-3xl font-extrabold">
              {AdminDashboardData?.totalCompletedBookings}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

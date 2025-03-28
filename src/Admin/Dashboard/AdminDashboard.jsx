import React from "react";
import AdminOverview from "./AdminOverview";
import AdminCharts from "./AdminCharts";
import { GoDotFill } from "react-icons/go";

const AdminDashboard = () => {
  return (
    <>
      <AdminOverview />
      <AdminCharts />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="col-span-1 border p-3 rounded-2xl border-gray-400">
          <h6>Repairs by Status</h6>
          <div className="flex flex-col">
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-yellow-600 mr-1" />{" "}
                  Pending
                </span>
                <span>22</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-blue-600 mr-1" /> In
                  Progress
                </span>
                <span>22</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-green-600 mr-1" />{" "}
                  Completed
                </span>
                <span>22</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className="flex">
                  <GoDotFill className="text-2xl text-red-600 mr-1" /> Cancelled
                </span>
                <span>22</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

import Loader2 from "@/Components/Loader/Loader2";
import React from "react";

const TechnicianOverview = ({ technicanOverview, isLoading }) => {
  return (
    <div className="container">
      <div className="w-full">
        <div className="overview grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
          {/* Total Revenue */}
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">Total Revenue</h5>
            <h3 className="text-3xl font-extrabold">
              {isLoading ? <Loader2 /> : technicanOverview?.totalRevenue}
            </h3>
          </div>

          {/* Assigned */}
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">Assigned</h5>
            <h3 className="text-3xl font-extrabold">
              {isLoading ? (
                <Loader2 />
              ) : (
                technicanOverview?.technicianServiceCounts?.assigned
              )}
            </h3>
          </div>

          {/* In Progress */}
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">In Progress</h5>
            <h3 className="text-3xl font-extrabold">
              {isLoading ? (
                <Loader2 />
              ) : (
                technicanOverview?.technicianServiceCounts?.inProgress
              )}
            </h3>
          </div>

          {/* Completed */}
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">Completed</h5>
            <h3 className="text-3xl font-extrabold">
              {isLoading ? (
                <Loader2 />
              ) : (
                technicanOverview?.technicianServiceCounts?.completed
              )}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianOverview;

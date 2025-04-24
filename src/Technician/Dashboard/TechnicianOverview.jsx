import React from "react";

const TechnicianOverview = ({ technicanOverview }) => {
  return (
    <div className="container">
      <div className="w-[100%]">
        <div className="overview grid grid-cols-1 sm:grid-cols-3">
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">Total Revenue</h5>
            <h3 className="text-3xl font-extrabold">
              {technicanOverview?.totalRevenue}
            </h3>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">Assigned</h5>
            <h3 className="text-3xl font-extrabold">
              {technicanOverview?.technicianServiceCounts?.assigned}
            </h3>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">In Progress</h5>
            <h3 className="text-3xl font-extrabold">
              {" "}
              {technicanOverview?.technicianServiceCounts?.inProgress}
            </h3>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg m-2 rounded-xl">
            <h5 className="font-bold">Completed</h5>
            <h3 className="text-3xl font-extrabold">
              {technicanOverview?.technicianServiceCounts?.completed}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianOverview;

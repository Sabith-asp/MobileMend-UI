import React from "react";

const AdminOverview = () => {
  return (
    <div className="container">
      <div className="w-[100%]">
        <div className="overview grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Assigned</h5>
            <h3 className="text-3xl font-extrabold">3</h3>
            <span className="text-sm text-secondarygray">
              Waiting for your acceptance
            </span>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Assigned</h5>
            <h3 className="text-3xl font-extrabold">3</h3>
            <span className="text-sm text-secondarygray">
              Waiting for your acceptance
            </span>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Assigned</h5>
            <h3 className="text-3xl font-extrabold">3</h3>
            <span className="text-sm text-secondarygray">
              Waiting for your acceptance
            </span>
          </div>
          <div className="p-3 border border-gray-400 hover:border-primaryblue hover:shadow-lg rounded-xl">
            <h5 className="font-bold">Assigned</h5>
            <h3 className="text-3xl font-extrabold">3</h3>
            <span className="text-sm text-secondarygray">
              Waiting for your acceptance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

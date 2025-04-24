import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

const ServiceDetails = ({ complitionData }) => {
  return (
    <div className=" bg-slate-100 p-3 border border-gray-400 rounded-xl mt-2">
      <h6 className="flex items-center font-semibold">
        <IoDocumentTextOutline className=" mr-2" /> Service Details
      </h6>
      <div className="grid grid-cols-2 sm:grid-cols-2 mt-2">
        <div>
          <h6 className="text-secondarygray mt-1">Customer</h6>
          <h6 className="mt-1">{complitionData?.customerName}</h6>
        </div>
        <div>
          <h6 className="text-secondarygray mt-1">Device</h6>
          <h6 className="mt-1">{complitionData?.deviceName}</h6>
        </div>
        <div>
          <h6 className="text-secondarygray mt-1">Issue</h6>
          <h6 className="mt-1">{complitionData?.serviceName}</h6>
        </div>
        {/* <div>
          <h6 className="text-secondarygray mt-1">Repair Type</h6>
          <h6 className="mt-1">2023-11-15</h6>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceDetails;

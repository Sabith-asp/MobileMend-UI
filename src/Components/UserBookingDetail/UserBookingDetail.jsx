import React from "react";
import { FaRegClock } from "react-icons/fa6";

const UserBookingDetail = () => {
  return (
    <div>
      <p className="text-secondarygray">
        Complete information about this service.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-5">
        <div>
          <h6 className="text-secondarygray">Device</h6>
          <h6 className="mt-1">Smartphone</h6>
        </div>
        <div>
          <h6 className="text-secondarygray">Service</h6>
          <h6 className="mt-1">Screen Replacement</h6>
        </div>
        <div>
          <h6 className="text-secondarygray">Date</h6>
          <h6 className="mt-1">2023-11-15</h6>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-7">
        <div>
          <h6 className="mb-1 text-secondarygray">Status</h6>
          <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
            Completed
          </span>
        </div>
        <div className="mb-1">
          <h6 className="text-secondarygray">Technician</h6>
          <h6>Alex Thompson</h6>
        </div>
      </div>
      <div className="mb-1 mt-7">
        <h6 className="text-secondarygray">Your Rating</h6>
        <span>
          ***** <span className="ml-2">4/5</span>
        </span>
      </div>
      <div>
        <h6 className="text-secondarygray">Notes</h6>
        <h5>Replaced with premium screen protector</h5>
      </div>
      <div className="text-secondarygray flex items-center mt-2">
        <FaRegClock />
        <h6 className="ml-2">Service completed on 2023-11-15</h6>
      </div>
    </div>
  );
};

export default UserBookingDetail;

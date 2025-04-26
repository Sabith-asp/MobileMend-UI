import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";

const ServiceDetailsAdmin = ({ selectedBooking }) => {
  return (
    <div className=" bg-slate-100 p-3 border border-gray-400 rounded-xl mt-2">
      <h6 className="text-sm flex items-center font-semibold">
        <IoDocumentTextOutline className=" mr-2" /> Service Details
      </h6>
      <div className="grid grid-cols-2 sm:grid-cols-2 mt-2">
        <div>
          <h6 className="text-sm text-secondarygray mt-1">Device</h6>
          <h6 className="text-sm mt-1">{selectedBooking?.deviceName}</h6>
        </div>
        <div>
          <h6 className="text-sm text-secondarygray mt-1">Service</h6>
          <h6 className="text-sm mt-1">{selectedBooking?.serviceName}</h6>
        </div>
        {/* <div>
          <h6 className="text-sm text-secondarygray mt-1">Issue</h6>
          <h6 className="text-sm mt-1">{selectedBooking?.issue}</h6>
        </div> */}
        <div>
          <h6 className="text-sm text-secondarygray mt-1">Time</h6>
          <h6 className="text-sm mt-1">
            {new Date(selectedBooking?.createdAt).toLocaleTimeString()}
          </h6>
        </div>
      </div>
      <div>
        <h6 className="text-sm text-secondarygray mt-1">Price</h6>
        <h6 className="text-sm mt-1">
          ₹
          {(
            selectedBooking?.bookingCostDetails?.totalBookingCost +
            selectedBooking?.sparesTotal
          ).toFixed(2)}
        </h6>
      </div>
      <div>
        <h6 className="text-sm text-secondarygray mt-1">Notes</h6>
        <h6 className="text-sm mt-1">{selectedBooking?.issue}</h6>
      </div>
    </div>
  );
};

export default ServiceDetailsAdmin;

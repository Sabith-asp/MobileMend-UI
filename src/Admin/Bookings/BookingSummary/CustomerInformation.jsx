import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const CustomerInformation = ({ selectedBooking }) => {
  return (
    <div className=" bg-slate-100 p-3 border border-gray-400 rounded-xl mt-2">
      <h6 className="text-sm flex items-center font-semibold">
        <FiUser className=" mr-2" /> Service Details
      </h6>
      <div className="grid grid-cols-2 sm:grid-cols-2 mt-2">
        <div>
          <h6 className="text-sm text-secondarygray mt-1">Customer Name</h6>
          <h6 className="text-sm mt-1">{selectedBooking?.customerName}</h6>
        </div>
        <div>
          <h6 className="text-sm text-secondarygray mt-1">Email</h6>
          <h6 className="text-sm mt-1">{selectedBooking?.email}</h6>
        </div>
        <div>
          <h6 className="text-sm text-secondarygray mt-1">Phone</h6>
          <h6 className="text-sm mt-1">{selectedBooking?.phone}</h6>
        </div>
        <div>
          <h6 className="text-sm text-secondarygray mt-1">Location</h6>
          <h6 className="text-sm mt-1">{selectedBooking?.street}</h6>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation;

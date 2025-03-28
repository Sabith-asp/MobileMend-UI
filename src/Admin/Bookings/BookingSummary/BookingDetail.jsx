import React from "react";
import CustomerInformation from "./CustomerInformation";
import ServiceDetailsAdmin from "./ServiceDetailsAdmin";

const BookingDetail = () => {
  return (
    <div>
      <div className="flex justify-between mt-2">
        <h6>Booking Summary</h6>
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
          Completed
        </span>
      </div>
      <CustomerInformation />
      <ServiceDetailsAdmin />
    </div>
  );
};

export default BookingDetail;

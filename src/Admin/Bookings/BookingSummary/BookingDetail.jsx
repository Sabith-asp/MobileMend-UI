import React from "react";
import CustomerInformation from "./CustomerInformation";
import ServiceDetailsAdmin from "./ServiceDetailsAdmin";
import { StatusBadge } from "@/Components/BookedService/BookedTable";

const BookingDetail = ({ selectedBooking }) => {
  return (
    <div>
      <div className="flex justify-between mt-2">
        <h6>Booking Summary</h6>
        <StatusBadge status={selectedBooking.bookingStatus} />
      </div>
      <CustomerInformation selectedBooking={selectedBooking} />
      <ServiceDetailsAdmin selectedBooking={selectedBooking} />
    </div>
  );
};

export default BookingDetail;

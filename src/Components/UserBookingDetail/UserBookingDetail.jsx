import { getBookingById } from "@/Api/bookingApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { StatusBadge } from "../BookedService/BookedTable";
import { FaStar } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Loader1 from "../Loader/Loader1";

const UserBookingDetail = ({ bookingId }) => {
  const { data: bookingByIdData, isLoading } = useQuery({
    queryKey: ["bookingById", bookingId],
    queryFn: () => getBookingById(bookingId),
  });

  const [showMore, setShowMore] = useState(false);

  if (isLoading) {
    return (
      <div className="text-center p-5">
        <Loader1 />
      </div>
    );
  }

  if (!bookingByIdData?.data) {
    return <div className="text-center p-5">No booking data found.</div>;
  }

  const booking = bookingByIdData.data;

  return (
    <div>
      <p className="text-secondarygray mb-4">
        Complete information about this service.
      </p>

      {/* Main Info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <h6 className="text-secondarygray">Device</h6>
          <h6 className="mt-1">
            {booking.deviceType} - {booking.deviceName}
          </h6>
        </div>
        <div>
          <h6 className="text-secondarygray">Service</h6>
          <h6 className="mt-1">{booking.serviceName}</h6>
        </div>
        <div>
          <h6 className="text-secondarygray">Booking Date</h6>
          <h6 className="mt-1">
            {new Date(booking.createdAt).toLocaleDateString()}
          </h6>
        </div>
      </div>

      {/* Status and Technician */}
      <div className="grid grid-cols-2 mt-7 gap-4">
        <div>
          <h6 className="mb-1 text-secondarygray">Status</h6>
          <StatusBadge status={booking.bookingStatus} />
        </div>
        <div>
          <h6 className="text-secondarygray">Technician</h6>
          <h6 className="mt-1">{booking.technicianName || "Not Assigned"}</h6>
          {booking.technicianPhone && (
            <p className="text-sm text-gray-500">{booking.technicianPhone}</p>
          )}
        </div>
      </div>

      {/* Payment Details */}
      {booking.paymentStatus && (
        <div className="mt-7">
          <h6 className="text-secondarygray mb-1">Payment Status</h6>
          <p>{booking.paymentStatus}</p>
        </div>
      )}

      {/* Rating after completed */}
      {booking.bookingStatus === "Completed" && (
        <div className="mt-7">
          <h6 className="text-secondarygray mb-1">Your Rating</h6>
          <div className="flex items-center">
            <FaStar className="text-yellow-300" />
            <span className="ml-2">
              {booking.cutomerRating || "No rating given"}
            </span>
          </div>
          <div className="text-secondarygray flex items-center mt-2">
            <FaRegClock />
            <h6 className="ml-2">
              Service completed on{" "}
              {new Date(booking.createdAt).toLocaleDateString()}
            </h6>
          </div>
        </div>
      )}

      {/* Cost Details */}
      {booking.bookingCostDetails && (
        <div className="mt-7">
          <h6 className="text-secondarygray mb-2">Cost Breakdown</h6>
          <ul className="list-disc ml-5 text-gray-700 text-sm">
            <li>Service Charge: ₹{booking.bookingCostDetails.serviceCharge}</li>
            <li>
              Travel Allowance: ₹{booking.bookingCostDetails.travelAllowance}
            </li>
            <li>Booking Charge: ₹{booking.bookingCostDetails.bookingCharge}</li>
            <li className="font-semibold">
              Total Cost: ₹{booking.bookingCostDetails.totalBookingCost}
            </li>
          </ul>
        </div>
      )}

      {/* Show More Button */}
      <div className="mt-7">
        <button
          className="flex items-center text-primaryblue font-semibold"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Hide Details" : "Show More Details"}
          {showMore ? (
            <FaChevronUp className="ml-2" />
          ) : (
            <FaChevronDown className="ml-2" />
          )}
        </button>
      </div>

      {/* Expandable Content */}
      {showMore && (
        <div className="mt-5 bg-gray-50 p-4 rounded-md shadow-sm">
          <h6 className="text-secondarygray mb-2">Customer Details</h6>
          <p>Name: {booking.customerName}</p>
          <p>Email: {booking.email}</p>
          <p>Phone: {booking.phone}</p>
          <p>
            Address: {booking.street}, {booking.city} - {booking.pincode}
          </p>

          {/* Spare Parts */}
          {booking.spares?.length > 0 && (
            <>
              <h6 className="text-secondarygray mt-5 mb-2">Spares Used</h6>
              <ul className="list-disc ml-5 text-gray-700 text-sm">
                {booking.spares.map((spare) => (
                  <li key={spare.id}>
                    {spare.spareName} (x{spare.qty}) - ₹{spare.price}
                  </li>
                ))}
              </ul>
              <p className="font-semibold mt-2">
                Spares Total: ₹{booking.sparesTotal}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserBookingDetail;

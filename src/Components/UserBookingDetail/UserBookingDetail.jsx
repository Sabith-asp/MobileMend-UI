import { getBookingById } from "@/Api/bookingApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { StatusBadge } from "../BookedService/BookedTable";
import { FaStar } from "react-icons/fa";

const UserBookingDetail = ({ bookingId }) => {
  const { data: bookingByIdData } = useQuery({
    queryKey: ["bookingById"], // unique key
    queryFn: () => getBookingById(bookingId),
  });
  return (
    <div>
      <p className="text-secondarygray">
        Complete information about this service.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 mt-5">
        <div>
          <h6 className="text-secondarygray">Device</h6>
          <h6 className="mt-1">{bookingByIdData?.data?.deviceType}</h6>
        </div>
        <div>
          <h6 className="text-secondarygray">Service</h6>
          <h6 className="mt-1">{bookingByIdData?.data?.serviceName}</h6>
        </div>
        <div>
          <h6 className="text-secondarygray">Date</h6>
          <h6 className="mt-1">
            {new Date(bookingByIdData?.data?.createdAt).toLocaleDateString()}
          </h6>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-7">
        <div>
          <h6 className="mb-1 text-secondarygray">Status</h6>
          <StatusBadge status={bookingByIdData?.data?.bookingStatus} />
        </div>
        <div className="mb-1">
          <h6 className="text-secondarygray">Technician</h6>
          <h6>{bookingByIdData?.data?.technicianName}</h6>
        </div>
      </div>
      {bookingByIdData?.data?.bookingStatus == "Completed" && (
        <>
          <div className="mb-1 mt-7">
            <h6 className="text-secondarygray">Your Rating</h6>
            <span className="flex items-center">
              <FaStar className="text-yellow-300" />{" "}
              <span className="ml-2">
                {bookingByIdData?.data?.cutomerRating}
              </span>
            </span>
          </div>
          {/* <div>
            <h6 className="text-secondarygray">Notes</h6>
            <h5>Replaced with premium screen protector</h5>
          </div>
          <div className="text-secondarygray flex items-center mt-2">
            <FaRegClock />
            <h6 className="ml-2">Service completed on 2023-11-15</h6>
          </div> */}
        </>
      )}
    </div>
  );
};

export default UserBookingDetail;

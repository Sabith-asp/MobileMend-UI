import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { MdOutlineVideocam, MdOutlineChatBubbleOutline } from "react-icons/md";
import Modal from "../Modal/Modal";
import RateTechnician from "../RateTechnician/RateTechnician";
import UserBookingDetail from "../UserBookingDetail/UserBookingDetail";
import { getBookings } from "@/Api/bookingApi";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/Components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  setRatingModalOpen,
  setUserBookingModalOpen,
} from "@/Redux/Slices/uiSlice";
import Loader1 from "../Loader/Loader1";

export const StatusBadge = ({ status }) => {
  switch (status) {
    case "Pending":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-yellow-500 p-1 px-2 rounded-full">
          Pending
        </span>
      );
    case "Assigned":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-primaryblue p-1 px-2 rounded-full">
          Assigned
        </span>
      );
    case "Accepted":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-orange-500 p-1 px-2 rounded-full">
          Accepted
        </span>
      );
    case "Rejected":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium bg-red-500 p-1 px-2 rounded-full">
          Rejected
        </span>
      );

    case "Approved":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium bg-green-600 p-1 px-2 rounded-full">
          Approved
        </span>
      );
    case "Started":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-yellow-500 p-1 px-2 rounded-full">
          Started
        </span>
      );
    case "Reassigned":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-rose-500 p-1 px-2 rounded-full">
          Reassigned
        </span>
      );
    case "Completed":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
          Completed
        </span>
      );
    case "cancelled":
      return (
        <Badge className="rounded-full" variant="destructive">
          Cancelled
        </Badge>
      );
    case "PayNow":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-red-600 p-1 px-2 rounded-full">
          Pay Now
        </span>
      );
    case "Reached":
      return (
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-lime-500 p-1 px-2 rounded-full">
          Reached
        </span>
      );
    default:
      return (
        <Badge className="rounded-full" variant="outline">
          Unknown
        </Badge>
      );
  }
};

const BookedTable = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [bookingForRating, setBookingForRating] = useState(null);
  const { userBookingModalOpen, ratingModalOpen } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  const {
    data: userBookingData,
    refetch: userBookingRefetch,
    isLoading, // <-- add this
  } = useQuery({
    queryKey: ["userBookings"],
    queryFn: () => getBookings(),
  });

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>Device</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead>Rate Technician</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6">
              <Loader1 />
            </TableCell>
          </TableRow>
        ) : userBookingData?.data?.length > 0 ? (
          userBookingData?.data?.map((booking) => (
            <TableRow key={booking?.bookingID}>
              <TableCell>{booking?.deviceName}</TableCell>
              <TableCell>{booking?.serviceName}</TableCell>
              <TableCell>
                {new Date(booking?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <StatusBadge status={booking?.bookingStatus} />
              </TableCell>
              <TableCell>{booking?.technicianName}</TableCell>
              <TableCell>
                {booking?.bookingStatus == "Completed" && (
                  <>
                    <button
                      onClick={() => {
                        setBookingForRating(booking);
                        dispatch(setRatingModalOpen());
                      }}
                      className="text-xs border border-gray-400 rounded-md p-1 px-2"
                    >
                      Rate
                    </button>
                    <Modal
                      isOpen={ratingModalOpen}
                      onClose={() => {
                        setBookingForRating(null);
                        dispatch(setRatingModalOpen());
                      }}
                      head={`Rate Technician`}
                    >
                      <RateTechnician
                        bookingForRating={bookingForRating}
                        setBookingForRating={setBookingForRating}
                      />
                    </Modal>
                  </>
                )}
              </TableCell>
              <TableCell>{booking?.paymentStatus}</TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    setSelectedBookingId(booking?.bookingID);
                    dispatch(setUserBookingModalOpen());
                  }}
                  className="text-primary px-2 py-1 rounded font-light text-primaryblue"
                >
                  View
                </button>
                <Modal
                  isOpen={userBookingModalOpen}
                  onClose={() => {
                    dispatch(setUserBookingModalOpen());
                    setSelectedBookingId(null);
                  }}
                  head={`Service Details`}
                >
                  {selectedBookingId && (
                    <UserBookingDetail bookingId={selectedBookingId} />
                  )}
                </Modal>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6">
              <span className="text-gray-500 text-sm">
                No bookings available
              </span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BookedTable;

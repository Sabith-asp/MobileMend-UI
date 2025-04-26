import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import Modal from "../../Components/Modal/Modal";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Textarea } from "@/Components/ui/textarea";

import CompletedDetail from "./CompletedDetail/CompletedDetail";
import ProcessRefund from "./ProcessRefund";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "@/Api/bookingApi";
import {
  setAdminBookingDetailModalOpen,
  setAdminCompeletedOrder,
} from "@/Redux/Slices/uiSlice";

const CompletedList = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { data: completedBookingsData, refetch: completedBookingsDataRefetch } =
    useQuery({
      queryKey: ["completedBookings", searchTerm],
      queryFn: () =>
        getBookings({ searchString: searchTerm, status: "Completed" }),
    });

  console.log(completedBookingsData);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const { adminCompeletedOrder } = useSelector((state) => state.ui);

  const [reason, setReason] = useState("");

  return (
    <div className="booked-table bg-white mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Device</TableHead>
            <TableHead>Issue</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Spares Used</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {completedBookingsData?.data?.length > 0 ? (
            completedBookingsData?.data?.map((booking) => (
              <TableRow>
                <TableCell>{booking?.bookingID}</TableCell>
                <TableCell>{booking?.customerName}</TableCell>
                <TableCell>{booking?.deviceName}</TableCell>
                <TableCell>{booking?.issue}</TableCell>
                <TableCell className=" ">
                  {new Date(booking?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{booking?.street}</TableCell>
                <TableCell>{booking?.spares?.length}</TableCell>

                <TableCell className="flex">
                  {/* Rate modal */}
                  <div className="">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        dispatch(setAdminCompeletedOrder());
                      }}
                      className="text-xs flex items-center btn-primary-blue"
                    >
                      <IoDocumentTextOutline />
                      View Details
                    </button>
                    <Modal
                      isOpen={adminCompeletedOrder}
                      onClose={() => {
                        setSelectedBooking(null);
                        dispatch(setAdminCompeletedOrder());
                      }}
                      head={`Service Request Details`}
                    >
                      <CompletedDetail selectedBooking={selectedBooking} />
                    </Modal>
                    {/* <Modal
                      isOpen={isRefundModalOpen}
                      onClose={closeRefundModal}
                      head={`Process Refund`}
                    >
                      <ProcessRefund closeRefundModal={closeRefundModal} />
                    </Modal> */}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                No bookings found. Try adjusting your search or filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompletedList;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import Modal from "../../Components/Modal/Modal";
import { IoDocumentTextOutline } from "react-icons/io5";
import ComplitionSummary from "./CompletionSummary/ComplitionSummary";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBookingsByTechnicianIdAndStatus } from "@/Api/technicianApi";
import { setComplitionSummaryModalOpen } from "@/Redux/Slices/uiSlice";
import Loader1 from "@/Components/Loader/Loader1"; // Make sure this is your loader component

const CompletedTable = () => {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { complitionSummaryModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const {
    data: completedTechncianData,
    refetch: completedTechncianDataRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["completedTechncian"],
    queryFn: () =>
      getBookingsByTechnicianIdAndStatus(
        user.technicianId ? user.technicianId : null,
        "Completed"
      ),
  });

  const bookings = completedTechncianData?.data || [];

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
            <TableHead>Payment Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6">
                <div className="flex justify-center items-center">
                  <Loader1 />
                </div>
              </TableCell>
            </TableRow>
          ) : bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                No completed services found.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((service) => (
              <TableRow key={service?.bookingID}>
                <TableCell>{service?.bookingID}</TableCell>
                <TableCell>{service?.customerName}</TableCell>
                <TableCell>{service?.deviceName}</TableCell>
                <TableCell>{service?.serviceName}</TableCell>
                <TableCell>
                  {new Date(service?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{service?.street}</TableCell>
                <TableCell>{service?.spares?.length || 0}</TableCell>
                <TableCell>{service?.paymentStatus}</TableCell>
                <TableCell className="flex">
                  <button
                    onClick={() => {
                      setSelectedBookingId(service?.bookingID);
                      dispatch(setComplitionSummaryModalOpen());
                    }}
                    className="text-xs flex items-center btn-primary-blue"
                  >
                    <IoDocumentTextOutline className="mr-1" />
                    View Details
                  </button>
                  <Modal
                    isOpen={complitionSummaryModalOpen}
                    onClose={() => {
                      setSelectedBookingId(null);
                      dispatch(setComplitionSummaryModalOpen());
                    }}
                    head={`Service Request Details`}
                  >
                    <ComplitionSummary
                      setSelectedBookingId={setSelectedBookingId}
                      selectedBookingId={selectedBookingId}
                    />
                  </Modal>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompletedTable;

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Modal from "../../Components/Modal/Modal";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import AcceptService from "../Assigned/AcceptService";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Textarea } from "@/Components/ui/textarea";
import ComplitionSummary from "./CompletionSummary/ComplitionSummary";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getBookingsByTechnicianIdAndStatus } from "@/Api/technicianApi";
import { setComplitionSummaryModalOpen } from "@/Redux/Slices/uiSlice";

const CompletedTable = () => {
  const [reason, setReason] = useState("");
  const { user } = useSelector((state) => state.user);
  const { complitionSummaryModalOpen } = useSelector((state) => state.ui);

  const [selectedViewDetail, setSelectedViewDetail] = useState(null);

  const dispatch = useDispatch();
  const {
    data: completedTechncianData,
    refetch: completedTechncianDataRefetch,
  } = useQuery({
    queryKey: ["completedTechncian"], // unique key
    queryFn: () =>
      getBookingsByTechnicianIdAndStatus(
        user.technicianId ? user.technicianId : null,
        "Completed"
      ),
  });

  console.log(completedTechncianData);

  const closeViewModal = () => {
    setviewDetailModal(false);
  };

  const [rejectModalOpen, setrejectModalOpen] = useState(false);

  const closeRejectModal = () => {
    setrejectModalOpen(false);
  };

  // const complitionSummary = await getBookingById(data.bookingId);

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
          {completedTechncianData?.data.map((service) => (
            <TableRow>
              <TableCell>{service?.bookingID}</TableCell>
              <TableCell>{service?.customerName}</TableCell>
              <TableCell>{service?.deviceName}</TableCell>
              <TableCell>{service?.serviceName}</TableCell>
              <TableCell className=" ">
                {new Date(service?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{service?.street}</TableCell>
              <TableCell>{service?.spares.length}</TableCell>

              <TableCell className="flex">
                {/* Rate modal */}
                <div className="">
                  <button
                    onClick={() => {
                      setSelectedViewDetail(service);
                      dispatch(setComplitionSummaryModalOpen());
                    }}
                    className="text-xs flex items-center btn-primary-blue"
                  >
                    <IoDocumentTextOutline />
                    View Details
                  </button>
                  <Modal
                    isOpen={complitionSummaryModalOpen}
                    onClose={() => {
                      setSelectedViewDetail(null);
                      dispatch(setComplitionSummaryModalOpen());
                    }}
                    head={`Service Request Details`}
                  >
                    <ComplitionSummary
                      setSelectedViewDetail={setSelectedViewDetail}
                      complitionData={selectedViewDetail}
                    />
                  </Modal>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompletedTable;

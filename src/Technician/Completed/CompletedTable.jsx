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

const CompletedTable = () => {
  const [reason, setReason] = useState("");
  const [viewDetailModal, setviewDetailModal] = useState(false);

  const closeViewModal = () => {
    setviewDetailModal(false);
  };

  const [rejectModalOpen, setrejectModalOpen] = useState(false);

  const closeRejectModal = () => {
    setrejectModalOpen(false);
  };
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
          <TableRow>
            <TableCell>iPhone 13</TableCell>
            <TableCell>Screen Replacement</TableCell>
            <TableCell>03/25/2025</TableCell>
            <TableCell>wefrgthy</TableCell>
            <TableCell className=" ">efrghjk</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>1 Item</TableCell>

            <TableCell className="flex">
              {/* Rate modal */}
              <div className="">
                <button
                  onClick={() => setviewDetailModal(true)}
                  className="text-xs flex items-center btn-primary-blue"
                >
                  <IoDocumentTextOutline />
                  View Details
                </button>
                <Modal
                  isOpen={viewDetailModal}
                  onClose={closeViewModal}
                  head={`Service Request Details`}
                >
                  <ComplitionSummary />
                </Modal>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompletedTable;

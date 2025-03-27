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
import AcceptService from "./AcceptService";
import { Textarea } from "@/Components/ui/textarea";

const AssignedTable = () => {
  const [reason, setReason] = useState("");
  const [acceptModalOpen, setacceptModalOpen] = useState(false);

  const closeAcceptModal = () => {
    setacceptModalOpen(false);
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
            <TableCell className="flex">
              {/* Rate modal */}
              <div className="">
                <button
                  onClick={() => setacceptModalOpen(true)}
                  className="text-xs flex items-center btn-primary-gray"
                >
                  <FaCheck />
                  Accept
                </button>
                <Modal
                  isOpen={acceptModalOpen}
                  onClose={closeAcceptModal}
                  head={`Service Request Details`}
                >
                  <AcceptService closeAcceptModal={closeAcceptModal} />
                </Modal>
              </div>
              <div>
                <button
                  onClick={() => setrejectModalOpen(true)}
                  className="bg-red-600 items-center flex text-white border-0 ml-3 text-xs btn-primary-gray"
                >
                  <RxCross2 />
                  Reject
                </button>
                <Modal
                  isOpen={rejectModalOpen}
                  onClose={closeRejectModal}
                  head={`Reject Service`}
                >
                  <h6>Reason for Rejection</h6>
                  <Textarea
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                    placeholder="Write your reason here..."
                    className="w-full h-24 mt-3 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="pt-3 float-end">
                    <button
                      onClick={closeRejectModal}
                      className="btn-primary-gray"
                    >
                      Cancel
                    </button>
                    <button className="btn-primary-blue bg-red-600">
                      Reject Service
                    </button>
                  </div>
                </Modal>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AssignedTable;

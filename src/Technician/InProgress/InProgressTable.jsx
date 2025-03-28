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
import { Textarea } from "@/Components/ui/textarea";
import { MdOutlineVideocam, MdAccessTime } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import UpdateStatus from "./UpdateStatus";
import AddSpare from "./AddSpare";
import ComplitionSummary from "../Completed/CompletionSummary/ComplitionSummary";

const InProgressTable = () => {
  const [reason, setReason] = useState("");
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({
    value: "pending",
    label: "Pending",
  });
  const statuses = [
    { value: "inspecting", label: "Inspecting" },
    { value: "diagnosing", label: "Diagnosing" },
    { value: "ordered_parts", label: "Ordered Parts" },
    { value: "repairing", label: "Repairing" },
    { value: "testing", label: "Testing" },
    { value: "completed", label: "Completed" },
  ];

  const updateStatus = () => {
    if (currentStatus === "completed") {
      closeUpdateModal();
      setOpenSummaryModal(true);
    }
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const [isSpareModal, setisSpareModal] = useState(false);

  const closeSpareModal = () => {
    setisSpareModal(false);
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
            <TableHead>Repair Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>wefrgthy</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>iPhone 13</TableCell>
            <TableCell className=" ">efrghjk</TableCell>
            <TableCell>Screen Replacement</TableCell>
            <TableCell>03/25/2025</TableCell>
            <TableCell>
              <span className="text-white text-xs font-medium  bg-primaryblue p-1 px-2 rounded-full">
                On-Site
              </span>
            </TableCell>
            <TableCell>
              <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
                Completed
              </span>
            </TableCell>
            <TableCell className="flex">
              <button className="btn-primary-gray p-1 items-center flex">
                <MdAccessTime className="mr-2" />
                Change Status
              </button>
              <button className="btn-primary-gray p-1 ml-2  items-center flex">
                <BsBoxSeam className="mr-2" />
                Add Spares
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>wefrgthy</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>iPhone 13</TableCell>
            <TableCell className=" ">efrghjk</TableCell>
            <TableCell>Screen Replacement</TableCell>
            <TableCell>03/25/2025</TableCell>
            <TableCell>
              <span className="whitespace-nowrap text-primaryblue text-xs font-medium  bg-blue-200 p-1 px-2 rounded-full">
                Off-site
              </span>
            </TableCell>
            <TableCell>
              <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
                Completed
              </span>
            </TableCell>
            <TableCell className="flex">
              <button
                onClick={() => setUpdateModalOpen(true)}
                className="btn-primary-gray p-1 items-center flex"
              >
                <MdAccessTime className="mr-2" />
                Change Status
              </button>
              <Modal
                isOpen={UpdateModalOpen}
                onClose={closeUpdateModal}
                head={`Update Repair Status`}
              >
                <UpdateStatus
                  statuses={statuses}
                  closeUpdateModal={closeUpdateModal}
                  setCurrentStatus={setCurrentStatus}
                  updateStatus={updateStatus}
                  currentStatus={currentStatus}
                />
              </Modal>

              <Modal
                isOpen={openSummaryModal}
                onClose={() => setOpenSummaryModal(false)}
                head="Repair Completion Summary"
              >
                <ComplitionSummary />
              </Modal>

              <button
                onClick={() => setisSpareModal(true)}
                className="btn-primary-gray p-1 ml-2  items-center flex"
              >
                <BsBoxSeam className="mr-2" />
                Add Spares
              </button>
              <Modal
                isOpen={isSpareModal}
                onClose={closeSpareModal}
                head={`Add Spare Parts`}
              >
                <AddSpare closeSpareModal={closeSpareModal} />
              </Modal>
            </TableCell>
            <TableCell>
              <div className="flex">
                <button className="p-1 border border-gray-400 rounded-md mx-1">
                  <MdAccessTime />
                </button>
                <button className="p-1 border border-gray-400 rounded-md">
                  <MdOutlineVideocam />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default InProgressTable;

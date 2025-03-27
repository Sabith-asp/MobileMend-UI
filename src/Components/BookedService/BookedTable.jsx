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
import { MdOutlineVideocam, MdOutlineChatBubbleOutline } from "react-icons/md";
import Modal from "../Modal/Modal";
import RateTechnician from "../RateTechnician/RateTechnician";
import UserBookingDetail from "../UserBookingDetail/UserBookingDetail";

const BookedTable = () => {
  const [isRateModalOpen, setisRateModalOpen] = useState(false);

  const closeRateModal = () => {
    setisRateModalOpen(false);
  };

  const [isViewModalOpen, setisViewModalOpen] = useState(false);

  const closeViewModal = () => {
    setisViewModalOpen(false);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Device</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Repair Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>iPhone 13</TableCell>
          <TableCell>Screen Replacement</TableCell>
          <TableCell>03/25/2025</TableCell>
          <TableCell>
            <span className="text-white text-xs font-medium  bg-primaryblue p-1 px-2 rounded-full">
              On-Site
            </span>
          </TableCell>
          <TableCell className=" ">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
              Completed
            </span>
          </TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>
            {/* Rate modal */}
            <button
              onClick={() => setisRateModalOpen(true)}
              className="text-xs border border-gray-400 rounded-md p-1 px-2"
            >
              Rate
            </button>
            <Modal
              isOpen={isRateModalOpen}
              onClose={closeRateModal}
              head={`Rate Technician`}
            >
              <RateTechnician />
            </Modal>
          </TableCell>
          <TableCell>
            {/* view modal */}
            <button
              onClick={() => setisViewModalOpen(true)}
              className=" text-primary px-2 py-1 rounded font-light text-primaryblue"
            >
              View
            </button>
            <Modal
              isOpen={isViewModalOpen}
              onClose={closeViewModal}
              head={`Service Details`}
            >
              <UserBookingDetail />
            </Modal>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Samsung S22</TableCell>
          <TableCell>Battery Replacement</TableCell>
          <TableCell>03/24/2025</TableCell>
          <TableCell>
            <div className="flex">
              <span className="whitespace-nowrap text-primaryblue text-xs font-medium  bg-blue-200 p-1 px-2 rounded-full">
                Off-site
              </span>
              <button className="p-1 border border-gray-400 rounded-md mx-1">
                <MdOutlineChatBubbleOutline />
              </button>
              <button className="p-1 border border-gray-400 rounded-md">
                <MdOutlineVideocam />
              </button>
            </div>
          </TableCell>
          <TableCell className="text-yellow-500 font-bold">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-primaryblue p-1 px-2 rounded-full">
              In Progress
            </span>
          </TableCell>
          <TableCell>Jane SmiTableHead</TableCell>
          <TableCell>
            <button
              onClick={() => setisRateModalOpen(true)}
              className="text-xs border border-gray-400 rounded-md p-1 px-2"
            >
              Rate
            </button>
            {/* <Modal isOpen={isRateModalOpen} onClose={closeRateModal}></Modal> */}
          </TableCell>
          <TableCell>
            <button className=" text-primary px-2 py-1 rounded font-light text-primaryblue">
              View
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Samsung S22</TableCell>
          <TableCell>Battery Replacement</TableCell>
          <TableCell>03/24/2025</TableCell>
          <TableCell>
            <div className="flex">
              <span className="whitespace-nowrap text-primaryblue text-xs font-medium  bg-blue-200 p-1 px-2 rounded-full">
                Off-site
              </span>
              <button className="p-1 border border-gray-400 rounded-md mx-1">
                <MdOutlineChatBubbleOutline />
              </button>
              <button className="p-1 border border-gray-400 rounded-md">
                <MdOutlineVideocam />
              </button>
            </div>
          </TableCell>
          <TableCell className="text-yellow-500 font-bold">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-red-600 p-1 px-2 rounded-full">
              Pay Now
            </span>
          </TableCell>
          <TableCell>Jane SmiTableHead</TableCell>
          <TableCell>
            <button className="text-xs border border-gray-400 rounded-md p-1 px-2">
              Rate
            </button>
          </TableCell>
          <TableCell>
            <button className=" text-primary px-2 py-1 rounded font-light text-primaryblue">
              View
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Samsung S22</TableCell>
          <TableCell>Battery Replacement</TableCell>
          <TableCell>03/24/2025</TableCell>
          <TableCell>
            <div className="flex">
              <span className="whitespace-nowrap text-primaryblue text-xs font-medium  bg-blue-200 p-1 px-2 rounded-full">
                Off-site
              </span>
              <button className="p-1 border border-gray-400 rounded-md mx-1">
                <MdOutlineChatBubbleOutline />
              </button>
              <button className="p-1 border border-gray-400 rounded-md">
                <MdOutlineVideocam />
              </button>
            </div>
          </TableCell>
          <TableCell className="text-yellow-500 font-bold">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-yellow-500 p-1 px-2 rounded-full">
              Scheduled
            </span>
          </TableCell>
          <TableCell>Jane SmiTableHead</TableCell>
          <TableCell>
            <button className="text-xs border border-gray-400 rounded-md p-1 px-2">
              Rate
            </button>
          </TableCell>
          <TableCell>
            <button className=" text-primary px-2 py-1 rounded font-light text-primaryblue">
              View
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>iPhone 13</TableCell>
          <TableCell>Screen Replacement</TableCell>
          <TableCell>03/25/2025</TableCell>
          <TableCell>On-Site</TableCell>
          <TableCell className=" ">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
              Completed
            </span>
          </TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>
            <button className="text-xs border border-gray-400 rounded-md p-1 px-2">
              Rate
            </button>
          </TableCell>
          <TableCell>
            <button className=" text-primary px-2 py-1 rounded font-light text-primaryblue">
              View
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Samsung S22</TableCell>
          <TableCell>Battery Replacement</TableCell>
          <TableCell>03/24/2025</TableCell>
          <TableCell>
            <span className="text-primaryblue text-xs font-medium  bg-blue-200 p-1 px-2 rounded-full">
              Off-site
            </span>
          </TableCell>
          <TableCell className="text-yellow-500 font-bold">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-primaryblue p-1 px-2 rounded-full">
              In Progress
            </span>
          </TableCell>
          <TableCell>Jane SmiTableHead</TableCell>
          <TableCell>
            <button className="text-xs border border-gray-400 rounded-md p-1 px-2">
              Rate
            </button>
          </TableCell>
          <TableCell>
            <button className=" text-primary px-2 py-1 rounded font-light text-primaryblue">
              View
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Samsung S22</TableCell>
          <TableCell>Battery Replacement</TableCell>
          <TableCell>03/24/2025</TableCell>
          <TableCell>
            <span className="text-primaryblue text-xs font-medium  bg-blue-200 p-1 px-2 rounded-full">
              Off-site
            </span>
          </TableCell>
          <TableCell className="text-yellow-500 font-bold">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-red-600 p-1 px-2 rounded-full">
              Pay Now
            </span>
          </TableCell>
          <TableCell>Jane SmiTableHead</TableCell>
          <TableCell>
            <button className="text-xs border border-gray-400 rounded-md p-1 px-2">
              Rate
            </button>
          </TableCell>
          <TableCell>
            <button className=" text-primary px-2 py-1 rounded font-light text-primaryblue">
              View
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Samsung S22</TableCell>
          <TableCell>Battery Replacement</TableCell>
          <TableCell>03/24/2025</TableCell>
          <TableCell>
            <span className="text-primaryblue text-xs font-medium  bg-blue-200 p-1 px-2 rounded-full">
              Off-site
            </span>
          </TableCell>
          <TableCell className="text-yellow-500 font-bold">
            <span className="whitespace-nowrap text-white text-xs font-medium  bg-yellow-500 p-1 px-2 rounded-full">
              Scheduled
            </span>
          </TableCell>
          <TableCell>Jane SmiTableHead</TableCell>
          <TableCell>
            <button className="text-xs border border-gray-400 rounded-md p-1 px-2">
              Rate
            </button>
          </TableCell>
          <TableCell>
            <button className=" text-primary px-2 py-1 rounded font-light text-primaryblue">
              View
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default BookedTable;

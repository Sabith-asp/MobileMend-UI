import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { LuUserCog } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Eye } from "lucide-react";
import Modal from "@/Components/Modal/Modal";
import TechnicianForm from "./TechnicianForm";
import {
  blockTechnician,
  deleteTechnician,
  getTechnicians,
} from "@/Api/technicianApi";
import { useQuery } from "@tanstack/react-query";

const TechnicanList = ({ searchTerm }) => {
  const [selectedServiceID, setselectedServiceID] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const { data: techniciansData, refetch: techniciansDataRefetch } = useQuery({
    queryKey: ["getTechnicians", searchTerm],
    queryFn: () => getTechnicians({ search: searchTerm }),
  });

  console.log(techniciansData);

  const blockTechnicians = async (technicianId) => {
    try {
      const response = await blockTechnician(technicianId);
      console.log(response);
      techniciansDataRefetch();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTechnicians = async (technicianId) => {
    try {
      const response = await deleteTechnician(technicianId);
      console.log(response);
      techniciansDataRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Jobs</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {techniciansData?.data?.length > 0 ? (
            techniciansData?.data?.map((technician) => (
              <TableRow>
                <TableCell className="font-medium">
                  {technician?.technicianId}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <LuUserCog className="bg-gray-400 rounded-full p-2 text-4xl text-white" />
                    </div>
                    <div className="flex flex-col">
                      <h6>{technician?.name}</h6>
                      <span className="text-xs text-secondarygray">
                        {technician?.place}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="text-xs flex items-center">
                        <MdOutlineEmail className="mr-1" />
                        {technician?.email}
                      </span>
                      <span className="text-xs flex items-center">
                        <FiPhone className="mr-1" /> {technician?.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {technician?.specialization?.split(",").map((sp) => (
                    <span className="p-1 px-2 bg-blue-200 text-primaryblue text-xs rounded-full mr-1">
                      {sp}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <span className="flex text-secondarygray items-center">
                    <FaRegClock className="mr-2" />
                    {technician?.experience} years
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <FaStar className="mr-2 text-yellow-500" />
                    {technician?.rating}
                  </span>
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h6>{technician?.completedJobs} completed</h6>
                      <span className="text-xs text-secondarygray">
                        {technician?.pendingJobs} pending
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={() => blockTechnicians(technician?.technicianId)}
                      className=" text-lg mr-2"
                    >
                      {technician?.isBlocked ? (
                        <FaUserCheck />
                      ) : (
                        <FaUserTimes />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        deleteTechnicians(technician?.technicianId)
                      }
                      className="mt-[2px]  text-red-600 text-xl"
                    >
                      <MdDeleteOutline />
                    </button>
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
      {/* <Modal
        isOpen={editModalIsOpen}
        head={selectedServiceID ? "Edit Device" : "Add Device"}
        onClose={closeEditModal}
      >
        <TechnicianForm />
      </Modal> */}
    </div>
  );
};

export default TechnicanList;

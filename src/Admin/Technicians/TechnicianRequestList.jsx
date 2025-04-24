import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { LuUserCog } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Apple, Eye } from "lucide-react";

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
import Modal from "@/Components/Modal/Modal";
import TechnicianForm from "./TechnicianForm";
import { StatusBadge } from "@/Components/BookedService/BookedTable";
import {
  getTechnicianRequests,
  updateTechnicianRequest,
} from "@/Api/technicianApi";
import { useQuery } from "@tanstack/react-query";
import { FcDisapprove } from "react-icons/fc";
import { FcApprove } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setTechnicianRequestDetails } from "@/Redux/Slices/uiSlice";
import ApplicationDetails from "./ApplicationDetails";

const TechnicianRequestList = ({ searchTerm }) => {
  const [selectedRequestID, setselectedRequestID] = useState(null);
  const [selectedApplicationDetail, setSelectedApplicationDetail] = useState();

  const { data: technicinaRequestsData, refetch: requestRefetch } = useQuery({
    queryKey: ["userBookings", searchTerm],
    queryFn: () =>
      getTechnicianRequests({
        search: searchTerm,
      }),
  });

  const { technicianRequestDetails } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  console.log(technicinaRequestsData);

  const updateRequest = async (data) => {
    try {
      console.log("update request data", data);

      const response = await updateTechnicianRequest(data);
      console.log(response);
      requestRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Actions</TableHead> */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {technicinaRequestsData?.data?.length > 0 ? (
            technicinaRequestsData?.data?.map((request) => (
              <TableRow>
                <TableCell className="font-medium">
                  {request?.technicianRequestID}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="text-xs flex items-center">
                        <MdOutlineEmail className="mr-1" />
                        {request?.email}
                      </span>
                      <span className="text-xs flex items-center">
                        <FiPhone className="mr-1" /> {request?.phone}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell cla>
                  <span className="flex items-center">
                    <FaRegClock className="mr-2" />
                    {request?.experience} years
                  </span>
                </TableCell>
                <TableCell>
                  {request?.specialization?.split(",").map((sp) => (
                    <span className="p-1 px-2 bg-blue-200 text-primaryblue text-xs rounded-full mr-1">
                      {sp}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <span className="flex text-secondarygray items-center">
                    {new Date(request?.requestDate).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={request?.status} />
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end">
                    {request?.status != "Approved" &&
                      request?.status != "Rejected" && (
                        <>
                          <button
                            onClick={() => {
                              setselectedRequestID(
                                request?.technicianRequestID
                              );
                              updateRequest({
                                technicianRequestId: selectedRequestID,
                                status: true,
                              });
                            }}
                          >
                            <FcApprove className="text-3xl" />
                          </button>
                          <button
                            onClick={() => {
                              setselectedRequestID(
                                request?.technicianRequestID
                              );
                              updateRequest({
                                technicianRequestId: selectedRequestID,
                                status: false,
                              });
                            }}
                          >
                            <FcDisapprove className="text-3xl" />
                          </button>
                        </>
                      )}
                    <button
                      onClick={() => {
                        setSelectedApplicationDetail(request);
                        dispatch(setTechnicianRequestDetails());
                      }}
                    >
                      <Eye className="h-4 ml-2 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                No requests found. Try adjusting your search or filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={technicianRequestDetails}
        head={"Technician Request Details"}
        onClose={() => {
          dispatch(setTechnicianRequestDetails());
        }}
      >
        <ApplicationDetails application={selectedApplicationDetail} />
      </Modal>
    </div>
  );
};

export default TechnicianRequestList;

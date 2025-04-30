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
import AcceptService from "../Assigned/AcceptService";
import { Textarea } from "@/Components/ui/textarea";
import { MdOutlineVideocam, MdAccessTime } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import UpdateStatus from "./UpdateStatus";
import AddSpare from "./AddSpare";
import ComplitionSummary from "../Completed/CompletionSummary/ComplitionSummary";
import {
  getBookingsByTechnicianIdAndStatus,
  updateServiceStatus,
} from "@/Api/technicianApi";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "@/Components/BookedService/BookedTable";
import {
  setAddSpareModalOpen,
  setChangeServiceStatusModalOpen,
  setComplitionSummaryModalOpen,
} from "@/Redux/Slices/uiSlice";
import { getBookingById } from "@/Api/bookingApi";
import Loader1 from "@/Components/Loader/Loader1";

const InProgressTable = () => {
  const { user } = useSelector((state) => state.user);
  const {
    changeServiceStatusModalOpen,
    addSpareModalOpen,
    complitionSummaryModalOpen,
  } = useSelector((state) => state.ui);
  console.log(complitionSummaryModalOpen);

  const dispatch = useDispatch();
  const {
    data: inProgressOfTechnicianData,
    refetch: inProgressOfTechnicianRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["inProgressOfTechnician"], // unique key
    queryFn: () =>
      getBookingsByTechnicianIdAndStatus(
        user.technicianId ? user.technicianId : null,
        "InProgress"
      ),
  });

  console.log(inProgressOfTechnicianData);

  const [selectedUpdatingService, setSelectedUpdatingService] = useState(null);
  const [selectedAddSpare, setSelectedAddSpare] = useState(null);
  console.log(selectedUpdatingService);
  const [currentStatus, setCurrentStatus] = useState({
    label: "Pending",
  });
  console.log(selectedAddSpare);

  const statuses = [
    { label: "Reached" },
    { label: "Started" },
    { label: "Completed" },
  ];

  const updateStatus = async (data) => {
    try {
      console.log(data);

      const response = await updateServiceStatus(data);
      dispatch(setChangeServiceStatusModalOpen());
      inProgressOfTechnicianRefetch();
      if (data.status == "Completed") {
        dispatch(setComplitionSummaryModalOpen());
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                <div className="flex justify-center items-center">
                  <Loader1 />
                </div>
              </TableCell>
            </TableRow>
          ) : inProgressOfTechnicianData?.data?.length > 0 ? (
            inProgressOfTechnicianData.data.map((service) => (
              <TableRow key={service.bookingID}>
                <TableCell>{service?.bookingID}</TableCell>
                <TableCell>{service?.customerName}</TableCell>
                <TableCell>{service?.deviceName}</TableCell>
                <TableCell>{service?.serviceName}</TableCell>
                <TableCell>
                  {new Date(service?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{service?.street}</TableCell>
                <TableCell>
                  <StatusBadge status={service?.bookingStatus} />
                </TableCell>
                <TableCell>
                  {service?.bookingStatus !== "Completed" &&
                    service?.bookingStatus !== "Rejected" && (
                      <div className="flex">
                        <button
                          onClick={() => {
                            setSelectedUpdatingService(service.bookingID);
                            dispatch(setChangeServiceStatusModalOpen());
                          }}
                          className="whitespace-nowrap btn-primary-gray p-1 items-center flex"
                        >
                          <MdAccessTime className="mr-2" />
                          Change Status
                        </button>
                        <Modal
                          isOpen={changeServiceStatusModalOpen}
                          onClose={() => {
                            setSelectedUpdatingService(null);
                            dispatch(setChangeServiceStatusModalOpen());
                          }}
                          head="Update Repair Status"
                        >
                          <UpdateStatus
                            setSelectedUpdatingService={
                              setSelectedUpdatingService
                            }
                            selectedUpdatingService={selectedUpdatingService}
                            updateStatus={updateStatus}
                            statuses={statuses}
                            setCurrentStatus={setCurrentStatus}
                            currentStatus={currentStatus}
                          />
                        </Modal>

                        <button
                          onClick={() => {
                            setSelectedAddSpare(service.bookingID);
                            dispatch(setAddSpareModalOpen());
                          }}
                          className="whitespace-nowrap btn-primary-gray p-1 ml-2 items-center flex"
                        >
                          <BsBoxSeam className="mr-2" />
                          Add Spares
                        </button>
                        <Modal
                          isOpen={addSpareModalOpen}
                          onClose={() => {
                            setSelectedAddSpare(null);
                            dispatch(setAddSpareModalOpen());
                          }}
                          head="Add Spare Parts"
                        >
                          <AddSpare
                            bookingId={selectedAddSpare}
                            setSelectedAddSpare={setSelectedAddSpare}
                          />
                        </Modal>
                      </div>
                    )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                No in-progress jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={complitionSummaryModalOpen}
        onClose={() => {
          dispatch(setComplitionSummaryModalOpen());
        }}
        head="Repair Completion Summary"
      >
        <ComplitionSummary
          selectedBookingId={selectedUpdatingService}
          setSelectedBookingId={setSelectedUpdatingService}
        />
      </Modal>
    </div>
  );
};

export default InProgressTable;

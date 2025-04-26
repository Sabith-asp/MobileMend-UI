import React, { useEffect, useState } from "react";
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
import AcceptService from "./AcceptService";
import { Textarea } from "@/Components/ui/textarea";
import SignalRService from "../../Components/Notification/SignalRService";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingsByTechnicianIdAndStatus,
  updateServiceRequest,
} from "@/Api/technicianApi";
import { useQuery } from "@tanstack/react-query";
import {
  setAcceptServiceModalOpen,
  setRejectServiceModalOpen,
} from "@/Redux/Slices/uiSlice";

const AssignedTable = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch();
  const { acceptServiceModalOpen, rejectServiceModalOpen } = useSelector(
    (state) => state.ui
  );

  const [reason, setReason] = useState("");

  const [notifications, setNotifications] = useState([]);
  console.log(notifications);
  const [selectedService, setSelectedService] = useState(null);
  console.log(selectedService);
  const [selectedRejectService, setSelectedRejectService] = useState(null);
  console.log(selectedRejectService);

  const rejectService = async (data) => {
    try {
      const response = await updateServiceRequest(data);
      console.log(response);
      assignedForTechncianRefetch();
      dispatch(setRejectServiceModalOpen());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.technicianId) {
      // Initialize SignalR service with technicianId
      const signalR = new SignalRService(user.technicianId);
      signalR.startConnection();

      // Listen for incoming notifications
      signalR.listenForNotifications((message) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          message,
        ]);
      });

      return () => {
        // Stop the SignalR connection on component unmount
        signalR.stopConnection();
      };
    }
  }, [user.technicianId]);

  const {
    data: assignedForTechncianData,
    isLoading,
    isError,
    error,
    refetch: assignedForTechncianRefetch,
  } = useQuery({
    queryKey: ["assignedForTechncian"], // unique key
    queryFn: () =>
      getBookingsByTechnicianIdAndStatus(user.technicianId, "Assigned"),
  });

  console.log(assignedForTechncianData);

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
          {notifications.map((service) => (
            <TableRow>
              <TableCell>{service?.bookingID}</TableCell>
              <TableCell>{service?.customerName}</TableCell>
              <TableCell>{service?.deviceName}</TableCell>
              <TableCell>{service?.issue}</TableCell>
              <TableCell className=" ">
                {new Date(service?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{service?.street}</TableCell>
              <TableCell className="flex">
                <div className="">
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      dispatch(setAcceptServiceModalOpen());
                    }}
                    className="text-xs flex items-center btn-primary-gray"
                  >
                    <FaCheck />
                    Accept
                  </button>
                  <Modal
                    isOpen={acceptServiceModalOpen}
                    onClose={() => {
                      dispatch(setAcceptServiceModalOpen());
                      setSelectedService(null);
                    }}
                    head={`Service Request Details`}
                  >
                    <AcceptService
                      assignedForTechncianRefetch={assignedForTechncianRefetch}
                      serviceDetails={selectedService}
                    />
                  </Modal>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSelectedRejectService(service.bookingID);
                      setrejectModalOpen(true);
                    }}
                    className="bg-red-600 items-center flex text-white border-0 ml-3 text-xs btn-primary-gray"
                  >
                    <RxCross2 />
                    Reject
                  </button>
                  <Modal
                    isOpen={rejectServiceModalOpen}
                    onClose={() => {
                      setSelectedRejectService(null);
                      dispatch(setRejectServiceModalOpen());
                    }}
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
                        onClick={() => {
                          setSelectedRejectService(null);
                          dispatch(setRejectServiceModalOpen());
                        }}
                        className="btn-primary-gray"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() =>
                          rejectService({
                            technicianId: user.technicianId,
                            bookingID: selectedRejectService,
                            status: false,
                            rejectionReason: reason,
                          })
                        }
                        className="btn-primary-blue bg-red-600"
                      >
                        Reject Service
                      </button>
                    </div>
                  </Modal>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {assignedForTechncianData?.data.length > 0
            ? assignedForTechncianData?.data.map((service) => (
                <TableRow>
                  <TableCell>{service?.bookingID}</TableCell>
                  <TableCell>{service?.customerName}</TableCell>
                  <TableCell>{service?.deviceName}</TableCell>
                  <TableCell>{service?.issue}</TableCell>
                  <TableCell className=" ">
                    {new Date(service?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{service?.street}</TableCell>
                  <TableCell className="flex">
                    <div className="">
                      <button
                        onClick={() => {
                          setSelectedService(service);
                          dispatch(setAcceptServiceModalOpen());
                        }}
                        className="text-xs flex items-center btn-primary-gray"
                      >
                        <FaCheck />
                        Accept
                      </button>
                      <Modal
                        isOpen={acceptServiceModalOpen}
                        onClose={() => {
                          dispatch(setAcceptServiceModalOpen());
                          setSelectedService(null);
                        }}
                        head={`Service Request Details`}
                      >
                        <AcceptService
                          assignedForTechncianRefetch={
                            assignedForTechncianRefetch
                          }
                          serviceDetails={selectedService}
                        />
                      </Modal>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSelectedRejectService(service.bookingID);
                          dispatch(setRejectServiceModalOpen());
                        }}
                        className="bg-red-600 items-center flex text-white border-0 ml-3 text-xs btn-primary-gray"
                      >
                        <RxCross2 />
                        Reject
                      </button>
                      <Modal
                        isOpen={rejectServiceModalOpen}
                        onClose={() => {
                          setSelectedRejectService(null);
                          dispatch(setRejectServiceModalOpen());
                        }}
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
                            onClick={() => {
                              setSelectedRejectService(null);
                              dispatch(setRejectServiceModalOpen());
                            }}
                            className="btn-primary-gray"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() =>
                              rejectService({
                                technicianId: user.technicianId,
                                bookingID: service.bookingID,
                                status: false,
                                rejectionReason: reason,
                              })
                            }
                            className="btn-primary-blue bg-red-600"
                          >
                            Reject Service
                          </button>
                        </div>
                      </Modal>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : "no data"}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssignedTable;

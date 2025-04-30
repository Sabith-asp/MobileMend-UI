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
import { FaCheck, FaLocationArrow } from "react-icons/fa6";
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
import toast from "react-hot-toast";
import { MdNotificationsActive } from "react-icons/md";
import Loader1 from "@/Components/Loader/Loader1";

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

  const showNotificationToast = (service) => {
    toast.custom(
      (t) => (
        <div
          className={`bg-white shadow-2xl border border-gray-300 rounded-xl p-4 w-80 transition-all ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <MdNotificationsActive className="text-2xl text-blue-500" /> New
            Service Assigned!
          </h2>

          <div className="text-sm text-gray-600 mb-3 space-y-1">
            <p>
              <strong>Customer:</strong> {service.customerName}
            </p>
            <p>
              <strong>Device:</strong> {service.deviceName}
            </p>
            <p>
              <strong>Issue:</strong> {service.issue}
            </p>
            <p className="flex items-center gap-1">
              <FaLocationArrow className="text-blue-500" />
              <span>
                <strong>Location:</strong> {service.street},{service.city}
              </span>
            </p>
          </div>

          <div className="flex justify-between mt-3">
            <button
              onClick={() => {
                setSelectedService(service);
                dispatch(setAcceptServiceModalOpen());
                toast.dismiss(t.id);
              }}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              <FaCheck className="text-lg" /> Accept
            </button>
            <button
              onClick={() => {
                setSelectedRejectService(service.bookingID);
                dispatch(setRejectServiceModalOpen());
                toast.dismiss(t.id);
              }}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              <RxCross2 className="text-lg" /> Reject
            </button>
          </div>
        </div>
      ),
      {
        duration: 30000,
      }
    );
  };

  useEffect(() => {
    let signalR;

    if (user?.technicianId) {
      // If user is a technician
      signalR = new SignalRService("technician", user.technicianId);
    } else if (user?.id) {
      // If user is a customer
      signalR = new SignalRService("customer", user.id);
      // 👆 id is optional here, just for structure.
    }

    if (signalR) {
      signalR.startConnection();
      signalR.listenForNotifications((message) => {
        // Show toast or popup
        showNotificationToast(message);
      });
    }

    return () => {
      if (signalR) {
        signalR.stopConnection();
      }
    };
  }, [user]);

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
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                <div className="flex justify-center items-center">
                  <Loader1 />
                </div>
              </TableCell>
            </TableRow>
          ) : assignedForTechncianData?.data.length > 0 ? (
            assignedForTechncianData?.data.map((service) => (
              <TableRow key={service.bookingID}>
                <TableCell>{service?.bookingID}</TableCell>
                <TableCell>{service?.customerName}</TableCell>
                <TableCell>{service?.deviceName}</TableCell>
                <TableCell>{service?.issue}</TableCell>
                <TableCell>
                  {new Date(service?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{service?.street}</TableCell>
                <TableCell className="flex">
                  {/* Accept Button */}
                  <div>
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

                  {/* Reject Button */}
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
                        onChange={(e) => setReason(e.target.value)}
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
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssignedTable;

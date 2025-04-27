import React, { useState } from "react";

import ServiceDetails from "./ServiceDetails";
import SparesDetails from "./SparesDetails";
import CostSummary from "./CostSummary";
import { Textarea } from "@/Components/ui/textarea";
import { useDispatch } from "react-redux";
import { setComplitionSummaryModalOpen } from "@/Redux/Slices/uiSlice";
import { getBookingById } from "@/Api/bookingApi";
import { useQuery } from "@tanstack/react-query";
import Loader1 from "@/Components/Loader/Loader1";
import { notifySparePayment } from "@/Api/technicianApi";
import { StatusBadge } from "@/Components/BookedService/BookedTable";

const ComplitionSummary = ({ selectedBookingId, setSelectedBookingId }) => {
  const dispatch = useDispatch();

  const { data: completedBookingDetail, isLoading } = useQuery({
    queryKey: ["CompletedBookingDetail", selectedBookingId], // unique key
    queryFn: () => getBookingById(selectedBookingId),
    select: (response) => response?.data,
  });
  console.log(completedBookingDetail);

  const notifyForSparePayment = async (bookingId) => {
    try {
      var response = await notifySparePayment(bookingId);
      console.log(response);
      dispatch(setComplitionSummaryModalOpen());
      setSelectedBookingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loader1 />;
  return (
    <div>
      <div className="flex justify-between mt-2">
        <h6>Service - {completedBookingDetail.bookingID}</h6>
        <span className="whitespace-nowrap ">
          <StatusBadge status={completedBookingDetail.bookingStatus} />
        </span>
      </div>
      <ServiceDetails complitionData={completedBookingDetail} />
      <SparesDetails complitionData={completedBookingDetail} />
      <CostSummary complitionData={completedBookingDetail} />
      {completedBookingDetail?.paymentStatus === "Pending" ? (
        <div>
          {/* <div className="mt-2">
            <h6 className="mb-1">Technician notes</h6>
            <Textarea placeholder="Add repair notes" />
          </div> */}
          <div className="py-3 float-end">
            <button
              onClick={() => {
                setSelectedBookingId(null);
                dispatch(setComplitionSummaryModalOpen());
              }}
              className="btn-primary-gray"
            >
              Cancel
            </button>
            <button className="btn-primary-blue text-sm sm:text-sm">
              Notify Customer for Payment
            </button>
          </div>
        </div>
      ) : completedBookingDetail?.paymentStatus === "BookingPaid" &&
        completedBookingDetail.spares.length > 0 ? (
        <div>
          {/* <div className="mt-2">
            <h6 className="mb-1">Technician notes</h6>
            <Textarea placeholder="Add repair notes" />
          </div> */}
          <div className="pt-3 float-end">
            <button
              onClick={() => {
                setSelectedBookingId(null);
                dispatch(setComplitionSummaryModalOpen());
              }}
              className="btn-primary-gray"
            >
              Cancel
            </button>
            <button
              onClick={() => notifyForSparePayment(selectedBookingId)}
              className="btn-primary-blue text-sm sm:text-sm"
            >
              Notify Customer for Spare Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="py-3 float-end">
          <button
            onClick={() => {
              setSelectedBookingId(null);
              dispatch(setComplitionSummaryModalOpen());
            }}
            className="btn-primary-gray"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ComplitionSummary;

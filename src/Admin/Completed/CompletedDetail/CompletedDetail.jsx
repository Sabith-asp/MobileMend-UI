import React, { useState } from "react";

import { Textarea } from "@/Components/ui/textarea";
import ServiceDetails from "@/Technician/Completed/CompletionSummary/ServiceDetails";
import SparesDetails from "@/Technician/Completed/CompletionSummary/SparesDetails";
import CostSummary from "@/Technician/Completed/CompletionSummary/CostSummary";
import Modal from "@/Components/Modal/Modal";
import ProcessRefund from "../ProcessRefund";
import { StatusBadge } from "@/Components/BookedService/BookedTable";

const CompletedDetail = ({ selectedBooking }) => {
  const [isCompleted, setIsCompleted] = useState(true);

  return (
    <div>
      <div className="flex justify-between mt-2">
        <h6>Service {selectedBooking?.bookingID}</h6>
        <StatusBadge status={selectedBooking?.bookingStatus} />

        {/* <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
          Completed
        </span> */}
      </div>
      <ServiceDetails complitionData={selectedBooking} />
      <SparesDetails complitionData={selectedBooking} />
      <CostSummary complitionData={selectedBooking} />
      {/* <div className="mt-2">
        <h6 className="text-secondarygray">Serivce Notes</h6>
        <p className="text-xs">
          Battery replaced and phone is working normally again. Battery health
          is now at 100%.
        </p>
      </div>
      <div className="py-3 float-end">
        <button className="btn-primary-gray">Cancel</button>
        <button
          onClick={() => {
            setviewDetailModal(false);
            setIsRefundModalOpen(true);
          }}
          className="btn-primary-blue bg-red-500 text-sm sm:text-sm"
        >
          Process Refund
        </button>
      </div> */}
    </div>
  );
};

export default CompletedDetail;

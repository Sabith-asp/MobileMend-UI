import React, { useState } from "react";

import ServiceDetails from "./ServiceDetails";
import SparesDetails from "./SparesDetails";
import CostSummary from "./CostSummary";
import { Textarea } from "@/Components/ui/textarea";
import { useDispatch } from "react-redux";
import { setComplitionSummaryModalOpen } from "@/Redux/Slices/uiSlice";

const ComplitionSummary = ({ complitionData, setSelectedViewDetail }) => {
  console.log(complitionData);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex justify-between mt-2">
        <h6>Service #1234</h6>
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
          Completed
        </span>
      </div>
      <ServiceDetails complitionData={complitionData} />
      <SparesDetails complitionData={complitionData} />
      <CostSummary complitionData={complitionData} />
      {complitionData?.paymentStatus == "Unpaid" ? (
        <div className="py-3 float-end">
          <button onClick={""} className="btn-primary-gray">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div className="mt-2">
            <h6 className="mb-1">Technician notes</h6>
            <Textarea placeholder="Add repair notes" />
          </div>
          <div className="py-3 float-end">
            <button
              onClick={() => {
                setSelectedViewDetail(null);
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
      )}
    </div>
  );
};

export default ComplitionSummary;

import React, { useState } from "react";

import ServiceDetails from "./ServiceDetails";
import SparesDetails from "./SparesDetails";
import CostSummary from "./CostSummary";
import { Textarea } from "@/Components/ui/textarea";

const ComplitionSummary = () => {
  const [isCompleted, setIsCompleted] = useState(true);
  return (
    <div>
      <div className="flex justify-between mt-2">
        <h6>Service #1234</h6>
        <span className="whitespace-nowrap text-white text-xs font-medium  bg-green-600 p-1 px-2 rounded-full">
          Completed
        </span>
      </div>
      <ServiceDetails />
      <SparesDetails />
      <CostSummary />
      {isCompleted ? (
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
            <button onClick={""} className="btn-primary-gray">
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

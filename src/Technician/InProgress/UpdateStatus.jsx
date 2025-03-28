import Modal from "@/Components/Modal/Modal";
import React, { useState } from "react";
import ComplitionSummary from "../Completed/CompletionSummary/ComplitionSummary";

const UpdateStatus = ({
  closeUpdateModal,
  statuses,
  setCurrentStatus,
  updateStatus,
  currentStatus,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((status) => (
          <div
            key={status.value}
            onClick={() => setCurrentStatus(status.value)}
            className="flex border border-gray-400 rounded-xl p-2 mt-2 cursor-pointer"
          >
            <input
              type="radio"
              name="serviceStatus"
              value={status.value}
              checked={currentStatus === status.value}
              onChange={(e) => setCurrentStatus(e.target.value)}
            />
            <div className="ml-3">
              <label className="font-semibold">{status.label}</label>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="py-3 float-end">
          <button onClick={closeUpdateModal} className="btn-primary-gray">
            Cancel
          </button>
          <button onClick={updateStatus} className="btn-primary-blue">
            Update Status
          </button>
        </div>
      </div>

      {/* Summary Modal */}
    </div>
  );
};

export default UpdateStatus;

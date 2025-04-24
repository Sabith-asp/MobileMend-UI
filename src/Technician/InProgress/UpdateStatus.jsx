import Modal from "@/Components/Modal/Modal";
import React, { useState } from "react";
import ComplitionSummary from "../Completed/CompletionSummary/ComplitionSummary";
import { useDispatch, useSelector } from "react-redux";
import { setChangeServiceStatusModalOpen } from "@/Redux/Slices/uiSlice";

const UpdateStatus = ({
  updateStatus,
  statuses,
  setCurrentStatus,
  currentStatus,
  setSelectedUpdatingService,
  selectedUpdatingService,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((status) => (
          <div
            key={status.label}
            onClick={() => setCurrentStatus(status.label)}
            className="flex border border-gray-400 rounded-xl p-2 mt-2 cursor-pointer"
          >
            <input
              type="radio"
              name="serviceStatus"
              value={status.label}
              checked={currentStatus === status.label}
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
          <button
            onClick={() => {
              dispatch(setChangeServiceStatusModalOpen());
              setSelectedUpdatingService(null);
            }}
            className="btn-primary-gray"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              updateStatus({
                technicianId: user.technicianId,
                status: currentStatus,
                bookingId: selectedUpdatingService,
              })
            }
            className="btn-primary-blue"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Summary Modal */}
    </div>
  );
};

export default UpdateStatus;

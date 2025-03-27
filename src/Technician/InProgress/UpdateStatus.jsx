import React, { useState } from "react";

const UpdateStatus = ({ closeUpdateModal }) => {
  const [currentStatus, setCurrentStatus] = useState("pending");
  const statuses = [
    { value: "inspecting", label: "Inspecting" },
    { value: "diagnosing", label: "Diagnosing" },
    { value: "ordered_parts", label: "Ordered Parts" },
    { value: "repairing", label: "Repairing" },
    { value: "testing_completed", label: "Testing Completed" },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((status) => (
          <div
            key={status.value}
            onClick={() => setCurrentStatus(status.value)}
            className="flex border border-gray-400 rounded-xl  p-2 mt-2 cursor-pointer"
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
          <button className="btn-primary-blue">Update Status</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;

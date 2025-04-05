import { Textarea } from "@/Components/ui/textarea";
import React, { useState } from "react";

const ProcessRefund = ({ closeRefundModal }) => {
  const [refundReason, setRefundReason] = useState("");
  return (
    <>
      <h6>
        You are about to process a refund for order O-1002 in the amount
        of 2000.
      </h6>
      <h6 className="mt-1">Reason for Rejection</h6>
      <Textarea
        value={refundReason}
        onChange={(e) => {
          setRefundReason(e.target.value);
        }}
        placeholder="Write your reason here..."
        className="w-full h-24 mt-1 border-gray-300 focus:ring-2 focus:ring-blue-500"
      />
      <div className="pt-3 float-end">
        <button onClick={() => closeRefundModal()} className="btn-primary-gray">
          Cancel
        </button>
        <button className="btn-primary-blue bg-red-600">Process Refund</button>
      </div>
    </>
  );
};

export default ProcessRefund;

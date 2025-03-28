import React from "react";
import { FaDollarSign } from "react-icons/fa";

const CostSummary = () => {
  return (
    <div className=" bg-slate-100 p-3 border border-gray-400 rounded-xl mt-2">
      <h6 className="flex items-center font-semibold">
        <FaDollarSign className=" mr-2" /> Cost Summary
      </h6>
      <div className=" mt-1">
        <div className="flex justify-between text-secondarygray">
          <span>Parts Total:</span>
          <span>₹1200</span>
        </div>
        <div className="flex justify-between text-secondarygray">
          <span>Service Fee</span>
          <span>₹3000</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹4200</span>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;

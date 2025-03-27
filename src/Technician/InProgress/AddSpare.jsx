import { Input } from "@/Components/ui/input";
import React, { useState } from "react";

const AddSpare = ({ closeSpareModal }) => {
  const [spares, setSpares] = useState([]);
  return (
    <div>
      <div className="grid grid-cols-12 gap-2  mt-3">
        <div className=" col-span-5">
          <h6>Item Name</h6>
          <Input />
        </div>
        <div className=" col-span-3">
          <h6>Price</h6>
          <Input />
        </div>
        <div className=" col-span-2">
          <h6>Qty</h6>
          <Input />
        </div>
        <div className="  flex items-center col-span-1">
          <button className="p-2 border rounded-xl border-gray-400">Add</button>
        </div>
      </div>
      <div className="py-3 float-end">
        <button onClick={closeSpareModal} className="btn-primary-gray">
          Cancel
        </button>
        <button className="btn-primary-blue">Accept Service</button>
      </div>
    </div>
  );
};

export default AddSpare;

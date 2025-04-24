import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const AddressCard = ({ address, setSelectedAddress, selectedAddress }) => {
  return (
    <div
      onClick={() => setSelectedAddress(address)}
      className={`p-2 border flex border-gray-400 hover:shadow-xl rounded-xl mt-3 ${
        selectedAddress?.addressID == address?.addressID &&
        "border-primaryblue border-[2px]"
      }`}
    >
      <IoLocationOutline className="text-xl" />
      <div className="text-secondarygray flex flex-col ml-2">
        <span className="text-sm"> {address?.addressDetail}</span>

        <span className="text-sm">{address?.street}</span>
        <span className="text-sm">{address?.pincode}</span>
      </div>
    </div>
  );
};

export default AddressCard;

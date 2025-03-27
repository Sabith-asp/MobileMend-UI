import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const AddressCard = ({ address }) => {
  return (
    <div className="p-2 border flex border-gray-400 hover:border-primaryblue hover:shadow-xl rounded-xl mt-3">
      <IoLocationOutline className="text-xl" />
      <div className="text-secondarygray flex flex-col ml-2">
        <span className="text-sm"> {address.address}</span>

        <span className="text-sm">{address.street}</span>
        <span className="text-sm">{address.pincode}</span>
      </div>
    </div>
  );
};

export default AddressCard;

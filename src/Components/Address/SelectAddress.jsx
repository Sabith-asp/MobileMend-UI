import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import AddressCard from "./AddressCard";

const SelectAddress = () => {
  const addresses = [
    {
      address: "123 Main St",
      street: "Downtown",
      pincode: "560001",
    },
    {
      address: "456 Elm St",
      street: "Suburb",
      pincode: "110045",
    },
    {
      address: "789 Oak St",
      street: "City Center",
      pincode: "400001",
    },
  ];
  return (
    <div>
      <p className="text-secondarygray">
        Choose your preferred service address or add a new one.
      </p>
      {addresses.length < 1 ? (
        <div className="mx-auto my-7 flex justify-center items-center">
          <span className="text-secondarygray">
            You haven't added any addresses yet.
          </span>
        </div>
      ) : (
        addresses.map((address) => <AddressCard address={address} />)
      )}

      <button className="flex items-center float-end btn-primary-blue mt-3">
        <FaPlus />
        <span className="ml-2">Add Address</span>
      </button>
    </div>
  );
};

export default SelectAddress;

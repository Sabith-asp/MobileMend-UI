import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import AddressCard from "./AddressCard";
import Modal from "../Modal/Modal";
import AddAddress from "./AddAddress";
import { useDispatch } from "react-redux";
import { setAddAdressModal } from "@/Redux/Slices/uiSlice";
import { getAddress } from "@/Api/addressApi";
import { add } from "date-fns";

const SelectAddress = ({ addresses, selectedAddress, setSelectedAddress }) => {
  console.log(addresses);

  const dispatch = useDispatch();
  return (
    <div>
      <p className="text-secondarygray">
        Choose your preferred service address or add a new one.
      </p>
      {addresses?.length < 1 ? (
        <div className="mx-auto my-7 flex justify-center items-center">
          <span className="text-secondarygray">
            You haven't added any addresses yet.
          </span>
        </div>
      ) : (
        addresses?.map((address) => (
          <AddressCard
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
            key={address.addressID}
            address={address}
          />
        ))
      )}

      <button
        onClick={() => dispatch(setAddAdressModal())}
        className="flex items-center text-sm float-end btn-primary-blue mt-3"
      >
        <FaPlus />
        <span className="ml-2">Add Address</span>
      </button>
    </div>
  );
};

export default SelectAddress;

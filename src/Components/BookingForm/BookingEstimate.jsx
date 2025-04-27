import { getBookingEstimate } from "@/Api/bookingApi";
import {
  setBookingEstimateModal,
  setPaymentSuccessModalOpen,
  setSelectTechnicianModalOpen,
} from "@/Redux/Slices/uiSlice";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTimes, FaMoneyBillWave, FaRoute, FaCar } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { MdLocationOn } from "react-icons/md";
import { useDispatch } from "react-redux";
import Loader1 from "../Loader/Loader1";
import { useNavigate } from "react-router-dom";

const BookingEstimate = ({
  selectAddressId,
  selectedTechnicianID,
  selectedServiceId,
  formik,
}) => {
  console.log("selectedtechnician", selectedTechnicianID);
  console.log("selected address is", selectAddressId);

  const {
    data: bookingEstimate,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookingEstimate", selectedTechnicianID], // unique key
    queryFn: () =>
      getBookingEstimate(
        selectedTechnicianID,
        selectAddressId,
        selectedServiceId
      ),
  });

  console.log("booking estimate", bookingEstimate);

  const dispatch = useDispatch();

  if (isLoading) return <Loader1 />;
  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <FaMoneyBillWave className="text-green-600" />
        <h6 className="text-gray-700 font-medium">
          Booking Charge: ₹{bookingEstimate?.data?.bookingCharge}
        </h6>
      </div>
      <div className="flex items-center gap-3">
        <GrUserWorker className="text-green-600" />
        <h6 className="text-gray-700 font-medium">
          Service Charge: ₹{bookingEstimate?.data?.serviceCharge}
        </h6>
      </div>

      <div className="flex items-center gap-3">
        <FaCar className="text-blue-600" />
        <h6 className="text-gray-700 font-medium">
          Travel Allowance: ₹{bookingEstimate?.data?.travelAllowance}
        </h6>
      </div>

      <div className="flex items-center gap-3">
        <MdLocationOn className="text-red-500" />
        <h6 className="text-gray-700 font-medium">
          Total Distance: {bookingEstimate?.data?.totalDistance} km
        </h6>
      </div>

      <div className="flex items-center gap-3">
        <FaRoute className="text-purple-500" />
        <h6 className="text-gray-800 font-semibold">
          Total Cost: ₹{bookingEstimate?.data?.totalCost}
        </h6>
      </div>
      <div className="flex float-end mt-3 text-sm">
        <button className="btn-primary-gray">Cancel</button>
        <button
          className="btn-primary-blue"
          onClick={() => {
            formik.setFieldValue("addressID", selectAddressId);
            formik.setFieldValue("technicianID", selectedTechnicianID);
            formik.handleSubmit();
            dispatch(setBookingEstimateModal());
            dispatch(setSelectTechnicianModalOpen());
            dispatch(setPaymentSuccessModalOpen());
            setTimeout(() => {
              dispatch(setPaymentSuccessModalOpen());
            }, 500);
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default BookingEstimate;

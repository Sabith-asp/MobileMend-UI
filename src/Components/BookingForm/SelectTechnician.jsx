import React, { useState } from "react";
import { RiUserLocationFill } from "react-icons/ri";
import { FaStar, FaTools } from "react-icons/fa";
import { MdWork, MdAssignmentTurnedIn } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setBookingEstimateModal } from "@/Redux/Slices/uiSlice";
import {
  findTechnicianAutomatically,
  getNearestBestTechnicians,
} from "@/Api/bookingApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader1 from "../Loader/Loader1";

const SelectTechnician = ({
  selectedTechnicianID,
  setSelectedTechnicianID,
  selectedDeviceID,
  selectedAddressID,
}) => {
  const [selectTechnicianAuto, setSelectTechnicianAuto] = useState(false);
  const dispatch = useDispatch();

  console.log(selectedDeviceID, selectedAddressID);

  const handleTechSelect = (tech) => {
    setSelectedTechnicianID(tech.technicianID);
    setSelectTechnicianAuto(false);
  };

  const handleSubmitTechnician = async () => {
    console.log("technician submit");

    if (selectTechnicianAuto) {
      try {
        const { data } = await findTechnicianAutomatically(
          selectedAddressID,
          selectedDeviceID
        );

        const autoSelectedTechID = data?.technicianID;
        setSelectedTechnicianID(autoSelectedTechID);
        setTimeout(() => {
          dispatch(setBookingEstimateModal());
        }, 100);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error selecting technician"
        );
      }
    } else if (selectedTechnicianID != null) {
      dispatch(setBookingEstimateModal());
    }
  };

  const { data: bestNearestTechnicians, isLoading } = useQuery({
    queryKey: ["bestTechnicians"],
    queryFn: () =>
      getNearestBestTechnicians(selectedDeviceID, selectedAddressID),
  });

  return (
    <div>
      <div
        onClick={() => {
          setSelectTechnicianAuto((prev) => !prev);
          setSelectedTechnicianID(null);
        }}
        className={`${
          selectTechnicianAuto ? "border-primaryblue border-[2px]" : ""
        } border border-gray-400 p-2 mt-2 min-h-20 rounded-xl flex flex-col justify-center items-center`}
      >
        <RiUserLocationFill className="text-3xl text-gray-600" />
        <h6 className="text-gray-600">Select technician automatically</h6>
      </div>
      <div className="mt-2 ">
        <h6 className="font-medium mb-2">Best Nearest Technicians</h6>

        {isLoading ? (
          <div className="text-center p-5">
            <Loader1 />
          </div>
        ) : bestNearestTechnicians?.data?.length === 0 ? (
          <h6>No available nearest technician</h6>
        ) : (
          bestNearestTechnicians?.data?.map((tech) => (
            <div
              key={tech.technicianID}
              onClick={() => handleTechSelect(tech)}
              className={`cursor-pointer border p-4 rounded-xl mb-3 shadow-sm hover:shadow-md transition ${
                selectedTechnicianID === tech.technicianID
                  ? "border-primaryblue border-2"
                  : "border-gray-400"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <h6 className="text-lg font-semibold text-gray-800">
                  {tech.technicianName}
                </h6>
                <div className="flex items-center ">
                  <FaStar className="mr-1 text-yellow-500" />
                  <span>{tech.rating}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <MdWork className="text-blue-500" />
                  <span>Experience: {tech.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTools className="text-green-600" />
                  <span>Specialization: {tech.specialization}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdAssignmentTurnedIn className="text-purple-600" />
                  <span>Jobs Completed: {tech.completedJobs}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {}
      </div>
      <div className="py-3 float-end">
        <button type="button" className="btn-primary-gray">
          Cancel
        </button>
        <button
          className={`btn-primary-blue ${
            !selectTechnicianAuto &&
            selectedTechnicianID == null &&
            "bg-blue-400"
          }`}
          onClick={() => handleSubmitTechnician()}
          disabled={!selectTechnicianAuto && selectedTechnicianID == null}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default SelectTechnician;

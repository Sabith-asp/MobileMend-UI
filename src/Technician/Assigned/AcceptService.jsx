import { updateServiceRequest } from "@/Api/technicianApi";
import { Textarea } from "@/Components/ui/textarea";
import {
  setAcceptServiceModalOpen,
  setRejectServiceModalOpen,
} from "@/Redux/Slices/uiSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AcceptService = ({ serviceDetails, assignedForTechncianRefetch }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [serviceType, setServiceType] = useState("onsite");
  const [reason, setReason] = useState("");

  const acceptService = async (data) => {
    try {
      const response = await updateServiceRequest(data);
      console.log(response);
      assignedForTechncianRefetch();
      dispatch(setAcceptServiceModalOpen());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" ">
      <p className="text-secondarygray">
        Review service details and choose repair type
      </p>

      <div className="mt-3">
        <h6 className="text-lg font-medium">Customer Information</h6>
        <div className="grid grid-cols-2">
          <div>
            <h6 className="text-secondarygray">Name</h6>
            <h6 className="mt-1">{serviceDetails?.customerName}</h6>
          </div>
          <div>
            <h6 className="text-secondarygray">Location</h6>
            <h6 className="mt-1">{serviceDetails?.street}</h6>
          </div>
          <div>
            <h6 className="text-secondarygray">Email</h6>
            <h6 className="mt-1">{serviceDetails?.email}</h6>
          </div>
          <div>
            <h6 className="text-secondarygray">Phone</h6>
            <h6 className="mt-1">{serviceDetails?.phone}</h6>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h6 className="text-lg font-medium">Device Information</h6>
        <div className="grid grid-cols-2">
          <div>
            <h6 className="text-secondarygray">Device</h6>
            <h6 className="mt-1">{serviceDetails?.deviceName}</h6>
          </div>
          <div>
            <h6 className="text-secondarygray">Issue</h6>
            <h6 className="mt-1">{serviceDetails?.serviceName}</h6>
          </div>
        </div>
        <div>
          <h6 className="text-secondarygray">Description</h6>
          <h6 className="mt-1 text-xs">{serviceDetails?.issue}</h6>
        </div>
      </div>
      <div className="mt-3">
        <h6 className="text-lg font-medium">Repair Type</h6>
        <div
          onClick={() => setServiceType("onsite")}
          className={`flex border border-gray-400 rounded-xl p-2 mt-2 ${
            serviceType === "onsite" && "border-[3px] border-primaryblue"
          }`}
        >
          <input
            type="radio"
            name="serviceType"
            value="onsite"
            checked={serviceType === "onsite"}
            onChange={(e) => setServiceType(e.target.value)}
          />
          <div className="ml-3 ">
            <label className="font-semibold">Onsite</label>
            <p className="text-secondarygray">
              Technician will visit customer location
            </p>
          </div>
        </div>

        {/* <div
          onClick={() => setServiceType("offsite")}
          className="flex border border-gray-400 rounded-xl p-2 mt-2"
        >
          <input
            type="radio"
            name="serviceType"
            value="offsite"
            checked={serviceType === "offsite"}
            onChange={(e) => setServiceType(e.target.value)}
          />
          <div className="ml-3">
            <label className="font-semibold">Offsite</label>
            <p className="text-secondarygray">
              Device will be repaired at service center{" "}
            </p>
          </div>
        </div> */}
        {/* {serviceType == "offsite" && (
          <>
            <h6 className="mt-1">Reason for Off-site Repair</h6>
            <Textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
              }}
              placeholder="Write your reason here..."
              className="w-full h-24 mt-3 border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </>
        )} */}
        <div className="py-3 float-end">
          <button
            onClick={() => {
              dispatch(setAcceptServiceModalOpen());
              setSelectedService(null);
            }}
            className="btn-primary-gray"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              acceptService({
                technicianId: user.technicianId,
                bookingID: serviceDetails.bookingID,
                status: true,
              })
            }
            className="btn-primary-blue"
          >
            Accept Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptService;

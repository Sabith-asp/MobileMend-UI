import { deleteDevice } from "@/Api/deviceApi";
import {
  setDeviceDeleteModalOpen,
  setServiceDeleteModalOpen,
} from "@/Redux/Slices/uiSlice";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteDevice = ({
  setselectedDeviceId,
  selectedDeviceId,
  adminDeviceDataRefetch,
}) => {
  const dispatch = useDispatch();

  const deleteDevices = async (deviceId) => {
    try {
      const response = await deleteDevice(deviceId);
      console.log(response);
      dispatch(setDeviceDeleteModalOpen());

      adminDeviceDataRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h6 className="font-bold mt-2">Are you sure?</h6>
      <p className="mt-2 text-sm">
        This action cannot be undone. This will permanently delete it from the
        system.
      </p>
      <div className="py-3 float-end">
        <button
          onClick={() => {
            dispatch(setDeviceDeleteModalOpen());
            setselectedDeviceId(null);
          }}
          type="button"
          className="btn-primary-gray"
        >
          Cancel
        </button>
        <button
          onClick={() => deleteDevices(selectedDeviceId)}
          className="btn-primary-red ml-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteDevice;

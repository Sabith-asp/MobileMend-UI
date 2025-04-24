import { deleteServices } from "@/Api/serviceApi";
import { setServiceDeleteModalOpen } from "@/Redux/Slices/uiSlice";
import React from "react";
import { useDispatch } from "react-redux";

const DeleteService = ({
  adminServiceDataRefetch,
  selectedServiceID,
  setselectedServiceID,
}) => {
  const dispatch = useDispatch();

  const deleteService = async (serviceId) => {
    try {
      const response = await deleteServices(serviceId);
      console.log(response);
      adminServiceDataRefetch();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setServiceDeleteModalOpen());
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
            dispatch(setServiceDeleteModalOpen());
            setselectedServiceID(null);
          }}
          type="button"
          className="btn-primary-gray"
        >
          Cancel
        </button>
        <button
          onClick={() => deleteService(selectedServiceID)}
          className="btn-primary-red ml-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteService;

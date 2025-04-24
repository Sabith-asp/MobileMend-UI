import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/Components/ui/input";
import {
  MdOutlineHome,
  MdLocationCity,
  MdOutlinePinDrop,
  MdOutlinePlace,
  MdOutlineLocationOn,
} from "react-icons/md";
import MapSelector from "../Maps/MapSelector";
import { addAddress } from "@/Api/addressApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAddAdressModal } from "@/Redux/Slices/uiSlice";

const AddAddress = ({ refetch }) => {
  const [positions, setPositions] = useState({
    longitude: null,
    latitude: null,
  });
  const dispatch = useDispatch();
  console.log(positions);

  const initialValues = {
    addressDetail: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  };

  const validationSchema = Yup.object({
    addressDetail: Yup.string().required("Address Name is required"),
    street: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pin Code must be 6 digits")
      .required("Zip Code is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { latitude, longitude } = positions;
    if (latitude == null || longitude == null) {
      toast.error("Select location from map");
      return;
    }

    console.log("Form Submitted:", { longitude, latitude, ...values });
    try {
      const response = await addAddress({ longitude, latitude, ...values });
      setSubmitting(false);
      resetForm();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setAddAdressModal());
      refetch();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <p className="text-gray-600">
            Choose your preferred service address or add a new one.
          </p>

          {/* Address Name */}
          <div>
            <h6 className="flex items-center text-sm mt-1">
              <MdOutlineHome className="mr-2" />
              Address Name
            </h6>
            <Field as={Input} name="addressDetail" className="mt-1" />
            <ErrorMessage
              name="addressDetail"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Street Address */}
          <div>
            <h6 className="flex items-center text-sm mt-1">
              <MdOutlineLocationOn className="mr-2" />
              Street Address
            </h6>
            <Field as={Input} name="street" className="mt-1" />
            <ErrorMessage
              name="street"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* City */}
            <div>
              <h6 className="flex items-center text-sm">
                <MdLocationCity className="mr-2" />
                City
              </h6>
              <Field as={Input} name="city" className="mt-1" />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* State */}
            <div>
              <h6 className="flex items-center text-sm">
                <MdOutlinePlace className="mr-2" />
                State
              </h6>
              <Field as={Input} name="state" className="mt-1" />
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>

          {/* Zip Code */}
          <div>
            <h6 className="flex items-center text-sm mt-1">
              <MdOutlinePinDrop className="mr-2" />
              Zip Code
            </h6>
            <Field as={Input} name="pincode" className="mt-1" />
            <ErrorMessage
              name="pincode"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <h6 className="text-sm">Select Location From Map</h6>
          <MapSelector positions={positions} setPositions={setPositions} />

          {/* Buttons */}
          <div className="py-3 float-end">
            <button type="button" className="btn-primary-gray">
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddAddress;

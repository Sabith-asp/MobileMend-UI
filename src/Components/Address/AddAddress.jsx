import React from "react";
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

const AddAddress = () => {
  const initialValues = {
    addressName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  };

  const validationSchema = Yup.object({
    addressName: Yup.string().required("Address Name is required"),
    street: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Zip Code must be 5 digits")
      .required("Zip Code is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Form Submitted:", values);
    setSubmitting(false);
    resetForm();
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
            <Field as={Input} name="addressName" className="mt-1" />
            <ErrorMessage
              name="addressName"
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
            <Field as={Input} name="zipCode" className="mt-1" />
            <ErrorMessage
              name="zipCode"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

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

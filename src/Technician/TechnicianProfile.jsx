import { Input } from "@/Components/ui/input";
import React from "react";
import { FiUser } from "react-icons/fi";
import {
  MdOutlineLocationOn,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TechnicianProfile = () => {
  const initialValues = {
    fullName: "",
    location: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    location: Yup.string().required("Location is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form Submitted:", values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-3">
          {/* Full Name */}
          <div>
            <h6 className="flex items-center text-sm">
              <FiUser className="mr-1" />
              Full Name
            </h6>
            <Field as={Input} name="fullName" className="mt-1" />
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Location */}
          <div>
            <h6 className="flex items-center text-sm">
              <MdOutlineLocationOn className="mr-1" />
              Location
            </h6>
            <Field as={Input} name="location" className="mt-1" />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Email */}
          <div>
            <h6 className="flex items-center text-sm">
              <MdOutlineEmail className="mr-1" />
              Email
            </h6>
            <Field as={Input} type="email" name="email" className="mt-1" />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Phone */}
          <div>
            <h6 className="flex items-center text-sm">
              <MdOutlinePhone className="mr-1" />
              Phone
            </h6>
            <Field as={Input} type="tel" name="phone" className="mt-1" />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 float-end">
            <button type="button" className="btn-primary-gray">
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-blue"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TechnicianProfile;

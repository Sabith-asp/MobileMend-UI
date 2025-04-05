import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

const TechnicianForm = () => {
  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    rating: "",
    bio: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    specialization: Yup.string().required("Specialization is required"),
    experience: Yup.number()
      .typeError("Experience must be a number")
      .min(0, "Experience cannot be negative")
      .required("Experience is required"),
    rating: Yup.number()
      .typeError("Rating must be a number")
      .min(1, "Minimum rating is 1")
      .max(5, "Maximum rating is 5")
      .required("Rating is required"),
    bio: Yup.string().required("Bio/About is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Technician Added:", values);
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
          {/* Full Name */}
          <div>
            <h6 className="text-sm mt-1">Full Name</h6>
            <Field as={Input} name="fullName" className="mt-1" />
            <ErrorMessage
              name="fullName"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* Email */}
            <div>
              <h6 className="text-sm mt-1">Email</h6>
              <Field as={Input} name="email" type="email" className="mt-1" />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Phone */}
            <div>
              <h6 className="text-sm mt-1">Phone</h6>
              <Field as={Input} name="phone" className="mt-1" />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>
          {/* Specialization */}
          <div>
            <h6 className="text-sm mt-1">Specialization (comma-separated)</h6>
            <Field as={Input} name="specialization" className="mt-1" />
            <ErrorMessage
              name="specialization"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Experience & Rating */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h6 className="text-sm">Experience (years)</h6>
              <Field
                as={Input}
                name="experience"
                type="number"
                className="mt-1"
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <h6 className="text-sm">Rating (1-5)</h6>
              <Field as={Input} name="rating" type="number" className="mt-1" />
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>

          {/* Bio/About */}
          <div>
            <h6 className="text-sm mt-1">Bio / About</h6>
            <Field as={Textarea} name="bio" className="mt-1" />
            <ErrorMessage
              name="bio"
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
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TechnicianForm;

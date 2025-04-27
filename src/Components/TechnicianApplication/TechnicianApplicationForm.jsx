import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { technicianApplication } from "@/Api/technicianApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function TechnicianApplicationForm() {
  const { user } = useSelector((state) => state.user);
  if (user?.role !== "User") return <Navigate to="/" />;

  const initialValues = {
    Experience: "",
    Specialization: "",
    Place: "",
    Bio: "",
    Resume: null,
  };

  const validationSchema = Yup.object({
    Experience: Yup.number()
      .typeError("Must be a number")
      .required("Experience is required"),
    Specialization: Yup.string().required("Specialization is required"),
    Place: Yup.string().required("Place is required"),
    Bio: Yup.string().required("Bio section is required"),
    Resume: Yup.mixed()
      .required("Resume file is required")
      .test("fileSize", "File too large", (value) => {
        return value && value.size <= 5 * 1024 * 1024; // 5MB limit
      })
      .test("fileType", "Unsupported file format", (value) => {
        return (
          value &&
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(value.type)
        );
      }),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("Experience", values.Experience);
    formData.append("Specialization", values.Specialization);
    formData.append("Place", values.Place);
    formData.append("Bio", values.Bio);
    formData.append("Resume", values.Resume);

    try {
      const response = await technicianApplication(formData);
      console.log(response);
      toast.success("Application submitted successfully!"); // 👈 success toast
      resetForm(); // 👈 clear form after successful submission
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false); // 👈 stop loading
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">🧑‍🔧 Technician Application</h2>
      <p className="mb-6 text-sm text-gray-600">
        Apply to join our team of professional repair technicians
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Professional Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Professional Information
              </h3>
              <div className="space-y-4">
                <Field
                  type="number"
                  name="Experience"
                  placeholder="How many years of repair experience do you have?"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="Experience"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <Field
                  type="text"
                  name="Specialization"
                  placeholder="e.g. Smartphone Repair, Laptop Repair"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="Specialization"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <Field
                  type="text"
                  name="Place"
                  placeholder="Place (e.g. City or Town)"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="Place"
                  component="div"
                  className="text-red-600 text-xs"
                />

                <Field
                  as="textarea"
                  name="Bio"
                  rows="4"
                  placeholder="Tell us about yourself and your experience"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="Bio"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Documents</h3>
              <div className="space-y-4">
                <label
                  htmlFor="Resume"
                  className="cursor-pointer bg-gray-300 px-10 py-6 rounded-[20px] border-2 border-dashed border-gray-700 flex items-center justify-center"
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <FaCloudUploadAlt
                      size={40}
                      className="text-gray-700 mb-2"
                    />
                    <p>Click to upload Resume</p>
                  </div>
                  <input
                    id="Resume"
                    name="Resume"
                    type="file"
                    className="hidden"
                    onChange={(event) =>
                      setFieldValue("Resume", event.currentTarget.files[0])
                    }
                  />
                </label>

                <ErrorMessage
                  name="Resume"
                  component="div"
                  className="text-red-600 text-xs"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-2xl text-white ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primaryblue hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

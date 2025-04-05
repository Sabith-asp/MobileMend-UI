import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

const DeviceForm = () => {
  const initialValues = {
    brand: "",
    type: "",
    model: "",
    yearReleased: "",
    repairableComponents: "",
    commonIssues: "",
  };

  const validationSchema = Yup.object({
    brand: Yup.string().required("Brand is required"),
    type: Yup.string().required("Type is required"),
    model: Yup.string().required("Model is required"),
    yearReleased: Yup.number()
      .typeError("Year must be a number")
      .required("Year Released is required"),
    repairableComponents: Yup.string().required(
      "Repairable Components are required"
    ),
    commonIssues: Yup.string().required("Common Issues are required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Device Added:", values);
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
          {/* Brand */}
          <div className="grid grid-cols-2 gap-2">
            {" "}
            <div>
              <h6 className="text-sm mt-1">Brand</h6>
              <Field as={Input} name="brand" className="mt-1" />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            {/* Type */}
            <div>
              <h6 className="text-sm mt-1">Type</h6>
              <Field as={Input} name="type" className="mt-1" />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Model */}
            <div>
              <h6 className="text-sm">Model</h6>
              <Field as={Input} name="model" className="mt-1" />
              <ErrorMessage
                name="model"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Year Released */}
            <div>
              <h6 className="text-sm">Year Released</h6>
              <Field
                as={Input}
                name="yearReleased"
                type="number"
                className="mt-1"
              />
              <ErrorMessage
                name="yearReleased"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>

          {/* Repairable Components */}
          <div>
            <h6 className="text-sm mt-1">
              Repairable Components (comma separated)
            </h6>
            <Field as={Textarea} name="repairableComponents" className="mt-1" />
            <ErrorMessage
              name="repairableComponents"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Common Issues */}
          <div>
            <h6 className="text-sm mt-1">Common Issues (comma separated)</h6>
            <Field as={Textarea} name="commonIssues" className="mt-1" />
            <ErrorMessage
              name="commonIssues"
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

export default DeviceForm;

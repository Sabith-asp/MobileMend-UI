import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

const AddServiceForm = () => {
  const initialValues = {
    serviceName: "",
    description: "",
    price: "",
    estimatedTime: "",
    category: "",
    isPopular: false,
  };

  const validationSchema = Yup.object({
    serviceName: Yup.string().required("Service Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    estimatedTime: Yup.string().required("Estimated Time is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Service Added:", values);
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
          {/* Service Name */}
          <div>
            <h6 className="text-sm mt-1">Service Name</h6>
            <Field as={Input} name="serviceName" className="mt-1" />
            <ErrorMessage
              name="serviceName"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          {/* Description */}
          <div>
            <h6 className="text-sm mt-1">Description</h6>
            <Field as={Textarea} name="description" className="mt-1" />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Price */}
            <div>
              <h6 className="text-sm">Price</h6>
              <Field as={Input} name="price" type="number" className="mt-1" />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Estimated Time */}
            <div>
              <h6 className="text-sm">Estimated Time</h6>
              <Field as={Input} name="estimatedTime" className="mt-1" />
              <ErrorMessage
                name="estimatedTime"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Category */}
            <div>
              <h6 className="text-sm mt-1">Category</h6>
              <Field as={Input} name="category" className="mt-1" />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Mark as Popular */}
            <div className="flex items-center mt-7">
              <Field type="checkbox" name="isPopular" className="mr-2" />
              <h6 className="text-sm">Mark as Popular</h6>
            </div>
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

export default AddServiceForm;

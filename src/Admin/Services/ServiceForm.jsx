import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { addService, getServices, updateService } from "@/Api/serviceApi";
import { useDispatch } from "react-redux";
import { setAddEditServiceModalOpen } from "@/Redux/Slices/uiSlice";

const AddServiceForm = ({
  selectedServiceID,
  setselectedServiceID,
  adminServiceDataRefetch,
}) => {
  const { data: serviceByIdData, isLoading } = useQuery({
    queryKey: ["serviceById", selectedServiceID],
    queryFn: () => getServices({ serviceId: selectedServiceID }),
    enabled: !!selectedServiceID, // don't run if ID is null
    select: (data) => data?.data?.[0], // assuming your API returns an array
  });

  const dispatch = useDispatch();

  console.log(serviceByIdData);

  const validationSchema = Yup.object({
    serviceName: Yup.string().required("Service Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    estimatedTime: Yup.string().required("Estimated Time is required"),
    category: Yup.string().required("Category is required"),
  });

  console.log(selectedServiceID);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (selectedServiceID) {
        const response = await updateService({
          ...values,
          serviceId: selectedServiceID,
        });
        return;
      }
      const response = await addService(values);

      console.log(response);
      adminServiceDataRefetch();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      dispatch(setAddEditServiceModalOpen());
      setselectedServiceID(null);
      resetForm();
    }
  };

  if (isLoading && selectedServiceID) return <p>Loading...</p>;

  const initialValues = {
    serviceName: serviceByIdData?.serviceName || "",
    description: serviceByIdData?.description || "",
    price: serviceByIdData?.price || "",
    estimatedTime: serviceByIdData?.estimatedTime || "",
    category: serviceByIdData?.category || "",
    isPopular: serviceByIdData?.isPopular || false,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {/* Form Fields (same as before) */}
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
            <button
              type="button"
              onClick={() => {
                dispatch(setAddEditServiceModalOpen());
                setselectedServiceID(null);
              }}
              className="btn-primary-gray"
            >
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

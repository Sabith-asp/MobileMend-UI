import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { addDevice, getDevices, updateDevice } from "@/Api/deviceApi";
import { useDispatch } from "react-redux";
import { setDeviceManagementModalOpen } from "@/Redux/Slices/uiSlice";

const DeviceForm = ({
  adminDeviceDataRefetch,
  selectedDeviceId,
  setselectedDeviceId,
}) => {
  const { data: deviceByIdData, isLoading } = useQuery({
    queryKey: ["deviceById", selectedDeviceId],
    queryFn: () => getDevices({ deviceId: selectedDeviceId }),
    enabled: !!selectedDeviceId,
    select: (data) => data?.data?.[0],
  });
  const dispatch = useDispatch();
  console.log(selectedDeviceId);

  const initialValues = {
    deviceName: deviceByIdData?.deviceName || "",
    brand: deviceByIdData?.brand || "",
    deviceType: deviceByIdData?.deviceType || "",
    model: deviceByIdData?.model || "",
    releaseYear: deviceByIdData?.releaseYear || "",
    repairableComponents: deviceByIdData?.repairableComponents || "",
    commonIssues: deviceByIdData?.commonIssues || "",
  };

  const validationSchema = Yup.object({
    brand: Yup.string().required("Brand is required"),
    deviceType: Yup.string().required("Type is required"),
    deviceName: Yup.string().required("Name is required"),
    model: Yup.string().required("Model is required"),
    releaseYear: Yup.number()
      .typeError("Year must be a number")
      .required("Year Released is required"),
    repairableComponents: Yup.string().required(
      "Repairable Components are required"
    ),
    commonIssues: Yup.string().required("Common Issues are required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (selectedDeviceId) {
        const response = await updateDevice({
          ...values,
          deviceid: selectedDeviceId,
        });
        console.log(response);
        return;
      }
      const response = await addDevice(values);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      adminDeviceDataRefetch();
      dispatch(setDeviceManagementModalOpen());
      setselectedDeviceId(null);
    }

    setSubmitting(false);
    resetForm();
  };

  if (selectedDeviceId && isLoading) return <p>Loading...</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h6 className="text-sm mt-1">Brand</h6>
              <Field as={Input} name="brand" className="mt-1" />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div>
              <h6 className="text-sm mt-1">Type</h6>
              <Field as={Input} name="deviceType" className="mt-1" />
              <ErrorMessage
                name="deviceType"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div>
              <h6 className="text-sm mt-1">Name</h6>
              <Field as={Input} name="deviceName" className="mt-1" />
              <ErrorMessage
                name="deviceName"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div>
              <h6 className="text-sm mt-1">Model</h6>
              <Field as={Input} name="model" className="mt-1" />
              <ErrorMessage
                name="model"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <h6 className="text-sm">Year Released</h6>
              <Field
                as={Input}
                name="releaseYear"
                type="number"
                className="mt-1"
              />
              <ErrorMessage
                name="releaseYear"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
          </div>

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

          <div>
            <h6 className="text-sm mt-1">Common Issues (comma separated)</h6>
            <Field as={Textarea} name="commonIssues" className="mt-1" />
            <ErrorMessage
              name="commonIssues"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div className="py-3 float-end space-x-2">
            <button
              type="button"
              className="btn-primary-gray"
              onClick={() => setselectedDeviceId(null)}
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

export default DeviceForm;

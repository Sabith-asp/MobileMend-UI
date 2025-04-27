import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Calendar } from "@/Components/ui/calendar";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiSmartphone } from "react-icons/fi";
import { MdLaptopMac, MdMonitor } from "react-icons/md";
import { FaTabletAlt } from "react-icons/fa";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "../Address/AddressCard";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import SelectAddress from "../Address/SelectAddress";
import AddAddress from "../Address/AddAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddAdressModal,
  setAddressModal,
  setBookingEstimateModal,
  setPaymentSuccessModalOpen,
  setSelectTechnicianModalOpen,
} from "@/Redux/Slices/uiSlice";
import { useQuery } from "@tanstack/react-query";
import { getAddress } from "@/Api/addressApi";
import { getDevices } from "@/Api/deviceApi";
import { getServices } from "@/Api/serviceApi";
import BookingEstimate from "./BookingEstimate";
import SelectTechnician from "./SelectTechnician";
import PaymentSuccess from "./PaymentSuccess";
import { bookService } from "@/Api/bookingApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const dispatch = useDispatch();
  const {
    selectAdressModalOpen,
    addAddressModalOpen,
    bookingEstimateModalOpen,
    selectTechnicianModalOpen,
    paymentSuccessModalOpen,
  } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.user);
  const [selectedTechnicianID, setSelectedTechnicianID] = useState(null);
  console.log(selectedTechnicianID);
  const [selectedServiceId, setSelectedServiceId] = useState();
  console.log(selectedServiceId);

  const {
    data: addressData,
    isLoading,
    isError,
    error,
    refetch: addressRefetch,
  } = useQuery({
    queryKey: ["addresses"], // unique key
    queryFn: getAddress,
  });

  const { data: deviceData } = useQuery({
    queryKey: ["devices"], // unique key
    queryFn: getDevices,
  });

  const { data: serviceData } = useQuery({
    queryKey: ["serivces"], // unique key
    queryFn: getServices,
  });

  console.log(serviceData);

  console.log("selected technician id from booking form", selectedTechnicianID);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "booking-from") {
      const element = document.getElementById("booking-from");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.state]);

  useEffect(() => {
    if (addressData?.data?.length > 0) {
      setSelectedAddress(addressData.data[0]);
    }
  }, [addressData]);

  const [selectedAddress, setSelectedAddress] = useState(
    addressData?.data[0] || null
  );
  const [selectedDeviceID, setSelectedDeviceID] = useState(null);
  console.log(selectedDeviceID);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      issue: "",
      addressID: selectedAddress?.addressID,
      deviceID: "",
      serviceID: "",
      technicianID: selectedTechnicianID,
    },
    validationSchema: Yup.object({
      deviceID: Yup.string().required("Select device"),
      serviceID: Yup.string().required("Select service"),
      issue: Yup.string().required("Please describe your issue"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);

      if (!values.addressID) {
        toast.error("Select address");
        return;
      }

      try {
        const response = await bookService(values);
        console.log(response);
        toast.success(response?.message);
      } catch (error) {
        console.log(error);

        toast.error("Error in booking service");
      }
      toast;

      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <section id="booking-from" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Book a Repair
            </h2>
            <p className="text-muted-foreground">
              Schedule an on-site repair appointment at your convenience
            </p>
          </div>

          <div className="service-card border border-gray-300 rounded-2xl shadow-2xl p-4 sm:p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                {/* <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter your full name"
                    {...formik.getFieldProps("customerName")}
                  />
                  {formik.touched.customerName && formik.errors.customerName ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.customerName}
                    </p>
                  ) : null}
                </div> */}

                {/* Email */}
                {/* <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div> */}

                {/* Phone */}
                {/* <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    {...formik.getFieldProps("phone")}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.phone}
                    </p>
                  ) : null}
                </div> */}

                {/* Device Model */}
                <div className="space-y-2 ">
                  <Label>Select Device</Label>
                  <Select
                    value={formik.values.deviceID}
                    onValueChange={(val) => {
                      formik.setFieldValue("deviceID", val);
                      setSelectedDeviceID(val);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Device" />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceData?.data?.map((device) => (
                        <SelectItem
                          key={device.deviceID}
                          value={device.deviceID}
                        >
                          {device.deviceName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.deviceID && formik.errors.deviceID ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.deviceID}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2 ">
                  <Label>Select Service</Label>
                  <Select
                    value={formik.values.serviceID}
                    onValueChange={(val) => {
                      formik.setFieldValue("serviceID", val);
                      setSelectedServiceId(val);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceData?.data?.map((service) => (
                        <SelectItem
                          key={service.serviceID}
                          value={service.serviceID}
                        >
                          {service.serviceName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.serviceID && formik.errors.serviceID ? (
                    <p className="text-red-500 text-sm">
                      {formik.errors.serviceID}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <Label>Select Address</Label>
                {selectedAddress ? (
                  <AddressCard
                    address={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    selectedAddress={selectedAddress}
                  />
                ) : (
                  <h6>No address available</h6>
                )}
                <div>
                  <button
                    disabled={user?.role !== "User"}
                    onClick={() => dispatch(setAddressModal())}
                    className="btn-primary-blue float-end text-xs"
                  >
                    Select Other
                  </button>
                </div>
              </div>

              {/* Issue Description */}
              <div className="space-y-2">
                <Label htmlFor="issue">Describe Your Issue</Label>
                <Textarea
                  id="issue"
                  placeholder="Describe the issue"
                  {...formik.getFieldProps("issue")}
                />
                {formik.touched.issue && formik.errors.issue ? (
                  <p className="text-red-500 text-sm">{formik.errors.issue}</p>
                ) : null}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled={!(formik.isValid && formik.dirty)}
                className={`w-full btn-glow p-2 rounded-lg text-white transition ${
                  formik.isValid && formik.dirty
                    ? "bg-primaryblue hover:bg-blue-500"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (
                    selectedAddress?.addressID == null ||
                    selectedAddress?.addressID == undefined
                  ) {
                    toast.error("Select Addrress");
                    return;
                  }
                  dispatch(setSelectTechnicianModalOpen());
                }}
              >
                Proceed
              </button>
            </form>
          </div>
        </div>
        <Modal
          onClose={() => dispatch(setAddressModal())}
          isOpen={selectAdressModalOpen}
          head={`Select or Add Address`}
        >
          <SelectAddress
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
            addresses={addressData?.data}
          />
        </Modal>
        <Modal
          onClose={() => dispatch(setAddAdressModal())}
          isOpen={addAddressModalOpen}
          head={`Select Address`}
        >
          <AddAddress refetch={addressRefetch} />
        </Modal>

        <Modal
          isOpen={selectTechnicianModalOpen}
          head={"Select Technician(Auto/Manual)"}
          onClose={() => dispatch(setSelectTechnicianModalOpen())}
        >
          <SelectTechnician
            selectedAddressID={selectedAddress?.addressID}
            selectedDeviceID={selectedDeviceID}
            selectedTechnicianID={selectedTechnicianID}
            setSelectedTechnicianID={setSelectedTechnicianID}
          />
        </Modal>
        <Modal
          isOpen={bookingEstimateModalOpen}
          head={"Booking Estimate"}
          onClose={() => dispatch(setBookingEstimateModal())}
        >
          <BookingEstimate
            selectedServiceId={selectedServiceId}
            formik={formik}
            selectedTechnicianID={selectedTechnicianID}
            selectAddressId={selectedAddress?.addressID}
          />
        </Modal>
        <Modal
          isOpen={paymentSuccessModalOpen}
          onClose={() => dispatch(setPaymentSuccessModalOpen())}
        >
          <PaymentSuccess />
        </Modal>
      </div>
    </section>
  );
};

export default BookingForm;

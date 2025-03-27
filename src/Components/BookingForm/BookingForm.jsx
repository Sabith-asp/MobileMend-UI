import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
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
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "../Address/AddressCard";

const deviceTypes = [
  {
    value: "smartphone",
    label: "Smartphone",
    icon: <FiSmartphone className="mr-2 h-5 w-5" />,
  },
  {
    value: "tablet",
    label: "Tablet",
    icon: <FaTabletAlt className="mr-2 h-5 w-5" />,
  },
  {
    value: "laptop",
    label: "Laptop",
    icon: <MdLaptopMac className="mr-2 h-5 w-5" />,
  },
  {
    value: "desktop",
    label: "Desktop",
    icon: <MdMonitor className="mr-2 h-5 w-5" />,
  },
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const deviceBrands = {
  smartphone: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
  tablet: ["Apple", "Samsung", "Microsoft", "Lenovo"],
  laptop: ["Apple", "Dell", "HP", "Asus", "Lenovo"],
  desktop: ["Dell", "HP", "Asus", "Acer", "Custom Build"],
};

const BookingForm = () => {
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      deviceType: "smartphone",
      deviceBrand: "",
      deviceModel: "",
      issue: "",
      date: null,
      timeSlot: "",
      selectedAddress: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      deviceBrand: Yup.string().required("Select a device brand"),
      deviceModel: Yup.string().required("Enter device model"),
      issue: Yup.string().required("Please describe your issue"),
      date: Yup.date().nullable().required("Select a date"),
      timeSlot: Yup.string().required("Select a time slot"),
      selectedAddress: Yup.string().required("Select a service address"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);

      if (!values.selectedAddress) {
        toast({
          title: "Address Required",
          description: "Please select a service address.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Booking Submitted",
        description: "We'll contact you shortly to confirm.",
      });

      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <section id="booking" className="py-20 relative">
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

          <div className="service-card border border-gray-300 rounded-2xl shadow-2xl p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-500">{formik.errors.name}</p>
                  ) : null}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500">{formik.errors.email}</p>
                  ) : null}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    {...formik.getFieldProps("phone")}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <p className="text-red-500">{formik.errors.phone}</p>
                  ) : null}
                </div>

                {/* Device Type */}
                <div className="space-y-2">
                  <Label>Device Type</Label>
                  <RadioGroup
                    value={formik.values.deviceType}
                    onValueChange={(val) =>
                      formik.setFieldValue("deviceType", val)
                    }
                  >
                    {deviceTypes.map((device) => (
                      <div
                        key={device.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={device.value} />
                        <Label className="flex items-center">
                          {device.icon} {device.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Device Brand */}
                <div className="space-y-2">
                  <Label>Device Brand</Label>
                  <Select
                    value={formik.values.deviceBrand}
                    onValueChange={(val) =>
                      formik.setFieldValue("deviceBrand", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {deviceBrands[formik.values.deviceType]?.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Device Model */}
                <div className="space-y-2 ">
                  <Label>Device Model</Label>
                  <Input
                    id="deviceModel"
                    placeholder="Enter model name"
                    {...formik.getFieldProps("deviceModel")}
                  />
                </div>

                {/* Date Picker */}
                <div className="space-y-2 flex flex-col">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <FaRegCalendarAlt className="mr-2 h-4 w-4" />
                        {formik.values.date
                          ? format(formik.values.date, "PPP")
                          : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        mode="single"
                        selected={formik.values.date}
                        onSelect={(date) => formik.setFieldValue("date", date)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {formik.touched.date && formik.errors.date ? (
                    <p className="text-red-500">{formik.errors.date}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <Label>Select Address</Label>
                <AddressCard
                  address={{
                    address: "456 Elm St",
                    street: "Suburb",
                    pincode: "110045",
                  }}
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-2 flex flex-col">
                <Label>Preferred Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={
                        formik.values.timeSlot === slot ? "default" : "outline"
                      }
                      onClick={() => formik.setFieldValue("timeSlot", slot)}
                    >
                      {slot}
                    </Button>
                  ))}
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
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-glow bg-primaryblue text-white"
                size="lg"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Book Your Repair"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;

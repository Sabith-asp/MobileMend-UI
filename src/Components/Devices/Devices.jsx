import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

import { Search } from "lucide-react";
import {
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaSearch,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { getDevices } from "@/Api/deviceApi";
import Modal from "../Modal/Modal";
import DeviceDetail from "./DeviceDetail";
import { useDispatch, useSelector } from "react-redux";
import { setDeviceDetailModalOpen } from "@/Redux/Slices/uiSlice";

const Devices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);

  const { data: devices, isLoading } = useQuery({
    queryKey: ["repairDevices", searchTerm],
    queryFn: () =>
      getDevices({
        search: searchTerm,
      }),
    select: (response) => response?.data,
  });

  const { deviceDetailModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const getDeviceIcon = (deviceType) => {
    switch (deviceType.toLowerCase()) {
      case "smartphone":
        return <FaMobileAlt className="h-5 w-5" />;
      case "laptop":
        return <FaLaptop className="h-5 w-5" />;
      case "tablet":
        return <FaTabletAlt className="h-5 w-5" />;
      default:
        return <FaMobileAlt className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Supported Devices</h1>
            <p className="text-muted-foreground mt-1">
              Browse our catalog of repairable devices
            </p>
          </div>
        </div> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search devices..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div> */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Our Services</h1>
            <p className="text-muted-foreground mt-1">
              Professional device repair and maintenance services
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : devices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <Card
                key={device.deviceID}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <div className="p-2 rounded-full bg-secondary">
                        {getDeviceIcon(device.deviceType)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {device.deviceName}
                        </h3>
                        <p className="text-muted-foreground">{device.brand}</p>
                      </div>
                    </div>
                    <Badge>{device.deviceType}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaInfoCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Model: {device.model}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        Released: {device.releaseYear}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    onClick={() => {
                      setSelectedDevice(device);
                      dispatch(setDeviceDetailModalOpen());
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No devices found</h3>
            <p className="text-muted-foreground mt-2">
              Try changing your search or filters
            </p>
          </div>
        )}
      </main>

      <Modal
        isOpen={deviceDetailModalOpen}
        head={"Device detail"}
        onClose={() => {
          setSelectedDevice(null);
          dispatch(setDeviceDetailModalOpen());
        }}
      >
        <DeviceDetail selectedDevice={selectedDevice} />
      </Modal>
    </div>
  );
};

export default Devices;

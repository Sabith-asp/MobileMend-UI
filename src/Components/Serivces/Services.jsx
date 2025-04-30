import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { Clock, Wrench, Search, Tag, ThumbsUp } from "lucide-react";
import Modal from "../Modal/Modal";
import { getServices } from "@/Api/serviceApi";
import ServiceDetail from "./ServiceDetail";
import { useDispatch, useSelector } from "react-redux";
import { setServiceDetailModalOpen } from "@/Redux/Slices/uiSlice";
import Loader1 from "../Loader/Loader1";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: services, isLoading } = useQuery({
    queryKey: ["repairServices", searchTerm],
    queryFn: () =>
      getServices({
        search: searchTerm,
      }),
    select: (response) => response?.data,
  });
  console.log(services);
  const dispatch = useDispatch();
  const { serviceDetailModalOpen } = useSelector((state) => state.ui);

  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
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
            <Loader1 />
          </div>
        ) : services?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service) => (
              <Card
                key={service.serviceID}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {service.serviceName}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        INR {service.price.toFixed(2)}
                      </p>
                    </div>
                    {service.isPopular && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-3 w-3" /> Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.estimatedTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span className="capitalize">{service.category}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    onClick={() => {
                      setSelectedService(service);
                      dispatch(setServiceDetailModalOpen());
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
            <h3 className="text-xl font-semibold">No services found</h3>
            <p className="text-muted-foreground mt-2">
              Try changing your search term or filter
            </p>
          </div>
        )}
      </main>

      <Modal
        isOpen={serviceDetailModalOpen}
        head={"Service Detail"}
        onClose={() => {
          dispatch(setServiceDetailModalOpen());
          setSelectedService(null);
        }}
      >
        <ServiceDetail selectedService={selectedService} />
      </Modal>
    </div>
  );
};

export default Services;

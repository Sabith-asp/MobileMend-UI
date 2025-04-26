import React from "react";
import { Clock, Wrench } from "lucide-react";

const ServiceDetail = ({ selectedService }) => {
  return (
    <div className="py-4 space-y-4">
      <div>
        <h4 className="font-medium">Description</h4>
        <p className="text-muted-foreground">{selectedService.description}</p>
      </div>

      <div className="flex justify-between items-center text-sm border-t border-b py-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{selectedService.estimatedTime} minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-muted-foreground" />
          <span className="capitalize">{selectedService.category}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-muted-foreground">Price</span>
        <span className="font-bold text-lg">
          INR {selectedService.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ServiceDetail;

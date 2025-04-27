import React from "react";
import { MdReportProblem } from "react-icons/md"; // For Common Issues
import { FaTools } from "react-icons/fa"; // For Repairable Components

const DeviceDetail = ({ selectedDevice }) => {
  const commonIssues = selectedDevice.commonIssues
    ?.split(",")
    .map((issue) => issue.trim());
  const repairableComponents = selectedDevice.repairableComponents
    ?.split(",")
    .map((component) => component.trim());

  return (
    <div className="py-4 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Brand</h4>
          <p>{selectedDevice.brand}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Model</h4>
          <p>{selectedDevice.model}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
          <p>{selectedDevice.deviceType}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            Release Year
          </h4>
          <p>{selectedDevice.releaseYear}</p>
        </div>
      </div>

      {/* Common Issues */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MdReportProblem className="w-4 h-4 text-amber-500" />
          <h4 className="font-medium">Common Issues</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {commonIssues?.map((issue, index) => (
            <span
              key={index}
              className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
            >
              {issue}
            </span>
          ))}
        </div>
      </div>

      {/* Repairable Components */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FaTools className="w-4 h-4 text-primary" />
          <h4 className="font-medium">Repairable Components</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {repairableComponents?.map((component, index) => (
            <span
              key={index}
              className="text-xs bg-primaryblue text-white px-2 py-1 rounded-full"
            >
              {component}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;

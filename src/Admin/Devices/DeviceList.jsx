import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Eye } from "lucide-react";
import Modal from "@/Components/Modal/Modal";
import DeviceForm from "./DeviceForm";
import { getDevices } from "@/Api/deviceApi";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeviceDeleteModalOpen,
  setDeviceManagementModalOpen,
} from "@/Redux/Slices/uiSlice";
import DeleteDevice from "./DeleteDevice";

const DeviceList = ({ searchTerm }) => {
  const [selectedDeviceId, setselectedDeviceId] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const { deviceDeleteModalOpen } = useSelector((state) => state.ui);

  const { deviceManagementModalOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { data: adminDeviceData, refetch: adminDeviceDataRefetch } = useQuery({
    queryKey: ["adminDevices", searchTerm],
    queryFn: () => getDevices({ search: searchTerm }),
  });

  console.log(adminDeviceData);

  return (
    <div className=" mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Repairable Parts</TableHead>
            <TableHead>Common Issues</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminDeviceData?.data?.length > 0 ? (
            adminDeviceData?.data?.map((device) => (
              <TableRow>
                <TableCell className="font-medium">
                  {device?.deviceID}
                </TableCell>
                <TableCell>{device?.brand}</TableCell>
                <TableCell>{device?.deviceName}</TableCell>
                <TableCell>{device?.model}</TableCell>
                <TableCell>{device?.deviceType}</TableCell>
                <TableCell>{device?.releaseYear}</TableCell>
                <TableCell>
                  {device?.repairableComponents?.split(",").map((component) => (
                    <span className="whitespace-nowrap text-xs p-1 px-2 mr-1 border border-gray-400 rounded-full">
                      {component}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="max-w-[90px] overflow-hidden whitespace-nowrap text-ellipsis">
                  {device?.commonIssues?.split(",").map((component) => (
                    <span className="whitespace-nowrap text-xs p-1 px-2 mr-1 border border-gray-400 rounded-full">
                      {component}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setselectedDeviceId(device?.deviceID);
                        dispatch(setDeviceManagementModalOpen());
                      }}
                      className=" text-lg mr-2"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => {
                        setselectedDeviceId(device?.deviceID);
                        dispatch(setDeviceDeleteModalOpen());
                      }}
                      className="mt-[2px]  text-red-600 text-xl"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                No devices found. Try adjusting your search or filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={deviceManagementModalOpen}
        head={selectedDeviceId ? "Edit Device" : "Add Device"}
        onClose={() => {
          dispatch(setDeviceManagementModalOpen());
          setselectedDeviceId(null);
        }}
      >
        <DeviceForm
          adminDeviceDataRefetch={adminDeviceDataRefetch}
          setselectedDeviceId={setselectedDeviceId}
          selectedDeviceId={selectedDeviceId}
        />
      </Modal>
      <Modal
        isOpen={deviceDeleteModalOpen}
        head={"Delete Device"}
        onClose={() => {
          dispatch(setDeviceDeleteModalOpen());
          setselectedDeviceId(null);
        }}
      >
        <DeleteDevice
          selectedDeviceId={selectedDeviceId}
          setselectedDeviceId={setselectedDeviceId}
          adminDeviceDataRefetch={adminDeviceDataRefetch}
        />
      </Modal>
    </div>
  );
};

export default DeviceList;

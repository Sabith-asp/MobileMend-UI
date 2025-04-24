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
import ServiceForm from "./ServiceForm";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/Api/serviceApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddEditServiceModalOpen,
  setServiceDeleteModalOpen,
} from "@/Redux/Slices/uiSlice";
import DeleteService from "./DeleteService";

const ServiceList = ({ searchTerm }) => {
  const [selectedServiceID, setselectedServiceID] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const { addEditServiceModalOpen, serviceDeleteModalOpen } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();
  const { data: adminServiceData, refetch: adminServiceDataRefetch } = useQuery(
    {
      queryKey: ["adminService", searchTerm, selectedServiceID],
      queryFn: () => getServices({ search: searchTerm }),
    }
  );

  console.log(adminServiceData);

  return (
    <div className=" mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Est. Time</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminServiceData?.data?.length > 0 ? (
            adminServiceData?.data?.map((service) => (
              <TableRow>
                <TableCell className="font-medium">
                  {service?.serviceID}
                </TableCell>
                <TableCell>{service?.serviceName}</TableCell>
                <TableCell>{service?.description}</TableCell>
                <TableCell>{service?.price}</TableCell>
                <TableCell>{service?.estimatedTime} Minutes</TableCell>
                <TableCell>
                  <span className="p-1 px-2 border border-gray-400 rounded-full">
                    {service?.category}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`p-1 px-2 border border-gray-400 rounded-full ${
                      service?.isPopular ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    {service?.isPopular ? "Yes" : "No"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setselectedServiceID(service?.serviceID);
                        console.log(service?.serviceID);

                        dispatch(setAddEditServiceModalOpen());
                      }}
                      className=" text-lg mr-2"
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      onClick={() => {
                        setselectedServiceID(service?.serviceID);
                        dispatch(setServiceDeleteModalOpen());
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
                No services found. Try adjusting your search or filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={addEditServiceModalOpen}
        head={selectedServiceID ? "Edit Service" : "Add Service"}
        onClose={() => {
          dispatch(setAddEditServiceModalOpen());
          setselectedServiceID(null);
        }}
      >
        <ServiceForm
          adminServiceDataRefetch={adminServiceDataRefetch}
          setselectedServiceID={setselectedServiceID}
          selectedServiceID={selectedServiceID}
        />
      </Modal>

      <Modal
        isOpen={serviceDeleteModalOpen}
        head={"Delete Service"}
        onClose={() => {
          dispatch(setServiceDeleteModalOpen());
          setselectedServiceID(null);
        }}
      >
        <DeleteService
          adminServiceDataRefetch={adminServiceDataRefetch}
          selectedServiceID={selectedServiceID}
          setselectedServiceID={setselectedServiceID}
        />
      </Modal>
    </div>
  );
};

export default ServiceList;

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

const DeviceList = () => {
  const [selectedServiceID, setselectedServiceID] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };
  return (
    <div className=" mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Repairable Parts</TableHead>
            <TableHead>Common Issues</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">223456</TableCell>
            <TableCell>dfshh</TableCell>
            <TableCell>sdhdhfh</TableCell>
            <TableCell>23542</TableCell>
            <TableCell>1-2 hours</TableCell>
            <TableCell>
              <span className="p-1 px-2 border border-gray-400 rounded-full">
                Repair
              </span>
            </TableCell>
            <TableCell className="max-w-[90px] overflow-hidden whitespace-nowrap text-ellipsis">
              ewrter,ert,erwt,erter,erwwfghfdgdhfhggfdhfhgfhgfghfgdhfghfgh
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end">
                <button
                  onClick={() => setEditModalIsOpen(true)}
                  className=" text-lg mr-2"
                >
                  <FaRegEdit />
                </button>
                <button className="mt-[2px]  text-red-600 text-xl">
                  <MdDeleteOutline />
                </button>
              </div>
            </TableCell>
          </TableRow>

          {/* <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                No bookings found. Try adjusting your search or filters.
              </TableCell>
            </TableRow> */}
        </TableBody>
      </Table>
      <Modal
        isOpen={editModalIsOpen}
        head={selectedServiceID ? "Edit Device" : "Add Device"}
        onClose={closeEditModal}
      >
        <DeviceForm />
      </Modal>
    </div>
  );
};

export default DeviceList;

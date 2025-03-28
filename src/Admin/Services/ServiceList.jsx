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

const ServiceList = () => {
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
            <TableCell>
              <span className="p-1 px-2 border border-gray-400 rounded-full">
                yes/no
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div>
                <button
                  onClick={() => setEditModalIsOpen(true)}
                  className="p-1 text-lg"
                >
                  <FaRegEdit />
                </button>
                <button className="p-1 text-red-600 text-xl">
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
        head={selectedServiceID ? "Edit Product" : "Add Product"}
        onClose={closeEditModal}
      >
        <ServiceForm />
      </Modal>
    </div>
  );
};

export default ServiceList;

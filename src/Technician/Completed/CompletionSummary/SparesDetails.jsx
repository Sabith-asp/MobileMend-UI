import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SparesDetails = () => {
  return (
    <div className=" bg-slate-100 p-3 border border-gray-400 rounded-xl mt-2">
      <h6 className="flex items-center font-semibold">
        <BsBoxSeam className="mr-2" />
        Spare Parts
      </h6>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
          <hr />
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Display</TableCell>
            <TableCell>₹2500</TableCell>
            <TableCell>1</TableCell>
            <TableCell>₹2500</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SparesDetails;

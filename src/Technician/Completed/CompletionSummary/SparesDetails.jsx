import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

const SparesDetails = ({ complitionData }) => {
  const spares = complitionData?.spares;

  return (
    <div className="bg-slate-100 p-3 border border-gray-400 rounded-xl mt-2">
      <h6 className="flex items-center font-semibold mb-2">
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
        </TableHeader>

        <TableBody>
          {spares && spares.length > 0 ? (
            spares.map((spare, index) => (
              <TableRow key={index}>
                <TableCell>{spare?.spareName}</TableCell>
                <TableCell>₹{spare?.price?.toFixed(2)}</TableCell>
                <TableCell>{spare?.qty}</TableCell>
                <TableCell>₹{spare?.totalCost?.toFixed(2)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No spare parts used
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SparesDetails;

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Tables = () => {
  return (
    // <div className="overflow-x-auto">
    //   <table className="table table-xs border border-gray-300 rounded-lg">
    //     <thead>
    //       <tr>
    //         <th>Device</th>
    //         <th>Service</th>
    //         <th>Date</th>
    //         <th>Repair Type</th>
    //         <th>Status</th>
    //         <th>Technician</th>
    //         <th>Rating</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>iPhone 13</td>
    //         <td>Screen Replacement</td>
    //         <td>03/25/2025</td>
    //         <td>On-Site</td>
    //         <td className="text-green-600 font-bold">Completed</td>
    //         <td>John Doe</td>
    //         <td>⭐⭐⭐⭐☆</td>
    //         <td>
    //           <button className=" text-primary px-2 py-1 rounded">View</button>
    //         </td>
    //       </tr>
    //       <tr>
    //         <td>Samsung S22</td>
    //         <td>Battery Replacement</td>
    //         <td>03/24/2025</td>
    //         <td>Pickup</td>
    //         <td className="text-yellow-500 font-bold">Pending</td>
    //         <td>Jane Smith</td>
    //         <td>⭐⭐⭐⭐⭐</td>
    //         <td>
    //           <button className=" text-primary px-2 py-1 rounded">View</button>
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>

    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Tables;

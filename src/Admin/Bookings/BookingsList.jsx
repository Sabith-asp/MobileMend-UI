import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

import {
  Calendar,
  Search,
  Filter,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Modal from "@/Components/Modal/Modal";
import BookingDetail from "./BookingSummary/BookingDetail";
import { StatusBadge } from "@/Components/BookedService/BookedTable";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/Api/bookingApi";
import { useDispatch, useSelector } from "react-redux";
import { setAdminBookingDetailModalOpen } from "@/Redux/Slices/uiSlice";
import Loader1 from "@/Components/Loader/Loader1";

const BookingsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const dispatch = useDispatch();
  const { adminBookingDetailModalOpen } = useSelector((state) => state.ui);

  const { data: adminBookingData, isLoading } = useQuery({
    queryKey: ["adminBooking", statusFilter, searchTerm],
    queryFn: () =>
      getBookings({ status: statusFilter, searchString: searchTerm }),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Bookings</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-[250px] hidden lg:block">
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue={null} onValueChange={setStatusFilter}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-6 overflow-auto h-15 sm:h-9">
              <TabsTrigger value={null}>All</TabsTrigger>
              <TabsTrigger value="Assigned">Assigned</TabsTrigger>
              <TabsTrigger value="Accepted">Accepted</TabsTrigger>
              <TabsTrigger value="InProgress">In Progress</TabsTrigger>
              <TabsTrigger value="Completed">Completed</TabsTrigger>
              <TabsTrigger value="Rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className=" mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center h-24">
                  <Loader1 />
                </TableCell>
              </TableRow>
            ) : adminBookingData?.data?.length > 0 ? (
              adminBookingData?.data?.map((booking) => (
                <TableRow key={booking.bookingID}>
                  <TableCell className="font-medium">
                    {booking.bookingID}
                  </TableCell>
                  <TableCell>{booking?.customerName}</TableCell>
                  <TableCell>{booking?.deviceName}</TableCell>
                  <TableCell>{booking?.serviceName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>
                        {new Date(booking?.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {new Date(booking?.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{booking?.technicianName}</TableCell>
                  <TableCell>
                    <StatusBadge status={booking?.bookingStatus} />
                  </TableCell>
                  <TableCell>
                    ₹
                    {(
                      booking?.bookingCostDetails?.totalBookingCost +
                      booking?.sparesTotal
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedBooking(booking);
                        dispatch(setAdminBookingDetailModalOpen());
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center h-24">
                  No bookings found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Modal
          isOpen={adminBookingDetailModalOpen}
          head={`Booking Details - ${selectedBooking?.bookingID}`}
          onClose={() => {
            dispatch(setAdminBookingDetailModalOpen());
            setSelectedBooking(null);
          }}
        >
          <BookingDetail selectedBooking={selectedBooking} />
        </Modal>
      </div>
    </div>
  );
};

export default BookingsList;

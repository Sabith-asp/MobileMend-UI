import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Modal from "@/Components/Modal/Modal";
import BookingDetail from "./BookingSummary/BookingDetail";

// Mock data for bookings
const mockBookings = [
  {
    id: "B-1001",
    customer: "Alice Johnson",
    device: "MacBook Pro",
    service: "Screen Repair",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "pending",
    location: "123 Main St",
    contact: "alice@example.com",
    phone: "+1 (555) 123-4567",
    notes:
      "The screen is cracked on the right corner. Still works but display is damaged.",
    price: 249.99,
  },
  {
    id: "B-1002",
    customer: "Bob Smith",
    device: "iPhone 13",
    service: "Battery Replacement",
    date: "2023-06-16",
    time: "2:30 PM",
    status: "confirmed",
    location: "456 Oak Ave",
    contact: "bob@example.com",
    phone: "+1 (555) 234-5678",
    notes:
      "Battery drains completely in about 2 hours of regular use. The phone is also getting very hot.",
    price: 79.99,
  },
  {
    id: "B-1003",
    customer: "Charlie Brown",
    device: "Samsung TV",
    service: "Speaker Repair",
    date: "2023-06-14",
    time: "1:00 PM",
    status: "in-progress",
    location: "789 Pine Rd",
    contact: "charlie@example.com",
    phone: "+1 (555) 345-6789",
    notes:
      "TV turns on fine but there's no sound from any input source or built-in apps.",
    price: 129.99,
  },
  {
    id: "B-1004",
    customer: "Diana Prince",
    device: "Dell Laptop",
    service: "Motherboard Repair",
    date: "2023-06-17",
    time: "11:15 AM",
    status: "completed",
    location: "321 Elm St",
    contact: "diana@example.com",
    phone: "+1 (555) 456-7890",
    notes:
      "Laptop doesn't turn on at all. The power light doesn't even blink when I press the power button.",
    price: 349.99,
  },
  {
    id: "B-1005",
    customer: "Edward Norton",
    device: "iPad Air",
    service: "Charging Port Repair",
    date: "2023-06-18",
    time: "3:45 PM",
    status: "cancelled",
    location: "654 Birch Blvd",
    contact: "edward@example.com",
    phone: "+1 (555) 567-8901",
    notes:
      "Charging port is loose. Sometimes it charges, sometimes it doesn't.",
    price: 89.99,
  },
];

const BookingsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [adminViewBookDetail, setAdminViewBookDetail] = useState(false);
  const closeAdminViewBookDetail = () => {
    setAdminViewBookDetail(false);
  };
  // Filter bookings based on search term and status
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="rounded-full" variant="outline">
            Pending
          </Badge>
        );
      case "confirmed":
        return (
          <Badge className="rounded-full" variant="secondary">
            Confirmed
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="rounded-full" variant="default">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500 rounded-full text-white">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="rounded-full" variant="destructive">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="rounded-full" variant="outline">
            Unknown
          </Badge>
        );
    }
  };

  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Bookings</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-[250px] hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue="all" onValueChange={setStatusFilter}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-6 overflow-auto h-15 sm:h-9">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
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
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.device}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{booking.date}</span>
                      <span className="text-muted-foreground text-xs">
                        {booking.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>${booking.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        viewBookingDetails(booking);
                        setAdminViewBookDetail(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-24">
                  No bookings found. Try adjusting your search or filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Modal
          isOpen={adminViewBookDetail}
          head={`Booking Details - "B-1002"`}
          onClose={closeAdminViewBookDetail}
        >
          <BookingDetail />
        </Modal>
      </div>
    </div>
  );
};

export default BookingsList;

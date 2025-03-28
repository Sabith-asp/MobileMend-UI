import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import AdminOverview from "./Dashboard/AdminOverview";
import AdminDashboard from "./Dashboard/AdminDashboard";
import BookingsList from "./Bookings/BookingsList";
import Services from "./Services/Services";
// import AdminDashboard from "@/components/admin/AdminDashboard";
// import BookingsList from "@/components/admin/BookingsList";
// import ServicesManager from "@/components/admin/ServicesManager";
// import DevicesManager from "@/components/admin/DevicesManager";
// import TechniciansManager from "@/components/admin/TechniciansManager";
// import OrdersHistory from "@/components/admin/OrdersHistory";
// import { Separator } from "@/components/ui/separator";

const AdminLayout = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="mx-2 sm:mx-7">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage bookings, services, devices, and technicians
          </p>
        </div>
        {/* <Separator /> */}

        <Tabs defaultValue="dashboard" className="mt-7 bg-white">
          <TabsList className="w-full justify-start mb-4 overflow-auto grid grid-cols-2 sm:grid-cols-6 h-15 sm:h-9">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="technicians">Technicians</TabsTrigger>
            <TabsTrigger value="orders">Completed Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <BookingsList />
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <Services />
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            {/* <DevicesManager /> */}
          </TabsContent>

          <TabsContent value="technicians" className="space-y-4">
            {/* <TechniciansManager /> */}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {/* <OrdersHistory /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminLayout;

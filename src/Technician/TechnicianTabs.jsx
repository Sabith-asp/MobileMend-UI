import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import ServicesList from "./ServicesList";
const TechnicianTabs = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <Tabs
      defaultValue="dashboard"
      className="mt-6 bg-white mx-2 sm:mx-7"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-15 sm:h-9">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="assigned">Assigned</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="pt-4">
        <ServicesList type="dashboard" />
      </TabsContent>

      <TabsContent value="assigned">
        <ServicesList type="assigned" />
      </TabsContent>

      <TabsContent value="in-progress">
        <ServicesList type="in-progress" />
      </TabsContent>

      <TabsContent value="completed">
        <ServicesList type="completed" />
      </TabsContent>
    </Tabs>
  );
};

export default TechnicianTabs;

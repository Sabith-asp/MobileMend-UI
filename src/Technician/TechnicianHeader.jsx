import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, ArrowDownLeft, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MdOutlineSettings } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/Components/Modal/Modal";
import TechnicianProfile from "./TechnicianProfile";
// import { toast } from "sonner";
// import ProfileSettings from "./ProfileSettings";

const TechnicianHeader = () => {
  const [status, setStatus] = useState("online");
  const [technicianName, setTechnicianName] = useState("Jasim");
  const [technicianLocation, setTechnicianLocation] = useState("Kozhikode");
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    busy: "bg-yellow-500",
  };

  const statusText = {
    online: "Online",
    offline: "Offline",
    busy: "Busy",
  };

  const changeStatus = (newStatus) => {
    setStatus(newStatus);
    toast.success(`Status updated to ${statusText[newStatus]}`);
  };

  const closeUpdateProfile = () => {
    setIsUpdateProfileOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between my-5 mx-2 sm:mx-7 items-start md:items-center gap-4 border-b pb-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border">
          <AvatarImage src="/placeholder.svg" alt="Technician" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-2xl font-bold">{technicianName}</h1>
          <p className="text-muted-foreground">Senior Repair Technician</p>
          <div className="flex items-center mt-1">
            <div
              className={`h-2.5 w-2.5 rounded-full ${statusColors[status]} mr-2`}
            ></div>
            <span className="text-sm font-medium">{statusText[status]}</span>
            <span className="text-sm text-muted-foreground ml-2">
              • {technicianLocation}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Activity className="mr-2 h-4 w-4" />
              Change Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeStatus("online")}>
              <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
              Online
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeStatus("busy")}>
              <Activity className="mr-2 h-4 w-4 text-yellow-500" />
              Busy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeStatus("offline")}>
              <ArrowDownLeft className="mr-2 h-4 w-4 text-gray-500" />
              Offline
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <ProfileSettings
          initialName={technicianName}
          initialLocation={technicianLocation}
          initialEmail="john.doe@example.com"
          initialPhone="+1 (555) 123-4567"
        /> */}
        <Button
          variant="outline"
          className="sghdfsdjkfdgsdg"
          size="sm"
          onClick={() => {
            setIsUpdateProfileOpen(true);
            console.log(isUpdateProfileOpen);
          }}
        >
          <MdOutlineSettings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Modal
          isOpen={isUpdateProfileOpen}
          head="Profile Settings"
          onClose={closeUpdateProfile}
        >
          <TechnicianProfile />
        </Modal>
      </div>
    </div>
  );
};

export default TechnicianHeader;

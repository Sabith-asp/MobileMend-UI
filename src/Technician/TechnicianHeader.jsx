import React, { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { ArrowUpRight, ArrowDownLeft, Activity } from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { MdOutlineSettings } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Modal from "@/Components/Modal/Modal";
import TechnicianProfile from "./TechnicianProfile";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { updateAvailability, updateCurrentLocation } from "@/Api/technicianApi";
import { checkAuth } from "@/Api/authApi";
import { setUser } from "@/Redux/Slices/userSlice";
// import { toast } from "sonner";
// import ProfileSettings from "./ProfileSettings";

const TechnicianHeader = () => {
  const [technicianLocation, setTechnicianLocation] = useState("Kozhikode");
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const statusColors = {
    Online: "bg-green-500",
    Offline: "bg-gray-500",
    Busy: "bg-yellow-500",
    Unavailable: "bg-red-500",
  };

  const statusText = {
    Online: "Online",
    Offline: "Offline",
    Busy: "Busy",
    Unavailable: "Unavailable",
  };

  useEffect(() => {
    let intervalId;

    if (status === "Online") {
      const getLocationAndUpdate = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;

              updateCurrentLocations({
                technicianId: user.technicianId,
                latitude,
                longitude,
              });
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        } else {
          console.warn("Geolocation not supported by this browser.");
        }
      };

      getLocationAndUpdate();

      intervalId = setInterval(getLocationAndUpdate, 30000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user.status, user.technicianId]);

  const updateCurrentLocations = async (data) => {
    try {
      const response = await updateCurrentLocation(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatus = async (newStatus) => {
    try {
      const response = await updateAvailability(newStatus);
      console.log(response);
      const userData = await checkAuth();
      dispatch(setUser(userData));

      toast.success(`Status updated to ${statusText[newStatus]}`);
    } catch (error) {
      console.log(error);
    }
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
          <h1 className="text-2xl font-bold">{user.name}</h1>
          {/* <p className="text-muted-foreground">Senior Repair Technician</p> */}
          <div className="flex items-center mt-1">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                statusColors[user.status]
              } mr-2`}
            ></div>
            <span className="text-sm font-medium">
              {statusText[user.status]}
            </span>
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
            <DropdownMenuItem onClick={() => changeStatus("Online")}>
              <ArrowUpRight className="mr-2 h-4 w-4 text-green-500" />
              Online
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeStatus("Unavailable")}>
              <Activity className="mr-2 h-4 w-4 text-red-500" />
              Unavailable
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeStatus("Busy")}>
              <Activity className="mr-2 h-4 w-4 text-yellow-500" />
              Busy
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => changeStatus("Offline")}>
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
        {/* <Button
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
        </Button> */}
        {/* <Modal
          isOpen={isUpdateProfileOpen}
          head="Profile Settings"
          onClose={closeUpdateProfile}
        >
          <TechnicianProfile />
        </Modal> */}
      </div>
    </div>
  );
};

export default TechnicianHeader;

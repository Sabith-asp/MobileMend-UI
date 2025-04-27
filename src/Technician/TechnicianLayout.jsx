import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import TechnicianHeader from "./TechnicianHeader";
import TechnicianTabs from "./TechnicianTabs";
import { useDispatch, useSelector } from "react-redux";
import Loader1 from "@/Components/Loader/Loader1";
import SignalRService from "@/Components/Notification/SignalRService";
import { RxCross2 } from "react-icons/rx";
import { FaCheck, FaLocationArrow } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import toast from "react-hot-toast";
import {
  setAcceptServiceModalOpen,
  setRejectServiceModalOpen,
} from "@/Redux/Slices/uiSlice";

const TechnicianLayout = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      console.log(user);

      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader1 customCss={"h-screen"} />;
  }

  if (user?.role !== "Technician") {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mx-auto">
      <TechnicianHeader />
      <TechnicianTabs />
      <Outlet />
    </div>
  );
};

export default TechnicianLayout;

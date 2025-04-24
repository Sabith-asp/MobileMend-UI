import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import TechnicianHeader from "./TechnicianHeader";
import TechnicianTabs from "./TechnicianTabs";
import { useSelector } from "react-redux";

const TechnicianLayout = () => {
  const { user } = useSelector((state) => state.user);
  if (user?.role !== "Technician") {
    return <Navigate to={"/"} />;
  }
  //   const { data: userBookingData, refetch: userBookingRefetch } = useQuery({
  //     queryKey: ["userBookings"],
  //     queryFn: () => getBookings(),
  //   });
  return (
    <div className="container mx-auto">
      <TechnicianHeader />
      <TechnicianTabs />
      <Outlet />
    </div>
  );
};

export default TechnicianLayout;

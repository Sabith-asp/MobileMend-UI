import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import BookedService from "./Components/BookedService/BookedService";
import TDashboard from "./Technician/Dashboard/TDashboard";
import TechnicianLayout from "./Technician/TechnicianLayout";
import AdminLayout from "./Admin/AdminLayout";
import TechnicianApplicationForm from "./Components/TechnicianApplication/TechnicianApplicationForm";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Auth item={<Login />} />} />
          <Route path="signup" element={<Auth item={<SignUp />} />} />
          <Route path="bookings" element={<BookedService />} />
          <Route
            path="become-technician"
            element={<TechnicianApplicationForm />}
          />

          <Route path="technician" element={<TechnicianLayout />}></Route>
          <Route path="admin" element={<AdminLayout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

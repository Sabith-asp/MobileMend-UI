import React from "react";
import Tables from "../Table/Tables";
import BookedTable from "./BookedTable";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BookedService = () => {
  const { user } = useSelector((state) => state.user);

  if (user?.role !== "User") {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="container mx-auto">
      <div className="sm:mx-7 mx-3">
        <h1 className="text-3xl font-semibold mt-4">
          Your Device Services & Status
        </h1>
        <h3 className="mt-2 text-base font-bold">Service History</h3>
        <div className="booked-table min-h-72 bg-white mt-3 rounded-xl shadow-2xl border border-gray-400 p-2">
          <BookedTable />
        </div>
      </div>
    </section>
  );
};

export default BookedService;

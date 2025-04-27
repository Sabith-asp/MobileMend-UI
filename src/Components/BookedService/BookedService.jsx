import React, { useEffect, useState } from "react";
import Tables from "../Table/Tables";
import BookedTable from "./BookedTable";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { MdNotificationsActive } from "react-icons/md";
import { FaLocationArrow, FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Loader1 from "../Loader/Loader1";
import SignalRService from "../Notification/SignalRService";
import { updatePayment } from "@/Api/bookingApi";

const BookedService = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {

  //   }, [user]);

  const updateSparePayment = async (bookingId) => {
    try {
      const response = await updatePayment(bookingId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const showPaymentNotificationToast = (sparesPayment) => {
    console.log(sparesPayment);

    toast.custom(
      (t) => (
        <div
          className={`bg-white shadow-2xl border border-gray-300 rounded-xl p-4 w-80 transition-all ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <MdNotificationsActive className="text-2xl text-blue-500" /> Spare
            Payment Details
          </h2>

          <div className="text-sm text-gray-600 mb-3 space-y-1">
            <p>
              <strong>Booking ID:</strong> {sparesPayment.bookingId}
            </p>
            <p>
              <strong>Total Spares Cost:</strong> $
              {sparesPayment.sparesTotal.toFixed(2)}
            </p>

            <div className="space-y-1">
              <p className="font-semibold">Spares Details:</p>
              {sparesPayment.spares.map((spare) => (
                <div key={spare.id} className="flex justify-between">
                  <span>
                    {spare.spareName} (x{spare.qty})
                  </span>
                  <span>${spare.totalCost.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                updateSparePayment(sparesPayment.bookingId);
              }}
              className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              <FaCheck className="text-lg" /> Pay Now
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                console.log(
                  "Payment for Booking ID:",
                  sparesPayment.BookingId,
                  "was not initiated."
                );
              }}
              className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              <RxCross2 className="text-lg" /> Dismiss
            </button>
          </div>
        </div>
      ),
      {
        duration: 30000, // Toast will last for 30 seconds if not closed
      }
    );
  };

  useEffect(() => {
    let signalR;
    if (user) {
      console.log(user);

      setLoading(false);
    } else {
      setLoading(false);
    }
    if (user?.id) {
      // If user is a customer
      signalR = new SignalRService("customer", user.id);
      // 👆 id is optional here, just for structure.
    }

    if (signalR) {
      signalR.startConnection();
      signalR.listenForNotifications((message) => {
        // Show toast or popup
        showPaymentNotificationToast(message);
      });
    }

    return () => {
      if (signalR) {
        signalR.stopConnection();
      }
    };
  }, [user]);

  if (loading) {
    return <Loader1 customCss={"h-screen"} />;
  }

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

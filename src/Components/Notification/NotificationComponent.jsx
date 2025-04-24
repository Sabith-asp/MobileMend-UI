import { useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const NotificationComponent = () => {
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7022/notificationHub`, {
        withCredentials: true, // ✅ sends the cookie
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => console.log("SignalR connected!"))
      .catch((err) => console.error("Connection error:", err));

    connection.on("ReceiveNotification", (message) => {
      alert(message);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return null; // You can return a toast or icon later
};

export default NotificationComponent;

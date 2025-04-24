import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useSelector } from "react-redux";

class SignalRService {
  constructor(technicianId) {
    // Pass the technicianId as a query parameter in the URL
    this.connection = new HubConnectionBuilder()
      .withUrl(
        `https://localhost:7022/notificationHub?technicianId=${technicianId}`
      )
      .build();
  }

  // Start the connection
  startConnection = async () => {
    // Check the connection state and act accordingly
    if (this.connection.state === HubConnectionState.Connecting) {
      console.log("SignalR connection is already in progress...");
      return; // Prevent starting the connection again while it is connecting
    }

    if (this.connection.state === HubConnectionState.Connected) {
      console.log("Already connected to SignalR");
      return; // No need to start again if already connected
    }

    try {
      await this.connection.start();
      console.log("SignalR Connected");
    } catch (err) {
      console.log("Error while starting connection: " + err);
      setTimeout(() => this.startConnection(), 5000); // Retry connection after 5 seconds
    }
  };

  // Listen for notifications
  listenForNotifications = (callback) => {
    this.connection.on("ReceiveNotification", (data) => {
      console.log(data);
      callback(data); // Pass the message to the callback
    });
  };

  // Stop the connection
  stopConnection = async () => {
    await this.connection.stop();
    console.log("SignalR Disconnected");
  };
}

export default SignalRService;

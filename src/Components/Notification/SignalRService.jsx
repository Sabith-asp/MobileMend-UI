import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

class SignalRService {
  constructor(userType, userId = null) {
    let url = `${import.meta.env.VITE_BASE_URL}/notificationHub`;
    console.log("signal r url", url);

    // URL setup depending on user type
    if (userType === "technician" && userId) {
      url += `?technicianId=${userId}`;
    } else if (userType === "customer" && userId) {
      url += `?customerId=${userId}`;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(url, { withCredentials: true })
      .withAutomaticReconnect()
      .build();
  }

  startConnection = async () => {
    if (
      this.connection.state === HubConnectionState.Connecting ||
      this.connection.state === HubConnectionState.Connected
    ) {
      console.log("SignalR already connecting or connected");
      return;
    }

    try {
      await this.connection.start();
      console.log("SignalR Connected");
    } catch (err) {
      console.error("Connection error:", err);
      setTimeout(() => this.startConnection(), 5000);
    }
  };

  listenForNotifications = (callback) => {
    this.connection.on("ReceiveNotification", (message) => {
      console.log("Received:", message);
      callback(message); // Call the callback (show toast, etc.)
    });
  };

  stopConnection = async () => {
    await this.connection.stop();
    console.log("SignalR Disconnected");
  };
}

export default SignalRService;

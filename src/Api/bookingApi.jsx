import api from "./api";

export const bookService = async (data) => {
  try {
    const response = await api.post(`/Booking/confirm-booking`, data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingEstimate = async (
  technicianId,
  addressId,
  selectedServiceId
) => {
  try {
    console.log(technicianId, addressId, selectedServiceId);

    const response = await api.get(`/Booking/get-booking-estimate`, {
      params: { technicianId, addressId, serviceId: selectedServiceId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNearestBestTechnicians = async (
  deviceId,
  customerAddressId
) => {
  try {
    const response = await api.get(`/Technician/get-best-technicians`, {
      params: {
        customerAddressId: customerAddressId,
        deviceId: deviceId,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findTechnicianAutomatically = async (addressId, deviceId) => {
  try {
    console.log("hereeeee", addressId, deviceId);

    const response = await api.get(`/Technician/find-technician-auto`, {
      params: {
        addressId,
        deviceId,
      },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const getBookings = async (data = {}) => {
  try {
    console.log(data);

    const paramsData = { ...data };
    const response = await api.get("/Booking/get-booking", {
      params: paramsData,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const response = await api.get(`/Booking/get-booking`, {
      params: { bookingId },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updatePayment = async (bookingId) => {
  try {
    const response = await api.patch(
      `/Booking/update-payment?bookingId=${bookingId}`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

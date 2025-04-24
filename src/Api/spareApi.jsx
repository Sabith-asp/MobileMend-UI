import api from "./api";

export const getSpareByBookingId = async (bookingId) => {
  try {
    const response = await api.get(`/Spare/spare-by-bookingId`, {
      params: {
        bookingId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSpare = async (data) => {
  try {
    const response = await api.post(`/Spare/add`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

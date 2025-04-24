import api from "./api";

export const addRating = async (data) => {
  try {
    const response = await api.post(`/Rating/add`, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

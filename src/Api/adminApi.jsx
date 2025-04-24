import api from "./api";

export const getDashBoardData = async () => {
  try {
    const response = await api.get(`/Admin/dashboard-data`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

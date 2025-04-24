import api from "./api";

export const getDevices = async (data) => {
  try {
    const response = await api.get(`/Device/get-device`, {
      params: data,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const updateDevice = async (data) => {
  try {
    const response = await api.put(`/Device/update-device`, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const addDevice = async (data) => {
  try {
    const response = await api.post(`/Device/add-device`, data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};
export const deleteDevice = async (deviceId) => {
  try {
    const response = await api.delete(`/Device/delete-device`, {
      params: { deviceid: deviceId },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

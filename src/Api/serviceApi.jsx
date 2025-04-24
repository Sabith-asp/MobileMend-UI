import api from "./api";

export const getServices = async (data) => {
  try {
    const response = await api.get(`/Service/get-service`, {
      params: data,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateService = async (data) => {
  try {
    const response = await api.put(`/Service/update-service`, data);
    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addService = async (data) => {
  try {
    const response = await api.post(`/Service/add-service`, data);
    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteServices = async (serviceId) => {
  try {
    const response = await api.delete(`/Service/delete-service`, {
      params: {
        serviceid: serviceId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

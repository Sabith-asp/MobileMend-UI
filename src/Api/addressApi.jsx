import api from "./api";

export const getAddress = async () => {
  try {
    const response = await api.get(`/Address/get-address`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAddress = async (values) => {
  try {
    const response = await api.post(`/Address/add-address`, values);
  } catch (error) {
    console.log(error);

    throw error;
  }
};

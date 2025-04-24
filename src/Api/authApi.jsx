import toast from "react-hot-toast";
import api from "./api";

export const registerUser = async (formData) => {
  try {
    const response = await api.post(`/Auth/register`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await api.post(`/Auth/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await api.get(`/Auth/me`);
    return response.data; // { role: "User", ... }
  } catch (err) {
    throw err;
  }
};
export const logout = async () => {
  try {
    const response = await api.post(`/Auth/logout`);
    console.log(response);

    return response.data;
  } catch (err) {
    throw err;
  }
};

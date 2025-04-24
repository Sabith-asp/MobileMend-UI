// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;

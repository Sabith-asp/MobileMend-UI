// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import uiReducer from "./Slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

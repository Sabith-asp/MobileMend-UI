import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth, loginUser } from "@/Api/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/Redux/Slices/authSlice";
import { setUser } from "@/Redux/Slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .matches(
          /^[a-zA-Z0-9]+$/,
          "Username can only contain letters and numbers, no spaces"
        )
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      console.log("Login Submitted", values);
      try {
        const response = await loginUser(values);
        console.log(response);

        const userData = await checkAuth();
        console.log(userData);
        console.log("heloo");

        dispatch(loginSuccess());
        dispatch(setUser(userData));

        if (userData.role == "Technician") {
          navigate("/technician");
          return;
        }
        if (userData.role == "Admin") {
          navigate("/admin");
          return;
        }
        console.log(response);
        navigate("/");
      } catch (error) {
        console.log(error);

        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="max-w-sm mx-auto bg-gray-200 rounded-2xl text-black p-6 shadow-lg">
      <form
        className="flex flex-col gap-4 text-center"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-bold">Log in</h2>
        <p className="text-gray-600 text-sm">
          Enter your username and password to continue.
        </p>

        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Username Input */}
          <input
            type="text"
            name="userName"
            className=" w-full border-b border-gray-300 p-2 text-xs  focus:outline-none"
            placeholder="Username"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userName && formik.errors.userName && (
            <p className="text-red-500 text-xs float-start">
              {formik.errors.userName}
            </p>
          )}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            className=" w-full border-b border-gray-300 p-2 text-xs  focus:outline-none"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs float-start">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`bg-primaryblue text-white py-2 px-4 rounded-full text-base font-medium hover:bg-blue-500 transition ${
            formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {formik.isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="bg-blue-200 p-4 text-sm text-center mt-4 rounded-lg shadow-md">
        <p>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-bold text-blue-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

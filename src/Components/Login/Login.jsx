import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Login = () => {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Login Submitted", values);
      alert("Login Successful!");
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
            name="username"
            className="w-full border-b border-gray-300 p-2 focus:outline-none"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 float-start text-sm">
              {formik.errors.username}
            </p>
          )}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            className="w-full border-b border-gray-300 p-2 focus:outline-none mt-2"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 float-start text-sm">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primaryblue text-white py-2 px-4 rounded-full text-base font-medium hover:bg-blue-500 transition"
        >
          Log in
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

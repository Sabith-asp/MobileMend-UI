import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      alert("Signup Successful!");
    },
  });

  return (
    <div className="max-w-sm  mx-auto bg-gray-200 rounded-2xl text-black p-6 shadow-lg">
      <form
        className="flex flex-col gap-4 text-center"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-bold">Sign up</h2>
        <p className="text-gray-600 text-xs">
          Create a free account with your email.
        </p>

        <div className="bg-white p-4 rounded-lg shadow-md">
          {/* Full Name Input */}
          <input
            type="text"
            name="fullName"
            className="w-full border-b border-gray-300 p-2 text-xs  focus:outline-none"
            placeholder="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-red-500 text-xs float-start">
              {formik.errors.fullName}
            </p>
          )}

          {/* Email Input */}
          <input
            type="email"
            name="email"
            className="w-full border-b border-gray-300 p-2 text-xs focus:outline-none mt-2"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs float-start">
              {formik.errors.email}
            </p>
          )}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            className="w-full border-b border-gray-300 p-2 text-xs focus:outline-none mt-2"
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

          {/* Confirm Password Input */}
          <input
            type="password"
            name="confirmPassword"
            className="w-full border-b border-gray-300 p-2 text-xs focus:outline-none mt-2"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-xs float-start">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primaryblue text-white py-2 px-4 rounded-full text-base font-medium hover:bg-blue-500 transition"
        >
          Sign up
        </button>
      </form>

      <div className="bg-blue-200 p-4 text-xs text-center mt-4 rounded-lg shadow-md">
        <p>
          Have an account? <a href="#"></a>
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

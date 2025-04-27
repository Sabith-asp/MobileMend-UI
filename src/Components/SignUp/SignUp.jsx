import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/Api/authApi";
import toast from "react-hot-toast";

const InputField = ({
  name,
  type = "text",
  placeholder,
  formik,
  showToggle,
  show,
  setShow,
}) => (
  <div className="relative">
    <input
      type={showToggle && !show ? "password" : type}
      name={name}
      placeholder={placeholder}
      className="w-full border-b border-gray-300 p-2 text-xs mt-2 focus:outline-none"
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {showToggle && (
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500"
      >
        {show ? "Hide" : "Show"}
      </button>
    )}
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-xs float-start">{formik.errors[name]}</p>
    )}
  </div>
);

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces")
    .min(3, "Min 3 characters")
    .required("Full Name is required"),
  userName: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Only letters and numbers")
    .min(3, "Min 3 characters")
    .required("Username is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid Indian phone number")
    .required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .matches(/[A-Z]/, "At least one uppercase")
    .matches(/[a-z]/, "At least one lowercase")
    .matches(/\d/, "At least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await registerUser(values);
        toast.success("Registered successfully!");
        toast.success("Verify Email And Login!");
        navigate("/login");
      } catch (err) {
        console.error("Registration failed", err);
        toast.error(err.response?.data?.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-sm mx-auto bg-gray-200 rounded-2xl text-black p-6 shadow-lg">
      <form
        className="flex flex-col gap-4 text-center"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-bold">Sign up</h2>
        <p className="text-gray-600 text-xs">
          Create a free account with your email.
        </p>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <InputField name="name" placeholder="Full Name" formik={formik} />
          <InputField name="userName" placeholder="Username" formik={formik} />
          <InputField
            name="phone"
            type="text"
            placeholder="Phone Number"
            formik={formik}
          />
          <InputField
            name="email"
            type="email"
            placeholder="Email"
            formik={formik}
          />
          <InputField
            name="password"
            placeholder="Password"
            formik={formik}
            showToggle
            show={showPassword}
            setShow={setShowPassword}
          />
          <InputField
            name="confirmPassword"
            placeholder="Confirm Password"
            formik={formik}
            showToggle
            show={showConfirmPassword}
            setShow={setShowConfirmPassword}
          />
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`bg-primaryblue text-white py-2 px-4 rounded-full text-base font-medium hover:bg-blue-500 transition ${
            formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {formik.isSubmitting ? "Signing Up..." : "Sign up"}
        </button>
      </form>

      <div className="bg-blue-200 p-4 text-xs text-center mt-4 rounded-lg shadow-md">
        <p>
          Have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

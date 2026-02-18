import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import whiteLogo from "../../assets/white-logo.png";
import offwhiteLogo from "../../assets/offwhite-logo.png";
import CustomButton from "../../components/customButton/CustomButton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../redux/features/authSlice";
import FloatingInputField from "../../components/FormsFields/FloatingInputField";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be at most 50 characters")
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        ),
      password: Yup.string().required("Password is required"),
      // .min(8, "Password must be at least 8 characters")
      // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      // .matches(/[0-9]/, "Password must contain at least one number")
      // .matches(
      //   /[@$!%*?&#]/,
      //   "Password must contain at least one special character"
      // ),
    }),
    onSubmit: async (values) => {
      try {
        const res = await dispatch(loginApi(values)).unwrap();

        if (res.success) {
          const user = res.data.user;
          const role = user.role?.toLowerCase();

          if (user.isActive) {
            toast.success("Login successful!");

            if (role === "healthcoaches") {
              navigate("/health-coach-dashboard");
            } else if (role === "superadmin") {
              navigate("/super-admin-dashboard");
            } else if (role === "admin") {
              navigate("/admin-dashboard");
            }
          } else {
            toast.warning(
              "Your account is not active. Please verify your email first."
            );
          }
        } else {
          toast.error(res.message || "Login failed!");
        }
      } catch (error) {
        toast.error(error || "Something went wrong");
      }
    },
  });

  return (
    <div className="login-page min-vh-100 d-flex">
      {/* left Section */}
      <div className="login-left-section justify-content-center align-items-center flex-column text-center px-15 d-none d-lg-flex">
        <div className="left-inner">
          <div className="mb-15 mb-sm-25 mb-md-35 mb-lg-48">
            <Image
              src={whiteLogo}
              alt="logo"
              width={171}
              fluid
              loading="lazy"
            />
          </div>
          <h1 className="aa-heading-01 fw-bold text-white">
            Streamline Your Patient Care!
          </h1>
          <p className="aa-text-lg mb-0 fw-normal text-white">
            Streamline your patient management with our intuitive platform,
            making it easy to access, update, and maintain comprehensive patient
            data.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="login-form-wrapper d-flex justify-content-center align-items-center flex-column text-center p-15">
        <div className="form-inner">
          <div className="mb-20 mb-sm-30 mb-md-40 mb-lg-50">
            <div className="mb-15 mb-sm-25 mb-md-35 mb-lg-42">
              <Image
                src={offwhiteLogo}
                alt="logo"
                width={192}
                fluid
                loading="lazy"
              />
            </div>
            <h1 className="">
              Login to your
              <br />
              Wellness Workday
            </h1>
          </div>

          {/* ✅ Formik Form */}
          <form onSubmit={formik.handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-20">
              <FloatingInputField
                formik={formik}
                label={"Enter Login ID."}
                name={"username"}
                type={"text"}
              />
            </div>

            {/* Password */}
            <div className=" mb-20">
              <div className="position-relative">
                <FloatingInputField
                  formik={formik}
                  label={"Password"}
                  name={"password"}
                  type={showPassword ? "text" : "password"}
                />

                {/* 👁 Show/Hide SVG */}
                <span
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "10px",

                    // transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    // Eye Off SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94 6.06 6.06M10.58 10.58a3 3 0 0 0 4.24 4.24M12 4.5c4.58 0 8.43 2.91 9.9 7.04a10.05 10.05 0 0 1-1.64 2.88M3.24 3.24A10.05 10.05 0 0 0 1.1 8.54a9.97 9.97 0 0 0 2.25 3.4c1.73 1.73 4.08 2.97 6.65 3.31" />
                    </svg>
                  ) : (
                    // Eye SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <CustomButton
                text="Login"
                type="submit"
                loading={isLoading}
                className="btn-primary w-100"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

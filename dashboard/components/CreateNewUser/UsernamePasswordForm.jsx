import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomButton from "../customButton/CustomButton";

const UsernamePasswordForm = ({ ActiveTab, setNewUserData }) => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setNewUserData({
        username: values.username,
        password: values.password,
      });
      ActiveTab("userRoles", { username: values.username, password: values.password });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="custom-card p-0 mb-20">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">
            Username/Password
          </h5>
        </div>
        <div className="devider" />
        <div className="p-15 p-sm-24">
          <div className="row g-4">
            <div className="col-12">
              <FloatingInputField
                formik={formik}
                label="Username*"
                name="username"
                type="text"
              />
            </div>

            <div className="col-12 col-md-6">
              <FloatingInputField
                formik={formik}
                label="Password*"
                name="password"
                type="password"
              />
            </div>
            <div className="col-12 col-md-6">
              <FloatingInputField
                formik={formik}
                label="Confirm Password*"
                name="confirmPassword"
                type="password"
              />
            </div>
          </div>
          
        </div>
      </div>
      <div className="devider" />
      <div className="d-flex justify-content-between mt-20">
        <CustomButton
          className="btn-outline-primary rounded-pill"
          text="Back"
          type="button"
          onClick={() => ActiveTab("userInformation")}
        />
        <CustomButton
          className="btn-primary rounded-pill"
          text="Next"
          type="button"
          onClick={() => formik.handleSubmit()}
        />
      </div>
    </form>
  );
};

export default UsernamePasswordForm;

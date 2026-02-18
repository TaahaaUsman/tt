import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../customButton/CustomButton";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";

const SelectLoaction = ({ activeTab }) => {
  const locationOptions = ["New York", "Chicago", "Los Angeles", "Houston"];
  const departmentOptions = ["Health", "HR", "Finance", "Operations"];

  const formik = useFormik({
    initialValues: {
      companyName: "",
      location: "",
      department: "",
      shift: "morning",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      department: Yup.string().required("Required"),
      shift: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Work Location Data:", values);
      activeTab("workStatus");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="custom-card p-0">
        <div className="border-bottom p-15 p-sm-24">
          <h2 className="aa-text-md fw-semibold mb-8">Work Location</h2>
        </div>

        <div className="row p-15 p-sm-24">
          {/* Company Name */}
          <div className="col-12 mb-20">
            <FloatingInputField
              formik={formik}
              label="Company Name*"
              name="companyName"
              type="text"
            />
          </div>

          {/* Select Location */}
          <div className="col-12 mb-20">
            <CustomSingleSelect
              formik={formik}
              label="Select Location*"
              name="location"
              options={locationOptions}
              placeholder="Select Location"
            />
          </div>

          {/* Select Departments */}
          <div className="col-12 mb-20">
            <CustomSingleSelect
              formik={formik}
              label="Select Departments*"
              name="department"
              options={departmentOptions}
              placeholder="Select Department"
            />
          </div>

          {/* Shifts */}
          <div className="col-12 mb-10">
            <div className="d-flex align-items-center gap-2 gap-sm-4 flex-wrap">
              <p className="aa-text-sm fw-medium mb-0">Shifts:</p>
              {[
                { label: "Morning", value: "morning" },
                { label: "Evening", value: "evening" },
              ].map((shift) => (
                <label
                  key={shift.value}
                  className="d-flex align-items-center gap-2 aa-text-xs fw-medium text-primary"
                >
                  <input
                    type="radio"
                    name="shift"
                    value={shift.value}
                    checked={formik.values.shift === shift.value}
                    onChange={() => formik.setFieldValue("shift", shift.value)}
                    className="custom-radio"
                  />
                  {shift.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="devider my-16" />
      {/* ---------- SUBMIT BUTTON ---------- */}
      <div className="col-12 d-flex justify-content-end">
        <CustomButton
          className="rounded-pill btn-primary"
          text="Save & Continue"
          type="submit"
        />
      </div>
    </form>
  );
};

export default SelectLoaction;

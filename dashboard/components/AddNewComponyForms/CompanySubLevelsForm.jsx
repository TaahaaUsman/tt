import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PlusBorderIcon } from "../../assets/Svgs/Svgs";
import CustomButton from "../customButton/CustomButton";
import FloatingInputField from "../FormsFields/FloatingInputField";
import { useDispatch, useSelector } from "react-redux";
import { createCompanyStepThree } from "../../redux/features/companySlice";
import toast from "react-hot-toast";

const CompanySubLevelsForm = ({ ActiveTab }) => {
  const dispatch = useDispatch();
  // Remember currentCompany is only id
  const { currentCompany } = useSelector((state) => state.companies);

  const formik = useFormik({
    initialValues: {
      parentCompany: "",
      locations: [""],
      departments: [""],
      shift: "",
    },
    validationSchema: Yup.object({
      parentCompany: Yup.string().required("Parent Company is required"),
      locations: Yup.array().of(Yup.string().required("Location is required")),
      departments: Yup.array().of(
        Yup.string().required("Department is required")
      ),
      shift: Yup.string().required("Shift is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        shift: values.shift === "morning" ? "Morning" : "Evening",
        locations: values.locations.filter(Boolean),
        departments: values.departments.filter(Boolean),
      };

      dispatch(
        createCompanyStepThree({
          currentCompany: currentCompany?.id, 
          data: payload,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Company Created successfully");
        })
        .catch((err) => {
          console.error("STEP 3 ERROR:", err);
          toast.error(err?.message || "Failed to create company");
        });
    },
  });

  const handleAddLocation = () => {
    formik.setFieldValue("locations", [...formik.values.locations, ""]);
  };

  const handleRemoveLocation = (index) => {
    const newLocations = formik.values.locations.filter((_, i) => i !== index);
    formik.setFieldValue("locations", newLocations);
  };

  const handleAddDepartment = () => {
    formik.setFieldValue("departments", [...formik.values.departments, ""]);
  };

  const handleRemoveDepartment = (index) => {
    const newDepartments = formik.values.departments.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("departments", newDepartments);
  };

  return (
    <>
      <div className="custom-card p-0">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">Company Sub Levels</h5>
        </div>
        <div className="devider"></div>

        <div className="p-15 p-sm-24">
          {/* Parent Company */}
          <div className="row mb-24">
            <div className="col-md-2 d-flex align-items-center">
              <label className="aa-text-base fw-medium mb-10 mb-md-0">
                Parent Company:
              </label>
            </div>
            <div className="col-md-10">
              <FloatingInputField
                formik={formik}
                label="Company Name"
                name="parentCompany"
              />
            </div>
          </div>
          <div className="devider my-24" />
          {/* Locations */}
          <div className="row">
            <div className="col-md-2">
              <label className="aa-text-base fw-medium mb-10 mb-md-0 mt-3">
                Locations:
              </label>
            </div>
            <div className="col-md-10">
              {formik.values.locations.map((location, idx) => (
                <div key={idx} className="d-flex gap-2 mb-3 align-items-center">
                  <div className="flex-grow-1">
                    <FloatingInputField
                      formik={formik}
                      label="Location"
                      name={`locations[${idx}]`}
                      value={location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.values.locations.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveLocation(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-link text-decoration-none text-primary p-0 d-inline-flex gap-2 align-items-center fw-medium aa-text-xs"
                onClick={handleAddLocation}
              >
                <PlusBorderIcon color="#153f68" /> Add a New Location
              </button>
            </div>
          </div>
          <div className="devider my-24" />
          {/* Departments */}
          <div className="row">
            <div className="col-md-2">
              <label className="aa-text-base fw-medium mb-10 mb-md-0 mt-3">
                Departments:
              </label>
            </div>
            <div className="col-md-10">
              {formik.values.departments.map((dept, idx) => (
                <div key={idx} className="d-flex gap-2 mb-3 align-items-center">
                  <div className="flex-grow-1">
                    <FloatingInputField
                      formik={formik}
                      label="Departments"
                      name={`departments[${idx}]`}
                      value={dept}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.values.departments.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveDepartment(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-link text-decoration-none text-primary p-0 d-inline-flex gap-2 align-items-center fw-medium aa-text-xs"
                onClick={handleAddDepartment}
              >
                <PlusBorderIcon color="#153f68" /> Add a New Department
              </button>
            </div>
          </div>

          <div className="devider my-24" />
          {/* Shifts */}
          <div className="row">
            <div className="col-md-2 d-flex align-items-center">
              <label className="aa-text-base fw-medium mb-10 mb-md-0">
                Shifts:
              </label>
            </div>
            <div className="col-md-10">
              <div className="d-flex gap-4 align-items-center">
                <div className="form-check gap-2 align-items-center">
                  <input
                    className=" custom-radio ms-0"
                    type="radio"
                    name="shift"
                    id="morning"
                    value="morning"
                    checked={formik.values.shift === "morning"}
                    onChange={formik.handleChange}
                  />
                  <label
                    className="form-check-label aa-text-xs fw-medium text-primary"
                    htmlFor="morning"
                  >
                    Morning
                  </label>
                </div>
                <div className="form-check gap-2 align-items-center">
                  <input
                    className=" custom-radio ms-0"
                    type="radio"
                    name="shift"
                    id="evening"
                    value="evening"
                    checked={formik.values.shift === "evening"}
                    onChange={formik.handleChange}
                  />
                  <label
                    className="form-check-label aa-text-xs fw-medium text-primary"
                    htmlFor="evening"
                  >
                    Evening
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="devider my-24" />
      {/* Action Buttons */}
      <div className="d-flex justify-content-between align-items-center gap-3">
        <CustomButton
          text="Back"
          className="btn-outline-primary rounded-pill"
          onClick={() => ActiveTab("insuranceInformation")}
        />
        <CustomButton
          text="Save & Continue"
          className="btn-primary rounded-pill"
          disabled={!currentCompany}
          onClick={formik.handleSubmit}
        />
      </div>
    </>
  );
};

export default CompanySubLevelsForm;

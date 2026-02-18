import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";
import CustomButton from "../customButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompanyStepTwo,
} from "../../redux/features/companySlice";
import toast from "react-hot-toast";

const InsuranceInformationForm = ({ ActiveTab }) => {
  const { currentCompany } = useSelector((state) => state.companies || null);
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    zip: Yup.string().matches(
      /^\d{5}(-\d{4})?$/,
      "Enter a valid ZIP (e.g. 12345 or 12345-6789)"
    ),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      insuranceCarrier: "",
      insurancePolicy: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!currentCompany) {
        toast.error("Company ID not found. Please complete Step 1.");
        return;
      }

      const payload = {
        insuranceCarrier: values.insuranceCarrier,
        insurancePolicy: values.insurancePolicy,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: values.country,
      };

      console.log(currentCompany, payload);
      try {
        await dispatch(
          createCompanyStepTwo({
            currentCompany,
            data: payload,
          })
        ).unwrap();

        toast.success("Insurance information saved successfully!");

        // 👉 move tab ONLY after success
        ActiveTab("companySubLevels");
      } catch (error) {
        toast.error(error || "Failed to save insurance information");
      }
    },
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="custom-card p-0 mb-20">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">
            Insurance Information
          </h5>
        </div>

        <div className="devider"></div>

        <div className="row g-4 p-15 p-sm-24">
          {/* Top two fields */}
          {[
            { name: "insuranceCarrier", label: "Insurance Carrier" },
            { name: "insurancePolicy", label: "Insurance Policy" },
            { name: "addressLine1", label: "Address Line 1" },
            { name: "addressLine2", label: "Address Line 2" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "zip", label: "Zip" },
          ].map((field, i) => (
            <div className="col-12 col-md-6" key={i}>
              <FloatingInputField
                formik={formik}
                label={field.label}
                name={field.name}
                type="text"
              />
            </div>
          ))}

          {/* Country dropdown */}
          <div className="col-12 col-md-6">
            <CustomSingleSelect
              formik={formik}
              label="Country*"
              name="country"
              options={["US", "UK", "CA"]}
              placeholder="Country"
            />
          </div>
        </div>
      </div>

      <div className="devider mb-20"></div>
      <div className="d-flex justify-content-between flex-wrap gap-3">
        <CustomButton
          className="btn-outline-primary rounded-pill"
          type="button"
          text="Back"
          onClick={() => ActiveTab("companyInformation")}
        />
        <CustomButton
          className="btn-primary rounded-pill"
          type="submit"
          disabled={!currentCompany}
          text="Save & Continue"
        />
      </div>
    </form>
  );
};

export default InsuranceInformationForm;

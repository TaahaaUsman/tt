import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";
import SwitchField from "../FormsFields/SwitchField";
import CustomButton from "../customButton/CustomButton";
import { createCompanyStepOne, setCurrentCompany } from "../../redux/features/companySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const CompanyInformationForm = ({ ActiveTab }) => {
  const dispatch = useDispatch();

  // Regex patterns
  const phoneRegExp = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const zipRegExp = /^\d{5}(-\d{4})?$/;

  // Auto-format handler
  const handleInputFormat = (e, name) => {
    let value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    if (name === "zip") {
      if (value.length > 5) value = value.slice(0, 9);
      if (value.length > 5) value = value.slice(0, 5) + "-" + value.slice(5);
    } else if (["contactName", "phoneNumber", "faxNumber"].includes(name)) {
      if (value.length > 10) value = value.slice(0, 10);
      if (value.length > 6)
        value =
          "(" +
          value.slice(0, 3) +
          ") " +
          value.slice(3, 6) +
          "-" +
          value.slice(6);
      else if (value.length > 3)
        value = "(" + value.slice(0, 3) + ") " + value.slice(3);
    }
    e.target.value = value;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      identifyingName: "",
      companyCode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      contactName: "",
      phoneNumber: "",
      phoneExtension: "",
      faxNumber: "",
      email: "",
      federalTaxId: "",
      employeeCount: "",
      companyType: "",
      businessNature: "",
      progressLevel: "",
      dataImport: "",
      dataExport: "",
      reminderTimingDays: "",
      missedAppointmentDays: "",
      inactiveTimingDays: "",
      wellnessActivitiesReset: "",
      contact_name: "",
      missedAptPostcardText: "",
      // switches
      selfInsured: false,
      active: false,
      allowAccessToPwp: false,
      allowAccessToValidic: false,
      enableOnlineHra: false,
      onlineBiometricRequired: false,
      conditionManagement: false,
      wellbeingWheel: false,
      enableInternalMessaging: false,
      enableMailings: false,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Company name is required"),
      companyCode: Yup.string().required("Company code is required"),
      employeeCount: Yup.number()
        .typeError("Employee count must be a number")
        .required("Employee count is required"),

      reminder_timing: Yup.number().required("Reminder timing is required"),

      missed_appointment: Yup.number().required(
        "Missed appointment is required"
      ),

      zip: Yup.string()
        .matches(zipRegExp, "Enter valid US ZIP (12345 or 12345-6789)")
        .nullable(),

      email: Yup.string().email("Enter a valid email address").nullable(),

      contactName: Yup.string().nullable(),

      phoneNumber: Yup.string()
        .matches(phoneRegExp, "Enter valid phone number (e.g., (123) 456-7890)")
        .nullable(),

      faxNumber: Yup.string()
        .matches(phoneRegExp, "Enter valid fax number (e.g., (123) 456-7890)")
        .nullable(),
    }),

    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        identifyingName: values.identifyingName,
        companyCode: values.companyCode,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        zip: values.zip,
        country: values.country,

        contactName: values.contactName,
        phoneNumber: values.phoneNumber,
        federalTaxId: values.federalTaxId,
        employeeCount: Number(values.employeeCount),

        companyType: values.companyType,
        businessNature: values.businessNature?.toLowerCase(),
        progressLevel: values.progressLevel?.toLowerCase(),

        selfInsured: values.selfInsured,
        active: values.active,
        allowAccessToPwp: values.allowAccessToPwp,
        allowAccessToValidic: values.allowAccessToValidic,
        enableOnlineHra: values.enableOnlineHra,
        onlineBiometricRequired: values.onlineBiometricRequired,
        conditionManagement: values.conditionManagement,
        wellbeingWheel: values.wellbeingWheel,
        enableInternalMessaging: values.enableInternalMessaging,

        dataImport: values.dataImport,
        dataExport: values.dataExport,

        reminderTimingDays: Number(values.reminder_timing),
        missedAppointmentDays: Number(values.missed_appointment),
        inactiveTimingDays: Number(values.inactive_timing),

        wellnessActivitiesReset: values.wellness_activites_reset,
        missedAptPostcardText: values.missed_apt_postcard_text,

        enableMailings: values.enableEmail,
      };

      try {
        const result = await dispatch(createCompanyStepOne(payload)).unwrap();

        // 🔑 extract companyId
        const companyId = result?.data?.company?.id;

        if (!companyId) {
          toast.error("Company ID not returned from server");
          return;
        }

        // ✅ store in redux
        dispatch(setCurrentCompany(companyId));

        toast.success(result?.message || "Company information saved successfully!");

        // 👉 move tab only AFTER ID is saved
        ActiveTab("insuranceInformation");
      } catch (error) {
        toast.error(error?.message || "Failed to save company information.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* --- Company Info Card --- */}
      <div className="custom-card p-0 mb-20">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">
            Company Information
          </h5>
        </div>
        <div className="devider"></div>
        <div className="row g-4 p-15 p-sm-24">
          {[
            { name: "name", label: "Company Name*" },
            { name: "identifyingName", label: "Identifying Name" },
            { name: "companyCode", label: "Company Code*" },
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
                type={field.type || "text"}
                onInput={
                  field.name === "zip" ||
                  field.name === "contactName" ||
                  field.name === "phoneNumber" ||
                  field.name === "faxNumber"
                    ? (e) => handleInputFormat(e, field.name)
                    : undefined
                }
              />
            </div>
          ))}

          <div className="col-12 col-md-6">
            <CustomSingleSelect
              formik={formik}
              label={"Country"}
              name={"country"}
              options={["US", "UK"]}
              placeholder="Country"
            />
          </div>

          {[
            { name: "contactName", label: "Contact Name", type: "text" },
            { name: "phoneNumber", label: "Phone Number", type: "tel" },
            {
              name: "phoneExtension",
              label: "Phone Extension",
              type: "number",
            },
            { name: "faxNumber", label: "Fax Number", type: "tel" },
            { name: "email", label: "Email Address", type: "email" },
            { name: "federalTaxId", label: "Federal Tax Id" },
            {
              name: "employeeCount",
              label: "Employee Count*",
              type: "number",
            },
          ].map((field, i) => (
            <div className="col-12 col-md-6" key={i}>
              <FloatingInputField
                formik={formik}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                onInput={
                  field.name === "zip" ||
                  field.name === "contactName" ||
                  field.name === "phoneNumber" ||
                  field.name === "faxNumber"
                    ? (e) => handleInputFormat(e, field.name)
                    : undefined
                }
              />
            </div>
          ))}

          <div className="col-12 col-md-6">
            <CustomSingleSelect
              formik={formik}
              label={"Company Type"}
              placeholder={"Company Type"}
              name={"companyType"}
              options={["LLC"]}
            />
          </div>
          <div className="col-12 col-md-6">
            <CustomSingleSelect
              formik={formik}
              label={"Business Nature"}
              placeholder={"Business Nature"}
              name={"businessNature"}
              options={["Medical"]}
            />
          </div>
          <div className="col-12">
            <CustomSingleSelect
              formik={formik}
              label={"Progress Level"}
              placeholder={"Progress Level"}
              name={"progressLevel"}
              options={["Entry"]}
            />
          </div>

          <ul className="list-unstyled d-flex flex-wrap row-gap-2 column-gap-3 column-gap-lg-4">
            {[
              { name: "selfInsured", label: "Self Insured" },
              { name: "active", label: "Active" },
              { name: "allowAccessToPwp", label: "Allow Access to PWP" },
              { name: "allowAccessToValidic", label: "Allow Access to Valiic" },
              { name: "enableOnlineHra", label: "Enable Online HRA" },
              {
                name: "onlineBiometricRequired",
                label: "Online Biometric Required",
              },
              { name: "conditionManagement", label: "Condition Management" },
              { name: "wellbeingWheel", label: "Wellbeing Wheel" },
              {
                name: "enableInternalMessaging",
                label: "Enable Internal Message",
              },
            ].map((fields, i) => (
              <li key={i}>
                <SwitchField
                  formik={formik}
                  label={fields?.label}
                  name={fields?.name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- Second Card --- */}
      <div className="custom-card p-15 p-sm-24 mb-20">
        <div className="row g-4">
          {[
            { label: "Data Import", name: "dataImport", options: ["none"] },
            { label: "Data Export", name: "dataExport", options: ["none"] },
          ].map((field, i) => (
            <div className="col-12 col-md-6" key={i}>
              <CustomSingleSelect
                formik={formik}
                label={field?.label}
                name={field?.name}
                options={field?.options}
                placeholder={field?.label}
              />
            </div>
          ))}

          {[
            {
              label: "Reminder Timing*",
              name: "reminderTimingDays",
              type: "number",
            },
            {
              label: "Missed Appointment*",
              name: "missedAppointmentDays",
              type: "number",
            },
            {
              label: "Inactive Timing",
              name: "inactiveTimingDays",
              type: "number",
            },
            {
              label: "Wellness Activites Reset",
              name: "wellnessActivitiesReset",
              type: "month",
            },
          ].map((field, i) => (
            <div className="col-12 col-md-6" key={i}>
              <FloatingInputField
                formik={formik}
                label={field?.label}
                name={field?.name}
                type={field?.type || "text"}
                onInput={(e) => handleInputFormat(e, field.name)}
              />
            </div>
          ))}

          <div className="col-12">
            <FloatingInputField
              formik={formik}
              label={"Missed Apt Postcard Text"}
              name={"missedAptPostcardText"}
              type={"textarea"}
            />
          </div>
          <div className="col-12">
            <div className="d-inline-flex">
              <SwitchField
                formik={formik}
                label={"Enable Mailings"}
                name={"enableMailings"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="devider mb-20"></div>
      <div className="d-flex justify-content-end flex-wrap gap-3">
        <CustomButton
          className="btn-primary rounded-pill"
          type="submit"
          text="Save & Update"
        />
      </div>
    </form>
  );
};

export default CompanyInformationForm;

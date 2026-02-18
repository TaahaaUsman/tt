import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../customButton/CustomButton";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomMultiSelect from "../FormsFields/CustomMultiSelect";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";
import SwitchField from "../FormsFields/SwitchField";

const ParticipantForm = ({ activeTab }) => {
  // Refs for all dropdowns
  const genderDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);
  const raceDropdownRef = useRef(null);
  const maritalDropdownRef = useRef(null);

  // Dropdown states
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showRaceDropdown, setShowRaceDropdown] = useState(false);
  const [showMaritalDropdown, setShowMaritalDropdown] = useState(false);

  // Dropdown options
  const companies = ["OMC Training", "Wellness Works", "ABC Corp"];
  const participantTypes = ["Employee", "Child", "Spouse"];
  const genders = ["Male", "Female", "Other"];
  const languages = ["English", "Spanish", "French"];
  const races = ["Asian", "White", "Black", "Hispanic"];
  const maritalStatuses = ["Single", "Married", "Divorced", "Widowed"];
  const countries = ["Pakistan", "USA", "UK", "Canada", "Australia"];

  // Formik setup
  const formik = useFormik({
    initialValues: {
      company: [],
      participantType: [],
      employeeId: "",
      alternateId: "",
      medicalInsurance: "",
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      dob: "",
      gender: "",
      language: "",
      race: "",
      maritalStatus: "",
      preferredContact: "",
      homePhone: "",
      mobilePhone: "",
      workPhone: "",
      email: "",
      generalComments: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      companyMedicalInsurance: false,
      healthCoach: false,
    },
    validationSchema: Yup.object({
      company: Yup.array().min(1, "Company is required"),
      participantType: Yup.array()
        .min(1, "Please select at least one type")
        .required("Participant Type is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      activeTab("workLoaction");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="custom-card p-0">
        <div className="border-bottom p-15 p-sm-24">
          <h2 className="aa-text-md fw-semibold mb-0">Participant</h2>
        </div>
        <div className="row p-15 p-sm-24">
          {/* ---------- COMPANY ---------- */}
          <div className="col-12 col-md-6 mb-20">
            <CustomMultiSelect
              label={"Company*"}
              formik={formik}
              options={companies}
              name={"company"}
              placeholder="Select Company*"
            />
          </div>

          {/* Participant Type Multi-select */}
          <div className="col-12 col-md-6 mb-20">
            <CustomMultiSelect
              label={"Participant Type*"}
              formik={formik}
              options={participantTypes}
              name={"participantType"}
              placeholder="Select Participant Type*"
            />
          </div>

          {/* ---------- INPUT FIELDS ---------- */}
          {[
            { name: "employeeId", label: "Employee ID" },
            { name: "alternateId", label: "Alternate ID" },
            { name: "medicalInsurance", label: "Medical Insurance" },
            { name: "firstName", label: "First Name*" },
            { name: "middleName", label: "Middle Name" },
            { name: "lastName", label: "Last Name*" },
            { name: "suffix", label: "Suffix" },
            { name: "dob", label: "Date of Birth", type: "date" },
            { name: "preferredContact", label: "Preferred Contact" },
            { name: "homePhone", label: "Home Phone" },
            { name: "mobilePhone", label: "Mobile Phone" },
            { name: "workPhone", label: "Work Phone" },
            { name: "email", label: "Email" },
            { name: "addressLine1", label: "Address Line 1" },
            { name: "addressLine2", label: "Address Line 2" },
            { name: "city", label: "City" },
            { name: "state", label: "State" },
            { name: "zip", label: "ZIP" },
          ].map((field, index) => (
            <div className="col-12 col-md-6 mb-20" key={index}>
              <FloatingInputField
                formik={formik}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
              />
            </div>
          ))}

          {/* ---------- COUNTRY SELECT ---------- */}
          <div className="col-12 col-md-6 mb-20 position-relative">
            <CustomSingleSelect
              formik={formik}
              label={"Country"}
              name={"country"}
              options={countries}
              placeholder="Select Country"
            />
          </div>

          {/* ---------- GENERAL COMMENTS TEXTAREA ---------- */}
          <div className="col-12 col-md-6 mb-20">
            <FloatingInputField
              label={"General Comments"}
              name={"generalComments"}
              as="textarea"
              type="textarea"
              formik={formik}
              className="textarea"
            />
          </div>

          {/* ---------- DROPDOWNS (Gender, Language, Race, Marital) ---------- */}
          {[
            {
              label: "Gender*",
              name: "gender",
              options: genders,
              state: showGenderDropdown,
              setState: setShowGenderDropdown,
              ref: genderDropdownRef,
            },
            {
              label: "Language",
              name: "language",
              options: languages,
              state: showLanguageDropdown,
              setState: setShowLanguageDropdown,
              ref: languageDropdownRef,
            },
            {
              label: "Race",
              name: "race",
              options: races,
              state: showRaceDropdown,
              setState: setShowRaceDropdown,
              ref: raceDropdownRef,
            },
            {
              label: "Marital Status",
              name: "maritalStatus",
              options: maritalStatuses,
              state: showMaritalDropdown,
              setState: setShowMaritalDropdown,
              ref: maritalDropdownRef,
            },
          ].map(({ label, name, options, state, setState, ref }, i) => (
            <div className="col-12 col-md-6 mb-20" key={i}>
              <CustomSingleSelect
                formik={formik}
                label={label}
                name={name}
                options={options}
                state={state}
                setState={setState}
                ref={ref}
                placeholder={`Select ${label}`}
              />
            </div>
          ))}

          {/* ---------- TOGGLES ---------- */}
          <div className="col-12 d-flex mb-20">
            <SwitchField
              label="Company Medical Insurance"
              name="companyMedicalInsurance"
              formik={formik}
            />

            <SwitchField
              label="Health Coach"
              name="healthCoach"
              formik={formik}
            />
          </div>
        </div>
      </div>
      <div className="devider my-16" />
      {/* ---------- SUBMIT ---------- */}
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

export default ParticipantForm;

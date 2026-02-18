import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../customButton/CustomButton";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";
import SwitchField from "../FormsFields/SwitchField";
import ConsentDetailOffcanvas from "../ConsentDetailOffcanvas/ConsentDetailOffcanvas";
// API things
import { useDispatch, useSelector } from "react-redux";
import {
  createConsent,
  deleteConsent,
  updateConsent,
  fetchAllConsents,
  fetchConsentCompanies,
} from "../../redux/features/consentSlice";
import Loader from "../Loader/Loader";
import CustomDatePicker from "../DatePicker/DatePicker";

// fafda
const ConsentStatementInformationFrom = ({ paramId }) => {
  const dispatch = useDispatch();
  const { consents, companies, loading } = useSelector(
    (state) => state.consent || {}
  );

  // Ensure we have latest consents when editing directly via URL
  useEffect(() => {
    if (paramId && (!consents || !consents.length)) {
      dispatch(fetchAllConsents());
    }
    dispatch(fetchConsentCompanies());
  }, [paramId, consents, dispatch]);

  const [consentDetailOffcanvas, setConsentDetailOffcanvas] = useState(false);
  const [consentDetails, setConsentDetails] = useState(null);
  const validationSchema = Yup.object({
    consent_statement_name: Yup.string().required(
      "Consent Statement Name is required"
    ),
    consent_frequency: Yup.string().nullable(),
    company: Yup.string().required("Company is required"),
    sort_order: Yup.number().required("Sort Order is required"),
    date_added: Yup.date().nullable(),
    consent_statement_text: Yup.string().required(
      "Consent Statement Text is required"
    ),
    required: Yup.boolean(),
    answer_required: Yup.boolean(),
    cost_risk_consent: Yup.boolean(),
    active: Yup.boolean(),
  });

  const companyOptions =
    Array.isArray(companies) && companies.length
      ? companies.map(
          (c) => c?.name || c?.identifyingName || c?.identifying_name || c?.id
        )
      : [];

  const getConsentPayload = (values, companies) => {
    let companyIds = [];

    if (values.company === "All") {
      companyIds = companies.map((c) => c.id);
    } else if (values.company) {
      const selectedCompany = companies.find(
        (c) =>
          c?.name === values.company ||
          c?.identifyingName === values.company ||
          c?.identifying_name === values.company
      );
      if (selectedCompany) {
        companyIds = [selectedCompany.id];
      } else {
        console.warn(`Company not found: ${values.company}`);
      }
    }

    return {
      name: values.consent_statement_name,
      frequencyDays: values.consent_frequency
        ? Number(values.consent_frequency)
        : null,
      sortOrder: Number(values.sort_order),
      dateAdded: values.date_added ? values.date_added : null,
      text: values.consent_statement_text,
      required: values.required,
      answerRequired: values.answer_required,
      costRiskConsent: values.cost_risk_consent,
      active: values.active,
      companyIds: companyIds,
    };
  };

  //     "name": "Wellness Training super admin",
  //     "frequencyDays": 30,
  //     "sortOrder": 1,
  //     "dateAdded": "2025-08-22",
  //     "text": "This is a sample consent statement...",
  //     "required": true,
  //     "answerRequired": false,
  //     "costRiskConsent": false,
  //     "active": true,
  //     "companyIds": ["ace9b224-97a9-4a91-adaa-f785d54c389c"]

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      consent_statement_name: "",
      consent_frequency: "",
      company: "",
      sort_order: "",
      date_added: "",
      consent_statement_text: "",
      required: false,
      answer_required: false,
      cost_risk_consent: false,
      active: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const consentPayload = getConsentPayload(values, companies);
      setConsentDetails({ ...consentPayload });
      if (paramId) {
        return dispatch(
          updateConsent({ consentId: paramId, data: consentPayload })
        )
          .unwrap()
          .then(() => setConsentDetailOffcanvas(true));
      } else {
        return dispatch(createConsent(consentPayload))
          .unwrap()
          .then(() => setConsentDetailOffcanvas(true));
      }
    },
  });

  // ✅ Auto-fill form when editing (paramId present)
  useEffect(() => {
    if (!paramId || !Array.isArray(consents) || !consents.length) return;

    const selectedConsent = consents.find(
      (c) => String(c.id) === String(paramId)
    );

    if (!selectedConsent) return;

    // Derive company display value
    let companyValue = "";
    if (
      Array.isArray(selectedConsent.companies) &&
      selectedConsent.companies.length
    ) {
      // If only one company, show its name; if multiple, show "All"
      if (selectedConsent.companies.length === 1) {
        const co = selectedConsent.companies[0];
        companyValue =
          co?.name || co?.identifyingName || co?.identifying_name || "";
      } else {
        companyValue = "All";
      }
    } else if (
      Array.isArray(selectedConsent.companyIds) &&
      selectedConsent.companyIds.length &&
      Array.isArray(companies)
    ) {
      // Handle case where we only have IDs
      if (selectedConsent.companyIds.length === 1) {
        const co = companies.find(
          (c) => c.id === selectedConsent.companyIds[0]
        );
        if (co) {
          companyValue =
            co?.name || co?.identifyingName || co?.identifying_name || "";
        }
      } else {
        companyValue = "All";
      }
    }

    formik.setValues({
      consent_statement_name: selectedConsent.name || "",
      consent_frequency:
        selectedConsent.frequencyDays != null
          ? String(selectedConsent.frequencyDays)
          : "",
      company: companyValue,
      sort_order:
        selectedConsent.sortOrder != null
          ? String(selectedConsent.sortOrder)
          : "",
      date_added: selectedConsent.dateAdded || "",
      consent_statement_text: selectedConsent.text || "",
      required: !!selectedConsent.required,
      answer_required: !!selectedConsent.answerRequired,
      cost_risk_consent: !!selectedConsent.costRiskConsent,
      active: !!selectedConsent.active,
    });

    // Also keep details in local state for offcanvas
    setConsentDetails({ ...selectedConsent });
  }, [paramId, consents, companies]);

  if (loading && (!consents || !consents.length) && paramId) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="custom-card p-0">
          <div className="p-15 p-sm-24">
            <h5 className="aa-heading-05 fw-semibold mb-0">
              Add New Consent Statement Information
            </h5>
          </div>
          <div className="devider" />
          <div className="p-15 p-sm-24">
            <div className="row g-4">
              {/* Consent Statement Name & Frequency */}
              {[
                {
                  label: "Consent Statement Name*",
                  name: "consent_statement_name",
                },
                {
                  label: "Consent Frequency (days)",
                  name: "consent_frequency",
                },
              ].map((field, i) => (
                <div className="col-12 col-md-6" key={i}>
                  <FloatingInputField
                    formik={formik}
                    label={field.label}
                    name={field.name}
                  />
                </div>
              ))}

              {/* Company */}
              <div className="col-12 col-md-6">
                <CustomSingleSelect
                  formik={formik}
                  label={"Company"}
                  name={"company"}
                  options={["All", ...companyOptions]}
                  placeholder="Company"
                />
              </div>

              <div className="col-12 col-md-6">
                <CustomDatePicker
                  formik={formik}
                  name="date_added"
                  label="Date Added"
                />
              </div>

              {/* Sort Order, Date Added, Consent Text */}
              {[
                {
                  label: "Sort Order*",
                  name: "sort_order",
                  type: "number",
                },
                {
                  label: "Consent Statement Text*",
                  name: "consent_statement_text",
                  type: "textarea",
                },
              ].map((field, i) => (
                <div className="col-12 col-md-6" key={i}>
                  <FloatingInputField
                    formik={formik}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                  />
                </div>
              ))}

              {/* Switch Fields */}
              <ul className="list-unstyled d-inline-flex flex-wrap gap-2 gap-sm-3">
                {[
                  {
                    label: "Required",
                    name: "required",
                  },
                  {
                    label: "Answer Required",
                    name: "answer_required",
                  },
                  {
                    label: "Cost Risk Consent",
                    name: "cost_risk_consent",
                  },
                  {
                    label: "Active",
                    name: "active",
                  },
                ].map((field, i) => (
                  <li key={i}>
                    <SwitchField
                      formik={formik}
                      label={field.label}
                      name={field.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="devider my-20" />
        <div className="d-flex justify-content-end gap-2">
          <CustomButton
            type="button"
            text={!paramId ? "Save Consent" : "Save & Update"}
            className="btn-primary rounded-pill"
            action={async () => {
              await formik.validateForm();
              if (Object.keys(formik.errors).length > 0) {
                throw new Error("Please correct the form errors.");
              }
              const consentPayload = getConsentPayload(
                formik.values,
                companies
              );
              setConsentDetails({ ...consentPayload });
              if (paramId) {
                return dispatch(
                  updateConsent({ consentId: paramId, data: consentPayload })
                )
                  .unwrap()
                  .then(() => setConsentDetailOffcanvas(true));
              } else {
                return dispatch(createConsent(consentPayload))
                  .unwrap()
                  .then(() => setConsentDetailOffcanvas(true));
              }
            }}
            successMessage={
              paramId
                ? "Consent updated successfully!"
                : "Consent created successfully!"
            }
            errorMessage={
              paramId
                ? "Failed to update consent."
                : "Failed to create consent."
            }
          />
          {paramId && (
            <CustomButton
              type="button"
              text={"Delete item"}
              className="btn-primary rounded-pill"
              action={() => dispatch(deleteConsent(paramId)).unwrap()}
              successMessage={"Consent deleted successfully!"}
              errorMessage={"Failed to delete consent."}
            />
          )}
        </div>
      </form>

      <ConsentDetailOffcanvas
        popup={consentDetailOffcanvas}
        onClose={() => setConsentDetailOffcanvas(false)}
        consentDetails={consentDetails}
      />
    </>
  );
};

export default ConsentStatementInformationFrom;

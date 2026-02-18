import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import GoBack from "../../../components/GoBack/GoBack";
import FloatingInputField from "../../../components/FormsFields/FloatingInputField";
import SwitchField from "../../../components/FormsFields/SwitchField";
import CustomButton from "../../../components/customButton/CustomButton";
import { useDispatch } from "react-redux";
import { deleteConsent } from '../../../redux/features/consentSlice'
import { useParams } from "react-router-dom";


const AddNewConsents = () => {
  const { id } = useParams();
  console.log(id)

  const dispatch = useDispatch();

  const handleDeleteConsent = () => {
    if(!id){
      console.log("An error has been occur");
      return;
    }

    dispatch(deleteConsent(id));
    console.log("consent deleted");
    return;

  }
  // Initial values
  const initialValues = {
    consent_statement_name: "",
    consent_frequency: "",
    company: "",
    sort_order: "",
    required: "",
    answer_required: "",
    cost_risk_consent: "",
    active: "",
    date_added: "",
    consent_statement_text: "",
  };

  const validationSchema = Yup.object({
    consent_statement_name: Yup.string().required(
      "Consent statement name is required"
    ),
    sort_order: Yup.string().required("Sort order is required"),
    consent_statement_text: Yup.string().required(
      "Consent statement text is required"
    ),
  });

  const handleSubmit = (values) => {
    console.log("Custom Fields Data:", values);
  };

  return (
    <div>
      <GoBack />

      <div className="mt-13 mb-15 mb-sm-25 mb-md-31 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 text-primary mb-5">
            Consent Statement Information
          </h3>
          <p className="aa-text-xxs fw-normal mb-0">
            Organize and maintain Companies.
          </p>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="custom-card p-0">
              <div className="p-15 p-sm-24 border-bottom">
                <h5 className="aa-heading-05 fw-semibold mb-0">
                  Add New Consent Statement Information
                </h5>
              </div>

              <div className="p-15 p-sm-24">
                <div className="row">
                  {[
                    {
                      label: "Consent Statement Name*",
                      name: "consent_statement_name",
                    },
                    {
                      label: "Consent Frequency (days)",
                      name: "consent_frequency",
                    },
                    {
                      label: "Company",
                      name: "company",
                    },
                    {
                      label: "Sort Order*",
                      name: "sort_order",
                      type: "number",
                    },
                    {
                      label: "Date Added",
                      name: "date_added",
                      type: "date",
                    },
                    {
                      label: "Consent Statement Text*",
                      name: "consent_statement_text",
                      type: "textarea",
                    },
                  ].map((item, index) => (
                    <div className="col-12 col-md-6 mb-20" key={index}>
                      <FloatingInputField
                        formik={formik}
                        label={item?.label}
                        name={item?.name}
                        type={item?.type}
                        as={item?.type === "textarea" ? "textarea" : "input"}
                      />
                    </div>
                  ))}

                  {/* Switch Fields */}
                  <div className="col-12 d-inline-flex flex-wrap gap-3">
                    {[
                      { label: "Required", name: "required" },
                      { label: "Answer Required", name: "answer_required" },
                      { label: "Cost Risk Consent", name: "cost_risk_consent" },
                      { label: "Active", name: "active" },
                    ].map((field, index) => (
                      <span key={index}>
                        <SwitchField
                          formik={formik}
                          label={field?.label}
                          name={field?.name}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="devider my-16"></div>

            <div className="d-flex justify-content-end align-items-center flex-wrap gap-3">
              <CustomButton
                className="btn-primary rounded-pill"
                text="Save & Update"
                type="submit"
              />
              <CustomButton
                className="btn-outline-primary rounded-pill"
                text="Cancel"
                type="button"
              />
              <CustomButton
                className="btn-primary rounded-pill"
                text="Delete item"
                type="button"
                onClick={handleDeleteConsent}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewConsents;

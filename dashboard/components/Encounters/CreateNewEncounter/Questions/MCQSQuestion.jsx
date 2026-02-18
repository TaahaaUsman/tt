import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../../../FormsFields/FloatingInputField";
import CustomButton from "../../../customButton/CustomButton";
import CheckboxBase from '../../../../assets/Svgs/CheckboxBase.svg'

const MCQSQuestion = ({ categoryId, onSave, onCancel }) => {
  const validationSchema = Yup.object({
    question_text: Yup.string().trim().required("Question text is required"),
    option_1: Yup.string().trim().required("Option 1 is required"),
    option_2: Yup.string().trim().required("Option 2 is required"),
    option_3: Yup.string().trim().required("Option 3 is required"),
    correct_option: Yup.number().required("Select correct option"),
  });

  const [showRiskFields, setShowRiskFields] = useState(false);

  const formik = useFormik({
    initialValues: {
      question_text: "",
      option_1: "",
      option_2: "",
      option_3: "",
      correct_option: 1,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          type: "MCQS",
          categoryId,
          question_text: values.question_text.trim(),
          options: [
            values.option_1.trim(),
            values.option_2.trim(),
            values.option_3.trim(),
          ],
          correct_option: values.correct_option,
        };

        if (typeof onSave === "function") {
          await onSave(payload);
        } else {
          console.log("MCQS payload:", payload);
        }
      } catch (err) {
        console.error("Failed to save MCQS question:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-100 p-4 rounded mb-3">
      <h6 className="mb-20">Add MCQS Question</h6>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex flex-column gap-2">
          <div className="">
            <FloatingInputField
              formik={formik}
              label="Question Text*"
              placeholder="Do you have Diabetes?"
              name="question_text"
              type="text"
            />
          </div>

          <div className="w-100 d-flex" style={{ gap: "5%" }}>
            <div style={{ width: "30%", flexShrink: 0 }}>
              <FloatingInputField
                formik={formik}
                label="Option 1*"
                placeholder="Yes"
                name="option_1"
                type="text"
              />
            </div>

            <div style={{ width: "30%", flexShrink: 0 }}>
              <FloatingInputField
                formik={formik}
                label="Option 2*"
                placeholder="No"
                name="option_2"
                type="text"
              />
            </div>

            <div style={{ width: "30%", flexShrink: 0 }}>
              <FloatingInputField
                formik={formik}
                label="Option 3*"
                placeholder="N/A"
                name="option_3"
                type="text"
              />
            </div>
          </div>

          <div className="mt-20 mb-5">
                <div className="devider" />
              </div>

          <div className="d-flex justify-content-start">
            <div className="text-center mb-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowRiskFields(true);
                }}
                className="text-primary fw-semibold"
                style={{ textDecoration: "none" }}
              >
                <img src={CheckboxBase} alt="CheckboxBase" /> Add risk value
              </a>
            </div>
          </div>

          {showRiskFields && (
            <>

              <div className="w-100 d-flex" style={{ gap: "6%" }}>
                <div style={{ width: "47%", flexShrink: 0 }}>
                  <FloatingInputField
                    formik={formik}
                    label="Risk Name"
                    placeholder="Diabetes"
                    name="option_1"
                    type="text"
                  />
                </div>

                <div style={{ width: "47%", flexShrink: 0 }}>
                  <FloatingInputField
                    formik={formik}
                    label="Risk value"
                    placeholder="30"
                    name="option_2"
                    type="text"
                  />
                </div>
              </div>
            </>
          )}



          <div className="col-12 d-flex gap-2 justify-content-end">

            <CustomButton
              className="btn-outline-secondary rounded-pill"
              text="Cancel"
              type="button"
              onClick={onCancel}
            />
            <CustomButton
              className="btn-primary rounded-pill"
              loading={formik.isSubmitting}
              text="Save"
              type="submit"
            />
          </div>
        </div>


      </form>
    </div>
  );
};

export default MCQSQuestion;

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../../../FormsFields/FloatingInputField";
import CustomButton from "../../../customButton/CustomButton";

const TextFieldQuestion = ({ categoryId, onSave, onCancel }) => {
  const validationSchema = Yup.object({
    question_text: Yup.string().trim().required("Write question is required"),
    placeholder_text: Yup.string().trim().notRequired(),
    max_length: Yup.number().positive().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      question_text: "",
      placeholder_text: "",
      max_length: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          type: "TEXT_FIELD",
          categoryId,
          question_text: values.question_text.trim(),
          placeholder_text: values.placeholder_text.trim(),
          max_length: values.max_length ? Number(values.max_length) : null,
        };

        if (typeof onSave === "function") {
          await onSave(payload);
        } else {
          console.log("Text Field payload:", payload);
        }
      } catch (err) {
        console.error("Failed to save text field question:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-100 rounded mb-3">
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          <div className="col-12 mt-20">
            <FloatingInputField
              formik={formik}
              label="Write question"
              placeholder="Do you have Diabetes?"
              name="question_text"
              type="text"
            />
          </div>

          <div className="mt-20 mb-5">
            <div className="devider" />
          </div>

          <div className="d-flex justify-content-start">
            <div className="text-center text-primary fw-semibold">
                Risk Value
            </div>
          </div>

          <div className="w-100 d-flex" style={{ gap: "5%" }}>
            <div style={{ width: "40%", flexShrink: 0 }}>
              <FloatingInputField
                formik={formik}
                label="Risk Name"
                placeholder="Diabetes"
                name="option_1"
                type="text"
              />
            </div>

            <div style={{ width: "40%", flexShrink: 0 }}>
              <FloatingInputField
                formik={formik}
                label="Risk value"
                placeholder="30"
                name="option_2"
                type="text"
              />
            </div>
          </div>

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
              text="Save Question"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TextFieldQuestion;

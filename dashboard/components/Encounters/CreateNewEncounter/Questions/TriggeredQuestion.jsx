import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../../../FormsFields/FloatingInputField";
import CustomButton from "../../../customButton/CustomButton";
import CheckboxBase from "../../../../assets/Svgs/CheckboxBase.svg";

const TriggeredQuestion = ({ categoryId, onSave, onCancel }) => {
  const validationSchema = Yup.object({
    question_text: Yup.string().trim().required("Write question is required"),
    option_1: Yup.string().trim().required("Option 1 is required"),
    option_2: Yup.string().trim().required("Option 2 is required"),
    option_3: Yup.string().trim().required("Option 3 is required"),
  });

  const [showRiskFields, setShowRiskFields] = useState(false);
  const [triggeringQuestions, setTriggeringQuestions] = useState({}); // Changed to object: { option_1: [{...}, {...}], option_2: [{...}], option_3: [{...}] }

  const addTriggeringQuestion = (optionKey) => {
    // Add a new triggering question to the array for this option
    const currentQuestions = triggeringQuestions[optionKey] || [];
    setTriggeringQuestions({
      ...triggeringQuestions,
      [optionKey]: [
        ...currentQuestions,
        {
          question_text: "",
          option_1: "",
          option_2: "",
          option_3: "",
        },
      ],
    });
  };

  const updateTriggeringQuestion = (optionKey, questionIndex, field, value) => {
    const currentQuestions = triggeringQuestions[optionKey] || [];
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      [field]: value,
    };
    setTriggeringQuestions({
      ...triggeringQuestions,
      [optionKey]: updatedQuestions,
    });
  };

  const removeTriggeringQuestion = (optionKey, questionIndex) => {
    const currentQuestions = triggeringQuestions[optionKey] || [];
    const updatedQuestions = currentQuestions.filter((_, index) => index !== questionIndex);
    
    if (updatedQuestions.length === 0) {
      // If no questions left, remove the option key entirely
      const updated = { ...triggeringQuestions };
      delete updated[optionKey];
      setTriggeringQuestions(updated);
    } else {
      setTriggeringQuestions({
        ...triggeringQuestions,
        [optionKey]: updatedQuestions,
      });
    }
  };

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
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex flex-column gap-2">
          <div className="">
            <FloatingInputField
              formik={formik}
              label="Write question*"
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

          <div className="w-100 d-flex" style={{ gap: "5%" }}>
            <div className="d-flex" style={{ width: "30%", flexShrink: 0 }}>
              <div className="text-center mb-4">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    addTriggeringQuestion("option_1");
                  }}
                  className="text-primary fw-semibold"
                  style={{ textDecoration: "none" }}
                >
                  <img src={CheckboxBase} alt="CheckboxBase" /> Add Triggering
                  Questions
                </a>
              </div>
            </div>

            <div className="d-flex" style={{ width: "30%", flexShrink: 0 }}>
              <div className="text-center mb-4">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    addTriggeringQuestion("option_2");
                  }}
                  className="text-primary fw-semibold"
                  style={{ textDecoration: "none" }}
                >
                  <img src={CheckboxBase} alt="CheckboxBase" /> Add Triggering
                  Questions
                </a>
              </div>
            </div>

            <div className="d-flex" style={{ width: "30%", flexShrink: 0 }}>
              <div className="text-center mb-4">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    addTriggeringQuestion("option_3");
                  }}
                  className="text-primary fw-semibold"
                  style={{ textDecoration: "none" }}
                >
                  <img src={CheckboxBase} alt="CheckboxBase" /> Add Triggering
                  Questions
                </a>
                {triggeringQuestions.option_3 && triggeringQuestions.option_3.length > 0 && (
                  <div className="text-muted" style={{ fontSize: "12px", marginTop: "4px" }}>
                    ({triggeringQuestions.option_3.length} added)
                  </div>
                )}
              </div>
            </div>
          </div>

          {Object.entries(triggeringQuestions).flatMap(([optionKey, questions]) => {
            // Get the option label from formik values
            const optionLabel =
              formik.values[optionKey] ||
              optionKey.replace("option_", "Option ");

            // Map over the array of questions for this option
            return questions.map((question, questionIndex) => {
              const uniqueKey = `${optionKey}_${questionIndex}`;
              
              const questionFormik = {
                values: {
                  [`triggering_question_text_${uniqueKey}`]:
                    question.question_text,
                  [`triggering_option_1_${uniqueKey}`]: question.option_1,
                  [`triggering_option_2_${uniqueKey}`]: question.option_2,
                  [`triggering_option_3_${uniqueKey}`]: question.option_3,
                },
                handleChange: (e) => {
                  const fieldMap = {
                    [`triggering_question_text_${uniqueKey}`]: "question_text",
                    [`triggering_option_1_${uniqueKey}`]: "option_1",
                    [`triggering_option_2_${uniqueKey}`]: "option_2",
                    [`triggering_option_3_${uniqueKey}`]: "option_3",
                  };
                  const field = fieldMap[e.target.name];
                  if (field) {
                    updateTriggeringQuestion(optionKey, questionIndex, field, e.target.value);
                  }
                },
                handleBlur: () => {}, // No-op for now
                errors: {},
                touched: {},
              };

              return (
                <div
                  key={uniqueKey}
                  className="d-flex flex-column gap-2 mt-4 mb-4 p-3"
                  style={{ borderRadius: "8px", position: "relative" }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">
                      Triggering question {questionIndex + 1} for {optionLabel}
                    </h6>
                    <button
                      type="button"
                      onClick={() => removeTriggeringQuestion(optionKey, questionIndex)}
                      className="btn btn-sm btn-outline-danger rounded-pill"
                      style={{ fontSize: "12px" }}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="">
                    <FloatingInputField
                      formik={questionFormik}
                      label="Write question*"
                      placeholder="Do you have Diabetes?"
                      name={`triggering_question_text_${uniqueKey}`}
                      type="text"
                    />
                  </div>

                  <div className="w-100 d-flex" style={{ gap: "5%" }}>
                    <div style={{ width: "30%", flexShrink: 0 }}>
                      <FloatingInputField
                        formik={questionFormik}
                        label="Option 1*"
                        placeholder="Yes"
                        name={`triggering_option_1_${uniqueKey}`}
                        type="text"
                      />
                    </div>

                    <div style={{ width: "30%", flexShrink: 0 }}>
                      <FloatingInputField
                        formik={questionFormik}
                        label="Option 2*"
                        placeholder="No"
                        name={`triggering_option_2_${uniqueKey}`}
                        type="text"
                      />
                    </div>

                    <div style={{ width: "30%", flexShrink: 0 }}>
                      <FloatingInputField
                        formik={questionFormik}
                        label="Option 3*"
                        placeholder="N/A"
                        name={`triggering_option_3_${uniqueKey}`}
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              );
            });
          })}

          <div className="mt-20 mb-5">
            <div className="devider" />
          </div>

          <div className="d-flex justify-content-start">
            <div className="text-center mb-4">
              <a
                href=""
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

                <div style={{ width: "30%", flexShrink: 0 }}>
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

export default TriggeredQuestion;

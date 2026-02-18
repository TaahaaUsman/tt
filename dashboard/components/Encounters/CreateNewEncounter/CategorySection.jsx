import React, { useState } from "react";
import MCQSQuestion from "./Questions/MCQSQuestion";
import TextFieldQuestion from "./Questions/TextFieldQuestion";
import TriggeredQuestion from "./Questions/TriggeredQuestion";
import CheckListQuestion from "./Questions/CheckListQuestion";
import CheckboxBase from '../../../assets/Svgs/CheckboxBase.svg'
import mcqs_icon from "../../../assets/Svgs/mcqs.svg"
import textarea_icon from "../../../assets/Svgs/textarea.svg"
import triggeredQuestions_icon from "../../../assets/Svgs/Frame.svg"
import checlist_icon from "../../../assets/Svgs/Group.svg"

const CategorySection = ({ categoryName, categoryId, onSaveQuestion, onRemoveCategory }) => {
  const [showQuestionTypes, setShowQuestionTypes] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [questions, setQuestions] = useState([]);

  const questionTypes = [
    { id: "MCQS", label: "Multi Choice", icon: mcqs_icon },
    { id: "TEXT_FIELD", label: "Text Field", icon: textarea_icon },
    { id: "TRIGGERED", label: "Triggered Question", icon: triggeredQuestions_icon },
    { id: "CHECKLIST", label: "Check List", icon: checlist_icon },
  ];

  const handleSaveQuestion = async (payload) => {
    // Add question to local state
    const newQuestion = { ...payload, id: Date.now() };
    setQuestions([...questions, newQuestion]);

    // Call parent handler if provided
    if (typeof onSaveQuestion === "function") {
      await onSaveQuestion(newQuestion);
    } else {
      console.log("Question saved:", newQuestion);
    }

    // Reset
    setSelectedQuestionType(null);
  };

  const handleCancelQuestion = () => {
    setSelectedQuestionType(null);
  };

  const removeQuestion = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  return (
    <div className="custom-card p-0 mb-20 mt-20">
      <div className="p-15 p-sm-24">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="aa-heading-05 fw-semibold mb-0">{categoryName}</h5>
        </div>
      </div>

      <div className="devider" />

      <div className="p-15 m-20 p-sm-24" style={{ border: "1px solid #cccccca2", borderRadius: "10px", minHeight: "250px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        {/* Add New Questions Link */}
        {!showQuestionTypes && questions.length === 0 && (
          <div className="text-center mb-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowQuestionTypes(true);
              }}
              className="text-primary fw-semibold"
              style={{ textDecoration: "none" }}
            >
             <img src={CheckboxBase} alt="CheckboxBase" /> Add New Questions
            </a>
          </div>
        )}

        {/* Question Type Selection */}
        {showQuestionTypes && !selectedQuestionType && (
  <div className="d-flex gap-3 mb-4 flex-wrap">
    {questionTypes.map((type) => (
      <div
        key={type.id}
        className="border rounded-3 pt-30 pb-30"
        style={{
          background: "#DBDBDB",
          cursor: "pointer",
          minWidth: "180px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          transition: "0.2s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "12px",
          paddingBottom: "12px"
        }}
        onClick={() => setSelectedQuestionType(type.id)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span className="me-2">
          <img
            src={type.icon}
            alt={type.label}
            style={{ width: "24px", height: "24px" }}
          />
        </span>
        <span>{type.label}</span>
      </div>
    ))}
  </div>
)}


        {/* MCQS Question Form */}
        {selectedQuestionType === "MCQS" && (
          <MCQSQuestion
            categoryId={categoryId}
            onSave={handleSaveQuestion}
            onCancel={handleCancelQuestion}
          />
        )}

        {/* Text Field Question Form */}
        {selectedQuestionType === "TEXT_FIELD" && (
          <TextFieldQuestion
            categoryId={categoryId}
            onSave={handleSaveQuestion}
            onCancel={handleCancelQuestion}
          />
        )}

        {/* Triggered Question Form */}
        {selectedQuestionType === "TRIGGERED" && (
          <TriggeredQuestion
            categoryId={categoryId}
            onSave={handleSaveQuestion}
            onCancel={handleCancelQuestion}
          />
        )}

        {/* Checklist Question Form */}
        {selectedQuestionType === "CHECKLIST" && (
          <CheckListQuestion
            categoryId={categoryId}
            onSave={handleSaveQuestion}
            onCancel={handleCancelQuestion}
          />
        )}

        {/* Display Saved Questions */}
        {questions.length > 0 && (
          <div className="mt-4">
            <h6 className="mb-3">Saved Questions ({questions.length})</h6>
            {questions.map((question) => (
              <div key={question.id} className="card mb-2 p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <strong className="d-block mb-1">{question.question_text}</strong>
                    <small className="text-muted">Type: {question.type}</small>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-danger p-0"
                    onClick={() => removeQuestion(question.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add more questions button */}
        {questions.length > 0 && !showQuestionTypes && (
          <div className="text-center mt-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowQuestionTypes(true);
              }}
              className="text-primary fw-semibold"
              style={{ textDecoration: "none" }}
            >
              + Add More Questions
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;

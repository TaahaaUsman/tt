import React from "react";

const StepNavigation = ({ steps, currentStep, onStepChange }) => {
  return (
    <div className="navigation-wrapper mb-20 mb-sm-39 overflow-x-auto">
      <div className="d-flex gap-2">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => onStepChange(index)}
            className={`font-medium ${
              currentStep === index
                ? "active"
                : ""
            }`}
          >
            {step.label}*
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepNavigation;

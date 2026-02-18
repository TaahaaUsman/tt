import React, { useState } from "react";
import StepNavigation from "./StepNavigation";
import {
  Participant,
} from "./AddParticipantSteps/steps";

const AddParticipantStepForm = () => {
  const steps = [
    { label: "Participant", component: Participant },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep].component;

  // Send API data
  const sendData = async (data) => {
    console.log("data", data);
  };

  return (
    <div className="hra-step-form-wrapper">
      <>
        <StepNavigation
          steps={steps}
          currentStep={currentStep}
          onStepChange={(index) => setCurrentStep(index)}
        />
        <StepComponent
          onNext={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
          onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          sendData={sendData}
        />
      </>
    </div>
  );
};

export default AddParticipantStepForm;

import React from "react";

const GoBack = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <button
        className="btn btn-link p-0 aa-text-xxs fw-normal text-primary min-h-auto"
        onClick={goBack}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
        >
          <path
            d="M9.06578 5.43896H1.81398"
            stroke="#153F68"
            strokeWidth="0.906475"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.5334 8.15821L1.81398 5.43878L4.5334 2.71936"
            stroke="#153F68"
            strokeWidth="0.906475"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>{" "}
        Go Back
      </button>
    </div>
  );
};

export default GoBack;

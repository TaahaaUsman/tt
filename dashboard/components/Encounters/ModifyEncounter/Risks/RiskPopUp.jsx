import { useEffect, useRef } from "react";

const RiskPopup = ({ anchorRef, onClose }) => {
  const popupRef = useRef(null);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !anchorRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  return (
    <div
      ref={popupRef}
      style={{
        position: "absolute",
        top: anchorRef.current?.getBoundingClientRect().bottom + window.scrollY + 5,
        left: anchorRef.current?.getBoundingClientRect().left,
        width: "250px",
        maxHeight: "300px",
        overflowY: "auto",
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <h6 className="fw-bold mb-2">All Risk Points</h6>
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        {[
          "Depression (30)",
          "Distress (30)",
          "Inactivity (30)",
          "Tobacco Smoke (30)",
          "Alcohol Misuse (20)",
          "High Total Cholesterol (20)",
          "Personal Safety At Risk (20)",
          "Stage 2 Hypertension (20)",
          "Partial Activity Credit (-15)",
          "Existing Medical Condition (10)",
          "No Colon Cancer Screening (10)",
          "No Prostate Cancer Screening Discussion (10)",
          "At Risk Nutrition - Whole Grains (5)",
          "At Risk Nutrition - Fruits & Vegetables (5)",
          "At Risk Nutrition - Processed Foods (5)",
          "Anxiety (0)",
          "Asthma (0)",
          "At Risk for Preventable Hearing Loss (0)",
          "At Risk for Sleep Apnea (0)",
          "Diabetes (0)",
          "Family History Heart Disease (0)",
          "High Triglycerides (0)",
          "Life Dissatisfaction (0)",
          "Low BMI (0)",
          "Metabolic Syndrome (0)",
          "No Annual Flu Shot (0)",
          "No Aortic Screening (0)",
          "No Hepatitis C Screening (0)",
        ].map((item, i) => (
          <li
            key={i}
            style={{
              padding: "6px 0",
              borderBottom: "1px solid #eee",
              fontSize: "14px",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskPopup;

import React from "react";
import MeasurmentsTable from "./MeasurmentsTable/MeasurmentsTable";

const Measurments = () => {
  const measurmentsData = [
    {
      name: "Systolic BP",
      value: 120,
      dateTaken: "2025-10-02",
      history: 120,
      units: "mm Hg",
      range: "(50 - 300)",
      checked: false,
    },
    {
      name: "Diastolic BP",
      value: 120,
      dateTaken: "2025-10-02",
      history: 120,
      units: "mm Hg",
      range: "(75 - 1000)",
      checked: true,
    },
    {
      name: "Height",
      value: 170,
      dateTaken: "2025-10-02",
      history: 170,
      units: "cm",
      range: "(50 - 300)",
      checked: false,
    },
    {
      name: "Weight",
      value: 70,
      dateTaken: "2025-10-02",
      history: 70,
      units: "kg",
      range: "(30 - 200)",
      checked: true,
    },
  ];

  return (
    <div>
      <h2 className="aa-text-md font-semibold mb-20">Record Measurements</h2>
      <MeasurmentsTable data={measurmentsData} />
    </div>
  );
};

export default Measurments;

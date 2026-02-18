import React, { useState } from "react";
import { Calendar, InfoIcon } from "../../assets/Svgs/Svgs";
import BehavioralRiskChart from "./BehavioralRiskChart/BehavioralRiskChart";
import { Dropdown } from "react-bootstrap";

const Risk = () => {
  const [riskData, setRiskData] = useState([
    {
      name: "Depression",
      weight: 30,
      overriddenChecked: true,
      overriddenDate: "2023-08-22",
      workingChecked: false,
    },
    {
      name: "Distress",
      weight: 30,
      overriddenChecked: false,
      workingChecked: false,
    },
    {
      name: "Inactivity",
      weight: 30,
      overriddenChecked: false,
      workingChecked: false,
    },
    {
      name: "Tobacco Smoke",
      weight: 30,
      overriddenChecked: true,
      overriddenDate: "2023-08-22",
      workingChecked: false,
    },
    {
      name: "Alcohol Misuse",
      weight: 30,
      overriddenChecked: false,
      workingChecked: false,
    },
    {
      name: "High Total Cholesterol",
      weight: 30,
      overriddenChecked: false,
      workingChecked: true,
      workingDate: "2023-08-22",
    },
    {
      name: "Personal Safety At Risk",
      weight: 30,
      overriddenChecked: false,
      workingChecked: false,
    },
    {
      name: "Stage 2 Hypertension",
      weight: 30,
      overriddenChecked: true,
      overriddenDate: "2023-08-22",
      workingChecked: false,
    },
    {
      name: "Existing Medical Condition",
      weight: 30,
      overriddenChecked: false,
      workingChecked: false,
    },
  ]);

  // Handle checkbox/date changes
  const handleChange = (index, field, value) => {
    const updated = [...riskData];
    updated[index][field] = value;
    setRiskData(updated);
  };

  // Submit function
  const handleSubmit = () => {
    console.log("✅ Submitted Data:", riskData);
    alert("Data submitted successfully! Check console for details.");
    // Example: axios.post("/api/risk", riskData)
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const scoreDetails = [
    "30 Depression",
    "30 Distress",
    "30 Inactivity",
    "30 Tobacco Smoke",
    "20 Alcohol Misuse",
    "20 High Total Cholesterol",
    "20 Personal Safety At Risk",
    "20 Stage 2 Hypertension",
    "-15 Partial Activity Credit",
    "10 Existing Medical Condition",
    "10 No Colon Cancer Screening",
    "10 No Prostate Cancer Screening Discussion",
    "5 At Risk Nutrition - Whole Grains",
  ];

  const data = [
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
    { score: 230, level: "High", date: "10/2/2025 6:13:59 PM" },
  ];

  return (
    <div>
      <h2 className="aa-text-md font-semibold mb-20">Risk</h2>

      <div className="custom-card px-24 py-16 mb-20">
        <div className="table-responsive">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Risk Name</th>
                <th>Risk Weight</th>
                <th>Overridden</th>
                <th>Working</th>
              </tr>
            </thead>
            <tbody>
              {riskData.length > 0 ? (
                riskData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.weight}</td>

                    {/* Overridden */}
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <input
                          type="checkbox"
                          checked={row.overriddenChecked || false}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "overriddenChecked",
                              e.target.checked
                            )
                          }
                          className="custom-checkbox"
                        />
                        {row.overriddenChecked && (
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="date"
                              className="form-control text-center"
                              value={row.overriddenDate || ""}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "overriddenDate",
                                  e.target.value
                                )
                              }
                              style={{ width: "140px" }}
                            />
                            <Calendar color="#153F68" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Working */}
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <input
                          type="checkbox"
                          checked={row.workingChecked || false}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "workingChecked",
                              e.target.checked
                            )
                          }
                          className="custom-checkbox"
                        />
                        {row.workingChecked && (
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="date"
                              className="form-control text-center"
                              value={row.workingDate || ""}
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "workingDate",
                                  e.target.value
                                )
                              }
                              style={{ width: "140px" }}
                            />
                            <Calendar color="#153F68" />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    <div className="alert alert-info">No records found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="custom-card px-24 py-16 mb-20">
        <h6 className="aa-text-sm text-theme-100 fw-semibold mb-10">
          Current Behavioral Risk Score:{" "}
          <span className="text-primary fw-bolder">230 (High)</span>
        </h6>
        <p className="text-theme-100 aa-text-sm fw-semibold mb-10">
          Your Behavior Risk Score Over Time
        </p>
        <BehavioralRiskChart />
      </div>
      <div className="custom-card px-24 py-16 mb-20">
        <div className="score-ul-wrapper">
          <ul className="list-unstyled mb-0">
            {data.map((item, index) => (
              <li
                key={index}
                className="d-flex justify-content-around align-items-center flex-column gap-2 flex-sm-row py-8 px-10"
              >
                <Dropdown
                  show={openDropdown === index}
                  onToggle={() => handleToggle(index)}
                  className="d-inline-block score-dropdown"
                >
                  <Dropdown.Toggle
                    variant="light"
                    className="rounded-pill px-10 py-5 fw-semibold d-flex align-items-center gap-2"
                  >
                    {item?.score} <InfoIcon color="#000" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                  >
                    {scoreDetails.map((detail, idx) => (
                      <Dropdown.ItemText
                        key={idx}
                        className="aa-text-sm fw-light text-black"
                      >
                        {detail}
                      </Dropdown.ItemText>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <span className="fw-semibold text-primary text-center">
                  {item?.level}
                </span>
                <span className="text-primary text-center">{item?.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* ✅ Submit button inside same component */}
      <div className="text-end mt-20">
        <button className="btn btn-primary rounded-5" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Risk;

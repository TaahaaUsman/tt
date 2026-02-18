import React, { useState, useEffect, useCallback } from "react";
import { Calendar } from "../../../assets/Svgs/Svgs";

const RiskTable = ({ data, setSubmitHandler }) => {
  const [riskData, setRiskData] = useState(data || []);

  // Update state when new data comes from parent
  useEffect(() => {
    setRiskData(data);
  }, [data]);

  // handle checkbox/date change
  const handleChange = (index, field, value) => {
    const updated = [...riskData];
    updated[index][field] = value;
    setRiskData(updated);
  };

  // ✅ stable function that doesn't recreate on every render
  const handleSubmit = useCallback(() => {
    console.log("✅ Submitted Data:", riskData);
    alert("Data submitted! Check console for details.");
    // axios.post("/api/risk", riskData)
  }, [riskData]);

  // ✅ register submit handler ONCE
  useEffect(() => {
    if (setSubmitHandler) {
      setSubmitHandler(() => handleSubmit);
    }
  }, [handleSubmit]);

  return (
    <div className="custom-card px-24 py-16">
      <div className="table-responsive max-height-table">
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
                          handleChange(index, "overriddenChecked", e.target.checked)
                        }
                      />
                      {row.overriddenChecked && (
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="date"
                            className="form-control text-center"
                            value={row.overriddenDate || ""}
                            onChange={(e) =>
                              handleChange(index, "overriddenDate", e.target.value)
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
                          handleChange(index, "workingChecked", e.target.checked)
                        }
                      />
                      {row.workingChecked && (
                        <div className="d-flex align-items-center gap-2">
                          <input
                            type="date"
                            className="form-control text-center"
                            value={row.workingDate || ""}
                            onChange={(e) =>
                              handleChange(index, "workingDate", e.target.value)
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
  );
};

export default RiskTable;

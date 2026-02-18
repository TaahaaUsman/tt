import React, { useState } from "react";
import { /*ArrowLeft, ArrowRight,*/ Calendar } from "../../../assets/Svgs/Svgs";

const MeasurmentsTable = ({ data }) => {
  // const [entriesPerPage, setEntriesPerPage] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(data);

  // const totalPages = Math.ceil(tableData.length / entriesPerPage);
  // const paginatedData = tableData.slice(
  //   (currentPage - 1) * entriesPerPage,
  //   currentPage * entriesPerPage
  // );

  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...tableData];
    updated[index][field] = value;
    setTableData(updated);
  };

  // Handle form submit
  const handleSubmit = () => {
    console.log("Submitted Data:", tableData);
    alert("Data submitted! Check console for details.");
    // 🔹 You can replace console.log with an API call, e.g.:
    // axios.post('/api/save-measurements', tableData)
  };

  return (
    <>
      <div className="custom-card px-24 py-16">
        <div className="table-responsive max-height-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th className="p-10">Name</th>
                <th className="p-10">Value</th>
                <th className="p-10">Date Taken</th>
                <th className="p-10">History</th>
                <th className="p-10">Units</th>
                <th className="p-10">Range</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>

                    {/* Value + Checkbox */}
                    <td className="p-10">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <input
                          type="number"
                          className="form-control text-center"
                          value={row.value}
                          onChange={(e) =>
                            handleChange(index, "value", e.target.value)
                          }
                          style={{ width: "80px", height: "36px" }}
                        />
                        <input
                          type="checkbox"
                          checked={row.checked || false}
                          onChange={(e) =>
                            handleChange(index, "checked", e.target.checked)
                          }
                          className="custom-checkbox"
                        />
                      </div>
                    </td>

                    {/* Date Taken */}
                    <td className="p-10">
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <input
                          type="date"
                          className="form-control text-center"
                          value={row.dateTaken}
                          onChange={(e) =>
                            handleChange(index, "dateTaken", e.target.value)
                          }
                          style={{ width: "150px", height: "36px" }}
                        />
                        <Calendar color="#153F68" />
                      </div>
                    </td>

                    {/* History */}
                    <td className="p-10">
                      <input
                        type="number"
                        className="form-control text-center"
                        value={row.history}
                        onChange={(e) =>
                          handleChange(index, "history", e.target.value)
                        }
                        style={{ width: "80px", margin: "0 auto", height: "36px" }}
                      />
                    </td>

                    {/* Units */}
                    <td className="p-10">{row.units}</td>

                    {/* Range */}
                    <td className="p-10">{row.range}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-0">
                    <div className="alert alert-info">No records found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {/* <div className="d-flex justify-content-between align-items-center mt-10 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <label className="aa-text-sm text-secondary mb-0">Show</label>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="form-select form-select-sm"
            style={{ width: "80px" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>

        <div className="d-flex align-items-center gap-2 custom-pagination">
          <nav aria-label="Page navigation">
            <ul className="pagination mb-0">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                >
                  <ArrowLeft color="#153F68" />
                </button>
              </li>

              {pageNumbers.map((page) => (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                  }
                >
                  <ArrowRight color="#153F68" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div> */}

      {/* Submit Button */}
      <div className="text-end mt-20">
        <button className="btn btn-primary rounded-5" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default MeasurmentsTable;
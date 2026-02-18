import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  Eye,
  EditDocument,
  Dotted,
  ArrowLeft,
  ArrowRight,
} from "../../assets/Svgs/Svgs";
import { useNavigate } from "react-router-dom";

const EncounterAccessTable = ({ data, viewDetail }) => {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / entriesPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <div className="custom-card px-24 py-16">
        <div className="table-responsive max-height-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Participant Name</th>
                <th>Company</th>
                <th>Participant Type</th>
                <th>Encounter Type</th>
                <th>Wellnes Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr
                    key={row?.id || index}
                    className={index % 2 !== 0 ? "table-row-alt" : ""}
                  >
                    <td>{row?.participantName}</td>
                    <td>{row?.company}</td>
                    <td>{row?.participantType}</td>
                    <td>{row?.EncounterType}</td>
                    <td>
                      <span className={`status-pill rounded-pill is-${row?.wellnessStatus?.toLowerCase() || ''}`}>
                        <span>{row?.wellnessStatus}</span>
                      </span>
                    </td>
                    <td>
                      <span
                        className="cursor-pointer me-7"
                        onClick={() => viewDetail && viewDetail(row)}
                      >
                        <Eye color="#153F68" />
                      </span>
                      <span className="cursor-pointer" onClick={() => navigate("/modify-encounter")}>
                        <EditDocument color="#153F68" />
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-0">
                    <div className="alert alert-info m-0">No records found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-10 flex-wrap gap-3">
        <div className="d-flex align-items-center gap-2">
          <label className="aa-text-sm text-secondary mb-0">Show</label>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="form-select form-select-sm"
            style={{ width: "60px" }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
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

              {pageNumbers.map((page, index) =>
                page === "..." ? (
                  <li key={index} className="page-item disabled">
                    <span className="page-link">…</span>
                  </li>
                ) : (
                  <li
                    key={index}
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
                )
              )}

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
      </div>
    </>
  );
};

export default EncounterAccessTable;

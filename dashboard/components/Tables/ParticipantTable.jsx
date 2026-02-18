import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Document,
  Dotted,
  EditDocument,
  Eye,
} from "../../assets/Svgs/Svgs";
import ParticipanPopup from "../ParticipantPopup/ParticipantPopup";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getRowAnimation, useTableAnimation } from "../../utils/tableRowAnimation";

const ParticipantTable = ({ data }) => {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [participantPopup, setParticipantPopup] = useState(false);

  const totalPages = Math.ceil(data.length / entriesPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  const { isDataLoaded, direction } = useTableAnimation(false, paginatedData.length);

  // Function to create compact page list like: 1 ... 4 5 6 ... 10
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 4; // how many middle numbers to show

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

  const handleParticipantPop = () => {
    setParticipantPopup(true);
  };

  return (
    <>
      <div className="custom-card px-16 py-16">
        <div className="table-responsive max-height-table px-8">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Unique ID</th>
                <th>Name</th>
                <th>Company</th>
                <th>Participant Type</th>
                <th>Date Of Birth</th>
                <th>Welness Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => {
                  const rowVariants = getRowAnimation(index, direction, 0.08, 0.4);
                  return (
                    <motion.tr
                      key={row?.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate={isDataLoaded ? "visible" : "hidden"}
                    >
                      <td>{row?.uniqueId}</td>
                      <td>{row?.name}</td>
                      <td>{row?.company}</td>
                      <td>{row?.participantType}</td>
                      <td>{row?.dob}</td>
                      <td>{row?.status}</td>
                      <td>
                        <div className="d-flex gap-3 align-items-center justify-content-center">
                          <span
                            className="cursor-pointer"
                            onClick={handleParticipantPop}
                          >
                            <Eye color="#153F68" />
                          </span>
                          {/* <span className="cursor-pointer">
                            <Document color="#153F68" />
                          </span> */}
                          <span className="cursor-pointer" onClick={() => navigate("/select-encounter")}>
                            <EditDocument color="#153F68" />
                          </span>
                        </div>
                        {/* <Dropdown className="custom-table-dropdown">
                          <Dropdown.Toggle variant="light" size="sm" className="h-auto">
                            <Dotted color="#6F94B4" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              as={Link}
                              to={"/modify-ecounter-type"}
                              className="d-flex align-items-center gap-2"
                            >
                              <Eye color="#153F68" /> Open Encounter
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex align-items-center gap-2">
                              <Document color="#153F68" />
                              View Demographics
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex align-items-center gap-2">
                              <EditDocument color="#153F68" />
                              Edit Demographics
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown> */}
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td colSpan="8" className="p-0">
                    <div className="alert alert-info">No records found</div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="d-flex justify-content-between align-items-center mt-10 flex-wrap gap-3">
        {/* Entries per page dropdown */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
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
        </div>

        {/* Pagination */}
        <div className="d-flex align-items-center gap-2 custom-pagination">
          <nav aria-label="Page navigation">
            <ul className="pagination mb-0">
              {/* Previous */}
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

              {/* Page numbers */}
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

              {/* Next */}
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
      <ParticipanPopup
        popup={participantPopup}
        onClose={() => setParticipantPopup(false)}
      />
    </>
  );
};

export default ParticipantTable;

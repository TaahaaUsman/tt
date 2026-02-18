import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  EditDocument,
  Eye,
} from "../../assets/Svgs/Svgs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getRowAnimation, useTableAnimation } from "../../utils/tableRowAnimation";

const NewsAndFeaturesTable = ({ data }) => {

  const [entriesPerPage, setEntriesPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Helpers to safely render different cell value shapes
  const formatCell = (value) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "string" || typeof value === "number") return value;
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") {
      // prefer common name keys
      return (
        value.name ||
        value.companyName ||
        value.identifyingName ||
        value.title ||
        value.programName ||
        value.id ||
        JSON.stringify(value)
      );
    }
    return String(value);
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    // Return US (New York) format: MM/DD/YYYY
    try {
      return d.toLocaleDateString("en-US", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch (e) {
      // Fallback if environment doesn't support timeZone option
      return d.toLocaleDateString("en-US");
    }
  };

  // Normalize incoming data to a flat array.
  // Accepts: [] (flat), [[...]] (one-level nested), or { data: [...] }
  let tableData = [];
  if (Array.isArray(data)) {
    tableData = data.flat();
  } else if (data?.data && Array.isArray(data.data)) {
    tableData = data.data.flat();
  } else {
    tableData = [];
  }
  
  const totalPages = Math.ceil(tableData.length / entriesPerPage);
  const paginatedData = tableData.slice(
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

  return (
    <>
      <div className="custom-card px-16 py-16">
        <div className="table-responsive max-height-table px-8">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Program Name</th>
                <th>Company</th>
                <th>Date</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => {
                  const rowVariants = getRowAnimation(index, direction, 0.08, 0.4);
                  return (
                    <motion.tr
                      key={row?.id || Math.random()}
                      variants={rowVariants}
                      initial="hidden"
                      animate={isDataLoaded ? "visible" : "hidden"}
                    >
                      <td>{formatCell(row?.programName || row?.program || row?.title)}</td>
                      <td>{formatCell(row?.company || row?.companyName || row?.companyId)}</td>
                      <td style={{fontSize: "14px", fontWeight: 400, color: "#153f68"}}>{formatDate(row?.date || row?.createdAt || row?.expirationDate)}</td>
                      <td style={{fontSize: "14px", fontWeight: 400, color: "#153f68"}}>{formatCell(row?.subject || row?.title || row?.body)}</td>
                      <td>
                        <div className="d-flex gap-3 align-items-center justify-content-center">
                          <Link
                            to={`/create-news-feature?newsId=${row?.id}`}
                            className="cursor-pointer"
                          >
                            <EditDocument color="#153F68" />
                          </Link>
                        </div>
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
                  <td colSpan="5" className="p-0">
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
              <option value={12}>10</option>
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
    </>
  );
};

export default NewsAndFeaturesTable;

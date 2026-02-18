import React, { useState } from "react";
import {
  Eye,
  EditDocument,
  ArrowLeft,
  ArrowRight,
} from "../../assets/Svgs/Svgs";
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { getRowAnimation, useTableAnimation } from "../../utils/tableRowAnimation";

const ConsentStatementInformationTable = ({ data, activeOffcanvas, loading }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [] = useSelector((state) => state.consent);

  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(safeData.length / entriesPerPage);
  const paginatedData = safeData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  const { isDataLoaded, direction } = useTableAnimation(loading, paginatedData.length);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
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

  const handleViewDetails = (id) => {
    activeOffcanvas(true, id);
  };

  return (
    <>
      <div className="custom-card px-24 py-16">
        <div className="table-responsive max-height-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Consent Name</th>
                <th>Consent Statement</th>
                <th>Required</th>
                <th>Active</th>
                <th>Company Access</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading || !paginatedData ? (
                <tr>
                  <td colSpan="6" className="p-0">
                    <Loader />
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((row, index) => {
                  const rowVariants = getRowAnimation(index, direction, 0.08, 0.4);
                  return (
                    <motion.tr
                      key={row?.id || index}
                      className={index % 2 !== 0 ? "table-row-alt" : ""}
                      variants={rowVariants}
                      initial="hidden"
                      animate={isDataLoaded ? "visible" : "hidden"}
                    >
                      <td className="fw-medium text-start">{row?.name}</td>
                      <td className="text-start" style={{ whiteSpace: "normal" }}>
                        {row?.text}
                      </td>
                      <td>{row?.required ? "True" : "False"}</td>
                      <td>{row?.active ? "True" : "False"}</td>
                      <td>
                        {row?.companies?.map((company) => (
                          <div key={company.id}>{company?.name}</div>
                        )) || "N/A"}
                      </td>
                      <td>
                        <span
                          className="cursor-pointer me-7"
                          onClick={() => handleViewDetails(row?.id)}
                        >
                          <Eye color="#153F68" />
                        </span>
                        <Link
                          to={`/create_consent?id=${row?.id}`}
                          className="cursor-pointer"
                        >
                          <EditDocument color="#153F68" />
                        </Link>
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
                  <td colSpan="6" className="p-0">
                    <div className="alert alert-info m-0">No records found</div>
                  </td>
                </motion.tr>
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

export default ConsentStatementInformationTable;

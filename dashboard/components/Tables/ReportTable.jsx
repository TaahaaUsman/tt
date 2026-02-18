import React from "react";
import { Eye } from "../../assets/Svgs/Svgs";
import { motion } from "framer-motion";
import { getRowAnimation, useTableAnimation } from "../../utils/tableRowAnimation";

const ReportTable = ({ data = [] }) => {
  const { isDataLoaded, direction } = useTableAnimation(false, data.length);
  
  return (
    <>
      <div className="custom-card px-12 py-0">
        <div className="table-responsive max-height-table px-8">
          <table className="table custom-table-striped custom-table text-start align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Report Name</th>
                <th>Report Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((row, idx) => {
                  const rowVariants = getRowAnimation(idx, direction, 0.08, 0.4);
                  return (
                    <motion.tr
                      key={idx}
                      className={idx % 2 === 1 ? "table-row-highlight" : ""}
                      variants={rowVariants}
                      initial="hidden"
                      animate={isDataLoaded ? "visible" : "hidden"}
                    >
                      <td className="text-start" style={{ maxWidth: "258px" }}>
                        {row.name || "-"}
                      </td>
                      <td className="text-start">{row.description || "-"}</td>
                      <td className="text-center">
                        <span
                          className="cursor-pointer me-7"
                         
                        >
                          <Eye color="#153F68" />
                        </span>
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
                  <td colSpan="3" className="p-0">
                    <div className="alert alert-info">No reports found</div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReportTable;

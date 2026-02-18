import React, { useState } from "react";
import UnlockRecordModal from "../Modals/UnlockRecordModal";
import { Lock } from "../../assets/Svgs/Svgs"; // make sure Lock icon exists
import { motion } from "framer-motion";
import { getRowAnimation, useTableAnimation } from "../../utils/tableRowAnimation";

const ManageEncounterLockTable = ({ encounterData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isDataLoaded, direction } = useTableAnimation(false, encounterData.length);

  const handleLockClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <>
      <div className="page-title d-flex justify-content-between align-items-center mb-20 flex-wrap gap-2">
        <h3 className="aa-heading-04 text-primary mb-0">
          Manage Encounter Locks
        </h3>
        <p className="text-primary aa-text-base fw-medium mb-0">
          Locked Encounters ({encounterData.length})
        </p>
      </div>
      <div className="custom-card px-24 py-16">
        <div className="table-responsive max-height-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>User Name</th>
                <th>User Encounter Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {encounterData.length > 0 ? (
                encounterData.map((row, index) => {
                  const rowVariants = getRowAnimation(index, direction, 0.08, 0.4);
                  return (
                    <motion.tr
                      key={index}
                      variants={rowVariants}
                      initial="hidden"
                      animate={isDataLoaded ? "visible" : "hidden"}
                    >
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.userName}</td>
                      <td>{row.encounterDate}</td>
                      <td>
                        <span
                          className="cursor-pointer"
                          onClick={() => handleLockClick(row)}
                        >
                          <Lock color="#153F68" />
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
                  <td colSpan="5" className="p-0">
                    <div className="alert alert-info">No records found</div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Unlock Record Modal */}
      <UnlockRecordModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={selectedUser}
      />
    </>
  );
};

export default ManageEncounterLockTable;

import React, { useState, useEffect } from "react";
import { EditDocument, Eye } from "../../assets/Svgs/Svgs";
import CompanyDetailPopup from "../CompanyDetailPopup/CompanyDetailPopup";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../../redux/features/newsAndFeaturesSlice";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import {
  getRowAnimation,
  useTableAnimation,
} from "../../utils/tableRowAnimation";

const CompanyTable = () => {
  const dispatch = useDispatch();
  const { companies = [], loading } = useSelector((state) => state.news || {});

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [popup, setPopup] = useState(false);
  const { isDataLoaded, direction } = useTableAnimation(
    loading,
    companies.length
  );

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedCompany(null);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="custom-card px-24 py-16">
        <div className="table-responsive max-height-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Company</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.length > 0 ? (
                companies.map((company, index) => {
                  const rowVariants = getRowAnimation(
                    index,
                    direction,
                    0.08,
                    0.4
                  );

                  return (
                    <motion.tr
                      key={company.id || index}
                      variants={rowVariants}
                      initial="hidden"
                      animate={isDataLoaded ? "visible" : "hidden"}
                    >
                      <td>{company.name || "-"}</td>
                      <td>{company.status || "-"}</td>
                      <td>
                        <span
                          className="cursor-pointer me-7"
                          onClick={() => handleViewCompany(company)}
                        >
                          <Eye color="#153F68" />
                        </span>

                        <span className="cursor-pointer">
                          <Link to={`/create-new-company/${company.id}`}>
                            <EditDocument color="#153F68" />
                          </Link>
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
                    <div className="alert alert-info">No records found</div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CompanyDetailPopup
        popup={popup}
        onClose={handleClosePopup}
        reportData={selectedCompany}
      />
    </>
  );
};

export default CompanyTable;

import React, { useEffect, useState } from "react";
import GoBack from "../../../../components/GoBack/GoBack";
import ConsentStatementInformationTable from "../../../../components/Tables/ConsentStatementInformationTable";
import ConsentDetailOffcanvas from "../../../../components/ConsentDetailOffcanvas/ConsentDetailOffcanvas";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ChevronDown, FilterIcon, Search } from "../../../../assets/Svgs/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllConsents } from "../../../../redux/features/consentSlice";

const ConsentStatementInformation = () => {
  const [consentDetailOffcanvas, setConsentDetailOffcanvas] = useState(false);
  const [selectedConsentId, setSelectedConsentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { consents: consentData, loading } = useSelector((state) => state.consent || {});
  const dispatch = useDispatch();

  console.log(consentData);

  // Ensure we always pass an array to the table and include a
  // comma-separated `companiesText` field for easy rendering.
  const processedConsents = Array.isArray(consentData)
    ? consentData.map((c) => ({
        ...c,
        companiesText: Array.isArray(c.companies)
          ? c.companies.map((co) => co.name).join(", ")
          : "",
      }))
    : [];

  const filteredConsents = processedConsents.filter((consent) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (consent.name || "").toLowerCase().includes(lowerCaseSearchTerm) ||
      (consent.text || "").toLowerCase().includes(lowerCaseSearchTerm) ||
      (consent.required ? "required" : "not required").includes(lowerCaseSearchTerm) ||
      (consent.active ? "active" : "inactive").includes(lowerCaseSearchTerm)
    );
  });

  useEffect(() => {
    dispatch(fetchAllConsents());
  }, []);



  const handleOpenOffcanvas = (open, id) => {
    setConsentDetailOffcanvas(open);
    setSelectedConsentId(id);
  };

  return (
    <>
      <div className="sticky-section">
        <div className="mt-13 mb-15 mb-sm-27 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="page-title">
            <h3 className="aa-heading-04 fw-semibold mb-5">
              Consent Statement Information
            </h3>
            <p className="aa-text-xs fw-normal mb-0">
              Organize and maintain Consent Statement.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="search-box position-relative" style={{ width: "240px" }}>
              <input
                type="text"
                className="form-control ps-50 rounded-pill"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="position-absolute top-50 translate-middle-y ms-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M7.19955 13.599C10.7339 13.599 13.599 10.7339 13.599 7.19955C13.599 3.6652 10.7339 0.800049 7.19955 0.800049C3.6652 0.800049 0.800049 3.6652 0.800049 7.19955C0.800049 10.7339 3.6652 13.599 7.19955 13.599Z"
                    stroke="#888A8B"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0002 12.0004L16.7999 16.8"
                    stroke="#888A8B"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* <Dropdown align="end">
              <Dropdown.Toggle
                as="button"
                className="btn btn-white rounded-pill d-flex align-items-center gap-2"
                id="consent-sort-dropdown"
              >
                <span className="d-flex align-items-center justify-content-center rounded-circle bg-light me-1">
                  
                </span>
                <span
                  className="aa-text-xs text-muted"
                  style={{ color: "#5D5F62" }}
                >
                  Sort By:
                </span>
                <span className="aa-text-xs fw-semibold">Newest</span>
                <span className="ms-1">
                  <ChevronDown color="#5D5F62" />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item>Newest</Dropdown.Item>
                <Dropdown.Item>Oldest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}

            <Link to="/create_consent" className="btn btn-primary rounded-pill">
              + Create New
            </Link>
          </div>
        </div>
      </div>

      <ConsentStatementInformationTable
        data={filteredConsents}
        loading={loading}
        activeOffcanvas={handleOpenOffcanvas}
      />

      <ConsentDetailOffcanvas
        popup={consentDetailOffcanvas}
        selectedId={selectedConsentId}
        onClose={() => setConsentDetailOffcanvas(false)}
      />
    </>
  );
};

export default ConsentStatementInformation;

import React, { useState } from "react";
import GoBack from "../../../../components/GoBack/GoBack";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import CompanyInformationForm from "../../../../components/AddNewComponyForms/CompanyInformationForm";
import InsuranceInformationForm from "../../../../components/AddNewComponyForms/InsuranceInformationForm";
import CompanySubLevelsForm from "../../../../components/AddNewComponyForms/CompanySubLevelsForm";
import CompanyDetailPopup from "../../../../components/CompanyDetailPopup/CompanyDetailPopup";

const CreateNewCompany = () => {
  const [activeTab, setActiveTab] = useState("companyInformation");
  const [popup, setPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setPopup(true);
  };

  const handleClosePopup = () => {
    setPopup(false);
    setSelectedReport(null);
  };
  return (
    <>
      <div className="sticky-section">
        <GoBack />
        <div className="mt-13 mb-15 mb-sm-25 mb-md-31 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="page-title">
            <h3 className="aa-heading-04 fw-semibold mb-5">
              Create a new Company
            </h3>
            <p className="aa-text-xs fw-normal text-muted mb-0">
              Organize and maintain Companies.
            </p>
          </div>
          <div className="overflow-x-auto">
            <ul className="list-unstyled d-flex align-items-center gap-2 m-0 flex-nowrap">
              <li>
                <span
                  className="btn btn-outline-primary aa-text-sm rounded-5 text-nowrap"
                  onClick={() => handleReportClick(row)}
                >
                  View Preview
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="overflow-x-auto w-100 mb-5 mb-sm-11 rounded-pill">
          <div className="modify-type-wrapper d-inline-block pb-10">
            <div className="tabs">
              <Nav variant="pills p-8">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "companyInformation"}
                    onClick={() => setActiveTab("companyInformation")}
                  >
                    Company Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "insuranceInformation"}
                    onClick={() => setActiveTab("insuranceInformation")}
                  >
                    Insurance Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "companySubLevels"}
                    onClick={() => setActiveTab("companySubLevels")}
                  >
                    Company Sub Levels
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>
      </div>
      {activeTab === "companyInformation" ? (
        <CompanyInformationForm ActiveTab={setActiveTab} />
      ) : activeTab === "insuranceInformation" ? (
        <InsuranceInformationForm ActiveTab={setActiveTab} />
      ) : (
        activeTab === "companySubLevels" && <CompanySubLevelsForm ActiveTab={setActiveTab} />
      )}

      <CompanyDetailPopup
        popup={popup}
        onClose={handleClosePopup}
        reportData={selectedReport || {}}
      />
    </>
  );
};

export default CreateNewCompany;

import React from "react";
import { Building, EditDocument, Message, Plus } from "../../assets/Svgs/Svgs";
import { Link } from "react-router-dom";

const UserInformationPopup = ({ popup, onClose, userData }) => {
  const transformUserData = (rawData) => {
    if (!rawData) return {}; // Return empty object if no rawData

    return {
      firstName: rawData.firstName || "N/A",
      lastName: rawData.lastName || "N/A",
      email: rawData.email || "N/A",
      phone: rawData.profile?.phone || "N/A",
      active: rawData.isActive !== undefined ? rawData.isActive : false,
      currentRole: rawData.role || "N/A",
      // Fields not directly available in the provided API response, setting to N/A or default
      medicalFirm: "N/A",
      fax: "N/A",
      officeHours: "N/A",
      website: "N/A",
      fullAccess: false, // Assuming default to false if not provided
      companies: [], // No company data in provided API, so empty array
    };
  };

  const data = transformUserData(userData);

  return (
    <>
      <div
        className={`popup-overlay ${popup ? "show" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`participant-pop-wrapper ms-10 ${popup ? "active" : ""}`}>
        <span
          className="popup-close-btn d-inline-flex justify-content-center align-items-center rounded-circle cursor-pointer ms-5"
          onClick={onClose}
        >
          <Plus color="#08182E" />
        </span>
        <div className="participant-pop px-7 py-19">
          <div className="overflow-y-auto h-100 px-7">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-8 position-sticky top-0 bg-white">
              <span>
                <h6 className="aa-heading-6 fw-semibold mb-5">
                  User Information
                </h6>
              </span>
              <div className="d-flex gap-2 flex-wrap">
                <Link
                  to={"/create-new-user"}
                  className="btn btn-outline-primary rounded-pill"
                >
                  Edit User
                </Link>
                <Link
                  to={"/user-management-setup"}
                  className="btn btn-primary rounded-pill"
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <EditDocument color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Basic Information
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    First Name
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{data.firstName}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Last Name
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{data.lastName}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Medical Firm
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    {data.medicalFirm}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Fax
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{data.fax}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Email Address
                  </div>
                  <p className="aa-text-sm fw-normal mb-0 d-flex align-items-center">
                    <span className="me-5">
                      <Message color="#153F68" />
                    </span>
                    {data.email}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Phone #
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{data.phone}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Office Hours
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    {data.officeHours}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Website
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{data.website}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-12 primary-soft-div d-flex justify-content-between align-items-center">
                    <span className="text-primary aa-text-xs fw-medium">
                      Active
                    </span>
                    <div
                      className={`status ${
                        data.active ? "on" : ""
                      } px-7 py-2 text-white rounded-3`}
                    >
                      {data.active ? "On" : "Off"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-12 primary-soft-div d-flex justify-content-between align-items-center">
                    <span className="text-primary aa-text-xs fw-medium">
                      Full Access
                    </span>
                    <div
                      className={`status ${
                        data.fullAccess ? "on" : ""
                      } px-7 py-2 text-white rounded-3`}
                    >
                      {data.fullAccess ? "On" : "Off"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Companies Section */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Building color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">Companies</h6>
              </div>
              <div className="table-responsive max-height-table">
                <table className="table custom-table-striped custom-table text-center align-middle">
                  <thead className="position-sticky top-0 z-1">
                    <tr>
                      <th>Name</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.companies && data.companies.length > 0 ? (
                      data.companies.map((company, index) => (
                        <tr
                          key={index}
                          className={index % 2 !== 0 ? "table-row-alt" : ""}
                        >
                          <td>{company.name || "-"}</td>
                          <td>{company.title || "Title here"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="p-0">
                          <div className="alert alert-info m-0">
                            No companies found
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Roles Section */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Building color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  User Roles
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Current Role
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    {data.currentRole || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInformationPopup;

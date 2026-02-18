import React, { useState } from "react";
import {
  Eye,
  Plus,
  Building,
  Phone,
  Message,
  World,
} from "../../assets/Svgs/Svgs";
import CustomButton from "../customButton/CustomButton";
import SwitchField from "../FormsFields/SwitchField";
import { Link } from "react-router-dom";

const CompanyDetailPopup = ({ popup, onClose, reportData = {} }) => {
  const [settings, setSettings] = useState({
    autoSchedule: false,
    emailNotification: false,
    archiveOldData: false,
    includeCharts: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if(!reportData || !popup) return null;

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
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-8 position-sticky top-0 bg-white">
              <h6 className="aa-heading-6 fw-semibold mb-5">
                Report Details
              </h6>
              <Link to="/create-new-company" className="btn btn-outline-primary rounded-pill">
                Edit Company
              </Link>
            </div>

            {/* Basic Information */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Building color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Basic Information
                </h6>
              </div>

              <div className="row gy-2 gy-sm-3">
                <Info label="Company Name*" value={reportData.name || "-"} />
                <Info label="Identifying Name" value={reportData.identifyingName || "-"} />
                <Info label="Company Code*" value={reportData.companyCode || "-"} />
                <Info label="Contact Name" value={reportData.contactName || "-"} />
                <Info label="Federal Tax ID" value={reportData.federalTaxId || "-"} />
                <Info label="Employee Count*" value={reportData.employeeCount ?? "-"} />
                <Info label="Company Type" value={reportData.companyType || "-"} />
                <Info label="Business Nature" value={reportData.businessNature || "-"} />
                <Info label="Progress Level" value={reportData.progressLevel || "-"} />
              </div>
            </div>

            {/* Address & Other Information */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Building color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Address & Other Information
                </h6>
              </div>

              <div className="row gy-2 gy-sm-3">
                <Info label="Address Line 1" value={reportData.addressLine1 || "-"} />
                <Info label="Address Line 2" value={reportData.addressLine2 || "-"} />

                <Info
                  label="Phone Number"
                  value={
                    <>
                      <Phone color="#153F68" /> {reportData.phoneNumber || "-"}
                    </>
                  }
                />

                <Info label="Phone Extension" value={reportData.phoneExtension || "-"} />

                <Info
                  label="Email Address"
                  value={
                    <>
                      <Message color="#153F68" /> {reportData.email || "-"}
                    </>
                  }
                />

                <Info label="Zip" value={reportData.zip || "-"} />

                <Info
                  label="Country"
                  value={
                    <>
                      <World color="#153F68" /> {reportData.country || "-"}
                    </>
                  }
                />

                <Info label="City" value={reportData.city || "-"} />
                <Info label="State" value={reportData.state || "-"} />
                <Info label="Fax Number" value={reportData.faxNumber || "-"} />
              </div>
            </div>

            {/* Data Information */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <h6 className="aa-text-sm fw-semibold mb-16">Data Information</h6>
              <div className="row gy-2 gy-sm-3">
                <Info label="Data Import" value={reportData.dataImport || "-"} />
                <Info label="Data Export" value={reportData.dataExport || "-"} />
                <Info label="Reminder Timing*" value={reportData.reminderTimingDays ?? "-"} />
                <Info label="Missed Appointment*" value={reportData.missedAppointmentDays ?? "-"} />
                <Info label="Inactive Timing" value={reportData.inactiveTimingDays ?? "-"} />
                <Info label="Wellness Activities Reset" value={reportData.wellnessActivitiesReset || "-"} />
                <Info
                  full
                  label="Missed Apt Postcard Text"
                  value={reportData.missedAptPostcardText || "-"}
                />
              </div>
            </div>

            {/* Company Sub Levels */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <h6 className="aa-text-sm fw-semibold mb-16">Company Sub Levels</h6>
              <div className="row gy-3">
                <Info label="Parent Company" value={reportData.parentCompanyName || "-"} />

                <div className="col-12 col-sm-6 col-md-4">
                  <span className="aa-text-sm fw-medium">Locations</span>
                  {(reportData.locations?.length &&
                    reportData.locations.map((l, i) => (
                      <p key={i} className="aa-text-sm mb-0">
                        - {l.addressLine1 || "-"}
                      </p>
                    ))) || <p>-</p>}
                </div>

                <div className="col-12 col-sm-6 col-md-4">
                  <span className="aa-text-sm fw-medium">Departments</span>
                  {(reportData.departments?.length &&
                    reportData.departments.map((d, i) => (
                      <p key={i} className="aa-text-sm mb-0">
                        - {d.name || "-"}
                      </p>
                    ))) || <p>-</p>}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <h6 className="aa-text-sm fw-semibold mb-16">
                Additional Information
              </h6>
              <div className="row gy-3">
                <Status label="Self Insured" value={reportData.selfInsured} />
                <Status label="Active" value={reportData.active} />
                <Status label="Allow Access to PWP" value={reportData.allowAccessToPwp} />
                <Status label="Allow Access to Validic" value={reportData.allowAccessToValidic} />
                <Status label="Enable Online HRA" value={reportData.enableOnlineHra} />
                <Status label="Online Biometric Required" value={reportData.onlineBiometricRequired} />
                <Status label="Condition Management" value={reportData.conditionManagement} />
                <Status label="Wellbeing Wheel" value={reportData.wellbeingWheel} />
                <Status label="Enable Internal Messaging" value={reportData.enableInternalMessaging} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

/* ---------- Helpers ---------- */

const Info = ({ label, value, full }) => (
  <div className={`col-12 col-sm-6 col-lg-4 ${full ? "col-lg-12" : ""}`}>
    <div className="aa-text-xs fw-medium text-primary mb-6">{label}</div>
    <p className="aa-text-sm fw-normal mb-0">{value}</p>
  </div>
);

const Status = ({ label, value }) => (
  <div className="col-12 col-sm-6">
    <div className="primary-soft-div p-12 d-flex justify-content-between align-items-center">
      <span className="aa-text-sm fw-medium text-primary">{label}</span>
      <span className={`status ${value ? "on" : ""} px-7 py-2 text-white rounded-3`}>
        {value ? "On" : "Off"}
      </span>
    </div>
  </div>
);

export default CompanyDetailPopup;

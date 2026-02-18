import React, { useEffect, useState } from "react";
import {
  Building,
  Plus,
} from "../../assets/Svgs/Svgs";
import CustomButton from "../customButton/CustomButton";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateConsent } from '../../redux/features/consentSlice';

const ConsentDetailOffcanvas = ({ popup, onClose, selectedId, consentDetails = null }) => {
  const dispatch = useDispatch();
  const { companies, consents } = useSelector((state) => state.consent || {});
  const [selectedConsent, setSelectedConsent] = useState(null);

  useEffect(() => {
    if (selectedId && Array.isArray(consents)) {
      const foundConsent = consents.find((c) => String(c.id) === String(selectedId));
      setSelectedConsent(foundConsent);
    }
  }, [selectedId, consents]);

  const effectiveConsent = consentDetails || selectedConsent;

  // No need to call updateConsent on mount, as this component is for display details
  // useEffect(() => {
  //   updateConsent();
  // }, [])
  const [isChecked, setIsChecked] = useState(true);

  // Helper to resolve company name(s)
  const getCompanyDisplay = () => {
    if (!effectiveConsent) return "";

    // 1. If we have a full "companies" array in effectiveConsent
    if (Array.isArray(effectiveConsent.companies) && effectiveConsent.companies.length > 0) {
      if (effectiveConsent.companies.length === 1) {
        const co = effectiveConsent.companies[0];
        return co.name || co.identifyingName || co.identifying_name || "";
      }
      return "All";
    }

    // 2. If we have "companyIds" in effectiveConsent and "companies" from Redux
    if (
      Array.isArray(effectiveConsent.companyIds) &&
      effectiveConsent.companyIds.length > 0 &&
      Array.isArray(companies)
    ) {
      if (effectiveConsent.companyIds.length === 1) {
        const found = companies.find((c) => c.id === effectiveConsent.companyIds[0]);
        if (found) {
          return found.name || found.identifyingName || found.identifying_name || "";
        }
      } else {
        return "All";
      }
    }

    return "";
  };

  const companyDisplay = getCompanyDisplay();
  
  // Use selectedId if available, otherwise fall back to consentDetails?.id
  // const effectiveId = selectedId || consentDetails?.id;
  // const editLink = effectiveId
  //   ? `/create_consent?id=${effectiveId}`
  //   : "/create_consent";


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
                  Consent Statement Information Details
                </h6>
              </span>
              <div className=" d-flex gap-2 flex-wrap">
                {/* <Link to={editLink} className="btn btn-outline-primary rounded-pill">
                  Edit Consent
                </Link> */}
                <Link
                  to={"/consent"}
                  className="btn btn-primary rounded-pill d-inline-flex justify-content-center align-items-center"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Building color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Information
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Consent Statement Name*
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{effectiveConsent?.name}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Consent Frequency (days)
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{effectiveConsent?.frequencyDays}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Company
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{companyDisplay}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Sort Order*
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="text-primary me-5">#</span>{effectiveConsent?.sortOrder}
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Date Added
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">{effectiveConsent?.dateAdded}</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Consent Statement Text*
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    {effectiveConsent?.text}
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8 additional-information">
              <div className="form-check form-switch d-inline-flex mb-8">
                <input
                  type="checkbox"
                  className="form-check-input ms-0"
                  id="additional_information"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label
                  className="form-check-label ms-10 aa-text-sm fw-semibold text-primary"
                  htmlFor="additional_information"
                >
                  Additional Information
                </label>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6">
                  <div className="p-12 primary-soft-div d-flex justify-content-between align-items-center">
                    <span className="text-primary aa-text-xs fw-medium">
                      Required
                    </span>
                    <div
                      className={`status px-7 py-2 text-white rounded-3 ${
                        effectiveConsent?.required ? "on" : ""
                      }`}
                      style={{
                        backgroundColor: effectiveConsent?.required
                          ? "#198754"
                          : "#6c757d",
                      }}
                    >
                      {effectiveConsent?.required ? "On" : "Off"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-12 primary-soft-div d-flex justify-content-between align-items-center">
                    <span className="text-primary aa-text-xs fw-medium">
                      Answer Required
                    </span>
                    <div
                      className={`status px-7 py-2 text-white rounded-3 ${
                        effectiveConsent?.answerRequired ? "on" : ""
                      }`}
                      style={{
                        backgroundColor: effectiveConsent?.answerRequired
                          ? "#198754"
                          : "#6c757d",
                      }}
                    >
                      {effectiveConsent?.answerRequired ? "On" : "Off"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-12 primary-soft-div d-flex justify-content-between align-items-center">
                    <span className="text-primary aa-text-xs fw-medium">
                      Cost Risk Consent
                    </span>
                    <div
                      className={`status px-7 py-2 text-white rounded-3 ${
                        effectiveConsent?.costRiskConsent ? "on" : ""
                      }`}
                      style={{
                        backgroundColor: effectiveConsent?.costRiskConsent
                          ? "#198754"
                          : "#6c757d",
                      }}
                    >
                      {effectiveConsent?.costRiskConsent ? "On" : "Off"}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-12 primary-soft-div d-flex justify-content-between align-items-center">
                    <span className="text-primary aa-text-xs fw-medium">
                      Active
                    </span>
                    <div
                      className={`status px-7 py-2 text-white rounded-3 ${
                        effectiveConsent?.active ? "on" : ""
                      }`}
                      style={{
                        backgroundColor: effectiveConsent?.active
                          ? "#198754"
                          : "#6c757d",
                      }}
                    >
                      {effectiveConsent?.active ? "On" : "Off"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsentDetailOffcanvas;

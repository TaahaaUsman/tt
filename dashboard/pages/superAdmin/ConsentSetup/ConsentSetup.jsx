import React from "react";
import GoBack from "../../../components/GoBack/GoBack";
import ConsentStatementInformationFrom from "../../../components/ConsentStatementInformationFrom/ConsentStatementInformationFrom";
import { useSearchParams } from "react-router-dom";

const ConsentSetup = () => {
  const [searchParams] = useSearchParams();
  const paramId = searchParams.get("id");

  return (
    <>
      <div className="sticky-section">
        <GoBack />
        <div className="mt-13 mb-15 mb-sm-27 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="page-title">
            <h3 className="aa-heading-04 fw-semibold mb-5">
              Consent Statement Information
            </h3>
            <p className="aa-text-xs fw-normal mb-0">
              Organize and maintain Companies.
            </p>
          </div>
        </div>
      </div>
      <ConsentStatementInformationFrom paramId={paramId} />
    </>
  );
};

export default ConsentSetup;

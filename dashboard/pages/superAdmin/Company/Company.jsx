import React from "react";
import GoBack from "../../../components/GoBack/GoBack";
import { Link } from "react-router-dom";
import CompanyTable from "../../../components/Tables/CompanyTable";
import LoaderButton from "../../../components/LoaderButton/LoaderButton";

const Company = () => {

  return (
    <>
      <div className="mt-13 mb-15 mb-sm-25 mb-md-34 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 fw-semibold mb-5">
            Select a Company to Edit
          </h3>
          <p className="aa-text-xs fw-normal text-muted mb-0">
            Organize and maintain Companies.
          </p>
        </div>
        <div className="overflow-x-auto">
          <ul className="list-unstyled d-flex align-items-center gap-2 m-0 flex-nowrap">
            <li>
              <LoaderButton
                to="/create-new-company"
                className="btn btn-primary aa-text-sm rounded-5 text-nowrap"
              >
                + Create New
              </LoaderButton>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-15 mb-sm-24">
        <CompanyTable />
      </div>
      
    </>
  );
};

export default Company;

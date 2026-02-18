import React from "react";
import { Link } from "react-router-dom";

const DashboardDetailCard = ({
  title,
  value,
  total,
  icon,
  growth,
  onViewDetails,
}) => {
  return (
    <div className="dashboard-card h-100">
      <div className="dashboard-card-body px-16 py-16 py-sm-32">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-primary fw-medium aa-heading-06 mb-8">{title}</h6>
            <h4 className="fw-semibold mb-0 aa-heading-04">
              {total ? `${value}/${total}` : value}
            </h4>
          </div>
          <div className="d-flex align-items-center">
            <div className="growth-indicator px-14 py-7 rounded-pill d-flex align-items-center me-12">
              <span className=" me-3">↑</span>
              <span className="">{growth}</span>
            </div>
            <div className="icon text-primary">{icon}</div>
          </div>
        </div>
      </div>
        <div className="py-10 d-flex justify-content-center">
          <Link
            to={onViewDetails || ""}
            className="btn btn-link text-primary text-decoration-none p-0 aa-text-xs fw-bold"
          >
            View Details
          </Link>
        </div>
    </div>
  );
};

export default DashboardDetailCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, FilterIcon, Search } from "../../../assets/Svgs/Svgs";
import { Dropdown } from "react-bootstrap";
import EncounterAccessTable from "../../../components/Encounters/EncounterAccessTable";
import UserInformationPopup from "../../../components/UserInformationPopup/UserInformationPopup";

const Encounters = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const tableData = [
    {
      id: 1,
      participantName: "Amy Adams",
      company: "Wellness Training",
      participantType: "Child",
      EncounterType: "HRA Questions",
      SSN: "243-224-2425",
      wellnessStatus: "Active",
    },
    {
      id: 2,
      participantName: "John Smith",
      company: "Health Educators Inc",
      participantType: "Adult",
      EncounterType: "Biometric Assessment",
      SSN: "567-891-2345",
      wellnessStatus: "Active",
    },
    {
      id: 3,
      participantName: "Sarah Johnson",
      company: "OMC Training",
      participantType: "Adult",
      EncounterType: "HRA Questions",
      SSN: "789-234-5678",
      wellnessStatus: "Inactive",
    },
    {
      id: 4,
      participantName: "Michael Brown",
      company: "Cox Engineering",
      participantType: "Child",
      EncounterType: "Health Screening",
      SSN: "234-567-8901",
      wellnessStatus: "Active",
    },
    {
      id: 5,
      participantName: "Emily Davis",
      company: "Shawmut",
      participantType: "Adult",
      EncounterType: "Follow-up",
      SSN: "456-789-0123",
      wellnessStatus: "Active",
    },
    {
      id: 6,
      participantName: "David Wilson",
      company: "Turner Construction",
      participantType: "Adult",
      EncounterType: "Lab Results",
      SSN: "678-901-2345",
      wellnessStatus: "Active",
    },
    {
      id: 7,
      participantName: "Jessica Martinez",
      company: "Systems Engineering",
      participantType: "Child",
      EncounterType: "Wellness Coaching",
      SSN: "890-123-4567",
      wellnessStatus: "Pending",
    },
    {
      id: 8,
      participantName: "Robert Taylor",
      company: "Janey Construction",
      participantType: "Adult",
      EncounterType: "Physical Exam",
      SSN: "012-345-6789",
      wellnessStatus: "Active",
    },
    {
      id: 9,
      participantName: "Lisa Anderson",
      company: "Wellness Training",
      participantType: "Adult",
      EncounterType: "Nutrition Assessment",
      SSN: "123-456-7890",
      wellnessStatus: "Active",
    },
    {
      id: 10,
      participantName: "James Thomas",
      company: "OMC Training",
      participantType: "Child",
      EncounterType: "Mental Health",
      SSN: "234-567-8901",
      wellnessStatus: "Active",
    },
    {
      id: 11,
      participantName: "Mary Jackson",
      company: "Health Educators Inc",
      participantType: "Adult",
      EncounterType: "Preventive Care",
      SSN: "345-678-9012",
      wellnessStatus: "Inactive",
    },
    {
      id: 12,
      participantName: "Charles White",
      company: "Cox Engineering",
      participantType: "Adult",
      EncounterType: "Immunization",
      SSN: "456-789-0123",
      wellnessStatus: "Active",
    },
  ];

  return (
    <>
      <div className="mt-13 mb-15 mb-sm-25 mb-md-35 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title"><h3 className="aa-heading-04 fw-semibold mb-5">Encounters</h3><p className="aa-text-xs fw-normal text-muted mb-0">Create and maintain Encounters.</p></div>
        <div className=" py-10">
          <ul className="list-unstyled d-flex align-items-center gap-3 m-0 flex-wrap">

            <li>
              <div
                className="search-box position-relative"
                style={{ width: "240px" }}
              >
                <input
                  type="text"
                  className="form-control ps-50 rounded-pill"
                  placeholder="Search..."
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
            </li>

            <li>

              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  className="btn btn-white rounded-pill d-flex align-items-center gap-2"
                  id="consent-sort-dropdown"
                >
                  <span
                    className="aa-text-xs text-muted d-flex align-items-center"
                    style={{ color: "#5D5F62" }}
                  >
                    {/* <FilterIcon color="#5D5F62" className="me-1" /> */}
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
              </Dropdown>
            </li>

            <li>
              <Link
                to="/create-new-encounter"
                className="btn btn-primary aa-text-sm rounded-5 text-nowrap"
              >
                + Create New
              </Link>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="">
        <EncounterAccessTable
          data={tableData}
          viewDetail={(user) => {
            setSelectedUser(user);
            setShowUserPopup(true);
          }}
        />
      </div>

      <UserInformationPopup
        popup={showUserPopup}
        onClose={() => {
          setShowUserPopup(false);
          setSelectedUser(null);
        }}
        userData={selectedUser}
      />
    </>
  );
};

export default Encounters;

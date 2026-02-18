import React from "react";
import {
  Building,
  EditDocument,
  Eye,
  Loaction,
  Message,
  Phone,
  Plus,
  PlusFile,
  Users,
  World,
} from "../../assets/Svgs/Svgs";
import CustomButton from "../customButton/CustomButton";
import { Link } from "react-router-dom";

const ParticipantPopup = ({ popup, onClose }) => {
  const encounterData = [
    {
      id: "1",
      name: "Injury",
      question: "25",
      date: "12/16/1960",
      status: "Active",
    },
    {
      id: "2",
      name: "Fracture",
      question: "18",
      date: "03/22/1975",
      status: "Inactive",
    },
    {
      id: "3",
      name: "Headache",
      question: "32",
      date: "07/09/1988",
      status: "Active",
    },
    {
      id: "4",
      name: "Flu",
      question: "12",
      date: "11/03/1999",
      status: "Pending",
    },
    {
      id: "5",
      name: "Back Pain",
      question: "40",
      date: "09/27/2005",
      status: "Resolved",
    },
  ];

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
                  Participant Details
                </h6>
              </span>
              <div className=" d-flex gap-2 flex-wrap">
                <Link to={"/create-new-participant"} className="btn btn-outline-primary rounded-pill">
                  Edit Participant
                </Link>
                <button className="btn btn-primary rounded-pill d-inline-flex justify-content-center align-items-center gap-2">
                  <Plus /> Create New Encounter
                </button>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Building color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Basic Information
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    First Name*
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">John Doe Rayn</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Date of Birth
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">March 13, 1997</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Gender*
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Male</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Language
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="text-primary me-5">#</span>OMCT
                  </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Race
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="me-5">
                      <Users color="#153F68" />
                    </span>
                    20
                  </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Marital Status
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="me-5">
                      <Users color="#153F68" />
                    </span>
                    20
                  </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Employee ID
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Entry</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    SSN*
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Entry</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Alternate ID
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Entry</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Medical Insurance
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Entry</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    General Comments
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Entry</p>
                </div>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Message color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Contact Information
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Preferred Contact
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Chase Hayes</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Home Phone
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">207-524-2412</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Mobile Phone
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="me-5">
                      <Phone color="#153F68" />
                    </span>
                    207-524-2411
                  </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Work Phone
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">3225</p>
                </div>
                <div className="col-12 col-sm-8">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Email Address
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="me-5">
                      <Message color="#153F68" />
                    </span>
                    chayes@omcwellness.com
                  </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Address Line 1
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">306 Campbell Rd</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Address Line 2
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">306 Campbell Rd</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    City
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">New York</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    State
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">ME</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Country
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="me-5">
                      <World color="#153F68" />
                    </span>
                    US
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Loaction color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Address Information
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Address Line 1
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    742 Maple Avenue, Springfield, IL 62704, USA
                  </p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Address Line 2
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    742 Maple Avenue, Springfield, IL 62704, USA
                  </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    City
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">New York</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    State
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">ME</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Zip
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">04263</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Country
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">
                    <span className="me-5">
                      <World color="#153F68" />
                    </span>
                    US
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Users color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Family Information
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Name
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Perry Pell</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    SNN
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">***-**_*000</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Participant Type
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">New York</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Birthdate
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">12/16/1960</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Company
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Wellness Training</p>
                </div>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex justify-content-between align-items-center mb-16">
                <div className="d-flex">
                  <svg
                    width="9"
                    height="12"
                    viewBox="0 0 9 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99995 3.49995L5.5 0V3.49995H8.99995Z"
                      fill="#153F68"
                    />
                    <path
                      d="M5.50005 4.5C5.23484 4.49992 4.98052 4.39453 4.793 4.207C4.60547 4.01948 4.50008 3.76516 4.5 3.49995V1.01305e-07H1.00005C0.868755 -5.90064e-05 0.738735 0.0257479 0.617416 0.0759467C0.496097 0.126145 0.385855 0.199753 0.292988 0.292564C0.200121 0.385375 0.126448 0.495573 0.0761762 0.616862C0.0259047 0.738151 1.97338e-05 0.868155 4.50289e-08 0.99945V10.9999C-3.93726e-05 11.1313 0.0258008 11.2613 0.076044 11.3827C0.126287 11.504 0.199949 11.6143 0.29282 11.7072C0.385691 11.8001 0.495951 11.8737 0.617301 11.924C0.73865 11.9742 0.86871 12 1.00005 12L7.99995 12.0009C8.26512 12.0008 8.51939 11.8954 8.70691 11.7079C8.89442 11.5204 8.99984 11.2662 9 11.001V4.5H5.50005ZM6 8.4999H4.99995V9.49995H4.00005V8.4999H3V7.5H4.00005V6.49995H4.99995V7.5H6V8.4999Z"
                      fill="#153F68"
                    />
                  </svg>
                  <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                    Encounters
                  </h6>
                </div>
                <Link to={"#"} className="btn btn-outline-primary rounded-pill">
                  View all
                </Link>
              </div>
              <div className="table-responsive max-height-table">
                <table className="table custom-table-striped custom-table text-center align-middle">
                  <thead className="position-sticky top-0 z-1">
                    <tr>
                      <th style={{ minWidth: "110px" }}>Name</th>
                      <th style={{ minWidth: "110px" }}>Questions</th>
                      <th style={{ minWidth: "110px" }}>Date</th>
                      <th style={{ minWidth: "110px" }}>Status</th>
                      <th style={{ minWidth: "110px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {encounterData.length > 0 ? (
                      encounterData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.name || "-"}</td>
                          <td>{row.question || "-"}</td>
                          <td>{row.date || "-"}</td>
                          <td>{row.status || "-"}</td>
                          <td>
                            <span className="cursor-pointer me-7">
                              <Eye color="#153F68" />
                            </span>
                            <span className="cursor-pointer">
                              <EditDocument color="#153F68" />
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-0">
                          <div className="alert alert-info">
                            No records found
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8">
              <div className="d-flex mb-16">
                <Users color="#153F68" />
                <h6 className="aa-text-sm fw-semibold mb-0 ms-10">
                  Company Information
                </h6>
              </div>
              <div className="row gy-2 gy-sm-3">
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Hire Date
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">3/1/2010</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Termination Date
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">3/1/2010</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Company
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Wellness Training</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Regions
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Maine</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Status
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Employed</p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Jobsite
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Leeds</p>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="aa-text-xs fw-medium mb-0 mb-sm-6 mb-md-8 text-primary">
                    Department
                  </div>
                  <p className="aa-text-sm fw-normal mb-0">Occupational Health</p>
                </div>
              </div>
            </div>
            <div className="custom-card py-16 px-16 px-sm-22 mb-8 additional-information">
              <div className="form-check form-switch d-inline-flex mb-8">
                <input
                  className="form-check-input ms-0"
                  type="checkbox"
                  id="additional_information"
                  checked
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
                      Company Medical Insurance
                    </span>
                    <div className="status on px-7 py-2 text-white rounded-3">
                      On
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="p-12 primary-soft-div d-flex justify-content-between align-items-center">
                    <span className="text-primary aa-text-xs fw-medium">
                      Health Coach
                    </span>
                    <div className="status px-7 py-2 text-white rounded-3">
                      Off
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

export default ParticipantPopup;

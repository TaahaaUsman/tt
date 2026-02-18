import React, { useEffect, useRef, useState } from "react";
import GoBack from "../../../components/GoBack/GoBack";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronDown, ChevronUp } from "../../../assets/Svgs/Svgs";
import CustomButton from "../../../components/customButton/CustomButton";
import UserAccountTable from "../../../components/Tables/UserAccountTable";
import ManageEncounterLockTable from "../../../components/Tables/ManageEncounterLockTable";


const RecordManagementAdmin = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const companies = ["Company A", "Company B", "Company C", "Company D"];

  const userAccount = [
    {
      id: 1,
      firstName: "John",
      lastName: "Ab",
      company: "OMC Training",
      dob: "20/04/1996",
      userId: "1111",
    },
    {
      id: 2,
      firstName: "Liam Davis",
      lastName: "Ace",
      company: "OMC Training",
      dob: "12/01/2010",
      userId: "121",
    },
    {
      id: 3,
      firstName: "Bev",
      lastName: "Aces",
      company: "OMC Training",
      dob: "22/07/1990",
      userId: "21458",
    },
    {
      id: 4,
      firstName: "Sally",
      lastName: "Adams",
      company: "OMC Training",
      dob: "30/08/1985",
      userId: "smileyfaces",
    },
    {
      id: 5,
      firstName: "Sam",
      lastName: "Adams",
      company: "OMC Training",
      dob: "18/02/2004",
      userId: "555556-1",
    },
    {
      id: 6,
      firstName: "Shirley",
      lastName: "Adams",
      company: "OMC Training",
      dob: "15/03/1988",
      userId: "5646135465213",
    },
    {
      id: 7,
      firstName: "Friday",
      lastName: "Afflek",
      company: "OMC Training",
      dob: "05/11/2005",
      userId: "8888888",
    },
    {
      id: 8,
      firstName: "Jill",
      lastName: "Ab",
      company: "OMC Training",
      dob: "09/05/1982",
      userId: "2869",
    },
    {
      id: 9,
      firstName: "Jennifer",
      lastName: "Afflek",
      company: "OMC Training",
      dob: "27/06/2003",
      userId: "001021",
    },
    {
      id: 10,
      firstName: "Charles",
      lastName: "Agnew",
      company: "OMC Training",
      dob: "23/12/2012",
      userId: "197897897",
    },
    {
      id: 11,
      firstName: "Jennifer",
      lastName: "Afflek",
      company: "OMC Training",
      dob: "27/06/2003",
      userId: "001021",
    },
    {
      id: 12,
      firstName: "Charles",
      lastName: "Agnew",
      company: "OMC Training",
      dob: "23/12/2012",
      userId: "197897897",
    },
  ];

  const encounterData = [
    {
      id: 1,
      firstName: "John",
      userName: "amore",
      lastName: "Doe",
      encounterDate: "2025-10-15",
    },
    {
      id: 2,
      firstName: "Emma",
      userName: "srole",
      lastName: "Smith",
      encounterDate: "2025-09-30",
    },
    {
      id: 3,
      firstName: "Liam",
      userName: "batten",
      lastName: "Brown",
      encounterDate: "2025-08-21",
    },
    {
      id: 4,
      firstName: "Olivia",
      userName: "missy",
      lastName: "Johnson",
      encounterDate: "2025-07-14",
    },
    {
      id: 5,
      firstName: "Noah",
      userName: "Akloster",
      lastName: "Taylor",
      encounterDate: "2025-06-05",
    },
  ];

  const formatSSN = (value) => {
    if (!value) return value;
    const digits = value.replace(/\D/g, "");
    const len = digits.length;

    if (len <= 3) return digits;
    if (len <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
  };

  // ✅ Updated validation — all fields optional now
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      company: [],
      ssn: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      company: Yup.array(),
      ssn: Yup.string().matches(
        /^\d{3}-\d{2}-\d{4}$/,
        "Invalid SSN format (XXX-XX-XXXX)"
      ),
    }),
    onSubmit: (values) => {
      const filtered = userAccount.filter((p) => {
        const matchFirst =
          !values.firstName ||
          p.firstName.toLowerCase().includes(values.firstName.toLowerCase());

        const matchLast =
          !values.lastName ||
          p.lastName.toLowerCase().includes(values.lastName.toLowerCase());

        const matchCompany =
          values.company.length === 0 || values.company.includes(p.company);

        const matchSSN =
          !values.ssn ||
          (p.userId &&
            p.userId.replace(/\D/g, "") === values.ssn.replace(/\D/g, ""));

        // ✅ Only return if all criteria match
        return matchFirst && matchLast && matchCompany && matchSSN;
      });

      setSearchResults(filtered);
      setShowTable(true);
    },
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSSNChange = (e) => {
    const formatted = formatSSN(e.target.value);
    formik.setFieldValue("ssn", formatted);
  };

  const handleCompanyToggle = (company) => {
    const current = formik.values.company;
    if (current.includes(company)) {
      formik.setFieldValue(
        "company",
        current.filter((c) => c !== company)
      );
    } else {
      formik.setFieldValue("company", [...current, company]);
    }
  };

  return (
    <div>
      <GoBack />
      <div className="mt-13 mb-15 mb-sm-25 mb-md-31 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 text-primary mb-5">
            Manage PWP User Account - Search
          </h3>
        </div>
        {!showTable ? (
          <div className="overflow-x-auto">
            <ul className="list-unstyled d-flex align-items-center gap-2 m-0 flex-nowrap">
              <li>
                <Link
                  to="#"
                  className="btn btn-primary aa-text-sm rounded-5 text-nowrap"
                >
                  History
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      {!showTable ? (
        <div className="search-criteria-card mx-auto">
          <div className="p-15 p-sm-24">
            <h4 className="mb-0 aa-heading-05 fw-semibold">Search Criteria</h4>
          </div>

          <Form onSubmit={formik.handleSubmit}>
            <div className="search-criteria-card-body p-15 p-sm-24">
              <div className="row g-4">
                {/* First Name */}
                <div className="col-12 col-md-6">
                  <div className="did-floating-label-content text-start">
                    <input
                      type="text"
                      name="firstName"
                      placeholder=" "
                      className={`did-floating-input ${
                        formik.touched.firstName && formik.errors.firstName
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="did-floating-label aa-text-xs text-primary">
                      First Name
                    </label>
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-12 col-md-6">
                  <div className="did-floating-label-content text-start">
                    <input
                      type="text"
                      name="lastName"
                      placeholder=" "
                      className={`did-floating-input ${
                        formik.touched.lastName && formik.errors.lastName
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="did-floating-label aa-text-xs text-primary">
                      Last Name
                    </label>
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Multi-select */}
                <div className="col-12 col-md-6 position-relative">
                  <div
                    ref={dropdownRef}
                    className={`did-floating-label-content text-start ${
                      showDropdown ? "open" : ""
                    }`}
                  >
                    <div
                      className={`did-floating-input d-flex justify-content-between align-items-center ${
                        formik.touched.company && formik.errors.company
                          ? "is-invalid"
                          : ""
                      }`}
                      onClick={() => setShowDropdown(!showDropdown)}
                      style={{ cursor: "pointer", background: "#fff" }}
                    >
                      <span>
                        {formik.values.company.length > 0
                          ? formik.values.company.join(", ")
                          : "Select Company"}
                      </span>
                      {showDropdown ? (
                        <ChevronUp color="#3B3E40" />
                      ) : (
                        <ChevronDown color="#3B3E40" />
                      )}
                    </div>

                    {formik.values.company.length > 0 ? (
                      <label className="did-floating-label aa-text-xs text-primary">
                        Select Company
                      </label>
                    ) : null}

                    {showDropdown && (
                      <div
                        className="dropdown-menu show w-100 p-10 mt-4"
                        style={{
                          border: "1px solid #ccc",
                          maxHeight: "180px",
                          overflowY: "auto",
                          zIndex: 10,
                        }}
                      >
                        {companies.map((company, index) => (
                          <div
                            key={index}
                            className="form-check"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <label
                              className="form-check-label cursor-pointer d-flex justify-content-between align-items-center w-100"
                              htmlFor={`company-${index}`}
                            >
                              {company}

                              <input
                                type="checkbox"
                                className="custom-checkbox"
                                id={`company-${index}`}
                                checked={formik.values.company.includes(
                                  company
                                )}
                                onChange={() => handleCompanyToggle(company)}
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    {formik.touched.company && formik.errors.company && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.company}
                      </div>
                    )}
                  </div>
                </div>

                {/* SSN */}
                <div className="col-12 col-md-6">
                  <div className="did-floating-label-content text-start">
                    <input
                      type="text"
                      name="ssn"
                      placeholder=" "
                      maxLength="11"
                      className={`did-floating-input ${
                        formik.touched.ssn && formik.errors.ssn
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.ssn}
                      onChange={handleSSNChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="did-floating-label aa-text-xs text-primary">
                      Social Security #
                    </label>
                    {formik.touched.ssn && formik.errors.ssn && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.ssn}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-15 px-sm-24 py-16 d-flex justify-content-end gap-2">
              <div className="text-end">
                <CustomButton
                  type="submit"
                  className="btn-primary rounded-5"
                  text="Search"
                />
              </div>
            </div>
          </Form>
        </div>
      ) : (
        <>
          <UserAccountTable data={searchResults} />
          <div className="devider my-20 my-sm-30"></div>
          <ManageEncounterLockTable encounterData={encounterData} />
        </>
      )}
    </div>
  );
};

export default RecordManagementAdmin;

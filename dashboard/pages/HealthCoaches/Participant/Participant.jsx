import React, { useEffect, useMemo, useState } from "react";
import GoBack from "../../../components/GoBack/GoBack";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import ParticipantTable from "../../../components/Tables/ParticipantTable";
import CustomButton from "../../../components/customButton/CustomButton";
import FloatingInputField from "../../../components/FormsFields/FloatingInputField";
import { ChevronDown, FilterIcon } from "../../../assets/Svgs/Svgs";

const Participant = () => {
  const [showTable, setShowTable] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"
  const [formFilters, setFormFilters] = useState({
    firstName: "",
    lastName: "",
    uniqueId: "",
    dob: "",
  });

  const allParticipants = useMemo(
    () => [
    {
      id: 1,
      uniqueId: "1234567890",
      name: "John Smith",
      participantType: "Child",
      company: "Company A",
      ssn: "123-45-6789",
      status: "Active",
      dob: "2005-03-12",
    },
    {
      id: 2,
      uniqueId: "1234567890",
      name: "Jane Doe",
      participantType: "Adult",
      company: "Company B",
      ssn: "987-65-4321",
      status: "Inactive",
      dob: "1988-07-24",
    },
    {
      id: 3,
      uniqueId: "1234567890",
      name: "Michael Johnson",
      participantType: "Adult",
      company: "Company C",
      ssn: "111-22-3333",
      status: "Active",
      dob: "1990-02-14",
    },
    {
      id: 4,
      uniqueId: "1234567890",
      name: "Emma Brown",
      participantType: "Teen",
      company: "Company D",
      ssn: "222-33-4444",
      status: "Inactive",
      dob: "2008-11-03",
    },
    {
      id: 5,
      uniqueId: "1234567890",
      name: "Olivia Davis",
      participantType: "Adult",
      company: "Company E",
      ssn: "333-44-5555",
      status: "Active",
      dob: "1995-04-18",
    },
    {
      id: 6,
      uniqueId: "1234567890",
      name: "William Wilson",
      participantType: "Child",
      company: "Company F",
      ssn: "444-55-6666",
      status: "Active",
      dob: "2010-09-10",
    },
    {
      id: 7,
      uniqueId: "1234567890",
      name: "Sophia Martinez",
      participantType: "Adult",
      company: "Company G",
      ssn: "555-66-7777",
      status: "Inactive",
      dob: "1982-12-20",
    },
    {
      id: 8,
      uniqueId: "1234567890",
      name: "James Anderson",
      participantType: "Teen",
      company: "Company H",
      ssn: "666-77-8888",
      status: "Active",
      dob: "2006-05-05",
    },
    {
      id: 9,
      uniqueId: "1234567890",
      name: "Mia Thomas",
      participantType: "Child",
      company: "Company I",
      ssn: "777-88-9999",
      status: "Inactive",
      dob: "2012-01-28",
    },
    {
      id: 10,
      uniqueId: "1234567890",
      name: "Benjamin Taylor",
      participantType: "Adult",
      company: "Company J",
      ssn: "888-99-0000",
      status: "Active",
      dob: "1993-10-16",
    },
    {
      id: 11,
      uniqueId: "1234567890",
      name: "Charlotte Lee",
      participantType: "Teen",
      company: "Company K",
      ssn: "999-00-1111",
      status: "Inactive",
      dob: "2007-06-09",
    },
    {
      id: 12,
      uniqueId: "1234567890",
      name: "Daniel Harris",
      participantType: "Adult",
      company: "Company L",
      ssn: "101-10-1212",
      status: "Active",
      dob: "1987-08-21",
    },
    {
      id: 13,
      uniqueId: "1234567890",
      name: "Amelia Clark",
      participantType: "Adult",
      company: "Company M",
      ssn: "202-20-2323",
      status: "Active",
      dob: "1991-09-13",
    },
    {
      id: 14,
      uniqueId: "1234567890",
      name: "Lucas Robinson",
      participantType: "Child",
      company: "Company N",
      ssn: "303-30-3434",
      status: "Inactive",
      dob: "2011-02-27",
    },
    {
      id: 15,
      uniqueId: "1234567890",
      name: "Evelyn Lewis",
      participantType: "Teen",
      company: "Company O",
      ssn: "404-40-4545",
      status: "Active",
      dob: "2005-07-30",
    },
    {
      id: 16,
      uniqueId: "1234567890",
      name: "Henry Walker",
      participantType: "Adult",
      company: "Company P",
      ssn: "505-50-5656",
      status: "Active",
      dob: "1984-03-08",
    },
    {
      id: 17,
      uniqueId: "1234567890",
      name: "Isabella Hall",
      participantType: "Adult",
      company: "Company Q",
      ssn: "606-60-6767",
      status: "Inactive",
      dob: "1992-05-11",
    },
    {
      id: 18,
      uniqueId: "1234567890",
      name: "Alexander Allen",
      participantType: "Teen",
      company: "Company R",
      ssn: "707-70-7878",
      status: "Active",
      dob: "2006-09-22",
    },
    {
      id: 19,
      uniqueId: "1234567890",
      name: "Harper Young",
      participantType: "Child",
      company: "Company S",
      ssn: "808-80-8989",
      status: "Inactive",
      dob: "2013-12-01",
    },
    {
      id: 20,
      uniqueId: "12345678910",
      name: "Elijah King",
      participantType: "Adult",
      company: "Company T",
      ssn: "909-90-9090",
      status: "Active",
      dob: "1989-11-19",
    },
  ],
    []
  );

  // ✅ Updated validation — all fields optional now
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      uniqueId: "",
      dob: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      uniqueId: Yup.string(),
      dob: Yup.string(),
    }),
    onSubmit: (values) => {
      // Store form filters for use in combined filtering
      setFormFilters(values);
      setShowTable(true);
    },
  });

  // Combined filter and sort participants based on search query, form filters, and sort order
  const filteredAndSortedParticipants = useMemo(() => {
    let filtered = allParticipants;

    // Apply form filters (firstName, lastName, uniqueId, dob)
    if (formFilters.firstName || formFilters.lastName || formFilters.uniqueId || formFilters.dob) {
      filtered = filtered.filter((p) => {
        const [first, last] = (p.name || "").split(" ");

        const matchFirst =
          !formFilters.firstName ||
          (first &&
            first.toLowerCase().includes(formFilters.firstName.toLowerCase()));

        const matchLast =
          !formFilters.lastName ||
          (last && last.toLowerCase().includes(formFilters.lastName.toLowerCase()));

        const matchUniqueId =
          !formFilters.uniqueId ||
          (p.uniqueId &&
            p.uniqueId.toLowerCase().includes(formFilters.uniqueId.toLowerCase()));

        const matchDob =
          !formFilters.dob ||
          (p.dob && p.dob.toLowerCase().includes(formFilters.dob.toLowerCase()));

        return matchFirst && matchLast && matchUniqueId && matchDob;
      });
    }

    // Apply quick search filter (name, company, participantType, status)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(query);
        const companyMatch = p.company?.toLowerCase().includes(query);
        const participantTypeMatch = p.participantType?.toLowerCase().includes(query);
        const statusMatch = p.status?.toLowerCase().includes(query);
        
        return nameMatch || companyMatch || participantTypeMatch || statusMatch;
      });
    }

    // Apply sorting by date of birth
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.dob);
      const dateB = new Date(b.dob);
      
      if (sortOrder === "newest") {
        // Newest first (most recent DOB first)
        return dateB - dateA;
      } else {
        // Oldest first (oldest DOB first)
        return dateA - dateB;
      }
    });

    return sorted;
  }, [allParticipants, searchQuery, formFilters, sortOrder]);

  // Update search results when filtered/sorted data changes
  useEffect(() => {
    if (showTable) {
      setSearchResults(filteredAndSortedParticipants);
    }
  }, [filteredAndSortedParticipants, showTable]);

  const handleShowAll = () => {
    // Clear all filters and show all with current sort order
    setFormFilters({ firstName: "", lastName: "", uniqueId: "", dob: "" });
    setSearchQuery("");
    setShowTable(true);
  };

  const handleClearSearch = () => {
    setShowTable(false);
    setSearchQuery("");
    setFormFilters({ firstName: "", lastName: "", uniqueId: "", dob: "" });
    setSortOrder("newest");
    formik.resetForm();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Auto-show table when searching
    if (e.target.value.trim() && !showTable) {
      setShowTable(true);
    }
  };

  const handleSortChange = (sortType) => {
    setSortOrder(sortType);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const showTableFromState = location.state?.showTable;

  useEffect(() => {
    if (showTableFromState) {
      setShowTable(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [showTableFromState, navigate, location.pathname]);

  return (
    <div>
      <div className="sticky-section">
        {showTable && <GoBack />}
        <div className="mt-13 mb-15 mb-sm-27 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="page-title">
            <h3 className="aa-heading-04 fw-semibold mb-5">Participants</h3>
            <p className="aa-text-xs fw-normal mb-0 text-muted">
              Organize and maintain Participants.
            </p>
          </div>
          <ul className="list-unstyled d-flex align-items-center gap-2 m-0 flex-wrap">
            {showTable && (
              <>
                <li>
                  <div
                    className="search-box position-relative"
                    style={{ width: "240px" }}
                  >
                    <input
                      type="text"
                      className="form-control ps-50 rounded-pill"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
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
                      <span className="d-flex align-items-center justify-content-center rounded-circle bg-light me-1">
                        {/* <FilterIcon color="#5D5F62" /> */}
                      </span>
                      <span
                        className="aa-text-xs text-muted"
                        style={{ color: "#5D5F62" }}
                      >
                        Sort By:
                      </span>
                      <span className="aa-text-xs fw-semibold">
                        {sortOrder === "newest" ? "Newest" : "Oldest"}
                      </span>
                      <span className="ms-1">
                        <ChevronDown color="#5D5F62" />
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-end">
                      <Dropdown.Item
                        onClick={() => handleSortChange("newest")}
                        active={sortOrder === "newest"}
                      >
                        Newest
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleSortChange("oldest")}
                        active={sortOrder === "oldest"}
                      >
                        Oldest
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            )}
            <li>
              <Link
                to="/create-new-participant"
                className="btn btn-primary aa-text-sm rounded-5 text-nowrap"
              >
                + Create New
              </Link>
            </li>
            <li>
              <button
                className="btn btn-outline-primary aa-text-sm rounded-5 text-nowrap"
                onClick={handleClearSearch}
              >
                Clear List
              </button>
            </li>
            {!showTable && (
              <>
                <li>
                  <Link
                    to="#"
                    onClick={handleShowAll}
                    className="btn btn-outline-primary aa-text-sm rounded-5 text-nowrap"
                  >
                    Show All
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {!showTable ? (
        <div className="search-criteria-card mx-auto">
          <div className="p-15 p-sm-24">
            <h4 className="mb-0 aa-heading-05 fw-semibold">Search Criteria</h4>
          </div>

          <Form onSubmit={formik.handleSubmit}>
            <div className="search-criteria-card-body p-15 p-sm-24">
              <div className="row g-4">
                {[
                  { label: "First Name", name: "firstName", type: "text" },
                  { label: "Last Name", name: "lastName", type: "text" },
                  { label: "Unique ID", name: "uniqueId", type: "text" },
                  { label: "DOB", name: "dob", type: "date" },
                ].map((field, index) => (
                  <div className="col-12 col-md-6" key={index}>
                    <FloatingInputField
                      formik={formik}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                    />
                  </div>
                ))}
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
        <ParticipantTable data={searchResults} />
      )}
    </div>
  );
};

export default Participant;

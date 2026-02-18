import React, { useEffect, useState, useRef } from "react";
import GoBack from "../../../components/GoBack/GoBack";
import { Link } from "react-router-dom";
import NewsAndFeaturesTable from "../../../components/Tables/NewsAndFeaturesTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../../redux/features/newsAndFeaturesSlice";
import { ChevronDown, ChevronUp, FilterIcon, Search } from "../../../assets/Svgs/Svgs";
import { Dropdown } from "react-bootstrap";
import Loader from '../../../components/Loader/Loader'

const NewsAndFeatures = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortDropdownRef = useRef(null);

  // ⬇️ Access companies list from Redux
  const { loading, allNews } = useSelector((state) => state.news || {});

  // ⬇️ Load on page mount
  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper function to get date value for sorting
  const getDateValue = (item) => {
    const dateStr = item?.date || item?.createdAt || item?.expirationDate;
    if (!dateStr) return 0;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  // Helper function to get cell value for search
  const getCellValue = (item, field) => {
    switch (field) {
      case "programName":
        return (item?.programName || item?.program || item?.title || "").toString().toLowerCase();
      case "company":
        return (item?.company || item?.companyName || item?.companyId || "").toString().toLowerCase();
      case "subject":
        return (item?.subject || item?.title || item?.body || "").toString().toLowerCase();
      default:
        return "";
    }
  };

  // Filter and sort data
  const filteredAndSortedData = React.useMemo(() => {
    if (!allNews || !Array.isArray(allNews)) return [];

    let filtered = [...allNews];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((item) => {
        const programName = getCellValue(item, "programName");
        const company = getCellValue(item, "company");
        const subject = getCellValue(item, "subject");
        
        return (
          programName.includes(query) ||
          company.includes(query) ||
          subject.includes(query)
        );
      });
    }

    // Apply sorting by date
    filtered.sort((a, b) => {
      const dateA = getDateValue(a);
      const dateB = getDateValue(b);
      
      if (sortBy === "Newest") {
        return dateB - dateA; // Descending (newest first)
      } else {
        return dateA - dateB; // Ascending (oldest first)
      }
    });

    return filtered;
  }, [allNews, searchQuery, sortBy]);

  return (
    <>
          <div className="mt-13 mb-15 mb-sm-25 mb-md-35 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title"><h3 className="aa-heading-04 fw-semibold mb-5">News & Features</h3><p className="aa-text-xs fw-normal text-muted mb-0">Organize and maintain News & Features.</p></div>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  <span className="aa-text-xs fw-semibold">{sortBy}</span>
                  <span className="ms-1">
                    <ChevronDown color="#5D5F62" />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item
                    onClick={() => setSortBy("Newest")}
                    active={sortBy === "Newest"}
                  >
                    Newest
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setSortBy("Oldest")}
                    active={sortBy === "Oldest"}
                  >
                    Oldest
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            <li>
              <Link
                to="/create-news-feature"
                className="btn btn-primary aa-text-sm rounded-5 text-nowrap"
              >
                + Create New
              </Link>
            </li>
            
          </ul>
        </div>
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {!loading && (
        <div className="mb-15 mb-sm-24">
          <NewsAndFeaturesTable data={filteredAndSortedData} />
        </div>
      )}
    </>
  );
};

export default NewsAndFeatures;




{/* <div className="mt-13 mb-15 mb-sm-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
<div className="page-title">
  <h3 className="aa-heading-04 fw-semibold mb-5">News & Features</h3>
  <p className="aa-text-xxs fw-normal mb-0 text-muted">
    Organize and maintain News & Features.
  </p>
</div>
<div className="overflow-x-auto">
  <ul className="list-unstyled d-flex align-items-center gap-2 m-0 flex-nowrap">

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
          onChange={(e) => setSearchQuery(e.target.value)}
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
      <div className="position-relative" ref={sortDropdownRef}>
        <button
          className="btn btn-white rounded-pill d-flex align-items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            setShowSortDropdown(!showSortDropdown);
          }}
          style={{ border: "1px solid #dee2e6" }}
        >
          <span className="d-flex align-items-center justify-content-center rounded-circle bg-light me-1">
            <FilterIcon color="#5D5F62" />
          </span>
          <span
            className="aa-text-xs text-muted"
            style={{ color: "#5D5F62" }}
          >
            Sort By:
          </span>
          <span className="aa-text-xs fw-semibold">{sortBy}</span>
          <span className="ms-1">
            {showSortDropdown ? (
              <ChevronUp color="#5D5F62" />
            ) : (
              <ChevronDown color="#5D5F62" />
            )}
          </span>
        </button>

        {showSortDropdown && (
          <div
            className="dropdown-menu show"
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "8px",
              minWidth: "150px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              overflow: "hidden",
            }}
          >
            <div
              className="dropdown-item cursor-pointer"
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                backgroundColor: sortBy === "Newest" ? "#f8f9fa" : "transparent",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSortBy("Newest");
                setShowSortDropdown(false);
              }}
              onMouseEnter={(e) => {
                if (sortBy !== "Newest") {
                  e.target.style.backgroundColor = "#f8f9fa";
                }
              }}
              onMouseLeave={(e) => {
                if (sortBy !== "Newest") {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              Newest
            </div>
            <div
              className="dropdown-item cursor-pointer"
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                backgroundColor: sortBy === "Oldest" ? "#f8f9fa" : "transparent",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSortBy("Oldest");
                setShowSortDropdown(false);
              }}
              onMouseEnter={(e) => {
                if (sortBy !== "Oldest") {
                  e.target.style.backgroundColor = "#f8f9fa";
                }
              }}
              onMouseLeave={(e) => {
                if (sortBy !== "Oldest") {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              Oldest
            </div>
          </div>
        )}
      </div>
    </li>

    <li>
      <Link
        to="/create-news-feature"
        className="btn btn-primary aa-text-sm rounded-5 text-nowrap"
      >
        + Create New
      </Link>
    </li>
  </ul>
</div>
</div> */}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, FilterIcon, Search } from "../../../assets/Svgs/Svgs";
import { Dropdown } from "react-bootstrap";
import UserAccessTable from "../../../components/Tables/UserAccessTable";
import UserInformationPopup from "../../../components/UserInformationPopup/UserInformationPopup";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../redux/features/userManagementSlice";

const UserManagementSetup = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users?.users?.filter((user) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      user?.role?.toLowerCase().includes(lowerCaseSearchTerm) ||
      user?.firstName?.toLowerCase().includes(lowerCaseSearchTerm) ||
      user?.lastName?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }) ?? [];

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (sortOrder === "newest") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  return (
    <>
      <div className="mt-13 mb-15 mb-sm-25 mb-md-35 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 text-primary mb-5">
            Existing Users - Active
          </h3>
        </div>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  <span className="aa-text-xs fw-semibold">{sortOrder === "newest" ? "Newest" : "Oldest"}</span>
                  <span className="ms-1">
                    <ChevronDown color="#5D5F62" />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item onClick={() => setSortOrder("newest")}>Newest</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder("oldest")}>Oldest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Link
                to="/create-new-user"
                className="btn btn-primary aa-text-sm rounded-5 text-nowrap"
              >
                + Create New
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <UserAccessTable
          data={sortedUsers || []}
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

export default UserManagementSetup;

import React, { useEffect } from "react";
import DashboardDetailCard from "../../../components/DashboardDetailCard/DashboardDetailCard";
import {
  AddParticipant,
  Analysis,
  ChevronDown,
  Dotted,
  Encounter,
  Eye,
  MessageBox,
  Plus,
  RecentEncounter,
  Samulation,
  Search,
  Shield,
  UsersFill,
} from "../../../assets/Svgs/Svgs";
import DualBarChart from "../../../components/DualBarChart/DualBarChart";
import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import { Dropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import RecentEncountersTable from "../../../components/Tables/RecentEncountersTable";
import { fetchDashboardStats, fetchDetailedStats } from '../../../redux/features/dashboardStatsSlice'
import { useDispatch, useSelector } from "react-redux";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboardStats);

  console.log(stats?.data?.stats, loading);

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDetailedStats());
  }, []);

  const data = [
    {
      title: "Encounter",
      value: stats?.data?.stats?.encounters?.count || 0,
      growth: stats?.data?.stats?.encounters?.changePercent || 0,
      icon: <Encounter color="#153f68" />,
      link: "/encounters",
    },
    {
      title: "Participant",
      value: stats?.data?.stats?.participants?.count || 0,
      growth: stats?.data?.stats?.participants?.changePercent || 0,
      icon: <Samulation color="#153f68" />,
      link: "/participant",
    },
    {
      title: "Companies",
      value: stats?.data?.stats?.companies?.count || 0,
      growth: stats?.data?.stats?.companies?.changePercent || 0,
      icon: <Analysis color="#153f68" />,
      link: "/company",
    },
    {
      title: "Users",
      value: stats?.data?.stats?.users?.count || 0,
      total: null,
      growth: stats?.data?.stats?.users?.changePercent || 0,
      icon: <MessageBox color="#153f68" />,
      link: "/user-management-setup",
    },
  ];
  const barData = [
    { name: "Jan", patients: 847, reports: 523 },
    { name: "Feb", patients: 432, reports: 389 },
    { name: "Mar", patients: 1123, reports: 678 },
    { name: "Apr", patients: 956, reports: 445 },
    { name: "May", patients: 721, reports: 567 },
    { name: "Jun", patients: 1034, reports: 612 },
    { name: "Jul", patients: 689, reports: 498 },
    { name: "Aug", patients: 892, reports: 734 },
    { name: "Sep", patients: 564, reports: 1000 },
    { name: "Oct", patients: 1156, reports: 823 },
    { name: "Nov", patients: 800, reports: 200 },
    { name: "Dec", patients: 1033, reports: 689 },
  ];

  const featureData = [
    {
      id: 1,
      label: "Primary Care Provider",
      text: "An update to blurb Primary Care Provider is available. Click on the link to view, copy and paste into your blurb management if desired.",
    },
    {
      id: 2,
      label: "Primary Care Provider",
      text: "An update to blurb Primary Care Provider is available. Click on the link to view, copy and paste into your blurb management if desired.",
    },
    {
      id: 3,
      label: "Primary Care Provider",
      text: "An update to blurb Primary Care Provider is available. Click on the link to view, copy and paste into your blurb management if desired.",
    },
  ];
  const participants = [
    {
      name: "Emma Johnson",
      id: "123343",
      company: "OMC Training",
      participantType: "Adult",
      encounterType: "In-person",
      ssn: "123-45-6789",
      dob: "15/03/1988",
      gender: "Female",
      status: "Active",
    },
    {
      name: "Guy Hawkins",
      id: "123342",
      company: "OMC Training",
      participantType: "Child",
      encounterType: "In-person",
      ssn: "123-45-6789",
      dob: "20/04/1996",
      gender: "Male",
      status: "Inactive",
    },
    {
      name: "Emma Johnson",
      id: "123343",
      company: "OMC Training",
      participantType: "Adult",
      encounterType: "In-person",
      ssn: "123-45-6789",
      dob: "15/03/1988",
      gender: "Female",
      status: "Active",
    },
    {
      name: "Guy Hawkins",
      id: "123342",
      company: "OMC Training",
      participantType: "Child",
      encounterType: "In-person",
      ssn: "123-45-6789",
      dob: "20/04/1996",
      gender: "Male",
      status: "Inactive",
    },
    {
      name: "Emma Johnson",
      id: "123343",
      company: "OMC Training",
      participantType: "Adult",
      encounterType: "In-person",
      ssn: "123-45-6789",
      dob: "15/03/1988",
      gender: "Female",
      status: "Active",
    },
    {
      name: "Guy Hawkins",
      id: "123342",
      company: "OMC Training",
      participantType: "Child",
      encounterType: "In-person",
      ssn: "123-45-6789",
      dob: "20/04/1996",
      gender: "Male",
      status: "Inactive",
    },
  ];

  return (
    <>
      <div className="row g-3 mb-24">
        {data.map((item, index) => (
          <div className="col-12 col-md-6 col-xl-3" key={index}>
            <DashboardDetailCard
              title={item.title}
              value={item.value}
              total={item.total}
              growth={item.growth}
              icon={item.icon}
              onViewDetails={item.link}
            />
          </div>
        ))}
      </div>
      <div className="row mb-24 g-3">
        <div className="col-12 col-lg-6">
          <div className="custom-card py-20 px-0 h-100">
            <div className="d-flex align-items-center justify-content-between mb-18 px-24">
              <h5 className="aa-heading-05 fw-semibold mb-0">Overview</h5>
              <div className="">
                <Dotted color="#98A2B3" />
              </div>
            </div>
            <div className="bar-chart-data d-flex gap-3 mb-18 mb-sm-39 px-24">
              <div className="d-flex align-items-center">
                <span className="chart-dot dot-primary rounded-circle"></span>
                <div className="ms-8">
                  <h5 className="aa-heading-05 fw-semibold mb-0">2024</h5>
                  <span className="aa-text-xs fw-normal">Patients</span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <span className="chart-dot dot-secondary rounded-circle"></span>
                <div className="ms-8">
                  <h5 className="aa-heading-05 fw-semibold mb-0">1024</h5>
                  <span className="aa-text-xs fw-normal">Reports</span>
                </div>
              </div>
            </div>
            <DualBarChart data={barData} />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="custom-card p-12 p-sm-20 h-100">
            <h5 className="aa-heading-05 fw-semibold mb-12">
              News and Features
            </h5>
            <FeatureCard data={featureData} />
            <div className="text-center">
              <Link
                to="/news-and-features"
                className="btn btn-link text-decoration-underline text-primary aa-text-xs fw-medium "
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-24">
        <div className="col-12">
          <div className="custom-card py-15 py-sm-33 px-15 px-29">
            <h5 className="aa-heading-05 fw-semibold mb-18">Quick Actions</h5>
            <div className="overflow-x-auto w-100 rounded-pill dashboard-navs">
              <div className="modify-type-wrapper d-block">
                <div className="tabs">
                  <Nav variant="pills p-8">
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        as={Link}
                        to="/add-new-encounter"
                        className="d-flex gap-2 align-items-center px-10 py-7 active"
                      >
                        <div className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle bg-white bg-opacity-10">
                          <Shield />
                        </div>{" "}
                        Create Encounter Type
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        as={Link}
                        to="/encounters"
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div
                          className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle"
                          style={{ backgroundColor: "rgba(16, 178, 46, 0.08)" }}
                        >
                          <RecentEncounter color="#10B22E" />
                        </div>{" "}
                        Recent Encounters
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        as={Link}
                        to="/create-new-participant"
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div
                          className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle"
                          style={{ background: "rgba(16, 159, 178, 0.08)" }}
                        >
                          <UsersFill color="#109FB2" />
                        </div>{" "}
                        Add New Participants
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        as={Link}
                        to="/participant"
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div
                          className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle"
                          style={{ background: "rgba(255, 106, 0, 0.08)" }}
                        >
                          <Eye color="#FF6A00" />
                        </div>{" "}
                        View all Participants
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        as={Link}
                        to="/create-new-user"
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div
                          className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle"
                          style={{ background: "rgba(88, 136, 176, 0.08)" }}
                        >
                          <AddParticipant color="#153F68" />
                        </div>{" "}
                        Add New User
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-24">
          {/* Header Section */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h5 className="aa-heading-05 fw-semibold mb-0">
              Recent Encounters
            </h5>
            <div className="d-flex flex-wrap align-items-center gap-3">
              {/* Search */}
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

              {/* Sort By (React-Bootstrap) */}
              <Dropdown>
                <Dropdown.Toggle
                  className="btn btn-outline-secondary rounded-pill d-flex align-items-center gap-2"
                  id="dropdown-basic"
                >
                  <span className="aa-text-sm text-secondary">Sort By:</span>
                  <span className="aa-text-sm fw-semibold text-dark">
                    Newest
                  </span>
                  <ChevronDown color="#667085" size={16} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Newest</Dropdown.Item>
                  <Dropdown.Item>Oldest</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Create New Button */}
              <Link to="/create-new-encounter">
                <button className="btn btn-primary rounded-pill d-flex align-items-center gap-2">
                  <Plus /> Create New
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-12">
          <RecentEncountersTable data={participants} />
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;

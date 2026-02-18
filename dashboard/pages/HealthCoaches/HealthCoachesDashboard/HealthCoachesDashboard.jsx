import React, { useState } from "react";
import DashboardDetailCard from "../../../components/DashboardDetailCard/DashboardDetailCard";
import {
  AddParticipant,
  Analysis,
  Dotted,
  Encounter,
  MessageBox,
  RecentEncounter,
  RecentParticipant,
  Samulation,
  Shield,
} from "../../../assets/Svgs/Svgs";
import DualBarChart from "../../../components/DualBarChart/DualBarChart";
import FeatureCard from "../../../components/FeatureCard/FeatureCard";
import OpenEncounterTable from "../../../components/Tables/OpenEncounterTable";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const HealthCoachesDashboard = () => {
  const [activeTab, setActiveTab] = useState("openEncounter");
  const data = [
    {
      title: "Total Encounter",
      value: 524,
      growth: 12,
      icon: <Encounter color="#153f68" />,
      link : "/encounters"
    },
    {
      title: "Simulation",
      value: 1024,
      growth: 8,
      icon: <Samulation color="#153f68" />,
    },
    {
      title: "Analysis",
      value: 420,
      growth: 10,
      icon: <Analysis color="#153f68" />,
    },
    {
      title: "Internal Messages",
      value: 224,
      total: 500,
      growth: 6,
      icon: <MessageBox color="#153f68" />,
    },
  ];
  const barData = [
    { name: "Jan", patients: 1000, reports: 500 },
    { name: "Feb", patients: 300, reports: 400 },
    { name: "Mar", patients: 900, reports: 500 },
    { name: "Apr", patients: 800, reports: 300 },
    { name: "May", patients: 700, reports: 400 },
    { name: "Jun", patients: 800, reports: 350 },
    { name: "Jul", patients: 600, reports: 600 },
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
      dob: "15/03/1988",
      gender: "Female",
      status: "Active",
    },
    {
      name: "Guy Hawkins",
      id: "123342",
      company: "OMC Training",
      participantType: "Child",
      dob: "20/04/1996",
      gender: "Male",
      status: "Inactive",
    },
    {
      name: "Emma Johnson",
      id: "123343",
      company: "OMC Training",
      participantType: "Adult",
      dob: "15/03/1988",
      gender: "Female",
      status: "Active",
    },
    {
      name: "Guy Hawkins",
      id: "123342",
      company: "OMC Training",
      participantType: "Child",
      dob: "20/04/1996",
      gender: "Male",
      status: "Inactive",
    },
    {
      name: "Emma Johnson",
      id: "123343",
      company: "OMC Training",
      participantType: "Adult",
      dob: "15/03/1988",
      gender: "Female",
      status: "Active",
    },
    {
      name: "Guy Hawkins",
      id: "123342",
      company: "OMC Training",
      participantType: "Child",
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
              <div className="modify-type-wrapper d-bolk">
                <div className="tabs">
                  <Nav variant="pills p-8">
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        active={activeTab === "openEncounter"}
                        onClick={() => setActiveTab("openEncounter")}
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle bg-white bg-opacity-10">
                          <Shield />
                        </div>{" "}
                        Open Encounters
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        active={activeTab === "recentEcnounter"}
                        onClick={() => setActiveTab("recentEcnounter")}
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div
                          className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle"
                          style={{ backgroundColor: "rgba(16, 178, 46, 0.08)" }}
                        >
                          <RecentEncounter color="#10B22E" />
                        </div>{" "}
                        Recent Ecnounters
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        active={activeTab === "recentParticipants"}
                        onClick={() => setActiveTab("recentParticipants")}
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div
                          className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle"
                          style={{ background: "rgba(16, 159, 178, 0.08)" }}
                        >
                          <RecentParticipant color="#109FB2" />
                        </div>{" "}
                        Recent Participants
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1">
                      <Nav.Link
                        active={activeTab === "addNewPublications"}
                        onClick={() => setActiveTab("addNewPublications")}
                        className="d-flex gap-2 align-items-center px-10 py-7"
                      >
                        <div
                          className="quick-action-icon d-flex justify-content-center align-items-center rounded-circle"
                          style={{ background: "rgba(88, 136, 176, 0.08)" }}
                        >
                          <AddParticipant color="#153F68" />
                        </div>{" "}
                        Add New Publications
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
        {activeTab === "openEncounter" && (
          <div className="col-12">
            <OpenEncounterTable data={participants} />
          </div>
        )}
      </div>
    </>
  );
};

export default HealthCoachesDashboard;

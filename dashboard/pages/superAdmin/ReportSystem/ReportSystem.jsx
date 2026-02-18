import React, { useState } from "react";
import GoBack from "../../../components/GoBack/GoBack";
import { Nav } from "react-bootstrap";
import ReportTable from "../../../components/Tables/ReportTable";

const ReportSystem = () => {
  const [activeTab, setActiveTab] = useState("admin");

  // Sample datasets for each tab (replace with API data as needed)
  const adminReports = [
    {
      name: "Employee Follow-up Date Report",
      description:
        "A list of employees by sublevel, wellness status and follow-up date for scheduling purposes.",
    },
    {
      name: "Employees By Sublevel",
      description: "A list of employees by sublevel.",
    },
    {
      name: "Employees By Sublevel with Hire Date and Comment",
      description: "A list of employees by sublevel with Hire Date and Comment",
    },
    {
      name: "Followup By Location",
      description:
        "Generates a list of participants with follow up dates organized by location and status.",
    },
    {
      name: "Historical Missed Appointment Postcards",
      description:
        "A history of all Missed Appointment Postcards previously generated. Allows for reprinting of postcards for the date selected.",
    },
    {
      name: "Historical Reminder Postcards",
      description:
        "A history of Reminder Postcards previously generated for a company. Allows for reprinting.",
    },
    {
      name: "History of Wellness Participation Status by Medical Enrollment Classification",
      description:
        "Shows participation rates for any date between January 2009 and current date. Participation graph defined by wellness status by medical enrollment classification. Totals may vary from other total population reports.",
    },
    {
      name: "Missed Appointment Postcard",
      description:
        "Generates a list of participants that are overdue for their scheduled follow-up appointment.",
    },
  ];

  const companyReports = [
    {
      name: "Company Summary",
      description: "Summary of company metrics.",
    },
    {
      name: "Custom Fields By Company Crosstab",
      description: "Shows Custom Field entries.",
    },
    {
      name: "Custom Fields by Company Detail",
      description:
        "The report lists the detail of Custom Fields with one line per saved entry.",
    },
    {
      name: "Custom Risk/Wellness Report",
      description:
        "A report to display a combination of risk value and online status.",
    },
    {
      name: "Import Biometric PostProcess Error Report",
      description:
        "Shows the line errors that occurred during import post processing for biometric upload.",
    },
    {
      name: "Import Biometric PreProcess Error Report",
      description:
        "Shows the line errors that occurred during import preprocessing for biometric upload.",
    },
    {
      name: "Import Company Hierarchy PostProcess Error Report",
      description:
        "Shows the line errors that occurred during import postprocessing for company hierarchy upload.",
    },
    {
      name: "Import Company Hierarchy PreProcess Error Report",
      description:
        "Shows the line errors that occurred during import preprocessing for company hierarchy upload.",
    },
    {
      name: "Import Participant PostProcess Error Report",
      description:
        "Shows the line errors that occurred during import post processing for participant upload.",
    },
  ];

  const incidenceReports = [
    {
      name: "Incidence Overview",
      description: "Incidence reports overview.",
    },
    {
      name: "Current Behavior Risk Scores",
      description:
        "Snap shot graph of current behavior risk score levels (low, medium & high). Includes a breakdown of participants in each risk score level.",
    },
    {
      name: "Current Behavior Risk Scores (statistical)",
      description:
        "Snap shot graph of current behavior risk score levels (low, medium & high).",
    },
    {
      name: "Current Behavioral Risk Incidence",
      description:
        "Snap shot graph of current at risk health behaviors. Includes a breakdown of participants in each risk category.",
    },
    {
      name: "Current Behavioral Risk Incidence (statistical)",
      description: "Snap shot graph of current at risk health behaviors.",
    },
    {
      name: "Current Cost Risk Scores",
      description:
        "Snap shot graph of current cost risk score levels (low, medium & high). Includes a breakdown of participants in each cost risk score level. The 15 Cost Risks include: Absenteeism, Alcohol Abuse, Existing Medical Condition, High Blood Pressure, High Total Cholesterol, Inactivity, Life Dissatisfaction, Low Back Pain, Low HDL Cholesterol, Negative Health Perception, Personal Safety At Risk, Overweight, Seriously Overweight, Stress and Tobacco Smoke. Low cost risk = 0–2 risks, Medium cost risk = 3–4 risks, High Cost Risk = 5 or more risks.",
    },
    {
      name: "Current Cost Risk Scores (statistical)",
      description:
        "Snap shot graph of current cost risk score levels (low, medium & high). The 15 Cost Risks include: Absenteeism, Alcohol Abuse, Existing Medical Condition, High Blood Pressure, High Total Cholesterol, Inactivity, Life Dissatisfaction, Low Back Pain, Low HDL Cholesterol, Negative Health Perception, Personal Safety At Risk, Overweight, Seriously Overweight, Stress and Tobacco Smoke. Low cost risk = 0–2 risks, Medium cost risk = 3–4 risks, High Cost Risk = 5 or more risks.",
    },
    {
      name: "Current Cost Risk Scores for Insurance Companies",
      description:
        "Snap shot graph of current cost risk score levels (low, medium & high). Includes a breakdown of participants in each cost risk score level organized by employee ID, showing Name, DOB and work status. Useful when working with Insurance providers to demonstrate cost savings.",
    },
  ];

  const outcomeReports = [
    {
      name: "Change In Behavior Risk Scores",
      description:
        "Graph that looks at the change in behavioral risk score level (Low, Medium & High) of participants over a specific time range. The start from and start to dates pull everyone who had an initial or first HRA type of encounter on or between these two dates. The report then demonstrates the change made from that encounter to the end date. Includes a breakdown of participants in each risk score level.",
    },
    {
      name: "Change In Behavior Risk Scores (statistical)",
      description:
        "Graph that looks at the change in behavioral risk score level (Low, Medium & High) of participants over a specific time range. The start from and start to dates pull everyone who had an initial or first HRA type of encounter on or between these two dates. The report then demonstrates the change made from that encounter to the end date.",
    },
    {
      name: "Change In Behavioral Risk Incidence",
      description:
        "Looks at the change in behavioral risk incidence for participants over a specific time range. The start from and start to dates pull everyone who had an initial or first HRA type of encounter on or between these two dates. The report then demonstrates the change made from that encounter to the end date. Includes a breakdown of participants reporting each risk at the begin and end date. Two graphs display; one showing percent change and the second showing actual numbers of risk at the begin date and the end date.",
    },
    {
      name: "Change In Behavioral Risk Incidence (statistical)",
      description:
        "Looks at the change in behavioral risk incidence for participants over a specific time range. The start from and start to dates pull everyone who had an initial or first HRA type of encounter on or between these two dates. The report then demonstrates the change made from that encounter to the end date. Two graphs display; one showing percent change and the second showing actual numbers of risk at the begin date and the end date. All Family History Risk data represented was collected prior to December 3, 2009.",
    },
    {
      name: "Change in CM Care Gaps (Detail)",
      description: "Change in CM Care Gaps (detail)",
    },
    {
      name: "Change in CM Care Gaps (statistical)",
      description: "Change in CM Care Gaps (statistical)",
    },
  ];

  const systemAdminReports = [
    {
      name: "Import Participant",
      description: "An output of the Import Participant table.",
    },
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case "company":
        return companyReports;
      case "incidence":
        return incidenceReports;
      case "outcome":
        return outcomeReports;
      case "system":
        return systemAdminReports;
      default:
        return adminReports;
    }
  };

  return (
    <>
      <div className="mt-13 mb-15 mb-sm-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 fw-semibold mb-5">
            Select and run reports
          </h3>
        </div>
      </div>

      <div className="mb-15">
        <div className="overflow-x-auto w-100 mb-5 mb-sm-11 rounded-pill">
          <div className="modify-type-wrapper d-inline-block pb-10">
            <div className="tabs">
              <Nav variant="pills p-8">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "admin"}
                    onClick={() => setActiveTab("admin")}
                  >
                    Admin Reports
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "company"}
                    onClick={() => setActiveTab("company")}
                  >
                    Company Reports
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "incidence"}
                    onClick={() => setActiveTab("incidence")}
                  >
                    Incidence Reports
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "outcome"}
                    onClick={() => setActiveTab("outcome")}
                  >
                    Outcome Reports
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "system"}
                    onClick={() => setActiveTab("system")}
                  >
                    System Admin Reports
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        </div>

        <ReportTable data={getActiveData()} />
      </div>
    </>
  );
};

export default ReportSystem;

import { Dropdown } from "react-bootstrap";
import BehaviorRiskChart from "../../../../components/Chart/RiskChart"
import Vector from '../../../../assets/Svgs/Vector.svg';

const Risks = () => {
  const Data = [
    {
      id: 1,
      riskName: "Depression",
      riskWeight: 17,
      Overridden: true,
      working: [true, "08/22/23"],
    },
    {
      id: 2,
      riskName: "Distress",
      riskWeight: 24,
      Overridden: false,
      working: false,
    },
    {
      id: 3,
      riskName: "InActivity",
      riskWeight: 11,
      Overridden: [true, "08/22/23"],
      working: true,
    },
    {
      id: 4,
      riskName: "Tobacco Smoke",
      riskWeight: 29,
      Overridden: false,
      working: [true, "08/22/23"],
    },
    {
      id: 5,
      riskName: "Alcohol Misuse",
      riskWeight: 13,
      Overridden: true,
      working: false,
    },
    {
      id: 6,
      riskName: "High Total Cholesterol",
      riskWeight: 20,
      Overridden: [true, "08/22/23"],
      working: true,
    },
    {
      id: 7,
      riskName: "Personal Safety At Risk",
      riskWeight: 8,
      Overridden: false,
      working: false,
    },
    {
      id: 8,
      riskName: "Stage 2 Hypertension",
      riskWeight: 27,
      Overridden: true,
      working: [true, "08/22/23"],
    },
    {
      id: 9,
      riskName: "Existing Medical Condition",
      riskWeight: 14,
      Overridden: false,
      working: true,
    },
    {
      id: 10,
      riskName: "No Colon Cancer Screening",
      riskWeight: 30,
      Overridden: [true, "08/22/23"],
      working: false,
    },
    {
      id: 11,
      riskName: "No Prostate Cancer Screening",
      riskWeight: 10,
      Overridden: true,
      working: false,
    },
    {
      id: 12,
      riskName: "At Risk Nutrition- Whole Grains",
      riskWeight: 22,
      Overridden: false,
      working: [true, "08/22/23"],
    },
    {
      id: 13,
      riskName: "At Risk Nutrition-Processed Foods",
      riskWeight: 9,
      Overridden: true,
      working: false,
    },
    {
      id: 14,
      riskName: "Anxiety (EMC)",
      riskWeight: 18,
      Overridden: false,
      working: true,
    },
    {
      id: 15,
      riskName: "Asthma",
      riskWeight: 6,
      Overridden: [true, "08/22/23"],
      working: false,
    },
    {
      id: 16,
      riskName: "Anxiety (EMC) Duplicate",
      riskWeight: 25,
      Overridden: true,
      working: [true, "08/22/23"],
    },
    {
      id: 17,
      riskName: "At Risk for Preventable Hearing Loss",
      riskWeight: 12,
      Overridden: false,
      working: false,
    },
    {
      id: 18,
      riskName: "At Risk for Sleep Apnea",
      riskWeight: 28,
      Overridden: true,
      working: [true, "08/22/23"],
    },
    {
      id: 19,
      riskName: "Diabetes",
      riskWeight: 15,
      Overridden: false,
      working: true,
    },
    {
      id: 20,
      riskName: "Family History Heart Disease",
      riskWeight: 7,
      Overridden: [true, "08/22/23"],
      working: false,
    },
  ];

  const secondTable = [
    { id: 1, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 2, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 3, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 4, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 5, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 6, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 7, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 8, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
    { id: 9, listview: 230, high: "High", dateAndTime: "10/2/2025 6:13:59 PM" },
  ];

  const popUp = [
    "30 Depression",
    "30 Distress",
    "30 Inactivity",
    "30 Tobacco Smoke",
    "20 Alcohol Misuse",
    "20 High Total Cholesterol",
    "20 Personal Safety At Risk ",
    "20 Stage 2 Hypertension ",
    "-15 Partial Activity Credit ",
    "10 Existing Medical Condition ",
    "10 No Colon Cancer Screening ",
    "10 No Prostate Cancer Screening Discussion",
    "5 At Risk Nutrition - Whole Grains ",
    "5 At Risk Nutrition - Fruits & Vegetables ",
    "5 At Risk Nutrition - Processed Foods ",
    "0 Anxiety ",
    "0 Asthma ",
    "0 At Risk for Preventable Hearing Loss",
    "0 At Risk for Sleep Apnea ",
    "0 Diabetes ",
    "0 Family History Heart Disease ",
    "0 High Triglycerides ",
    "0 Life Dissatisfaction",
    "0 Low BMI ",
    "0 Metabolic Syndrome ",
    "0 No Annual Flu Shot ",
    "0 No Aortic Screening ",
    "0 No Hepatitis C Screening ",
  ];

  return (
    <div className="d-flex flex-column gap-3 mb-20">
      <h3
        className="aa-heading-04 fw-semibold"
        style={{ marginBottom: "30px" }}
      >
        Risks
      </h3>

      {/* FIRST TABLE */}
      <div className="custom-card p-20 mb-20">
      <div className="table-responsive">
        <div className="custom-rounded-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Risk Name</th>
                <th>Risk Weight</th>
                <th>Overridden</th>
                <th>Working</th>
              </tr>
            </thead>

            <tbody>
              {Data.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 !== 0 ? "table-row-alt" : ""}
                >
                  <td>{row.riskName}</td>
                  <td style={{ color: "#153f68", fontWeight: 400 }}>
                    {row.riskWeight}
                  </td>

                  <td>
                    {Array.isArray(row.Overridden) ? (
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>{row.Overridden[1]}</span>
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        defaultChecked={row.Overridden === true}
                      />
                    )}
                  </td>

                  <td>
                    {Array.isArray(row.working) ? (
                      <div className="d-flex justify-content-center align-items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>{row.working[1]}</span>
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        defaultChecked={row.working === true}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Risk graph */}
      <div className="custom-card p-20 mb-20">
        <div><h4 className="fw-bold mb-3">Current Behavioral Risk Score: <span style={{color: "#153f68"}}>230 (High)</span></h4></div>
        <BehaviorRiskChart />
      </div>

      {/* SECOND TABLE */}
      <div className="custom-card p-20 mb-20">
      <div className="table-responsive">
        <div className="custom-rounded-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <tbody>
              {secondTable.map((row, index) => (
                <tr
                  key={row?.id}
                  className={index % 2 !== 0 ? "table-row-alt" : ""}
                >
                  <td>
                    <td className="d-flex justify-content-center">
                      <Dropdown>
                        <Dropdown.Toggle
                          as="div"
                          bsPrefix="plain-toggle" // Custom prefix to avoid Bootstrap styling
                          id="dropdown-basic"
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "transparent",
                            border: "0.5px solid #153f68",
                            borderRadius: "40px",
                            cursor: "pointer",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {row?.listview}<img src={Vector} alt="Vector" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                          style={{
                            fontSize: "12px",
                            maxHeight: "300px",
                            overflowY: "auto",
                          }}
                        >
                          {popUp.map((item, index) => (
                            <Dropdown.Item key={index}>{item}</Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </td>

                  <td style={{ color: "#153f68", fontWeight: 400 }}>
                    {row?.high}
                  </td>
                  <td style={{ color: "#153f68", fontWeight: 400 }}>
                    {row?.dateAndTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Risks;

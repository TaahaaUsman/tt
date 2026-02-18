import React from "react";
import CustomSingleSelect from "../../../FormsFields/CustomSingleSelect";
import FloatingInputField from "../../../FormsFields/FloatingInputField";
import { useFormik } from "formik";

const SubModifyEncounter = () => {
  const Data = [
    {
      id: 1,
      status: "Completed",
      date: "2023-08-01",
      comment: "Wellness check completed successfully.",
      modifiedBy: "Dr. Smith",
      wellnessStatus: "Active",
    },
    {
      id: 2,
      status: "Incompleted",
      date: "2023-08-05",
      comment: "Participant did not finish the assessment.",
      modifiedBy: "Nurse Jane",
      wellnessStatus: "Inactive",
    },
    {
      id: 3,
      status: "Pending",
      date: "2023-08-10",
      comment: "Awaiting participant response.",
      modifiedBy: "Dr. Brown",
      wellnessStatus: "Pending",
    },
    {
      id: 4,
      status: "Completed",
      date: "2023-08-12",
      comment: "All tests conducted and results recorded.",
      modifiedBy: "Dr. Green",
      wellnessStatus: "Active",
    },
  ];

  const UpdateConsentStatusData = [
    {
      id: 1,
      question:
        "How can individuals create a balanced routine that supports both physical and mental health when managing work, family, and personal responsibilities? What practical habits—such as better sleep, stress control, or regular exercise—can realistically fit into a busy lifestyle and still lead to long-term wellness?",
      options: ["yes", "no", "U/A"],
      animal: "Animal",
      date: "7/2/2025",
    },
    {
      id: 2,
      question:
        "What strategies can individuals use to stay motivated and consistent with their wellness goals, especially when faced with setbacks or busy periods? How can they track their progress and adjust their routines to ensure they are making sustainable improvements in their overall health?",
      options: ["yes", "no", "U/A"],
      animal: "Animal",
      date: "7/2/2022",
    },
    {
      id: 3,
      question:
        "In what ways can individuals leverage technology, community support, or professional guidance to enhance their wellness journey? How can these resources be effectively integrated into daily life to provide accountability, education, and encouragement toward achieving health objectives?",
      options: ["yes", "no", "U/A"],
      animal: "Animal",
      date: "6/2/2022",
    },
  ];

  const formik = useFormik({
    initialValues: {
      select_status: "",
      optional_comment: "",
      signature: "",
      consentAnswers: {}, // ← store all MCQ answers here
    },
    onSubmit: (values) => {
      console.log("FINAL VALUES", values);

      // API ready payload
      const payload = {
        wellness_status: values.select_status,
        comment: values.optional_comment,
        signature: values.signature,
        consent_status: values.consentAnswers,
      };

      console.log("PAYLOAD TO SEND:", payload);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="d-flex flex-column gap-4 mb-20">
        <div>
          <div>
            <h3 className="aa-heading-04 fw-semibold mb-5 py-5">
              Update Wellness Status
            </h3>
          </div>
          <div>
            <div className="custom-card p-20 mb-20 d-flex flex-column gap-4">
              <CustomSingleSelect
                label="Select Status"
                name="select_status"
                options={["Completed", "Incompleted", "Pending"]}
                formik={formik}
                placeholder="Active"
              />
              <FloatingInputField
                label="Optional Comment"
                name="optional_comment"
                type="textarea"
                formik={formik}
                placeholder="Write Comment here..."
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="custom-card px-24 py-16">
          <div className="table-responsive max-height-table">
            <table className="table custom-table-striped custom-table text-center align-middle">
              <thead className="position-sticky top-0 z-1">
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Comment</th>
                  <th>Modified By</th>
                </tr>
              </thead>
              <tbody>
                {Data?.length > 0 ? (
                  Data.map((row, index) => (
                    <tr
                      key={row?.id || index}
                      className={index % 2 !== 0 ? "table-row-alt" : ""}
                    >
                      <td>{row?.status}</td>
                      <td style={{ color: "#153f68", fontWeight: 400 }}>
                        {row?.date}
                      </td>
                      <td style={{ color: "#153f68", fontWeight: 400 }}>
                        {row?.comment}
                      </td>
                      <td style={{ color: "#153f68", fontWeight: 400 }}>
                        {row?.modifiedBy}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-0">
                      <div className="alert alert-info m-0">
                        No records found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="aa-heading-04 fw-semibold mb-5 py-5">Signature</h3>
          </div>
          <div>
            <FloatingInputField
              label="Signature"
              name="signature"
              type="textarea"
              formik={formik}
              placeholder="Signature here..."
              rows={5}
            />
          </div>
        </div>

        <div>
          <div>
            <h3 className="aa-heading-04 fw-semibold mb-5 py-5">
              Update Consent Status
            </h3>
          </div>

          <div className="table-responsive max-height-table">
            <table className="table custom-table-striped custom-table text-center align-middle">
              <tbody>
                {UpdateConsentStatusData?.length > 0 ? (
                  UpdateConsentStatusData.map((row, index) => (
                    <tr
                      key={row?.id || index}
                      className={index % 2 !== 0 ? "table-row-alt" : ""}
                    >
                      <td style={{ fontWeight: 400 }}>{row?.question}</td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-3">
                          {row.options.map((option) => (
                            <label
                              key={option}
                              className="d-flex align-items-center gap-2"
                              style={{ cursor: "pointer" }}
                            >
                              <input
                                type="radio"
                                name={`consentAnswers.${row.id}`}
                                value={option}
                                onChange={formik.handleChange}
                                checked={
                                  formik.values.consentAnswers[row.id] ===
                                  option
                                }
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </td>

                      <td style={{ fontWeight: 400 }}>{row?.animal}</td>
                      <td style={{ fontWeight: 400 }}>{row?.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-0">
                      <div className="alert alert-info m-0">
                        No records found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-primary rounded-pill">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubModifyEncounter;

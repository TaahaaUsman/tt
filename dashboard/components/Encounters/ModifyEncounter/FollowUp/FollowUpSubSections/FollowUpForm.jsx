import CustomButton from "../../../../customButton/CustomButton";
import CustomSingleSelect from "../../../../FormsFields/CustomSingleSelect";
import { useFormik } from "formik";

const FollowUpForm = ({ data = [], isFirst = false, isLast = false }) => {

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
    <div>
      <div className="mt-40 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 fw-semibold mb-5 py-5">
            Answer HRA Questions
          </h3>
        </div>
      </div>

      <div className="custom-card p-0">
        <div className="p-15 p-sm-24">
          <div className="table-responsive">
            <table className="table custom-table text-center align-middle">
              <tbody>
                {data?.length > 0 ? (
                  data.map((row, index) => (
                    <tr
                      key={row?.id || index}
                      className={index % 2 !== 0 ? "table-row-alt border-bottom" : "border-bottom"}
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

                      <td className="d-flex justify-content-center align-items-center" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <div style={{ width: "200px" }}>
                          <CustomSingleSelect
                            label=""
                            name={`history_${row.id}`}
                            options={row.history || []}
                            formik={formik}
                            placeholder={row.history?.[0] || "Select History"}
                          />
                        </div>
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
      </div>

      <div>
        <div className={`d-flex ${isFirst ? 'justify-content-end' : 'justify-content-between'} mt-20 mb-20`}>
          {!isFirst && (
            <CustomButton
              text="Back"
              // type="submit"
              className="btn btn-outline-primary rounded-pill"
            />
          )}

          <CustomButton
            text={isLast ? "Update" : "Next"}
            type="submit"
            className="btn-primary rounded-pill"
          />
        </div>
      </div>
    </div>
  );
};

export default FollowUpForm;

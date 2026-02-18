import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSingleSelect from "../../../FormsFields/CustomSingleSelect";
import { Calendar } from "../../../../../src/assets/Svgs/Svgs";
import { useRef, useState } from "react";

/**
 * Helpers
 */
const toISO = (raw) => {
  // try to parse known formats into YYYY-MM-DD
  if (!raw) return "";
  // If already ISO-like YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  // Try Date parsing and return ISO date part
  const d = new Date(raw);
  if (isNaN(d)) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatForDisplay = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return "";
  // DD/MM/YYYY — common format in Pakistan/UK
  return d.toLocaleDateString("en-GB");
};

const Measuremens = () => {
  // SAMPLE DATA (replace/add full set as you had)
  const Data = [
    {
      id: 1,
      name: "Systolic BP",
      value: "120",
      dateTaken: "10/2/2025",
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
      units: "mmHg",
      range: "50-300",
    },
    {
      id: 2,
      name: "Diastolic BP",
      value: "80",
      dateTaken: "10/2/2025",
      history: ["82 - 9/2/2025", "79 - 8/2/2025"],
      units: "mmHg",
      range: "30-200",
    },
    {
      id: 3,
      name: "Height",
      value: "172",
      dateTaken: "10/2/2025",
      history: ["171 - 9/2/2025"],
      units: "cm",
      range: "50-250",
    },
    {
      id: 4,
      name: "Weight",
      value: "70",
      dateTaken: "10/2/2025",
      history: ["71 - 9/2/2025", "72 - 8/2/2025"],
      units: "kg",
      range: "20-250",
    },
    {
      id: 5,
      name: "Change In Weight",
      value: "-1",
      dateTaken: "10/2/2025",
      history: ["-1 on 9/2/2025"],
      units: "kg",
      range: "-20 to 20",
    },
    {
      id: 6,
      name: "BMI",
      value: "23.6",
      dateTaken: "10/2/2025",
      history: ["23.9 on 9/2/2025", "24.1 on 8/2/2025"],
      units: "kg/m²",
      range: "10-50",
    },
    {
      id: 7,
      name: "Change in BMI",
      value: "-0.3",
      dateTaken: "10/2/2025",
      history: ["-0.2 on 9/2/2025"],
      units: "kg/m²",
      range: "-10 to 10",
    },
    {
      id: 8,
      name: "Total Cholesterol",
      value: "180",
      dateTaken: "10/2/2025",
      history: ["185 on 9/2/2025", "190 on 8/2/2025"],
      units: "mg/dL",
      range: "100-300",
    },
    {
      id: 9,
      name: "HDL",
      value: "55",
      dateTaken: "10/2/2025",
      history: ["53 on 9/2/2025"],
      units: "mg/dL",
      range: "20-100",
    },
    {
      id: 10,
      name: "LDL cholesterol",
      value: "110",
      dateTaken: "10/2/2025",
      history: ["115 on 9/2/2025"],
      units: "mg/dL",
      range: "50-200",
    },
    {
      id: 11,
      name: "Triglycerides",
      value: "150",
      dateTaken: "10/2/2025",
      history: ["155 on 9/2/2025"],
      units: "mg/dL",
      range: "50-500",
    },
    {
      id: 12,
      name: "Waist Circumference",
      value: "90",
      dateTaken: "10/2/2025",
      history: ["92 on 9/2/2025"],
      units: "cm",
      range: "50-200",
    },
    {
      id: 13,
      name: "Waist-to-Height Ratio",
      value: "0.52",
      dateTaken: "10/2/2025",
      history: ["0.53 on 9/2/2025"],
      units: "",
      range: "0.3-0.8",
    },
    {
      id: 14,
      name: "Hemoglobin A1C",
      value: "5.6",
      dateTaken: "10/2/2025",
      history: ["5.7 on 9/2/2025"],
      units: "%",
      range: "3-14",
    },
    {
      id: 15,
      name: "Body Composition",
      value: "18",
      dateTaken: "10/2/2025",
      history: ["19 on 9/2/2025"],
      units: "% body fat",
      range: "5-60",
    },
    {
      id: 16,
      name: "Cholesterol Ratio",
      value: "3.2",
      dateTaken: "10/2/2025",
      history: ["3.4 on 9/2/2025"],
      units: "",
      range: "2-5",
    },
    {
      id: 17,
      name: "PHQ-9 Score",
      value: "4",
      dateTaken: "10/2/2025",
      history: ["5 on 9/2/2025"],
      units: "score",
      range: "0-27",
    },
    {
      id: 18,
      name: "QOL Score",
      value: "78",
      dateTaken: "10/2/2025",
      history: ["76 on 9/2/2025"],
      units: "score",
      range: "0-100",
    },
    {
      id: 19,
      name: "Neck Circumference",
      value: "38",
      dateTaken: "10/2/2025",
      history: ["39 on 9/2/2025"],
      units: "cm",
      range: "20-60",
    },
    {
      id: 20,
      name: "Weight Loss Tracking",
      value: "-2",
      dateTaken: "10/2/2025",
      history: ["-1.5 on 9/2/2025"],
      units: "kg",
      range: "-50 to 0",
    },
    {
      id: 21,
      name: "Routine Physical Exam",
      value: "Completed",
      dateTaken: "10/2/2025",
      history: ["Completed on 9/2/2025"],
      units: "",
      range: "",
    },
  ];

  // initialize dates state as ISO strings per row
  const initialDates = {};
  Data.forEach((r) => {
    initialDates[r.id] = toISO(r.dateTaken) || "";
  });
  const [datesISO, setDatesISO] = useState(initialDates);

  // refs for each hidden date input
  const datePickerRefs = useRef({});

  // click icon -> open date picker (use showPicker if available, else click)
  const handleIconClick = (id) => {
    const el = datePickerRefs.current[id];
    if (!el) return;
    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      // fallback for browsers without showPicker
      el.click();
    }
  };

  // when date changed via hidden input, update ISO state
  const handleHiddenDateChange = (id, isoValue) => {
    setDatesISO((prev) => ({ ...prev, [id]: isoValue }));
  };

  // FORM (kept minimal — expand as needed)
  const validationSchema = Yup.object({
    encounter_name: Yup.string().required("Encounter Type is required"),
  });

  const formik = useFormik({
    initialValues: { encounter_name: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // Build a payload including the per-row dates if you want:
        const measurements = Data.map((r) => ({
          id: r.id,
          name: r.name,
          value: r.value,
          dateTaken: datesISO[r.id] || null, // ISO date or null
        }));
        console.log("Submitting values:", values, { measurements });
        resetForm();
      } catch (err) {
        console.error("Submit error", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-20">
        <h3 className="aa-heading-04 fw-semibold" style={{marginBottom: "30px"}}>
          Record Measurements
        </h3>
        <div className="custom-card p-20 mb-20">
        <div className="table-responsive">
        <div className="custom-rounded-table">
          <table className="table custom-table-striped custom-table text-center align-middle">
            <thead className="position-sticky top-0 z-1">
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Date Taken</th>
                <th>History</th>
                <th>Units</th>
                <th>Range</th>
              </tr>
            </thead>

            <tbody>
              {Data.map((row, index) => {
                const iso = datesISO[row.id] || "";
                const display = iso ? formatForDisplay(iso) : "";
                return (
                  <tr key={row.id} className={index % 2 !== 0 ? "table-row-alt" : ""}>
                    <td>{row.name}</td>

                    <td>
                      <input
                        type="number"
                        defaultValue={row.value}
                        className="small-input"
                        style={{ borderRadius: "5px", marginRight: "8px" }}
                      />
                      <input type="checkbox" /> 
                    </td>

                    <td style={{fontWeight: 400, position: "relative" }}>
                      {/* Visible text input (readOnly) */}
                      <input
                        type="text"
                        readOnly
                        value={display}
                        placeholder="Select date"
                        className="small-input"
                        style={{
                          border: "1px solid #153f68",
                          borderRadius: "5px",
                          marginRight: "10px",
                          padding: "6px 8px",
                        }}
                        onClick={() => {
                          // optional: clicking the text field can also open picker
                          handleIconClick(row.id);
                        }}
                      />

                      {/* Hidden date input (controlled) */}
                      <input
                        type="date"
                        ref={(el) => (datePickerRefs.current[row.id] = el)}
                        value={iso}
                        onChange={(e) => handleHiddenDateChange(row.id, e.target.value)}
                        style={{
                          visibility: "hidden",
                          position: "absolute",
                          width: 0,
                          height: 0,
                          left: 0,
                          top: 0,
                        }}
                      />

                      {/* Calendar icon */}
                      <Calendar
                        color="#6f94b4"
                        style={{ cursor: "pointer", verticalAlign: "middle", zIndex: 10 }}
                        onClick={() => handleIconClick(row.id)}
                      />
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

                    <td style={{ color: "#153f68", fontWeight: 400 }}>{row.units}</td>
                    <td style={{ color: "#153f68", fontWeight: 400 }}>{row.range}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
        </div>
        

        <div className="text-end mt-3">
          <button type="submit" className="btn btn-primary rounded-pill">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Measuremens;


// <td style={{fontWeight: 400, position: "relative" }}>
//                       {/* Visible text input (readOnly) */}
//                       <input
//                         type="text"
//                         readOnly
//                         value={display}
//                         placeholder="Select date"
//                         className="small-input"
//                         style={{
//                           border: "1px solid #153f68",
//                           borderRadius: "5px",
//                           marginRight: "10px",
//                           padding: "6px 8px",
//                         }}
//                         onClick={() => {
//                           // optional: clicking the text field can also open picker
//                           handleIconClick(row.id);
//                         }}
//                       />

//                       {/* Hidden date input (controlled) */}
//                       <input
//                         type="date"
//                         ref={(el) => (datePickerRefs.current[row.id] = el)}
//                         value={iso}
//                         onChange={(e) => handleHiddenDateChange(row.id, e.target.value)}
//                         style={{
//                           visibility: "hidden",
//                           position: "absolute",
//                           width: 0,
//                           height: 0,
//                           left: 0,
//                           top: 0,
//                         }}
//                       />

//                       {/* Calendar icon */}
//                       <Calendar
//                         color="#6f94b4"
//                         style={{ cursor: "pointer", verticalAlign: "middle", zIndex: 10 }}
//                         onClick={() => handleIconClick(row.id)}
//                       />
//                     </td>


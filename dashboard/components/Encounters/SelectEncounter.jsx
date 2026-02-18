import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "../customButton/CustomButton";
import GoBack from "../GoBack/GoBack";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";
import { useNavigate } from "react-router-dom";

const SelectEncounter = ({ onCreateEncounter, ActiveTab }) => {
    const navigate = useNavigate();

  // Dropdown Options
  const encounterOptions = [
    "Health Risk Assessment",
    "General Wellness",
    "Follow-up Encounter",
  ];

  const validationSchema = Yup.object({
    encounter_name: Yup.string().required("Encounter Type is required"),
  });

  const formik = useFormik({
    initialValues: { encounter_name: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          encounter_name: values.encounter_name,
        };

        if (typeof onCreateEncounter === "function") {
          await onCreateEncounter(payload);
        }

        if (typeof ActiveTab === "function") {
          ActiveTab("measurements");
        }

        resetForm();
      } catch (err) {
        console.error("Error creating encounter:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="sticky-section">
      <GoBack />

      <div className="mt-13 mb-15 mb-sm-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 fw-semibold mb-5 py-5">
            Encounter Flow For: JOHN Ab - N/A - WELLNESS WORKDAYS Training
          </h3>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="custom-card p-0 mb-20">
          <div className="p-15 p-sm-24">
            <h5 className="aa-heading-05 fw-semibold mb-0">
              Select Encounter Type & Questions
            </h5>
          </div>

          <div className="devider" />

          <div className="p-15 p-sm-24">
            <div className="row g-4">

              {/* --- Floating Dropdown --- */}
              <div className="col-12">
                <div className="relative">
                  <CustomSingleSelect
                    label="Select Encounter Type"
                    name="encounter_name"
                    options={encounterOptions}
                    placeholder="HBA Questions"
                    formik={formik}
                  />
                </div>
              </div>

              <div className="col-12 mt-20 d-flex justify-content-end">
                <CustomButton
                  className="btn-primary rounded-pill"
                  loading={formik.isSubmitting}
                  text="Open encounter"
                  type="submit"
                  onClick={() => navigate("/modify-encounter")}
                />
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectEncounter;

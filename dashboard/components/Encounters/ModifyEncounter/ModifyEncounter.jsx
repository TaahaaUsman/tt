import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Nav } from "react-bootstrap";
import CustomButton from "../../customButton/CustomButton";
import GoBack from "../../GoBack/GoBack";
import { useNavigate } from "react-router-dom";
import SubModifyEncounter from "./SubModifyEncounter/SubModifyEncounter";
import FollowUp from "./FollowUp/FollowUp";
import SubMeasurements from "./Measurements/SubMeasurements";
import Risks from "./Risks/Risks";

const ModifyEncounter = ({ onCreateEncounter, ActiveTab }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("subModifyEncounterType");

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

    <div className="d-flex flex-row gap-2">
            <CustomButton
                  className="btn-primary rounded-pill btn-outline-primary"
                  loading={formik.isSubmitting}
                  text="Close encounter"
                  type="submit"
                  onClick={() => navigate("/encounters")}
                />
                <CustomButton
                  className="btn-primary rounded-pill"
                  loading={formik.isSubmitting}
                  text="History"
                  type="submit"
                //   onClick={() => navigate("/modify-encounter")}
                />
    </div>

      </div>


      <div className="overflow-x-auto w-100 mb-5 mb-sm-11 rounded-pill">
          <div className="modify-type-wrapper d-inline-block pb-10">
            <div className="tabs">
              <Nav variant="pills p-8">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "subModifyEncounterType"}
                    onClick={() => setActiveTab("subModifyEncounterType")}
                  >
                    Modify Encounter Type
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "followUp"}
                    onClick={() => setActiveTab("followUp")}
                  >
                    Follow Up
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "subMeasurements"}
                    onClick={() => setActiveTab("subMeasurements")}
                  >
                    Measurements
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "risks"}
                    onClick={() => setActiveTab("risks")}
                  >
                    Risks
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
    </div>

        {activeTab === "subModifyEncounterType" && <SubModifyEncounter />}
        {activeTab === "followUp" && <FollowUp />}
        {activeTab === "subMeasurements" && <SubMeasurements />}
        {activeTab === "risks" && <Risks />}

    </div>
  );
};

export default ModifyEncounter;

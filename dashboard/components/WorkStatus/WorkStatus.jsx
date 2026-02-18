import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomSingleSelect from "../FormsFields/CustomSingleSelect";
import CustomButton from "../customButton/CustomButton";
import ParticipantAddedModal from "../Modals/ParticipantAddedModal";
import { useNavigate } from "react-router-dom";

const WorkStatus = () => {
  const statusOptions = ["Employed", "Terminated", "On Leave"];
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      hireDate: "",
      terminationDate: "",
      companyStatus: "",
    },
    validationSchema: Yup.object({
      hireDate: Yup.string().required("Required"),
      terminationDate: Yup.string().required("Required"),
      companyStatus: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Work Status Data:", values);
      setShowSuccessModal(true);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="custom-card p-0">
          <div className="border-bottom p-15 p-sm-24">
            <h2 className="aa-text-md fw-semibold mb-8">Work Status</h2>
          </div>

          <div className="row p-15 p-sm-24">
            {/* Dates row */}
            <div className="col-12 col-md-6 mb-20">
              <FloatingInputField
                formik={formik}
                label="Hire Date"
                name="hireDate"
                type="date"
              />
            </div>
            <div className="col-12 col-md-6 mb-20">
              <FloatingInputField
                formik={formik}
                label="Termination Date"
                name="terminationDate"
                type="date"
              />
            </div>

            {/* Company Status */}
            <div className="col-12 mb-20">
              <CustomSingleSelect
                formik={formik}
                label="Company Status*"
                name="companyStatus"
                options={statusOptions}
                placeholder="Select Company Status"
              />
            </div>
          </div>
        </div>

        <div className="devider my-16" />
        <div className="col-12 d-flex justify-content-end">
          <CustomButton
            className="rounded-pill btn-primary"
            text="Save & Continue"
            type="submit"
          />
        </div>
      </form>

      <ParticipantAddedModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        onContinue={() => {
          setShowSuccessModal(false);
          navigate("/participant", { state: { showTable: true } });
        }}
      />
    </>
  );
};

export default WorkStatus;

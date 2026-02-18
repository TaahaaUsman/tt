import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../../FormsFields/FloatingInputField";
import CustomButton from "../../customButton/CustomButton";

/**
 * Measurements form
 * Props:
 * - onCreateMeasurement: optional async function(payload)
 * - ActiveTab: optional function to change parent tab
 */
const Measurements = ({ onCreateMeasurement, ActiveTab }) => {
  // Make fields optional: only validate types when values are provided.
  const validationSchema = Yup.object({
    measurements: Yup.string().trim().notRequired(),
    units: Yup.string().trim().notRequired(),
    range_min: Yup.number()
      .typeError("Minimum range must be a number")
      .notRequired()
      .nullable(),
    range_max: Yup.number()
      .typeError("Maximum range must be a number")
      .notRequired()
      .nullable()
      .test(
        "is-greater",
        "Maximum range must be greater than minimum range",
        function (value) {
          const { range_min } = this.parent;
          // only validate relation if both values are provided (non-empty)
          if (
            range_min === undefined ||
            range_min === "" ||
            value === undefined ||
            value === ""
          )
            return true;
          return Number(value) > Number(range_min);
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      measurements: "",
      units: "",
      range_min: "",
      range_max: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          measurement: values.measurements.trim(),
          units: values.units.trim(),
          range: {
            min: Number(values.range_min),
            max: Number(values.range_max),
          },
        };

        if (typeof onCreateMeasurement === "function") {
          await onCreateMeasurement(payload);
        } else {
          console.log("Measurement payload:", payload);
        }

        if (typeof ActiveTab === "function") {
          ActiveTab("addEncounterType");
        }

        resetForm();
      } catch (err) {
        console.error("Failed to save measurement:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="custom-card p-0 mb-20">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">Add Measurement</h5>
        </div>

        <div className="devider" />

        <div className="p-15 p-sm-24">
          <div className="row g-4">
            <div className="col-12">
              <FloatingInputField
                formik={formik}
                label="Measurement Name"
                placeholder="e.g. Systolic BP"
                name="measurements"
                type="text"
              />
            </div>

            <div className="col-12 col-md-6">
              <FloatingInputField
                formik={formik}
                label="Units"
                placeholder="e.g. mm Hg"
                name="units"
                type="text"
              />
            </div>

            <div className="col-6 col-md-3">
              <FloatingInputField
                formik={formik}
                label="Range Min"
                placeholder="e.g. 50"
                name="range_min"
                type="text"
              />
            </div>

            <div className="col-6 col-md-3">
              <FloatingInputField
                formik={formik}
                label="Range Max"
                placeholder="e.g. 300"
                name="range_max"
                type="text"
              />
            </div>
          </div>

          <div className="mt-20 d-flex justify-content-end">
            <CustomButton
              className="btn-primary rounded-pill"
              loading={formik.isSubmitting}
              text="Create encounter"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Measurements;

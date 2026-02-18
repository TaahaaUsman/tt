import React from "react";

const SwitchField = ({
  label,
  name,
  formik,
  className = "me-4",
  labelClass = "ms-5 aa-text-sm fw-semibold text-primary",
}) => {
  return (
    <div className={`form-check form-switch ${className}`}>
      <input
        className="form-check-input ms-0"
        type="checkbox"
        id={name}
        checked={formik.values[name] || false}
        onChange={(e) => formik.setFieldValue(name, e.target.checked)}
        onBlur={formik.handleBlur}
      />
      <label
        className={`form-check-label ${labelClass}`}
        htmlFor={name}
      >
        {label}
      </label>
      {formik.touched[name] && formik.errors[name] && (
        <div className="invalid-feedback d-block">
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};

export default SwitchField;

import React, { useState } from "react";
import { Form } from "react-bootstrap";

const FloatingInputField = ({
  label,
  name,
  type = "text",
  formik,
  placeholder = " ",
  className = "",
  disabled = false,
  rows = 5,
  onInput = false,
}) => {
  const error = formik.touched[name] && formik.errors[name];

  // Manage placeholder visibility: show actual placeholder only on focus.
  const hasPlaceholderText = typeof placeholder === "string" && placeholder.trim() !== "";
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    hasPlaceholderText ? " " : placeholder
  );

  const handleFocus = (e) => {
    if (hasPlaceholderText) setCurrentPlaceholder(placeholder);
  };

  const handleBlur = (e) => {
    // let formik handle touched state
    formik.handleBlur(e);

    // If value is empty, hide placeholder again (use a single space so :placeholder-shown works)
    const value = formik && formik.values ? formik.values[name] : e.target.value;
    if (!value) {
      if (hasPlaceholderText) setCurrentPlaceholder(" ");
    } else {
      // when there is a value, no placeholder needed
      setCurrentPlaceholder("");
    }
  };

  return (
    <div className={`did-floating-label-content text-start ${className}`}>
      <Form.Control
        as={type === "textarea" ? "textarea" : "input"}
        type={type !== "textarea" ? type : undefined}
        name={name}
        placeholder={currentPlaceholder}
        className={`did-floating-input ${error ? "is-invalid" : ""}`}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        rows={type === "textarea" ? rows : undefined}
        onInput={onInput ? onInput  : undefined}
      />

      <label className="did-floating-label aa-text-xs text-primary">
        {label}
      </label>

      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {formik.errors[name]}
        </Form.Control.Feedback>
      )}
    </div>
  );
};

export default FloatingInputField;

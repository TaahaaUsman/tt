import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "../../assets/Svgs/Svgs";

const CustomSingleSelect = ({
  label,
  name,
  options = [],
  formik,
  placeholder = "Select Option",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const error = formik.touched[name] && formik.errors[name];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative">
      <div
        ref={dropdownRef}
        className="did-floating-label-content text-start"
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}
      >
        <div
          className={`did-floating-input d-flex justify-content-between align-items-center ${
            error ? "is-invalid" : ""
          }`}
          style={{ cursor: "pointer", background: "#fff" }}
        >
          <span>{formik.values[name] || placeholder}</span>
          {showDropdown ? (
            <ChevronUp color="#3B3E40" />
          ) : (
            <ChevronDown color="#3B3E40" />
          )}
        </div>

        {formik.values[name] && (
          <label className="did-floating-label aa-text-xs text-primary">
            {label}
          </label>
        )}

        {showDropdown && (
          <div
            className="dropdown-menu show w-100 p-10 mt-4"
            style={{
              border: "1px solid #ccc",
              maxHeight: "180px",
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            {options.map((opt, i) => (
              <div
                key={i}
                className="dropdown-item cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  formik.setFieldValue(name, opt);
                  setShowDropdown(false);
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="invalid-feedback d-block">{formik.errors[name]}</div>
        )}
      </div>
    </div>
  );
};

export default CustomSingleSelect;

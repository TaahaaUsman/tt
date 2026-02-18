import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "../../assets/Svgs/Svgs";

const CustomMultiSelect = ({
  label,
  name,
  options = [],
  formik,
  placeholder = "Select Option",
  onOptionClick = null,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Toggle checkbox selection
  const handleToggle = (option) => {
    // Call the onOptionClick callback if provided
    if (onOptionClick) {
      onOptionClick(option);
    }

    const selected = formik.values[name] || [];
    if (selected.includes(option)) {
      formik.setFieldValue(
        name,
        selected.filter((item) => item !== option)
      );
    } else {
      formik.setFieldValue(name, [...selected, option]);
    }
  };

  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className="position-relative">
      <div
        ref={dropdownRef}
        className={`did-floating-label-content text-start ${
          showDropdown ? "open" : ""
        }`}
      >
        <div
          className={`did-floating-input d-flex justify-content-between align-items-center ${
            error ? "is-invalid" : ""
          }`}
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ cursor: "pointer", background: "#fff" }}
        >
          <span>
            {formik.values[name]?.length > 0
              ? formik.values[name].join(", ")
              : placeholder}
          </span>
          {showDropdown ? (
            <ChevronUp color="#3B3E40" />
          ) : (
            <ChevronDown color="#3B3E40" />
          )}
        </div>

        {formik.values[name]?.length > 0 && (
          <label className="did-floating-label aa-text-xs text-primary">
            {label}
          </label>
        )}

        {showDropdown && (
          <div
            className="dropdown-menu show w-100 p-10 mt-4"
            style={{
              border: "1px solid #ccc",
              overflow: "visible",
              position: "absolute",
              zIndex: 10,
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="form-check"
                onClick={(e) => e.stopPropagation()}
              >
                <label
                  className="form-check-label cursor-pointer d-flex justify-content-between align-items-center w-100"
                  htmlFor={`${name}-${index}`}
                >
                  {option}

                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id={`${name}-${index}`}
                    checked={formik.values[name]?.includes(option)}
                    onChange={() => handleToggle(option)}
                  />
                </label>
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

export default CustomMultiSelect;

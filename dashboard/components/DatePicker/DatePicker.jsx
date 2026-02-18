import { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Calendar as CalendarIcon } from "../../assets/Svgs/Svgs";

export default function CustomDatePicker({
  formik,
  name = "date_added",
  label = "Date Added",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Get value from formik
  const selectedDate = formik?.values?.[name]
    ? new Date(formik.values[name])
    : null;
  const error = formik?.touched?.[name] && formik?.errors?.[name];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatDate = (date) => {
    if (!date || isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleDateSelect = (date) => {
    if (formik && name) {
      // Format date as YYYY-MM-DD for formik
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      formik.setFieldValue(name, dateString);
      formik.setFieldTouched(name, true);
    }
    setOpen(false);
  };

  const handleFocus = () => {
    if (formik) {
      formik.setFieldTouched(name, true);
    }
  };

  const handleBlur = () => {
    if (formik) {
      formik.setFieldBlur(name);
    }
  };

  const inputValue = formatDate(selectedDate);

  return (
    <div
      className="did-floating-label-content text-start"
      ref={ref}
      style={{ position: "relative" }}
    >
      <Form.Control
        readOnly
        name={name}
        className={`did-floating-input ${error ? "is-invalid" : ""}`}
        value={inputValue}
        placeholder=" "
        onClick={() => setOpen(!open)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ cursor: "pointer", paddingRight: "40px" }}
      />
      <span
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <CalendarIcon color="#6c757d" />
      </span>

      <label className="did-floating-label aa-text-xs text-primary">
        {label}
      </label>

      {error && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {formik.errors[name]}
        </Form.Control.Feedback>
      )}

      {open && (
        <div style={styles.picker}>
          <Calendar onSelect={handleDateSelect} selectedDate={selectedDate} />
        </div>
      )}
    </div>
  );
}

function Calendar({ onSelect, selectedDate }) {
  // Use selectedDate if available, otherwise use current date
  const initialDate =
    selectedDate && !isNaN(selectedDate.getTime()) ? selectedDate : new Date();

  const [current, setCurrent] = useState(initialDate);
  const [yearInput, setYearInput] = useState(current.getFullYear());

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset) => {
    const newDate = new Date(year, month + offset, 1);
    setCurrent(newDate);
    setYearInput(newDate.getFullYear());
  };

  const changeYear = (value) => {
    const newYear = Number(value);
    if (!isNaN(newYear)) {
      setYearInput(newYear);
      setCurrent(new Date(newYear, month, 1));
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <button
          style={styles.navBtn}
          onClick={() => changeMonth(-1)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          ‹
        </button>

        <div style={styles.centerControls}>
          <select
            value={month}
            onChange={(e) =>
              setCurrent(new Date(year, Number(e.target.value), 1))
            }
            style={styles.monthSelect}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("en-US", { month: "long" })}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={yearInput}
            onChange={(e) => changeYear(e.target.value)}
            style={styles.yearInput}
          />
        </div>

        <button
          style={styles.navBtn}
          onClick={() => changeMonth(1)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          ›
        </button>
      </div>

      <div style={styles.grid}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} style={styles.dayLabel}>
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(year, month, i + 1);
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === i + 1 &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year;
          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <div
              key={i}
              style={{
                ...styles.day,
                ...(isSelected ? styles.daySelected : {}),
                ...(isToday && !isSelected ? styles.dayToday : {}),
              }}
              onClick={() => onSelect(date)}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "#e9ecef";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background = "#fff";
                }
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  picker: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    maxWidth: 360,
    background: "white",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
    border: "1px solid #dee2e6",
    zIndex: 1050,
    marginTop: 4,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 6,
  },
  navBtn: {
    border: "1px solid #dee2e6",
    background: "#fff",
    borderRadius: 4,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 600,
    color: "#495057",
    transition: "all 0.2s",
  },
  navBtnHover: {
    background: "#f8f9fa",
    borderColor: "#adb5bd",
  },
  centerControls: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  monthSelect: {
    borderRadius: 8,
    padding: "6px 8px",
    border: "1px solid #e5e7eb",
    fontSize: 14,
  },
  yearInput: {
    width: 80,
    borderRadius: 8,
    padding: "6px 8px",
    border: "1px solid #e5e7eb",
    fontSize: 14,
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
    textAlign: "center",
  },
  dayLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  day: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    cursor: "pointer",
    background: "#fff",
    border: "1px solid transparent",
    transition: "all 0.2s",
  },
  daySelected: {
    background: "#0d6efd",
    color: "#fff",
    borderColor: "#0d6efd",
  },
  dayToday: {
    borderColor: "#0d6efd",
    fontWeight: 600,
  },
};

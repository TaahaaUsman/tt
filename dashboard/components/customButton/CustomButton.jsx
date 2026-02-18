import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";

const CustomButton = ({
  text = "Submit",
  action,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  successMessage,
  errorMessage,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (disabled || loading) return;
    const fn = action || onClick;
    if (!fn) return;
    setLoading(true);
    Promise.resolve()
      .then(() => fn())
      .then(() => {
        if (successMessage) toast.success(successMessage);
      })
      .catch((err) => {
        const msg = err || err?.response?.data?.message || errorMessage || err?.message || "Operation failed";
        console.log(err)
        toast.error(msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      type={type}
      onClick={handleClick}
      disabled={loading || disabled}
      className={`d-flex align-items-center justify-content-center gap-2 ${className}`}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        text
      )}
    </Button>
  );
};

export default CustomButton;

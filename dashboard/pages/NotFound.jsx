import React from "react";

const goBack = () => {
  window.history.back();
};

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "80px", marginBottom: "0" }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ marginTop: "10px", color: "#666" }}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button type="button" className="btn btn-primary py-10 min-h-auto" onClick={goBack}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;

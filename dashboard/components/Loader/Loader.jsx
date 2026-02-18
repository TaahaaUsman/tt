import Spinner from "react-bootstrap/Spinner";

function GrowExample() {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        padding: "20px",
      }}
    >
      <Spinner animation="grow" style={{ color: "#153f68" }} />
      <Spinner animation="grow" style={{ color: "#153f68" }} />
      <Spinner animation="grow" style={{ color: "#153f68" }} />
    </div>
  );
}

export default GrowExample;

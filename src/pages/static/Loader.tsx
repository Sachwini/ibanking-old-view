import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner as="span" animation="border" variant="warning" />
      <span className="pl-2"> Loading... </span>
    </div>
  );
};

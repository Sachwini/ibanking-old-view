import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        verticalAlign: "middle",
      }}
    >
      <Spinner as="span" animation="border" variant="warning" />
      <span className="pl-2"> Loading... </span>
    </div>
  );
};

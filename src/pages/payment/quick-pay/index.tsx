import React from "react";
import { Card, Container } from "react-bootstrap";

const QuickPay = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted fs-larger">
            Personal Details
            <hr className="mt-0" />
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuickPay;

import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const ThemeSetting = () => {
  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
          <Card>
            <Card.Body>
              <div>
                <h3> Your Theme Color</h3> <hr />
              </div>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="primary">Edit</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Body>
              <div>
                <h3> Your Text Color</h3> <hr />
              </div>
              <Card.Title>Special title treatment</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="primary">Edit</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ThemeSetting;

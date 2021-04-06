import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col sm={2} style={{ backgroundColor: "green" }}>
            sidebar
          </Col>
          <Col sm={10} style={{ backgroundColor: "red" }}>
            container
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

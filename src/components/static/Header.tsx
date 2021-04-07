import React from "react";
import { Container, Navbar, Media, Row, Col } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        bg="light"
        className="justify-content-between"
        sticky="top"
        style={{ borderBottom: "2px solid gray" }}
      >
        <Container fluid>
          <Row style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}>
            <Col sm={2} lg={1}>
              search bar
            </Col>
            <Col sm={6}>
              <Navbar.Brand href="#" className="justify-content-center">
                <Media>
                  <img
                    width={40}
                    height={40}
                    className="mr-3"
                    src="./uploads/laxmibank.jpg"
                    alt="Generic placeholder"
                  />
                </Media>
              </Navbar.Brand>
            </Col>
            <Col sm={4} className="justify-content-right">
              Amount display
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

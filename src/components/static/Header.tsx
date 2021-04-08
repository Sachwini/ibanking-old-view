import React from "react";
import {
  Container,
  Navbar,
  Media,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className="justify-content-between px-0"
        sticky="top"
        style={{ borderBottom: "2px solid gray", backgroundColor: "white" }}
      >
        <Container fluid className="p-0">
          <Row
            style={{
              height: "100%",
              display: "flex",
              flexWrap: "nowrap",
              width: "100%",
            }}
          >
            <Col sm={4}>
              <Form inline className="custom__col">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 input__ctrl"
                />
                <BsSearch className="search__icon" size={25} />
              </Form>
            </Col>
            <Col sm={4} className="custom__col">
              <Navbar.Brand href="#" className="m-0">
                <img
                  width={45}
                  height={45}
                  className="mr-2"
                  src="./uploads/laxmibank.png"
                  alt="Generic placeholder"
                />
              </Navbar.Brand>
              <Navbar.Brand>
                <h1 className="logo__text">Laxmi Bank</h1>
              </Navbar.Brand>
            </Col>
            <Col sm={4} className="custom__col px-0 justify-content-end">
              Amount display
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

import React, { useState } from "react";
import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoFileTrayOutline, IoWalletOutline } from "react-icons/io5";
import { BsBell, BsEye, BsEyeSlash } from "react-icons/bs";

const Header = () => {
  const [eye, setEye] = useState<boolean>(false);

  const handleBalanceShow = () => {
    setEye(true);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="justify-content-between navbar__ctrl"
        sticky="top"
      >
        <Container fluid className="p-0">
          <Row className="custom__row">
            <Col sm={4} className="custom__col">
              <Form inline>
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
              <IoFileTrayOutline size="30px" className="mr-4 myPointer" />

              <div>
                <BsBell size="25px" className="myPointer" />
                <Badge variant="info" className="badge__ctrl myPointer">
                  9
                </Badge>
              </div>

              <div className="userBalance__inHeader">
                <IoWalletOutline size="30px" className="myPointer" />
                <div className="pl-3">
                  <p>Available Balance</p>
                  <p>
                    <span className="header__currency">NPR</span> 2000000
                  </p>
                </div>
              </div>

              <div onClick={handleBalanceShow}>
                {eye ? (
                  <BsEye size="20px" className="myPointer" />
                ) : (
                  <BsEyeSlash size="20px" className="myPointer" />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

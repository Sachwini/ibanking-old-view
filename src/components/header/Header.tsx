import { useState } from "react";
import "./Header.css";
import {
  Container,
  Navbar,
  Row,
  Col,
  Badge,
  OverlayTrigger,
} from "react-bootstrap";
import { IoWalletOutline } from "react-icons/io5";
import { BsBell, BsEye, BsEyeSlash } from "react-icons/bs";
import { notification } from "./HeaderDropDown";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
  const [eye, setEye] = useState<boolean>(false); 

  const handleBalanceShow = () => {
    setEye(!eye);
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="justify-content-between pr-0 navbar__ctrl"
    >
      <Container fluid className="p-0">
        <Row className="custom__row">
          <Col sm={4} className="custom__col">
            <HeaderSearch />
          </Col>

          <Col sm={4} className="custom__col pr-0 m-0">
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

          <Col sm={4} className="custom__col  justify-content-end p-0">
            <div className="pl-2">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={notification}
                rootClose
              >
                <span style={{ marginBottom: "30px" }}>
                  <BsBell size="25px" className="myPointer position-absolute" />
                  <Badge variant="info" className="myPointer badge__ctrl">
                    9
                  </Badge>
                </span>
              </OverlayTrigger>
            </div>

            <div className="userBalance__inHeader">
              <IoWalletOutline size="30px" className="myPointer" />
              <div className="pl-3">
                <p>Available Balance</p>
                {eye ? (
                  <p>
                    <span className="header__currency">NPR</span> 2000000
                  </p>
                ) : (
                  <p>
                    <span className="header__currency">NPR</span> XX,XXX.XX
                  </p>
                )}
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
  );
};

export default Header;

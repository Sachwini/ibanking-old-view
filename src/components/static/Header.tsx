import { useState, useRef } from "react";
import "./Header.css";
import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  FormControl,
  Badge,
  Popover,
  Overlay,
  OverlayTrigger,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoFileTrayOutline, IoWalletOutline } from "react-icons/io5";
import { BsBell, BsEye, BsEyeSlash } from "react-icons/bs";

const Header = () => {
  const [eye, setEye] = useState<boolean>(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Popover title</Popover.Title>
      <Popover.Content>
        Popover content <strong>some strong content</strong> Normal content
        again
      </Popover.Content>
    </Popover>
  );

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
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 input__ctrl"
              />
              <BsSearch className="search__icon" size={25} />
            </Form>
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
            <div>
              {/* <IoFileTrayOutline
                size="30px"
                className="pr-2 myPointer"
                onMouseEnter={handleClick}
              />
              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={100}
              >
                <Popover id="popover-contained">
                  <Popover.Title as="h3">Popover bottom</Popover.Title>
                  <Popover.Content>
                    <strong>Holy guacamole!</strong> Check this info.
                  </Popover.Content>
                </Popover>
              </Overlay> */}
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                rootClose
              >
                <IoFileTrayOutline size="30px" className="pr-2 myPointer" />
              </OverlayTrigger>
            </div>

            <div className="pl-2">
              {/* <span onMouseEnter={handleClick} style={{ marginBottom: "30px" }}>
                <BsBell size="25px" className="myPointer position-absolute" />
                <Badge variant="info" className="myPointer badge__ctrl">
                  9
                </Badge>
              </span>

              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref.current}
                containerPadding={10}
              >
                <Popover id="popover-contained">
                  <Popover.Title as="h3">Popover bottom</Popover.Title>
                  <Popover.Content>
                    <strong>Holy guacamole!</strong> Check this info.
                  </Popover.Content>
                </Popover>
              </Overlay> */}
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

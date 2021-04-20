import React, { createContext, useCallback, useState } from "react";
import "./Header2.css";
import {
  Container,
  Navbar,
  Row,
  Col,
  Badge,
  OverlayTrigger,
  Image,
} from "react-bootstrap";
import { IoFileTrayOutline, IoWalletOutline } from "react-icons/io5";
import { BsBell, BsEye, BsEyeSlash } from "react-icons/bs";
import { notification, userProfile, wallet } from "./support/HeaderDropDown";
import HeaderSearch from "./support/HeaderSearch";
import { FiUser } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useStateValue } from "components/theme-setting/StateProvider";

const Header2 = (props: any) => {
  const [eye, setEye] = useState<boolean>(false);
  const [sideMenuShow, setSideMenuShow] = useState<boolean>(true);
  // const toogleSidebar = useCallback(() => setSideMenuShow((value) => !value), [
  //   sideMenuShow,
  // ]);

  const [{}, dispatch] = useStateValue();

  const handleBalanceShow = () => {
    setEye(!eye);
  };

  const handleSideMenuShow = () => {
    setSideMenuShow(!sideMenuShow);
    dispatch({
      type: "MENU_CLICKED",
      value: sideMenuShow,
    });
  };

  return (
    <Navbar
      expand="xl"
      sticky="top"
      className="justify-content-between pr-0 navbar__ctrl"
    >
      <Container fluid className="p-0 ml-3">
        <Row className="custom__row">
          <Col sm={4} className="custom__col justify-content-start">
            <HiOutlineMenu
              size={40}
              onClick={handleSideMenuShow}
              className="menu__icon"
              color="#1d2a6c"
            />
            <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
              <Image
                src="./uploads/aaratiLogo.png"
                alt="Generic placeholder"
                width="100%"
                height="45px"
                style={{ objectFit: "contain" }}
              />
            </Link>
          </Col>

          <Col sm={4} className="custom__col justify-content-end">
            <HeaderSearch />
          </Col>

          <Col sm={4} className="custom__col  justify-content-end p-0">
            <div>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={wallet}
                rootClose
              >
                <IoFileTrayOutline
                  size="30px"
                  className="pr-2 myPointer"
                  color="#1d2a6c"
                />
              </OverlayTrigger>
            </div>

            <div className="pl-2">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={notification}
                rootClose
              >
                <span style={{ marginBottom: "30px" }}>
                  <BsBell
                    size="25px"
                    className="myPointer position-absolute"
                    color="#1d2a6c"
                  />
                  <Badge
                    variant="info"
                    className="myPointer badge__ctrl"
                    color="#1d2a6c"
                  >
                    9
                  </Badge>
                </span>
              </OverlayTrigger>
            </div>

            <div className="userBalance__inHeader">
              <IoWalletOutline
                size="30px"
                className="myPointer"
                color="#1d2a6c"
              />
              <div className="pl-2">
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
                <BsEye size="20px" className="myPointer" color="#1d2a6c" />
              ) : (
                <BsEyeSlash size="20px" className="myPointer" />
              )}
            </div>

            <div style={{ paddingLeft: "1.5em" }}>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={userProfile}
                rootClose
              >
                <FiUser
                  size={32}
                  color={"#1d2a6c"}
                  className="pr-2 myPointer"
                />
              </OverlayTrigger>
            </div>

            {/* <Link to="/" style={{ paddingLeft: "1.5em" }}>
              <FiUser size={32} color={"#1d2a6c"} />
            </Link> */}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header2;

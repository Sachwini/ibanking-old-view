import { useState } from "react";
import "./Header2.css";
import {
  Container,
  Navbar,
  Row,
  Col,
  Badge,
  OverlayTrigger,
  Image,
  Button,
} from "react-bootstrap";
import { IoFileTrayOutline, IoWalletOutline } from "react-icons/io5";
import { BsBell, BsEye, BsEyeSlash } from "react-icons/bs";
import { notification, wallet } from "./support/HeaderDropDown";
import HeaderSearch from "./support/HeaderSearch";
import { PersonCircle } from "react-bootstrap-icons";
import { HiOutlineMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useStateValue } from "components/theme-setting/StateProvider";

const Header2 = () => {
  const [eye, setEye] = useState<boolean>(false);
  const [sideMenuShow, setSideMenuShow] = useState<boolean>(false);

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
            />
            <Link to="/">
              <Image
                src="./uploads/mBankLogo.png"
                alt="Generic placeholder"
                width="80px"
                height="40px"
                // style={{ background: "#fff" }}
              />
              Hamro Technology
            </Link>
          </Col>

          <Col sm={4} className="custom__col">
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
                <IoFileTrayOutline size="30px" className="pr-2 myPointer" />
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

            <Link to="/">
              <PersonCircle size={32} color={"black"} />
            </Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header2;

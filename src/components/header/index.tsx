import { useState } from "react";
import { useHistory } from "react-router";
import { Badge, OverlayTrigger, Image, Popover } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { notification } from "./HeaderDropDown";
import HeaderSearch from "./HeaderSearch";
import { FiUser } from "react-icons/fi";
import { useStateValue } from "state-provider/StateProvider";
import { Link } from "react-router-dom";
import {
  HeaderNavbar,
  HeaderContainer,
  HeaderRow,
  HeaderCol,
  MenuIcon,
  HeaderLink,
  H_Notification as Hnotification,
} from "styling/header/HeaderStyling";
import {
  localStorageAuthTokenKey,
  localStorageRefreshTokenKey,
} from "services/AuthService";
import { IconStyle } from "styling/common/IconStyling";
import LogoutModal from "components/modals/logout/LogoutModal";
import styled from "styled-components";
import firebase from "firebase";

const PopoverStyle = {
  minWidth: "10rem",
  marginTop: "1rem",
};

const PopoverItem = styled.div`
  text-align: center;
  padding: 8px;
  background: #2f312f;
  cursor: pointer;
  font-weight: bold;
  color: #fff;
  &:hover {
    background: #575857;
    color: #fff;
  }
`;

// const hrStyle = {
//   border: "1px solid white",
//   margin: "0px",
// };

const Header = (props: any) => {
  const [sideMenuShow, setSideMenuShow] = useState<boolean>(true);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  const handleSideMenuShow = () => {
    setSideMenuShow(!sideMenuShow);
    dispatch({
      type: "MENU_CLICKED",
      value: !sideMenuShow,
    });
  };

  const UserProfile = (
    <Popover id="popover-basic" style={PopoverStyle}>
      <Popover.Content style={{ padding: "0" }}>
        <Link
          to="/user-profile"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <PopoverItem>User Details</PopoverItem>
        </Link>
        <PopoverItem
          onClick={() => {
            setShowLogoutModal(true);
          }}
        >
          LogOut
        </PopoverItem>
      </Popover.Content>
    </Popover>
  );

  const handleLogout = () => {
    localStorage.removeItem(localStorageAuthTokenKey);
    localStorage.removeItem(localStorageRefreshTokenKey);
    history.push("/login");
    window.location.reload(true);
  };

  return (
    <>
      <HeaderNavbar expand="xl" sticky="top">
        <HeaderContainer fluid>
          <HeaderRow>
            <HeaderCol sm={6}>
              <HeaderRow>
                <HeaderCol sm={3} md={2}>
                  <MenuIcon size={35} onClick={handleSideMenuShow} />
                </HeaderCol>
                <HeaderCol sm={8} md={10} className="pl-0">
                  <HeaderLink to="/">
                    <Image
                      src="../../baner.png"
                      alt="Company Name"
                      height="45px"
                      style={{ maxWidth: "100%", objectFit: "contain" }}
                    />
                  </HeaderLink>
                </HeaderCol>
              </HeaderRow>
            </HeaderCol>

            <HeaderCol sm={6} className="justify-content-end">
              <HeaderRow>
                <HeaderCol sm={8} md={9} className="mr-2">
                  <HeaderSearch />
                </HeaderCol>
                <HeaderCol sm={4} md={3} className="justify-content-end">
                  <div>
                    <OverlayTrigger
                      transition={false}
                      trigger="click"
                      placement="bottom"
                      overlay={notification}
                      rootClose
                    >
                      <Hnotification>
                        <IconStyle hover>
                          <BsBell size="25px" className="bell_ctrl" />
                        </IconStyle>
                        <Badge className="badge_ctrl">0</Badge>
                      </Hnotification>
                    </OverlayTrigger>
                  </div>

                  <div className="pl-4">
                    <OverlayTrigger
                      transition={false}
                      trigger="click"
                      placement="bottom"
                      overlay={UserProfile}
                      rootClose
                    >
                      <IconStyle hover>
                        <FiUser size={32} />
                      </IconStyle>
                    </OverlayTrigger>
                  </div>
                </HeaderCol>
              </HeaderRow>
            </HeaderCol>
          </HeaderRow>
        </HeaderContainer>
      </HeaderNavbar>
      <LogoutModal
        LogoutModalShow={showLogoutModal}
        handleModalShow={(e) => setShowLogoutModal(e)}
        confirmModalCancleButton={handleLogout}
      />
    </>
  );
};

export default Header;

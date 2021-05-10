import { useState } from "react";
import { useHistory } from "react-router";
import { Badge, OverlayTrigger, Image, Popover, Card } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { notification } from "./HeaderDropDown";
import HeaderSearch from "./HeaderSearch";
import { FiUser } from "react-icons/fi";
import { useStateValue } from "state-provider/StateProvider";
import {
  HeaderNavbar,
  HeaderContainer,
  HeaderRow,
  HeaderCol,
  MenuIcon,
  HeaderLink,
  H_Notification,
} from "styling/header/HeaderStyling";
import { IconStyle } from "styling/comp/IconStyling";
import {
  localStorageAuthTokenKey,
  localStorageRefreshTokenKey,
} from "services/AuthService";

const CardStyle = {
  border: "none",
  paddingLeft: "0.7rem",
  paddingRight: "0.7rem",
};
const PopoverStyle = {
  minWidth: "12rem",
  marginTop: "1rem",
};

const Header2 = (props: any) => {
  const [sideMenuShow, setSideMenuShow] = useState<boolean>(true);
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
        <Card style={CardStyle}>
          <Card.Text>User Profile</Card.Text>
          <Card.Text>User Details</Card.Text>
        </Card>
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem(localStorageAuthTokenKey);
            localStorage.removeItem(localStorageRefreshTokenKey);
            history.push("/login");
            window.location.reload(true);
          }}
        >
          LogOut
        </div>
      </Popover.Content>
    </Popover>
  );

  return (
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
                    src="/uploads/aaratiLogo.png"
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
                    <H_Notification>
                      <IconStyle hover>
                        <BsBell size="25px" className="bell_ctrl" />
                      </IconStyle>
                      <Badge className="badge_ctrl">9</Badge>
                    </H_Notification>
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
  );
};

export default Header2;

// skdokosdksd

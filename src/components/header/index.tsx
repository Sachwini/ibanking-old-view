import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import HeaderSearch from "./HeaderSearch";
import {
  HeaderNavbar,
  HeaderContainer,
  HeaderRow,
  HeaderCol,
  MenuIcon,
  HeaderLink,
} from "styling/header/HeaderStyling";
import { isMenuButtonClicked } from "state-provider/forPageSetting";
import { useSetRecoilState } from "recoil";
import UserDropDown from "./UserPopover";
import Notification from "./NotificationPopover";

const Header = () => {
  const [sideMenuShow, setSideMenuShow] = useState<boolean>(false);
  const setMenuClicked = useSetRecoilState(isMenuButtonClicked);

  useEffect(() => {
    setMenuClicked(sideMenuShow);
  }, [sideMenuShow]);

  return (
    <HeaderNavbar expand="xl" sticky="top">
      <HeaderContainer fluid>
        <HeaderRow>
          <HeaderCol sm={6}>
            <HeaderRow>
              <HeaderCol sm={3} md={2}>
                <MenuIcon
                  size={35}
                  onClick={() => setSideMenuShow(!sideMenuShow)}
                />
              </HeaderCol>
              <HeaderCol sm={8} md={10} className="pl-0">
                <HeaderLink to="/">
                  <Image
                    src="/images/baner.png"
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
                  <Notification />
                </div>

                <div className="pl-4">
                  <UserDropDown />
                </div>
              </HeaderCol>
            </HeaderRow>
          </HeaderCol>
        </HeaderRow>
      </HeaderContainer>
    </HeaderNavbar>
  );
};

export default Header;

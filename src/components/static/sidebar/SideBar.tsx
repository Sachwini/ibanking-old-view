import React from "react";
import { HouseDoor, Gear } from "react-bootstrap-icons";
import { Accordion } from "react-bootstrap";
import { useStateValue } from "components/state-provider/StateProvider";
import { GoRequestChanges } from "react-icons/go";
import { RiRefundLine } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { theme } from "components/styling/ThemeControl";
import { ThemeProvider } from "styled-components";
import {
  MiniMenuIconHandle,
  SidebarContainer,
  SideBarMenuControl,
} from "components/styling/sidebar/SidebarStyling";
import MenuHandle from "./comp/MenuHandle";

interface Props {
  goto: (url: string) => void;
}

const SideBar: React.FC<Props> = ({ goto }) => {
  const [{ isMenuButtonClick }, dispatch] = useStateValue();

  // calculate icon size dynamically with changing width
  let iconsize = `${isMenuButtonClick ? 35 : 25}`;

  // calculate icon size dynamically with changing width
  let sidbarWidth;
  if (isMenuButtonClick) {
    sidbarWidth = `70px`;
  } else sidbarWidth = `250px`;

  // list for mini sidebar
  const meniSidebarIcon = [
    <HouseDoor size={iconsize} />,
    <RiRefundLine size={iconsize} />,
    <MdPayment size={iconsize} />,
    <GoRequestChanges size={iconsize} />,
    <Gear size={iconsize} />,
    <FiActivity size={iconsize} />,
  ];

  const handleSideMenuShow = () => {
    if (isMenuButtonClick) {
      dispatch({
        type: "MENU_CLICKED",
        value: false,
      });
    }
  };

  if (!isMenuButtonClick) {
    return (
      <ThemeProvider theme={theme}>
        <SidebarContainer customWidth={sidbarWidth}>
          <SideBarMenuControl onClick={handleSideMenuShow}>
            <Accordion defaultActiveKey="account">
              <MenuHandle
                goto={goto}
                menuHeader="account"
                menuHeaderIcon={<HouseDoor size={iconsize} />}
              />

              <MenuHandle
                goto={goto}
                menuHeader="Fund Management"
                menuHeaderIcon={<RiRefundLine size={iconsize} />}
              />

              <MenuHandle
                goto={goto}
                menuHeader="Payment"
                menuHeaderIcon={<MdPayment size={iconsize} />}
              />

              <MenuHandle
                goto={goto}
                menuHeader="Request"
                menuHeaderIcon={<GoRequestChanges size={iconsize} />}
              />

              <MenuHandle
                goto={goto}
                menuHeader="Setting"
                menuHeaderIcon={<Gear size={iconsize} />}
              />

              <MenuHandle
                goto={goto}
                menuHeader="Activity Log"
                menuHeaderIcon={<FiActivity size={iconsize} />}
              />
            </Accordion>
          </SideBarMenuControl>
        </SidebarContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SidebarContainer customWidth={sidbarWidth}>
        <SideBarMenuControl onClick={handleSideMenuShow}>
          {meniSidebarIcon.map((icon) => {
            return <MiniMenuIconHandle key={meniSidebarIcon.indexOf(icon)}>{icon}</MiniMenuIconHandle>;
          })}
        </SideBarMenuControl>
      </SidebarContainer>
    </ThemeProvider>
  );
};

export default SideBar;

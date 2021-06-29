import React, { useEffect, useState } from "react";
import { HouseDoor, Gear } from "react-bootstrap-icons";
import { Accordion } from "react-bootstrap";
import { GoRequestChanges } from "react-icons/go";
import { RiRefundLine } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import {
  MiniMenuIconHandle,
  SidebarContainer,
  SideBarMenuControl,
} from "styling/sidebar/SidebarStyling";
import MenuHandle from "./MenuHandle";
import { useRecoilState } from "recoil";
import { isMenuButtonClicked } from "state-provider/forPageSetting";

interface Props {
  goto: (url: string) => void;
}

const SideBar: React.FC<Props> = ({ goto }) => {
  const [isMenuClickd, setIsMenuClicked] = useRecoilState(isMenuButtonClicked);
  const [sideMenuShow, setSideMenuShow] = useState<boolean>(isMenuClickd);

  useEffect(() => {
    setIsMenuClicked(sideMenuShow);
  }, [sideMenuShow]);

  // calculate icon size dynamically with changing width
  let iconsize = `${isMenuClickd ? 25 : 35}`;

  // calculate icon size dynamically with changing width
  let sidbarWidth;
  if (isMenuClickd) {
    sidbarWidth = `250px`;
  } else sidbarWidth = `70px`;

  // list for mini sidebar
  const meniSidebarIcon = [
    <HouseDoor size={iconsize} />,
    <RiRefundLine size={iconsize} />,
    <MdPayment size={iconsize} />,
    <GoRequestChanges size={iconsize} />,
    <Gear size={iconsize} />,
    <FiActivity size={iconsize} />,
  ];

  if (isMenuClickd) {
    return (
      <SidebarContainer customWidth={sidbarWidth} style={{ zIndex: 0 }}>
        <SideBarMenuControl>
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
              menuHeader="Favorite Listing"
              menuHeaderIcon={<MdFavoriteBorder size={iconsize} />}
            />
            <MenuHandle
              goto={goto}
              menuHeader="Activity Log"
              menuHeaderIcon={<FiActivity size={iconsize} />}
            />
          </Accordion>
        </SideBarMenuControl>
      </SidebarContainer>
    );
  }

  return (
    <SidebarContainer customWidth={sidbarWidth} style={{ zIndex: 0 }}>
      <SideBarMenuControl onClick={() => setSideMenuShow(!sideMenuShow)}>
        {meniSidebarIcon.map((icon, index) => {
          return (
            <MiniMenuIconHandle key={index}>
              <span className="iconColor">{icon} </span>
            </MiniMenuIconHandle>
          );
        })}
      </SideBarMenuControl>
    </SidebarContainer>
  );
};

export default SideBar;

import { useStateValue } from "state-provider/StateProvider";
import { MenuContainer } from "styling/SidebarStyling";
import React, { ReactFragment, useState } from "react";
import { Accordion } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import menuData from "./MenuData";
import ListItemHandle from "./ListItemHandle";
import { useRecoilState } from "recoil";
import { menuActiveHeaderID } from "state-provider/forPageSetting";

interface Props {
  goto: (url: string) => void;
  menuHeader: string;
  menuHeaderIcon: ReactFragment;
}

const MenuHandle: React.FC<Props> = ({ goto, menuHeader, menuHeaderIcon }) => {
  const [changeDropIcon, setChangeDropIcon] = useState<boolean>(false);
  const [menuActiveID, setMenuActiveID] = useRecoilState(menuActiveHeaderID);

  return (
    <MenuContainer>
      {menuData.map((menu) => {
        if (menu.title === menuHeader) {
          return (
            <div key={menu.id}>
              <Accordion.Toggle
                eventKey={`${menu.title}`}
                as={"div"}
                onClick={() => {
                  setMenuActiveID(menu.title);
                  setChangeDropIcon(!changeDropIcon);
                }}
                className={menuActiveID === menu.title ? "active" : "inActive"}
              >
                <div className="menu_HeaderWrapper">
                  <div className="menu_HeaderText">
                    <span className="iconColor">{menuHeaderIcon}</span>
                    <span className="text">{menu.title}</span>
                  </div>
                  {changeDropIcon && menuActiveID === menu.title ? (
                    <ChevronUp className="iconColor" />
                  ) : (
                    <ChevronDown className="iconColor" />
                  )}
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${menu.title}`}>
                <ListItemHandle goto={goto} menuHeader={menu.title} />
              </Accordion.Collapse>
            </div>
          );
        }
      })}
    </MenuContainer>
  );
};

export default MenuHandle;

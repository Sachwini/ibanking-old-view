import { useStateValue } from "components/state-provider/StateProvider";
import { MenuContainer } from "components/styling/sidebar/SidebarStyling";
import React, { ReactFragment, useState } from "react";
import { Accordion } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import menuData from "../comp/MenuData";
import ListItemHandle from "./ListItemHandle";

interface Props {
  goto: (url: string) => void;
  menuHeader: string;
  menuHeaderIcon: ReactFragment;
}

const MenuHandle: React.FC<Props> = ({ goto, menuHeader, menuHeaderIcon }) => {
  const [changeDropIcon, setChangeDropIcon] = useState<boolean>(true);
  const [menuActiveID, setMenuActiveID] = useState<string>("account");

  // this is for Header Menu active or not
  const [{ menuHeaderId }, dispatch] = useStateValue();

  const handleMenuActive = (id: string) => {
    dispatch({
      type: "MENU_HEADER_ID",
      headerID: id,
    });
    setMenuActiveID(id);
  };

  return (
    <MenuContainer>
      {menuData.map((menu) => {
        if (menu.title === menuHeader) {
          return (
            <>
              <Accordion.Toggle
                eventKey={`${menu.title}`}
                as={"div"}
                onClick={() => {
                  handleMenuActive(menu.title);
                  setChangeDropIcon(!changeDropIcon);
                }}
                className={menuHeaderId === menu.title ? "active" : "inActive"}
              >
                <div className="menu_HeaderWrapper">
                  <div className="menu_HeaderText">
                    <span className="iconColor">{menuHeaderIcon}</span>
                    <span className="text">{menu.title}</span>
                  </div>
                  {changeDropIcon && menuHeaderId === menu.title ? (
                    <ChevronUp className="iconColor" />
                  ) : (
                    <ChevronDown className="iconColor" />
                  )}
                </div>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${menu.title}`}>
                <ListItemHandle goto={goto} menuHeader={menuHeader} />
              </Accordion.Collapse>
            </>
          );
        }
      })}
    </MenuContainer>
  );
};

export default MenuHandle;

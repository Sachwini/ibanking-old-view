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

  // this is for Header Menu active or not
  const [{ menuHeaderId }, dispatch] = useStateValue();

  const handleIcon = (id: string) => {
    dispatch({
      type: "MENU_HEADER_ID",
      value: id,
    });
    setChangeDropIcon(!changeDropIcon);
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
                onClick={() => handleIcon(menu.title)}
                className={menuHeaderId === menu.title ? "active" : "inActive"}
              >
                <div className="menu_HeaderWrapper">
                  <div className="menu_HeaderText">
                    {menuHeaderIcon}
                    <span className="text">{menu.title}</span>
                  </div>
                  {changeDropIcon && menuHeaderId === menu.title ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
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

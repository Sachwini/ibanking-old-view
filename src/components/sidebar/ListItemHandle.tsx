import { useStateValue } from "state-provider/StateProvider";
import { MenuList, MenuListItem } from "styling/sidebar/SidebarStyling";
import React, { useState } from "react";
import menuData from "./MenuData";
import { useRecoilState } from "recoil";
import { menuActiveListID } from "state-provider/forPageSetting";

interface Props {
  goto: (url: string) => void;
  menuHeader: string;
}

const ListItemHandle: React.FC<Props> = ({ goto, menuHeader }) => {
  const [isLinkActive, setIsLinkActive] = useState<boolean>(false);
  const [activeID, setActiveID] = useRecoilState(menuActiveListID);

  const handleMenuItemClick = (id: string) => {
    setActiveID(id);
    setIsLinkActive(true);
    goto(`/${id.toLowerCase().split(" ").join("-")}`);
  };

  return (
    <MenuList key={menuHeader + 1}>
      {menuData.map((menu) => {
        if (menu.title === menuHeader) {
          return menu.subMenuTitle.map((listItems, index) => {
            return (
              <MenuListItem
                onClick={() => handleMenuItemClick(`${listItems}`)}
                status={
                  isLinkActive && activeID === `${listItems}` ? "active" : ""
                }
                key={index}
              >
                <span className="listText"> {listItems}</span>
              </MenuListItem>
            );
          });
        }
      })}
    </MenuList>
  );
};

export default ListItemHandle;

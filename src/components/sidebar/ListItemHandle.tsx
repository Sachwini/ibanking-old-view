import { useStateValue } from "state-provider/StateProvider";
import { MenuList, MenuListItem } from "styling/sidebar/SidebarStyling";
import React, { useState } from "react";
import menuData from "./MenuData";

interface Props {
  goto: (url: string) => void;
  menuHeader: string;
}

const ListItemHandle: React.FC<Props> = ({ goto, menuHeader }) => {
  const [isLinkActive, setIsLinkActive] = useState<boolean>(false);

  //   this is for which menu list item is active
  const [{ menuListId }, dispatch] = useStateValue();

  const handleMenuItemClick = (id: string) => {
    dispatch({
      type: "MENU_LIST_ID",
      listID: id,
    });
    setIsLinkActive(true);
  };

  return (
    <MenuList key={menuHeader + 1}>
      {menuData.map((menu) => {
        if (menu.title === menuHeader) {
          return menu.subMenuTitle.map((listItems,index) => {
            return (
              <MenuListItem
                onClick={() => {
                  handleMenuItemClick(`${listItems}`);
                  goto(
                    `/${menuHeader
                      .toLowerCase()
                      .split(" ")
                      .join("-")}/${listItems
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`
                  );
                }}
                status={
                  isLinkActive && menuListId === `${listItems}` ? "active" : ""
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

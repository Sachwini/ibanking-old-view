import { useStateValue } from "components/state-provider/StateProvider";
import {
  MenuList,
  MenuListItem,
} from "components/styling/sidebar/SidebarStyling";
import React, { useState } from "react";
import menuData from "../comp/MenuData";

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
    <MenuList>
      {menuData.map((menu) => {
        if (menu.title === menuHeader) {
          return menu.subMenuTitle.map((listItems) => {
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

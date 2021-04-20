import { useStateValue } from "components/theme-setting/StateProvider";
import React, { ReactComponentElement, ReactNode, useState } from "react";
import { Accordion } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

interface SideBarMenuProps {
  menuHead: {
    menuTitle: string;
    menuIcon: any;
    // menuLink: string;
  };
  menuItems: {
    sTitle: string[];
    // sLink: string;
  };
  //   goto: (url: string) => void;
  width: string;
}

const SideBarMenu: React.FC<SideBarMenuProps> = ({
  menuHead,
  menuItems,
  width,
}) => {
  const [changeDropIcon, setChangeDropIcon] = useState<boolean>(true);

  const handleIcon = () => {
    setChangeDropIcon(!changeDropIcon);
  };

  if (width === "70px") {
    return (
      <div
        style={{
          width: "100%",
          background: "inherit",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        {menuHead.menuIcon}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        background: "inherit",
        cursor: "pointer",
      }}
    >
      <Accordion.Toggle
        eventKey="0"
        as={"div"}
        onClick={handleIcon}
        className={
          changeDropIcon ? "menu__Active" : "menu__inActive menu__itemsHover"
        }
      >
        <strong>
          <span>{menuHead.menuIcon}</span>
          <span style={{ paddingLeft: "10px" }}>{menuHead.menuTitle}</span>
          {changeDropIcon ? (
            <ChevronUp style={{ float: "right", marginTop: "5px" }} />
          ) : (
            <ChevronDown style={{ float: "right", marginTop: "5px" }} />
          )}
        </strong>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <div>
          {menuItems.sTitle.map((item, index) => {
            return (
              <p className="menu__items menu__itemsHover" key={index}>
                {item}
              </p>
            );
          })}
        </div>
      </Accordion.Collapse>
    </div>
  );
};

export default SideBarMenu;

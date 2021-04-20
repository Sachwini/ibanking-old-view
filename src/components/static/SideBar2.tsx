import React, { useState } from "react";
// import "./SideBar2.css";
import "index.css";
import { HouseDoor, Gear, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { Accordion } from "react-bootstrap";
import { useStateValue } from "components/theme-setting/StateProvider";
import { GoRequestChanges } from "react-icons/go";
import { RiRefundLine } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";

interface Props {
  width: string;
  goto: (url: string) => void;
  // menuHead: [
  //   {
  //     id: string;
  //     menuTitle: string;
  //     menuIcon: any;
  //   }
  // ];

  // menuItems: [
  //   {
  //     id: string;
  //     sTitle: string[];
  //   }
  // ];
}

let iconSize;

const SideBar2: React.FC<Props> = ({ width, goto }) => {
  const [changeDropIcon, setChangeDropIcon] = useState<boolean>(true);
  const [clickID, setClickID] = useState<number>(0);
  const [{ menuButton }, dispatch] = useStateValue();

  if (width === "70px") {
    iconSize = 40;
  } else {
    iconSize = 25;
  }

  const handleIcon = (id: number) => {
    setClickID(id);
    setChangeDropIcon(!changeDropIcon);
  };

  const handleSideMenuShow = () => {
    if (menuButton) {
      dispatch({
        type: "MENU_CLICKED",
        value: false,
      });
    }
  };

  // if (width === "70px") {
  //   return (
  //     <div className="sidebar__ctrl" style={{ width: `${width}` }}>
  //       <div className="sidebar__item" onClick={handleSideMenuShow}>
  //         <Accordion defaultActiveKey="0" style={{ background: "transparent" }}>
  //           {menuHead.map((item, index) => {
  //             return (
  //               <div
  //                 style={{
  //                   width: "100%",
  //                   background: "inherit",
  //                   cursor: "pointer",
  //                   textAlign: "center",
  //                 }}
  //                 key={index}
  //               >
  //                 {item.menuIcon2}
  //               </div>
  //             );
  //           })}
  //         </Accordion>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="sidebar__ctrl" style={{ width: `${width}` }}>
      <div className="sidebar__item" onClick={handleSideMenuShow}>
        <Accordion defaultActiveKey="0" style={{ background: "transparent" }}>
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
              onClick={() => handleIcon(0)}
              className={clickID === 0 ? "menu__Active" : "menu__inActive"}
            >
              <strong>
                <HouseDoor size={25} />
                <span style={{ paddingLeft: "10px" }}>Account</span>
                {changeDropIcon && clickID === 0 ? (
                  <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                ) : (
                  <ChevronDown style={{ float: "right", marginTop: "5px" }} />
                )}
              </strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div>
                <p
                  className="menu__items menu__itemsHover"
                  onClick={() => goto("/account/details")}
                >
                  Acc Details
                </p>
                <p
                  className="menu__items menu__itemsHover"
                  onClick={() => goto("/account/user-profile")}
                >
                  User Profile
                </p>
                <p className="menu__items menu__itemsHover">Statement</p>
              </div>
            </Accordion.Collapse>
          </div>

          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              paddingTop: "1em",
            }}
          >
            <Accordion.Toggle
              eventKey="1"
              as={"div"}
              onClick={() => handleIcon(1)}
              className={clickID === 1 ? "menu__Active" : "menu__inActive"}
            >
              <strong>
                <RiRefundLine size={25} />
                <span style={{ paddingLeft: "10px" }}>Fund Management</span>
                {changeDropIcon && clickID === 1 ? (
                  <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                ) : (
                  <ChevronDown style={{ float: "right", marginTop: "5px" }} />
                )}
              </strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <div>
                <p className="menu__items menu__itemsHover">Load Fund</p>
                <p
                  className="menu__items menu__itemsHover"
                  onClick={() => goto("/fund-mgmt/fund-transfer")}
                >
                  Transfer
                </p>
                <p className="menu__items menu__itemsHover">Load Wallet</p>
                <p className="menu__items menu__itemsHover">Bulkk Payment</p>
              </div>
            </Accordion.Collapse>
          </div>

          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              paddingTop: "1em",
            }}
          >
            <Accordion.Toggle
              eventKey="2"
              as={"div"}
              onClick={() => handleIcon(2)}
              className={clickID === 2 ? "menu__Active" : "menu__inActive"}
            >
              <strong>
                <GoRequestChanges size={25} />
                <span style={{ paddingLeft: "10px" }}>Request</span>
                {changeDropIcon && clickID === 2 ? (
                  <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                ) : (
                  <ChevronDown style={{ float: "right", marginTop: "5px" }} />
                )}
              </strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <div>
                <p className="menu__items menu__itemsHover">Cheque Request</p>
                <p className="menu__items menu__itemsHover">Service Request</p>
              </div>
            </Accordion.Collapse>
          </div>

          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              paddingTop: "1em",
            }}
          >
            <Accordion.Toggle
              eventKey="3"
              as={"div"}
              onClick={() => handleIcon(3)}
              className={clickID === 3 ? "menu__Active" : "menu__inActive"}
            >
              <strong>
                <Gear size={25} />
                <span style={{ paddingLeft: "10px" }}>Setting</span>
                {changeDropIcon && clickID === 3 ? (
                  <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                ) : (
                  <ChevronDown style={{ float: "right", marginTop: "5px" }} />
                )}
              </strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <div>
                <p className="menu__items menu__itemsHover">Confgure Theme</p>
                <p
                  className="menu__items menu__itemsHover"
                  onClick={() => goto("/setting/service-config")}
                >
                  Service Configure
                </p>
              </div>
            </Accordion.Collapse>
          </div>

          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              paddingTop: "1em",
            }}
          >
            <Accordion.Toggle
              eventKey="4"
              as={"div"}
              onClick={() => handleIcon(4)}
              className={clickID === 4 ? "menu__Active" : "menu__inActive"}
            >
              <strong>
                <FiActivity size={25} />
                <span style={{ paddingLeft: "10px" }}>Activity Log</span>
                {changeDropIcon && clickID === 4 ? (
                  <ChevronDown style={{ float: "right", marginTop: "5px" }} />
                ) : (
                  <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                )}
              </strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <div>
                <p
                  className="menu__items menu__itemsHover"
                  onClick={() => goto("/activity/log")}
                >
                  History
                </p>
              </div>
            </Accordion.Collapse>
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default SideBar2;

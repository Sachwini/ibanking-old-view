import React, { useState } from "react";
import styles from "./SideBar2.module.css";
import { HouseDoor, Gear, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { Accordion } from "react-bootstrap";
import { useStateValue } from "components/state-provider/StateProvider";
import { GoRequestChanges } from "react-icons/go";
import { RiRefundLine } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";
import { MdPayment } from "react-icons/md";
import {
  SidebarStyle,
  theme,
  SideBarText,
} from "components/styling/DynamicStyling";
import { ThemeProvider } from "styled-components";

interface Props {
  width: any;
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
    iconSize = 60;
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

  if (width === "250px") {
    return (
      <ThemeProvider theme={theme}>
        <SidebarStyle customWidth="250px">
          <div className={styles.sidebar__item} onClick={handleSideMenuShow}>
            <Accordion
              defaultActiveKey="0"
              style={{ background: "transparent" }}
            >
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
                  className={
                    clickID === 0 ? styles.menu__Active : styles.menu__inActive
                  }
                >
                  <strong>
                    <HouseDoor size={25} />
                    <span style={{ paddingLeft: "10px" }}>Account</span>
                    {changeDropIcon && clickID === 0 ? (
                      <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                    ) : (
                      <ChevronDown
                        style={{ float: "right", marginTop: "5px" }}
                      />
                    )}
                  </strong>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                      onClick={() => goto("/account/details")}
                    >
                      Acc Details
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                      onClick={() => goto("/account/user-profile")}
                    >
                      User Profile
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                    >
                      Statement
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
                  eventKey="1"
                  as={"div"}
                  onClick={() => handleIcon(1)}
                  className={
                    clickID === 1 ? styles.menu__Active : styles.menu__inActive
                  }
                >
                  <strong>
                    <RiRefundLine size={25} />
                    <span style={{ paddingLeft: "10px" }}>Fund Management</span>
                    {changeDropIcon && clickID === 1 ? (
                      <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                    ) : (
                      <ChevronDown
                        style={{ float: "right", marginTop: "5px" }}
                      />
                    )}
                  </strong>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <div>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                    >
                      Load Fund
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                    >
                      Load Wallet
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
                  eventKey="5"
                  as={"div"}
                  onClick={() => handleIcon(5)}
                  className={
                    clickID === 5 ? styles.menu__Active : styles.menu__inActive
                  }
                >
                  <strong>
                    <MdPayment size={25} />
                    <span style={{ paddingLeft: "10px" }}>Payment</span>
                    {changeDropIcon && clickID === 5 ? (
                      <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                    ) : (
                      <ChevronDown
                        style={{ float: "right", marginTop: "5px" }}
                      />
                    )}
                  </strong>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="5">
                  <div>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                      onClick={() => goto("/payment/fund-transfer")}
                    >
                      Fund Transfer
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                      onClick={() => goto("/payment/bulk-payment")}
                    >
                      Bulk Payment
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                    >
                      Bulk Recharge
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                      onClick={() => goto("/payment/vendor-payment")}
                    >
                      Vendor Payment
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                    >
                      <SideBarText>Broker Payment</SideBarText>
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
                  eventKey="2"
                  as={"div"}
                  onClick={() => handleIcon(2)}
                  className={
                    clickID === 2 ? styles.menu__Active : styles.menu__inActive
                  }
                >
                  <strong>
                    <GoRequestChanges size={25} />
                    <span style={{ paddingLeft: "10px" }}>Request</span>
                    {changeDropIcon && clickID === 2 ? (
                      <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                    ) : (
                      <ChevronDown
                        style={{ float: "right", marginTop: "5px" }}
                      />
                    )}
                  </strong>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <div>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                    >
                      Cheque Request
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                    >
                      Service Request
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
                  eventKey="3"
                  as={"div"}
                  onClick={() => handleIcon(3)}
                  className={
                    clickID === 3 ? styles.menu__Active : styles.menu__inActive
                  }
                >
                  <strong>
                    <Gear size={25} />
                    <span style={{ paddingLeft: "10px" }}>Setting</span>
                    {changeDropIcon && clickID === 3 ? (
                      <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                    ) : (
                      <ChevronDown
                        style={{ float: "right", marginTop: "5px" }}
                      />
                    )}
                  </strong>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <div>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                      onClick={() => goto("/setting/theme-setting")}
                    >
                      Confgure Theme
                    </p>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
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
                  className={
                    clickID === 4 ? styles.menu__Active : styles.menu__inActive
                  }
                >
                  <strong>
                    <FiActivity size={25} />
                    <span style={{ paddingLeft: "10px" }}>Activity Log</span>
                    {changeDropIcon && clickID === 4 ? (
                      <ChevronDown
                        style={{ float: "right", marginTop: "5px" }}
                      />
                    ) : (
                      <ChevronUp style={{ float: "right", marginTop: "5px" }} />
                    )}
                  </strong>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <div>
                    <p
                      className={`${styles.menu__items} ${styles.menu__itemsHover}`}
                      onClick={() => goto("/activity/log")}
                    >
                      History
                    </p>
                  </div>
                </Accordion.Collapse>
              </div>
            </Accordion>
          </div>
        </SidebarStyle>
      </ThemeProvider>
    );
  }

  return (
    <div className={styles.sidebar__ctrl} style={{ width: `${width}` }}>
      <div className={styles.sidebar__item} onClick={handleSideMenuShow}>
        <Accordion defaultActiveKey="0" style={{ background: "transparent" }}>
          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <HouseDoor size={35} className={styles.iconHover} />
          </div>
          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <RiRefundLine size={35} className={styles.iconHover} />
          </div>
          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <MdPayment size={35} className={styles.iconHover} />
          </div>
          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <GoRequestChanges size={35} className={styles.iconHover} />
          </div>
          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <Gear size={35} className={styles.iconHover} />
          </div>
          <div
            style={{
              width: "100%",
              background: "inherit",
              cursor: "pointer",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <FiActivity size={35} className={styles.iconHover} />
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default SideBar2;

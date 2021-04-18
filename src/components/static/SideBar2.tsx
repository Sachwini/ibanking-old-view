import "./SideBar2.css";
import { Link } from "react-router-dom";
import {
  PersonCircle,
  HouseDoor,
  Wallet2,
  CashStack,
  Gear,
  BoxArrowRight,
  Mailbox2,
} from "react-bootstrap-icons";

interface Props {
  width: string;
  goto: (url: string) => void;
}

const myStyle = [
  {
    marginTop: "0.8em",
    padding: "0 0.8em",
    overflowY: "scroll",
    overflowX: "hidden",
  },
];

const SideBar2 = (props: Props) => {
  return (
    <div className="sidebar__ctrl" style={{ width: `${props.width}` }}>
      <div className="sidebar__item">
        <ul className="main-menu-ul">
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action" onClick={() => props.goto("/")}>
              <HouseDoor size={25} />
              <small>Home</small>
            </a>
          </li>
          <li>
            <a
              className="sidebar_action"
              onClick={() => props.goto("/account")}
            >
              <Wallet2 size={25} />
              <small>Account</small>
            </a>
          </li>
          <li>
            <a
              className="sidebar_action"
              onClick={() => props.goto("/payment")}
            >
              <CashStack size={25} />
              <small>Payments</small>
            </a>
          </li>
          <li>
            <a
              className="sidebar_action"
              onClick={() => props.goto("/fund-transfer")}
            >
              <Mailbox2 size={25} />
              <small>Transfer</small>
            </a>
          </li>
          <li>
            <a
              className="sidebar_action"
              onClick={() => props.goto("/service-config")}
            >
              <Gear size={25} />
              <small>Services</small>
            </a>
          </li>
          <li>
            <a className="sidebar_action">
              <BoxArrowRight size={25} />
              <small>Logout</small>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar2;

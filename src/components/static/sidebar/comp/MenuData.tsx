import { useStateValue } from "components/state-provider/StateProvider";
import { HouseDoor, Gear } from "react-bootstrap-icons";
import { FiActivity } from "react-icons/fi";
import { GoRequestChanges } from "react-icons/go";
import { MdPayment } from "react-icons/md";

// Handle icon size according to the menu type
// const [{ menuButton }, dispatch] = useStateValue();
// let iconSize: number;
// {
//   menuButton ? (iconSize = 35) : (iconSize = 25);
// }

const menuData = [
  {
    title: "account",
    subMenuTitle: ["Account Details", "User Profile", "Statement"],
  },
  {
    title: "Fund Management",
    subMenuTitle: ["Load Fund", "Load Wallet"],
  },
  {
    title: "Payment",
    subMenuTitle: [
      "Fund Transfer",
      "Bulk Payment",
      "bulk Recharge",
      "Vendor Payment",
      "Broker Payment",
    ],
  },
  {
    title: "Request",
    subMenuTitle: ["Cheque Request", "Service Request"],
  },
  {
    title: "Setting",
    subMenuTitle: ["Configure Theme", "Configure Service"],
  },
  {
    title: "Activity Log",
    subMenuTitle: ["Logs"],
  },
];

export default menuData;

import { HouseDoor, Gear } from "react-bootstrap-icons";
import { FiActivity } from "react-icons/fi";
import { GoRequestChanges } from "react-icons/go";
import { MdPayment } from "react-icons/md";

// export interface SideBarMenuProps {
//   menuHead: [
//     {
//       id: string;
//       menuTitle: string;
//       menuIcon: any;
//     }
//   ];

//   menuItems: [
//     {
//       id: string;
//       sTitle: string[];
//     }
//   ];
// }

export const menuData = [
  {
    id: "menu1",
    title: "Account",
    menuIcon1: <HouseDoor size={25} />,
    menuIcon2: <HouseDoor size={35} />,
    subMenuTitle: ["Acc Details", "User Profile", "Statement"],
  },
  {
    id: "menu2",
    title: "Fund Management",
    menuIcon1: <Gear size={25} />,
    menuIcon2: <Gear size={35} />,
    subMenuTitle: ["Load Fund", "Load Wallet"],
  },
  {
    id: "menu3",
    title: "Payment",
    menuIcon1: <MdPayment size={25} />,
    menuIcon2: <MdPayment size={35} />,
    subMenuTitle: [
      "Fund Transfer",
      "Bulk Payment",
      "bulk Recharge",
      "Vendor Payment, Broker Payment",
    ],
  },
  {
    id: "menu4",
    title: "Request",
    menuIcon1: <GoRequestChanges size={25} />,
    menuIcon2: <GoRequestChanges size={35} />,
    subMenuTitle: ["Cheque Request", "Service Request"],
  },
  {
    id: "menu5",
    title: "Settings",
    menuIcon1: <Gear size={25} />,
    menuIcon2: <Gear size={35} />,
    subMenuTitle: ["Configure Theme", "Configure Service"],
  },
  {
    id: "menu6",
    title: "Activity Logs",
    menuIcon1: <FiActivity size={25} />,
    menuIcon2: <FiActivity size={35} />,
    subMenuTitle: ["History"],
  },
];

// export const menuHead = [
//   {
//     id: "item1",
//     menuTitle: "Account",
//     menuIcon: <Gear size={25} />,
//     menuIcon2: <Gear size={40} />,
//   },
//   {
//     id: "item2",
//     menuTitle: "Account",
//     menuIcon: <Gear />,
//     menuIcon2: <Gear size={40} />,
//   },
// ];

// export const menuItems = [
//   {
//     id: "item1",
//     sTitle: ["test1", "test2", "test3"],
//   },
//   {
//     id: "item2",
//     sTitle: ["testsecond1", "testsecond2", "testsecond2"],
//   },
// ];

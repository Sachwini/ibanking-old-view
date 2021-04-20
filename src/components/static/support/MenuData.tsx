import {
  HouseDoor,
  Wallet2,
  CashStack,
  Gear,
  BoxArrowRight,
  Mailbox2,
} from "react-bootstrap-icons";

export interface SideBarMenuProps {
  menuHead: [
    {
      id: string;
      menuTitle: string;
      menuIcon: any;
    }
  ];

  menuItems: [
    {
      id: string;
      sTitle: string[];
    }
  ];
}

// export const menuData = {
//   menuHead: [
//     {
//       id: "item1",
//       menuTitle: "Account",
//       menuIcon: <Gear size={25} />,
//       menuIcon2: <Gear size={40} />,
//     },
//     {
//       id: "item2",
//       menuTitle: "Account",
//       menuIcon: <Gear />,
//       menuIcon2: <Gear size={40} />,
//     },
//   ],

//   menuItems: [
//     {
//       id: "item1",
//       sTitle: ["test1", "test2", "test3"],
//     },
//     {
//       id: "item2",
//       sTitle: ["testsecond1", "testsecond2", "testsecond2"],
//     },
//   ],
// };

export const menuHead = [
  {
    id: "item1",
    menuTitle: "Account",
    menuIcon: <Gear size={25} />,
    menuIcon2: <Gear size={40} />,
  },
  {
    id: "item2",
    menuTitle: "Account",
    menuIcon: <Gear />,
    menuIcon2: <Gear size={40} />,
  },
];

export const menuItems = [
  {
    id: "item1",
    sTitle: ["test1", "test2", "test3"],
  },
  {
    id: "item2",
    sTitle: ["testsecond1", "testsecond2", "testsecond2"],
  },
];

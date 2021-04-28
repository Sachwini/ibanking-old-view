// import React, { useState } from "react";
// import { HouseDoor, Gear } from "react-bootstrap-icons";
// import { Accordion } from "react-bootstrap";
// import { useStateValue } from "components/state-provider/StateProvider";
// import { GoRequestChanges } from "react-icons/go";
// import { RiRefundLine } from "react-icons/ri";
// import { FiActivity } from "react-icons/fi";
// import { MdPayment } from "react-icons/md";
// import {
//   MenuContainer,
//   MenuList,
//   MiniMenuIconHandle,
//   SidebarContainer,
//   SideBarMenuControl,
// } from "components/styling/sidebar/SidebarStyling";
// import MenuHandle from "./comp/MenuHandle";
// // import menuData from "../comp/MenuData";

// interface Props {
//   goto: (url: string) => void;
// }

// const SideBar2: React.FC<Props> = ({ goto }) => {
//   const [{ isMenuButtonClick, menuHeaderId }, dispatch] = useStateValue();
//   const [changeDropIcon, setChangeDropIcon] = useState<boolean>(true);
//   const [menuActiveID, setMenuActiveID] = useState<string>("account");

//   // this is for Header Menu active or not
//   //   const [{ menuHeaderId }, dispatch] = useStateValue();

//   const handleMenuActive = (id: string) => {
//     dispatch({
//       type: "MENU_HEADER_ID",
//       headerID: id,
//     });
//     setMenuActiveID(id);
//   };

//   // calculate icon size dynamically with changing width
//   let iconsize = `${isMenuButtonClick ? 35 : 25}`;

//   // calculate Sidebar width dynamically
//   let sidbarWidth;
//   if (isMenuButtonClick) {
//     sidbarWidth = `70px`;
//   } else sidbarWidth = `250px`;

//   // list for mini sidebar
//   const meniSidebarIcon = [
//     <HouseDoor size={iconsize} />,
//     <RiRefundLine size={iconsize} />,
//     <MdPayment size={iconsize} />,
//     <GoRequestChanges size={iconsize} />,
//     <Gear size={iconsize} />,
//     <FiActivity size={iconsize} />,
//   ];

//   const handleSideMenuShow = () => {
//     if (isMenuButtonClick) {
//       dispatch({
//         type: "MENU_CLICKED",
//         value: false,
//       });
//     }
//   };

//   if (!isMenuButtonClick) {
//     return (
//       <SidebarContainer customWidth={sidbarWidth}>
//         <SideBarMenuControl onClick={handleSideMenuShow}>
//           <Accordion defaultActiveKey="account">
//             <MenuContainer>
//               <Accordion.Toggle
//                 eventKey={`${menu.title}`}
//                 as={"div"}
//                 onClick={() => {
//                   handleMenuActive(menu.title);
//                   setChangeDropIcon(!changeDropIcon);
//                 }}
//                 className={menuHeaderId === menu.title ? "active" : "inActive"}
//                 key={menu.title}
//               >
//                 <div className="menu_HeaderWrapper">
//                   <div className="menu_HeaderText">
//                     <span className="iconColor">{menuHeaderIcon}</span>
//                     <span className="text">{menu.title}</span>
//                   </div>
//                   {changeDropIcon && menuHeaderId === menu.title ? (
//                     <ChevronUp className="iconColor" />
//                   ) : (
//                     <ChevronDown className="iconColor" />
//                   )}
//                 </div>
//               </Accordion.Toggle>
//               <Accordion.Collapse eventKey={`${menu.title}`}>
//                 <MenuList>
//                   <MenuListItem
//                     onClick={() => {
//                       handleMenuItemClick(`${listItems}`);
//                       goto(
//                         `/${menuHeader
//                           .toLowerCase()
//                           .split(" ")
//                           .join("-")}/${listItems
//                           .toLowerCase()
//                           .split(" ")
//                           .join("-")}`
//                       );
//                     }}
//                     status={
//                       isLinkActive && menuListId === `${listItems}`
//                         ? "active"
//                         : ""
//                     }
//                     key={listItems}
//                   >
//                     <span className="listText"> {listItems}</span>
//                   </MenuListItem>
//                 </MenuList>
//               </Accordion.Collapse>
//             </MenuContainer>
//           </Accordion>
//         </SideBarMenuControl>
//       </SidebarContainer>
//     );
//   }

//   return (
//     <SidebarContainer customWidth={sidbarWidth}>
//       <SideBarMenuControl onClick={handleSideMenuShow}>
//         {meniSidebarIcon.map((icon, index) => {
//           return (
//             <MiniMenuIconHandle key={index}>
//               <span className="iconColor">{icon} </span>
//             </MiniMenuIconHandle>
//           );
//         })}
//       </SideBarMenuControl>
//     </SidebarContainer>
//   );
// };

// export default SideBar2;

export const data = {
  data: "hi ",
};

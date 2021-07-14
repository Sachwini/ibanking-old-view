import React, { useState } from "react";
import { Badge, ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { getName_Salutation } from "state-provider/globalUserData";
import { IconStyle } from "styling/common/IconStyling";
import { H_Notification } from "styling/header/HeaderStyling";
import { NotificationPopover } from "styling/header/HeaderPopoverStyling";

const Notification = () => {
  const salutation = useRecoilValue(getName_Salutation);
  const [popoverShow, setPopoverShow] = useState(false);

  const notification = (
    <NotificationPopover
      id="notification-popover"
      style={{ marginTop: "1.5rem", minWidth: "30rem" }}
    >
      <Popover.Title className="popover_header">
        <p className="notification_text">Recent Notifications</p>
        <p className="notification_subHeading">
          <span className="salutation">{salutation.salutation}</span>
          {salutation.name}
          <span className="notification_count">
            You have total (10) new notifications
          </span>
        </p>
      </Popover.Title>
      <Popover.Content className="popover_content">
        <ul className="menu_list">
          <li>Wishing you many many happy birthday sir</li>
          <li>You got Rs.5000 from A/c 1010100101010 </li>
          <li>your esewa wallet load success </li>
          <li>rs.10 deducted as transfer charge </li>
          <li>Rs.4000 transferred successfully</li>
        </ul>
      </Popover.Content>
    </NotificationPopover>
  );

  return (
    <OverlayTrigger
      transition={true}
      trigger="hover"
      placement="bottom"
      overlay={notification}
      show={popoverShow}
      rootClose
    >
      <H_Notification onClick={() => setPopoverShow(!popoverShow)}>
        <IconStyle hover>
          <BsBell size="25px" className="bell_ctrl" />
        </IconStyle>
        <Badge className="badge_ctrl">0</Badge>
      </H_Notification>
    </OverlayTrigger>
  );
};

export default Notification;

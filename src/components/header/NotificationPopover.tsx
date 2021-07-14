import { useEffect, useState } from "react";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { getName_Salutation } from "state-provider/globalUserData";
import { IconStyle } from "styling/common/IconStyling";
import { H_Notification } from "styling/for-header/HeaderStyling";
import { NotificationPopover } from "styling/for-header/HeaderPopoverStyling";
import { messaging } from "init-fcm";
import { v4 as uuidv4 } from "uuid";

const Notification = () => {
  const salutation = useRecoilValue(getName_Salutation);
  const [popoverShow, setPopoverShow] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState<any[]>([]);

  useEffect(() => {
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then((data: any) => {
        console.warn("firebase token", data);
      })
      .catch(function (err) {
        console.log("You denied the notification");
      });

    messaging.onMessage((payload) =>
      setNotificationMessage([
        ...notificationMessage,
        {
          title: payload.notification.title,
          body: payload.notification.body,
        },
      ])
    );
  }, [notificationMessage]);

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
            You have total
            <span className="text-dark px-2">
              ({notificationMessage?.length})
            </span>
            new notifications
          </span>
        </p>
      </Popover.Title>
      <Popover.Content className="popover_content">
        {notificationMessage && notificationMessage.length === 0 ? (
          <p className="text-center my-4 mb-5">
            You have No Notifications yet...
          </p>
        ) : (
          <ul className="menu_list">
            {notificationMessage.map((item) => {
              return <li key={uuidv4()}>{item?.body}</li>;
            })}
          </ul>
        )}
      </Popover.Content>
    </NotificationPopover>
  );

  return (
    <OverlayTrigger
      transition={true}
      trigger={["focus", "hover"]}
      placement="bottom"
      overlay={notification}
      show={popoverShow}
      rootClose
    >
      <H_Notification onClick={() => setPopoverShow(!popoverShow)}>
        <IconStyle hover>
          <BsBell size="25px" className="bell_ctrl" />
        </IconStyle>
        <Badge className="badge_ctrl">
          {notificationMessage ? notificationMessage?.length : 0}
        </Badge>
      </H_Notification>
    </OverlayTrigger>
  );
};

export default Notification;

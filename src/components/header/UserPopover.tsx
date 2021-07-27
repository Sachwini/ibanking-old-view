import LogoutModal from "components/modals/logout/LogoutModal";
import { useState } from "react";
import { Image, OverlayTrigger, Popover } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  localStorageAuthTokenKey,
  localStorageRefreshTokenKey,
} from "services/AuthService";
import { getName_Salutation } from "state-provider/globalUserData";
import { IconStyle } from "styling/common/IconStyling";
import { UserPopover } from "styling/for-header/HeaderPopoverStyling";
import { v4 as uuidv4 } from "uuid";

const menuList = [
  { title: "Profile", url: "account-details" },
  { title: "setting", url: "/configure-service" },
  { title: "change password", url: "/change-mpin" },
  { title: "cheque request", url: "/cheque-request" },
];

const UserDropDown = () => {
  const salutation = useRecoilValue(getName_Salutation);
  const [popoverShow, setPopoverShow] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem(localStorageAuthTokenKey);
    localStorage.removeItem(localStorageRefreshTokenKey);
    history.push("/login");
    window.location.reload(true);
  };

  const userProfile = (
    <UserPopover id="user-dropdown" style={{ marginTop: "1.5rem" }}>
      <div className="userinfo_wrapper">
        <div className="image_container">
          <Image src="images/ibankLogo.png" alt="" className="user_image" />
        </div>
        <div className="uerInfo">
          <p className="greeting">Welcome 🙂</p>
          <p className="name">
            <span className="salutation">{salutation.salutation}</span>{" "}
            {salutation.name}
          </p>
        </div>
      </div>

      <Popover.Content className="popover_content">
        <ul className="menu_list">
          {menuList.map((item) => {
            return (
              <li onClick={() => setPopoverShow(!popoverShow)} key={uuidv4()}>
                <Link to={item.url}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <div
          className="log_out"
          onClick={() => {
            setShowLogoutModal(true);
            setPopoverShow(!popoverShow);
          }}
        >
          Logout
        </div>
      </Popover.Content>
    </UserPopover>
  );

  return (
    <>
      <OverlayTrigger
        transition={true}
        trigger={["focus", "hover"]}
        placement="bottom"
        overlay={userProfile}
        show={popoverShow}
        rootClose
      >
        <IconStyle hover onClick={() => setPopoverShow(!popoverShow)}>
          <FiUser size={32} />
        </IconStyle>
      </OverlayTrigger>

      <LogoutModal
        LogoutModalShow={showLogoutModal}
        logoutModalSubmitHandle={handleLogout}
        handleCancle={(e) => setShowLogoutModal(e)}
      />
    </>
  );
};

export default UserDropDown;

import { useStateValue } from "state-provider/StateProvider";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Header2 from "components/header/Header2";
import SideBar from "components/sidebar/SideBar";
import {
  LayoutBodyWrapper,
  LayoutContainer,
  LayoutSidebar,
  LayoutContentField,
} from "styling/layout/LayoutStyling";
import { userDetail } from "pages/user-profile/model";
import { get } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";

const DefaultLayout: React.FC<RouteComponentProps<{}>> = (props) => {
  const [{ isMenuButtonClick, customerDetails }, dispatch] = useStateValue();
  const [userInfo, setUserInfo] = useState<userDetail>();

  const init = async () => {
    const res = await get<apiResponse<userDetail>>("api/customerdetails");
    if (res) {
      setUserInfo(res.data.details);
      dispatch({
        type: "USER_DETAILS",
        customerDetail: res.data.details,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  console.log(customerDetails);

  let sidbarWidth;
  if (isMenuButtonClick) {
    sidbarWidth = `70px`;
  } else sidbarWidth = `250px`;

  const gotUrl = (url: string) => {
    props.history.push(url);
  };

  return (
    <LayoutContainer>
      <Header2 />

      <LayoutBodyWrapper>
        <LayoutSidebar width={sidbarWidth}>
          <SideBar goto={gotUrl} />
        </LayoutSidebar>

        <LayoutContentField width={sidbarWidth}>
          {props.children}
        </LayoutContentField>
      </LayoutBodyWrapper>
    </LayoutContainer>
  );
};

export default withRouter(DefaultLayout);

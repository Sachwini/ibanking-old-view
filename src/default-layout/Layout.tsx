import { useStateValue } from "state-provider/StateProvider";
import { RouteComponentProps, withRouter } from "react-router"; 
import Header2 from "components/header/Header2";
import SideBar from "components/sidebar/SideBar";
import {
  LayoutBodyWrapper,
  LayoutContainer,
  LayoutSidebar,
  LayoutContentField,
} from "styling/layout/LayoutStyling";
import { useEffect, useState } from "react";
import { apiResponse } from "models/apiResponse";
import { get } from "services/AjaxService";
import { userDetail } from "pages/user-account/user-profile/model";

const DefaultLayout: React.FC<RouteComponentProps<{}>> = (props) => {
  const [{ isMenuButtonClick }, dispatch] = useStateValue();
  const [userInfo, setUserInfo] = useState<userDetail>();

  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      const res = await get<apiResponse<userDetail>>(
        "api/customerdetails?additionalDetails=true"
      );
      if (isSubscribed) {
        setUserInfo(res.data.details);
        dispatch({
          type: "USER_DETAILS",
          customerDetail: res.data.details,
        });
      }
    };

    loadData();
    return () => {
      isSubscribed = false;
    };
  }, []);


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

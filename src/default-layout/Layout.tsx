import { useStateValue } from "state-provider/StateProvider";
import { RouteComponentProps, withRouter } from "react-router";
import Header from "components/header";
import SideBar from "components/sidebar";
import {
  LayoutBodyWrapper,
  LayoutContainer,
  LayoutSidebar,
  LayoutContentField,
  FooterWrapper,
} from "styling/for-layout/LayoutStyling";
import { useEffect } from "react";
import Footer from "components/Footer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoading, isMenuButtonClicked } from "state-provider/forPageSetting";
import { userDetails } from "state-provider/globalUserData";
import { userDetailType } from "models/for-pages/userAccountModels";
import { loadUserDetails } from "helper/GetData";
import { Loader } from "pages/static/Loader";
import Toster from "./Toster";

const DefaultLayout: React.FC<RouteComponentProps<{}>> = (props) => {
  const [{ menuHeaderId }, dispatch] = useStateValue();
  const isMenuClicked = useRecoilValue(isMenuButtonClicked);
  const setUserDetails = useSetRecoilState(userDetails);
  const loader = useRecoilValue(isLoading);

  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      try {
        const res = await loadUserDetails();
        if (isSubscribed && res) {
          setUserDetails(res);
          dispatch({
            type: "USER_DETAILS",
            customerDetail: res as userDetailType,
          });
        }
        console.log("my details: ", res);
      } catch {
        window.location.href = `/login`;
      }
    };

    loadData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  let sidbarWidth;
  if (isMenuClicked) {
    sidbarWidth = `250px`;
  } else sidbarWidth = `70px`;

  const gotUrl = (url: string) => {
    props.history.push(url);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <LayoutContainer>
      <Toster />
      <Header />

      <LayoutBodyWrapper>
        <LayoutSidebar width={sidbarWidth}>
          <SideBar goto={gotUrl} />
        </LayoutSidebar>

        <LayoutContentField width={sidbarWidth}>
          {props.children}
        </LayoutContentField>
      </LayoutBodyWrapper>

      <FooterWrapper width={sidbarWidth}>
        <Footer />
      </FooterWrapper>
    </LayoutContainer>
  );
};

export default withRouter(DefaultLayout);

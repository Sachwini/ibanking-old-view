import { useStateValue } from "components/state-provider/StateProvider";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Header2 from "./header/Header2";
import SideBar from "./sidebar/SideBar";
import {
  LayoutBodyWrapper,
  LayoutContainer,
  LayoutSidebar,
  LayoutContentField,
} from "components/styling/layout/LayoutStyling";

const DefaultLayout: React.FC<RouteComponentProps<{}>> = (props) => {
  const [{ isMenuButtonClick }, dispatch] = useStateValue();

  let sidbarWidth;
  if (isMenuButtonClick) {
    sidbarWidth = `70px`;
  } else sidbarWidth = `250px`;

  const gotUrl = (url: string) => {
    props.history.push(url);
  };

  return (
    <LayoutContainer>
      {/* Header Here  */}
      <Header2 />

      <LayoutBodyWrapper>
        <LayoutSidebar width={sidbarWidth}>
          {/* sidebar Here  */}
          <SideBar goto={gotUrl} />
        </LayoutSidebar>

        <LayoutContentField width={sidbarWidth}>
          {/* Main Content Here   */}
          {props.children}
        </LayoutContentField>
      </LayoutBodyWrapper>
    </LayoutContainer>
  );
};

export default withRouter(DefaultLayout);

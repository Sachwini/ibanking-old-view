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

const DefaultLayout: React.FC<RouteComponentProps<{}>> = (props) => {
  const [{ isMenuButtonClick}, dispatch] = useStateValue();

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

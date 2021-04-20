import { useStateValue } from "components/theme-setting/StateProvider";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Header2 from "./Header2";
import SideBar2 from "./SideBar2";

const DefaultLayout: React.FC<RouteComponentProps<{}>> = (props) => {
  const [{ menuButton }, dispatch] = useStateValue();

  const contentFieldStyle = {
    width: `${menuButton ? "calc(100% - 70px)" : "calc(100% - 250px)"}`,
    paddingTop: "2em",
    background: "#f1f1f1",
    paddingLeft: "1em",
    minHeight: "100vh",
    paddingBottom: "1em",
  };

  const gotUrl = (url: string) => {
    props.history.push(url);
  };

  return (
    <div className="default__layout">
      <Header2/>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexGrow: 1,
        }} 
      >
        <div
          style={{
            width: `${menuButton ? "70px" : "250px"}`,
          }}
        >
          <SideBar2 goto={gotUrl} width={menuButton ? "70px" : "250px"} />
        </div>
        <div style={contentFieldStyle}>{props.children}</div>
      </div>
    </div>
  );
};

export default withRouter(DefaultLayout);

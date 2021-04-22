import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";

const contentFieldStyle = {
  paddingTop: "2em",
  background: "#f1f1f1",
  paddingLeft: "1em",
  minHeight: "100vh",
};

const DefaultLayout: React.FC<RouteComponentProps<{}>> = (props) => {
  const gotUrl = (url: string) => {
    props.history.push(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
      <div style={{ width: "7%" }}>
        <SideBar goto={gotUrl} />
      </div>
      <div style={{ width: "93%" }}>
        <Header />
        <div style={contentFieldStyle}>{props.children}</div>
      </div>
    </div>
  );
};

export default withRouter(DefaultLayout);

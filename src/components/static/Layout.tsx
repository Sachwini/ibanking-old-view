import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";
import "./Layout.css";

const DefaultLayout: React.SFC<RouteComponentProps<{}>> = (props) => {
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
        <div className="contentBox__ctrl">{props.children}</div>
      </div>
    </div>
  );
};

export default withRouter(DefaultLayout);

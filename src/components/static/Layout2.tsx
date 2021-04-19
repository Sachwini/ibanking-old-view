import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";
import Header2 from "./Header2";
import SideBar2 from "./SideBar2";

const contentFieldStyle = {
  width: "80%",
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
    <div className="default__layout">
      <Header2/>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexGrow: 1,
        }} 
      >
        <div style={{ width: "20%" }}>
          <SideBar2 goto={gotUrl} width="20%" />
        </div>
        <div style={contentFieldStyle}>{props.children}</div>
      </div>

      {/* <Container fluid>
      <Row>
        <Col sm={12}>
          <Header2 />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Header2 />
        </Col>
      </Row>
    </Container> */}
    </div>
  );
};

export default withRouter(DefaultLayout);

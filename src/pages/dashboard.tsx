import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Content from "../components/Content";
import Header from "../components/static/Header";
import SideBar from "../components/static/SideBar";
import "../App.css";
import { RouteComponentProps } from "react-router";

const Dashboard = (props: RouteComponentProps) => {
  const gotUrl = (url: string) => {
    props.history.push(url)
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
      <div style={{ width: "7%" }}>
        <SideBar goto={gotUrl} />
      </div>
      <div style={{ width: "93%" }}>
        <Header />
        <Content />
        
      </div>
    </div>
  );
};

export default Dashboard;

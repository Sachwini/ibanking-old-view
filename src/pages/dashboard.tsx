import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Content from "../components/Content";
import Header from "../components/static/Header";
import SideBar from "../components/static/SideBar";
import "../App.css";
const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
      <div style={{ width: "8.33%" }}>
        <SideBar />
      </div>
      <div style={{ width: "91.66%" }}>
        <Header />
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;

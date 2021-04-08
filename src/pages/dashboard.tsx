import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Content from "../components/Content";
import Header from "../components/static/Header";
import SideBar from "../components/static/SideBar";
import { RouteComponentProps } from "react-router";

const Dashboard = (props: RouteComponentProps) => {
  const gotUrl = (url: string) => {
    props.history.push(url);
  };

  return <div>
    <h1>Dashboard</h1>
  </div>
};

export default Dashboard;

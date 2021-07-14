import { PageTitle } from "components/PageTitle";
import { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import FundTranfCharge from "./FundTranfCharge";
import { FundTransfer } from "./FundTransfer";
import { BankTransfer } from "./BankTransfer";
import { FundTransferLimit } from "./FundTransferLimit";
import { ToastContainer } from "react-toastify";

import StaticBar from "components/StaticBar";
import { fundTransferPageTitle } from "static-data/forPageTitle";
import { forFundTransfer } from "static-data/forBreadCrumb";

const ActiveStyle = {
  color: "#f58228",
  borderBottom: "3px solid #f58228",
  paddingBottom: "8px",
  letterSpacing: "1px",
};

const inActiveStyle = {
  ...ActiveStyle,
  background: "transparent",
  borderBottom: "",
  color: "inherit",
};

const Transfer = () => {
  const [key, setKey] = useState<string | boolean | null>("fund");

  return (
    <>
      <Container>
        <StaticBar
          pageTitle={fundTransferPageTitle}
          breadCrumbData={forFundTransfer}
        />

        <Tab.Container activeKey={key} onSelect={(key) => setKey(key)}>
          <div className="custom__tab">
            <Nav.Link
              eventKey="fund"
              style={key === "fund" ? ActiveStyle : inActiveStyle}
            >
              <span className="tab__text">Fund Transfer</span>
            </Nav.Link>

            <Nav.Link
              eventKey="bank"
              style={key === "bank" ? ActiveStyle : inActiveStyle}
            >
              <span className="tab__text">Bank Transfer</span>
            </Nav.Link>
          </div>

          <Tab.Content style={{ padding: "20px", paddingLeft: "0" }}>
            <Tab.Pane eventKey="fund">
              <Row>
                <Col sm={12} md={6}>
                  <FundTransfer />
                </Col>
                <Col sm={12} md={6}>
                  <FundTransferLimit />
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="bank">
              <Row>
                <Col sm={12} md={6}>
                  <BankTransfer />
                </Col>
                <Col sm={12} md={6}>
                  <FundTransferLimit />
                  <FundTranfCharge />
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Transfer;

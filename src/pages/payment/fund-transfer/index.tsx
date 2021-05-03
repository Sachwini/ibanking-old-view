import { PageTitle } from "components/page-title/index";
import { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import FundTranfCharge from "./FundTranfCharge";
import { IBFTForm } from "./IBFTForm";
import { IBFTLimit } from "./IBFTLimit";
import "./index.css";

const Transfer = () => {
  const [key, setKey] = useState<string | boolean | null>("fund");

  const ActiveStyle = {
    color: "#f58228",
    borderBottom: "3px solid #f58228",
    paddingBottom: "8px",
    letterSpacing: "1px",
  };

  const inActiveStyle = {
    ...ActiveStyle,
    background: "transparent",
    borderColor: "transparent",
    color: "inherit",
  };

  return (
    <div>
      <Container>
        <PageTitle title="Fund Transfer" />

        <Tab.Container activeKey={key} onSelect={(key) => setKey(key)}>
          <div className="custom__tab">
            <Nav.Link
              eventKey="fund"
              style={key === "fund" ? ActiveStyle : inActiveStyle}
            >
              <span className="tab__text">Fund Transfer</span>
            </Nav.Link>

            <Nav.Link
              eventKey="ibft"
              style={key === "ibft" ? ActiveStyle : inActiveStyle}
            >
              <span className="tab__text">IBFT TRANSFER</span>
            </Nav.Link>

            <Nav.Link
              eventKey="ips"
              style={key === "ips" ? ActiveStyle : inActiveStyle}
            >
              <span className="tab__text">connect ips transfer</span>
            </Nav.Link>
          </div>

          <Tab.Content style={{ padding: "20px", paddingLeft: "0" }}>
            <Tab.Pane eventKey="fund">
              <Row>
                <Col sm={12} md={6}>
                  <IBFTForm />
                </Col>
                <Col sm={12} md={6}>
                  <IBFTLimit />
                  <FundTranfCharge />
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="ibft">
              <Row>
                <Col sm={12} md={6}>
                  <p>IBFT TRANSFER</p>
                  <IBFTForm />
                </Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="ips">
              <Row>
                <Col sm={12} md={6}>
                  <p>connect ips transfer</p>
                  <IBFTForm />
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Transfer;

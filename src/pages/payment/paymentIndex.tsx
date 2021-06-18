import { Col, Container, Row, Tab, Nav } from "react-bootstrap";
import { PageTitle } from "components/PageTitle";
import BillPaymentLog from "./billPaymentLog";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useState } from "react";
import "./index.css";

function PaymentIndex() {
  const [key, setKey] = useState<string | boolean | null>("bpl");

  const ActiveStyle = {
    color: "#f58228",
    borderBottom: "3px solid #f58228",
    paddingBottom: "8px",
    letterSpacing: "1px",
  };

  const inActiveStyle = {
    ...ActiveStyle,
    background: "transparent",
    "border-color": "transparent",
    color: "inherit",
  };

  return (
    <div>
      <div>
        <Container>
          <div className="d-flex flex-wrap mt-1">
            <IoChevronBackCircleOutline size="40px" />
            <PageTitle title="Reports" subTitle="View your account reports" />
          </div>
          <Tab.Container activeKey={key} onSelect={(key) => setKey(key)}>
            <div className="custom__tab">
              <Nav.Link
                eventKey="bpl"
                style={key === "bpl" ? ActiveStyle : inActiveStyle}
              >
                <span className="tab__text">BillPaymentLog</span>
              </Nav.Link>

              <Nav.Link
                eventKey="tl"
                style={key === "tl" ? ActiveStyle : inActiveStyle}
              >
                <span className="tab__text">TRANSFER LOG</span>
              </Nav.Link>
            </div>

            <Tab.Content style={{ padding: "20px", paddingLeft: "0" }}>
              <Tab.Pane eventKey="bpl">
                <Row>
                  <Col sm={12} md={6}>
                    <BillPaymentLog />
                  </Col>
                </Row>
              </Tab.Pane>

              <Tab.Pane eventKey="tl">
                <Row>
                  <Col sm={12} md={6}>
                    <p>TRANSFER LOG</p>
                    {/* <IBFTForm /> */}
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </div>
  );
}

export default PaymentIndex;

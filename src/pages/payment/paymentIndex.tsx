import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { PageTitle } from "components/page-title/index";
import BillPaymentLog from "./billPaymentLog";

function Transfer() {
  return (
    <div>
      <div>
        <Container fluid>
          <PageTitle
            title="Reports"
            subTitle="View your account reports"
          />
          <Tabs defaultActiveKey="bpl" id="uncontrolled-tab-example">
            <Tab eventKey="bpl" title="Bill Payment Log">
              <Row>
                <Col sm={12} md={6}>
                  <BillPaymentLog />
                </Col>
                <Col sm={12} md={6}>
                  {/* <IBFTLimit /> */}
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="ips" title="Transfer Log"></Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}

export default Transfer;

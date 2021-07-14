import { useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import FundTranfCharge from "./FundTranfCharge";
import { FundTransfer } from "./FundTransfer";
import { BankTransfer } from "./BankTransfer";
import { FundTransferLimit } from "./FundTransferLimit";
import { ToastContainer } from "react-toastify";

import StaticBar from "components/StaticBar";
import { fundTransferPageTitle } from "static-data/forPageTitle";
import { forFundTransfer } from "static-data/forBreadCrumb";

const Transfer = () => {
  const [key, setKey] = useState<any>("fund");

  return (
    <>
      <Container>
        <StaticBar
          pageTitle={fundTransferPageTitle}
          breadCrumbData={forFundTransfer}
        />

        <Tabs
          id="fund-transfer"
          activeKey={key}
          onSelect={(key: any) => setKey(key)}
          style={{ marginBottom: "1rem" }}
        >
          <Tab
            eventKey="fund"
            title="Fund Transfer"
            style={{ fontWeight: "bold" }}
          >
            <Row>
              <Col sm={12} md={6}>
                <FundTransfer />
              </Col>
              <Col sm={12} md={6}>
                <FundTransferLimit />
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="bank" title="Bank Transfer">
            <Row>
              <Col sm={12} md={6}>
                <BankTransfer />
              </Col>
              <Col sm={12} md={6}>
                <FundTransferLimit />
                <FundTranfCharge />
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Transfer;

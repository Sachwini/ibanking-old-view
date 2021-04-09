import { PageTitle } from "components/page-title/index";
import React from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { IBFTForm } from "./IBFTForm";
import { IBFTLimit } from "./IBFTLimit";

const Transfer = () => {
  return (
    <div>
      <Container fluid>
        <PageTitle title="Fund Transfer" />
        <Tabs defaultActiveKey="ibft" id="uncontrolled-tab-example">
          <Tab eventKey="ibft" title="IBFT">
            <Row>
              <Col sm={12} md={6}> 
                <IBFTForm />
              </Col>
              <Col sm={12} md={6}>
                <IBFTLimit />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="ips" title="Connect IPS"></Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Transfer;

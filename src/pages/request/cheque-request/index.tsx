import { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import BlockChequeBook from "./BlockChequeBook";
import RequestNewCheque from "./RequestNewCheque";
import StaticBar from "components/StaticBar";
import { chequeRequestPageTitle } from "static-data/forPageTitle";
import { forChequeRequest } from "static-data/forBreadCrumb";
import { CustomTabs } from "styling/TabsStyling";

function ChequeRequest() {
  const [key, setKey] = useState<any>("new_cheque_Request");

  return (
    <Container>
      <StaticBar
        pageTitle={chequeRequestPageTitle}
        breadCrumbData={forChequeRequest}
      />

      <CustomTabs
        id="cheque-request"
        activeKey={key}
        onSelect={(key: any) => setKey(key)}
      >
        <Tab eventKey="new_cheque_Request" title="Request New Cheque">
          <Row>
            <Col sm={12} lg={6}>
              <RequestNewCheque />
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="block_cheque" title="Block Cheque">
          <Row>
            <Col sm={12} lg={6}>
              <BlockChequeBook />
            </Col>
          </Row>
        </Tab>
      </CustomTabs>
    </Container>
  );
}

export default ChequeRequest;

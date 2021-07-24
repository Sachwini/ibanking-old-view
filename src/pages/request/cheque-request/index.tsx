import { Col, Container, Row } from "react-bootstrap";
import BlockChequeBook from "./BlockChequeBook";
import RequestNewCheque from "./RequestNewCheque";
import StaticBar from "components/StaticBar";
import { chequeRequestPageTitle } from "static-data/forPageTitle";
import { forChequeRequest } from "static-data/forBreadCrumb";

function ChequeRequest() {
  return (
    <Container fluid className="px-3 pr-5">
      <StaticBar
        pageTitle={chequeRequestPageTitle}
        breadCrumbData={forChequeRequest}
      />

      <Row>
        <Col sm={12} lg={6}>
          <RequestNewCheque />
        </Col>
        <Col sm={12} lg={6}>
          <BlockChequeBook />
        </Col>
      </Row>
    </Container>
  );
}

export default ChequeRequest;

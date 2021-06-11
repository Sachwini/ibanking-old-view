import { PageTitle } from "components/page-title";
import { Col, Container, Row } from "react-bootstrap";
import BlockChequeBook from "./BlockChequeBook";
import RequestNewCheque from "./RequestNewCheque";

function ChequeRequest() {
  return (
    <Container>
      <PageTitle title="Cheque Request" />
      <hr />
      <Row>
        <Col sm={12} md={6}>
          <RequestNewCheque />
        </Col>
        <Col sm={12} md={6}>
          <BlockChequeBook />
        </Col>
      </Row>
    </Container>
  );
}

export default ChequeRequest;

import { PageTitle } from "components/page-title";
import { IBFTLimit } from "user/transfer/IBFTLimit";
import { Col, Container, Row } from "react-bootstrap";
import BillPaymentTransfer from "./BillPaymentTransfer";

const Payment = () => {
  return (
    <Container>
      <PageTitle
        title="Bill Payment Transfer"
        subTitle="transfer fund to the other account"
      />

      <Row>
        <Col sm={12} md={6}>
          <BillPaymentTransfer />
        </Col>
        <Col sm={12} md={6}>
          <IBFTLimit />
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;

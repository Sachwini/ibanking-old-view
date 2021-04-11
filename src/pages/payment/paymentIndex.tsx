import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { PageTitle } from "components/page-title/index";
import BillPaymentLog from "./billPaymentLog";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function Transfer() {
  return (
    <div>
      <div>
        <Container>
          <div className="d-flex flex-wrap mt-1">
            <IoChevronBackCircleOutline size="40px" />
            <PageTitle title="Reports" subTitle="View your account reports" />
          </div>
          <Tabs defaultActiveKey="bpl" id="uncontrolled-tab-example">
            <Tab eventKey="bpl" title="Bill Payment Log">
              <Row>
                <Col sm={12} md={6}>
                  <BillPaymentLog />
                </Col>
                <Col sm={12} md={6}></Col>
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

import { PageTitle } from "components/page-title";
import { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import BlockChequeBook from "./BlockChequeBook";
import RequestNewCheque from "./RequestNewCheque";
import "./index.css";

const ActiveStyle = {
  color: "#f58228",
  borderBottom: "3px solid #f58228",
  paddingBottom: "8px",
  letterSpacing: "1px",
};

const inActiveStyle = {
  ...ActiveStyle,
  background: "transparent",
  borderBottom: "",
  color: "inherit",
};

function ChequeRequest() {
  const [key, setKey] = useState<string | boolean | null>("cheque_Request");

  return (
    <div>
      <Container>
        <PageTitle
          title="Cheque inquiry"
          subTitle="Request for new cheque book or block the current one"
        />

        <Tab.Container activeKey={key} onSelect={(key) => setKey(key)}>
          <div className="custom__tab">
            <Nav.Link
              eventKey="cheque_Request"
              style={key === "cheque_Request" ? ActiveStyle : inActiveStyle}
            >
              <span className="tab__text">Cheque Request</span>
            </Nav.Link>

            <Nav.Link
              eventKey="block"
              style={key === "block" ? ActiveStyle : inActiveStyle}
            >
              <span className="tab__text">Block Cheque</span>
            </Nav.Link>
          </div>

          <Tab.Content style={{ padding: "20px", paddingLeft: "0" }}>
            <Tab.Pane eventKey="cheque_Request">
              <Row>
                <Col sm={12} md={6}>
                  <RequestNewCheque />
                </Col>
                <Col sm={12} md={6}></Col>
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="block">
              <Row>
                <Col sm={12} md={6}>
                  <BlockChequeBook />
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
  // return (
  //   <Container>
  //     <PageTitle
  //       title="Cheque inquiry"
  //       subTitle="Request for new cheque book or block the current one"
  //     />
  //     <hr />
  //     <Row>
  //       <Col sm={12} md={6}>
  //         <RequestNewCheque />
  //       </Col>
  //       <Col sm={12} md={6}>
  //         <BlockChequeBook />
  //       </Col>
  //     </Row>
  //   </Container>
  // );
}

export default ChequeRequest;

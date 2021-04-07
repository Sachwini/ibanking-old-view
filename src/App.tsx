import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import FundTransferLimitDetail from "./pages/fundTransferLimitDetail";
import ChangePassword from "./pages/changePassword";
import FundTransfer from "./pages/fundTransfer";
import BillPaymentTransfer from "./pages/billPaymentTransfer";

function App() {
  return (
    <>
    <div className="App">
      <Container fluid>
        <Row>
          <Col sm={2} style={{ backgroundColor: "green" }}>
            sidebar
          </Col>
          <Col sm={10} style={{ backgroundColor: "red" }}>
            container
          </Col>
        </Row>
      </Container>
      </div>
      <FundTransfer/>
      <FundTransferLimitDetail/>
      <ChangePassword />
      <BillPaymentTransfer/>
      </>
  );
}

export default App;

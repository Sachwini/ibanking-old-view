import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import { Container, Navbar, Row, Col } from "react-bootstrap";
import FundTransferLimitDetail from "./pages/fundTransferLimitDetail";
import ChangePassword from "./pages/changePassword";
import FundTransfer from "./pages/fundTransfer";
import BillPaymentTransfer from "./pages/billPaymentTransfer";
=======
import Dashboard from "./pages/dashboard";
>>>>>>> 462cbb7be197ebcb16ee943ae06d34c545b2250f

function App() {
  return (
    <>
<<<<<<< HEAD
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
=======
      <Dashboard />
    </>
>>>>>>> 462cbb7be197ebcb16ee943ae06d34c545b2250f
  );
}

export default App;

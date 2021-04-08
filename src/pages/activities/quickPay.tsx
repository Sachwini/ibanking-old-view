import { Card, Container } from "react-bootstrap";
import { GrDocumentTransfer } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import "./image.css";

function QuickPay() {
  return (
    <div>
      <div>
        <Container fluid className="m-auto d-flex flex-wrap">
          <Card className="cardPayItem m-2">
            <Card.Body className="d-flex justify-content-center align-items-center iconType">
              <GrDocumentTransfer size="30px" />
            </Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center">
              <span className="cardText">Quick Transfer</span>
            </Card.Text>
          </Card>
          <Card className="cardPayItem m-2">
            <Card.Body className="d-flex justify-content-center align-items-center iconType">
              <FcMoneyTransfer size="30px" />
            </Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center">
              <span className="cardText">Quick Pay</span>
            </Card.Text>
          </Card>

          <Card className="cardPayItem m-2">
            <Card.Body className="d-flex justify-content-center align-items-center iconType">
              <FcQuestions size="30px" />
            </Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center">
              <span className="cardText">E-SEWA</span>
            </Card.Text>
          </Card>
        </Container>
      </div>
      <div>
        <Container fluid className="m-auto d-flex flex-wrap">
          <Card className="cardPayItem m-2">
            <Card.Body className="d-flex justify-content-center align-items-center iconType">
              <FcQuestions size="30px" />
            </Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center">
              <span className="cardText"></span>
            </Card.Text>
          </Card>

          <Card className="cardPayItem m-2">
            <Card.Body className="d-flex justify-content-center align-items-center iconType">
              <FcQuestions size="30px" />
            </Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center">
              <span className="cardText">Ncell Topup</span>
            </Card.Text>
          </Card>

          <Card className="cardPayItem m-2">
            <Card.Body className="d-flex justify-content-center align-items-center iconType">
              <FcQuestions size="30px" />
            </Card.Body>
            <Card.Text className="d-flex justify-content-center align-items-center">
              <span className="cardText"></span>
            </Card.Text>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default QuickPay;

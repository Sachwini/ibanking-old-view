import { Card } from "react-bootstrap";
import { GrDocumentTransfer } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";
import { FcQuestions } from "react-icons/fc";
import "./activities.css";

function QuickPay() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
      className="mt-1"
    >
      <Card className="card__ctrl">
        <Card.Body className="cardBody__ctrl">
          <Card.Title>
            <GrDocumentTransfer size="30px" />
          </Card.Title>
          <Card.Text className="cardText">Quick Transfer</Card.Text>
        </Card.Body>
      </Card>
      <Card className="card__ctrl">
        <Card.Body className="cardBody__ctrl">
          <Card.Title>
            <FcMoneyTransfer size="30px" />
          </Card.Title>
          <Card.Text className="cardText">Quick Pay</Card.Text>
        </Card.Body>
      </Card>
      <Card className="card__ctrl">
        <Card.Body className="cardBody__ctrl">
          <Card.Title>
            <FcQuestions size="30px" />
          </Card.Title>
          <Card.Text className="cardText">E-SEWA</Card.Text>
        </Card.Body>
      </Card>
      <Card className="card__ctrl">
        <Card.Body className="cardBody__ctrl">
          <Card.Title>
            <FcQuestions size="30px" />
          </Card.Title>
          <Card.Text className="cardText">NT-TopUp</Card.Text>
        </Card.Body>
      </Card>
      <Card className="card__ctrl">
        <Card.Body className="cardBody__ctrl">
          <Card.Title>
            <FcQuestions size="30px" />
          </Card.Title>
          <Card.Text className="cardText">Ncell-TopUp</Card.Text>
        </Card.Body>
      </Card>

      <Card className="card__ctrl">
        <Card.Body className="cardBody__ctrl">
          <Card.Title>
            <FcQuestions size="30px" />
          </Card.Title>
          <Card.Text className="cardText"></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default QuickPay;

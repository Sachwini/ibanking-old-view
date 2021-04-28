import { Card } from "react-bootstrap";
import { GrDocumentTime } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";
import "./activities.css";

function UpcomingPayment() {
  return (
    <>
      <div className="pl-1 mt-4 mb-2">
        <strong className="activity__title">Upcoming Payment</strong>
      </div>
      <Card className="mb-4">
        <Card.Body style={{ padding: "2rem" }}>
          <div className="card__img">
            <img
              src="./uploads/clock.png"
              alt="upcoming payment"
              height="70px"
              width="70px"
            />
          </div>

          <Card.Title className="card__title">No upcoming payments</Card.Title>
          <Card.Text className="text__ctrl">
            You have not set any upcoming payment recently
          </Card.Text>
          <Card.Text className="card__text text__ctrl pb-3">
            Select option to schedule
          </Card.Text>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <GrDocumentTime size="40px" />
            <FcMoneyTransfer size="40px" />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default UpcomingPayment;

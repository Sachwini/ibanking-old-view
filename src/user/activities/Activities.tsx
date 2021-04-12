import { AiOutlineUser } from "react-icons/ai";
import { Card, ListGroup } from "react-bootstrap";
import "./activities.css";

const Activities = () => {
  return (
    <>
      <div className="pl-1 mt-4 mb-2">
        <strong className="activity__title">Account Activities</strong>
      </div>
      <Card className="mb-4">
        <ListGroup variant="flush">
          <ListGroup.Item className="list__ctrl">
            <div className="activity__icon">
              <AiOutlineUser className="circle-icon" size="3em" color="white" />
            </div>
            <div className="activity__desc">
              this money send to the gopal
              <p className="activity__date">05-APR-2021</p>
            </div>
            <div className="activity__amount">NPR. 200,000000 </div>
          </ListGroup.Item>

          <ListGroup.Item className="list__ctrl">
            <div className="activity__icon">
              <AiOutlineUser className="circle-icon" size="3em" color="white" />
            </div>
            <div className="activity__desc">
              this money send to the gopal
              <p className="activity__date">05-APR-2021</p>
            </div>
            <div className="activity__amount" style={{ color: "red" }}>
              NPR. 200,000000{" "}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default Activities;

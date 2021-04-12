import { Card } from "react-bootstrap";
import { HiUserCircle } from "react-icons/hi";

function Profile() {
  return (
    <div>
      <Card
        style={{ width: "32rem", height: "14rem", backgroundColor: "orange" }}
      >
        <Card.Body>
          <div style={{ display: "flex" }}>
            <HiUserCircle className="circle-icon" />
            <div style={{ paddingLeft: "23px" }}>
              <h4>HAMRO TECHNOLOGY PVT. LTD</h4>
              <h5>04911000579</h5>
              <h5>ODA</h5>
              <h4>NPR. 200,000.00</h4>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;

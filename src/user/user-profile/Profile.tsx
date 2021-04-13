import { Card } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";

const Profile = () => {
  return (
    <Card style={{ backgroundColor: "#ee944fb6", maxWidth: "500px" }}>
      <Card.Body style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        <div style={{ width: "20%" }}>
          <AiOutlineUser className="circle-icon" size="3.3em" color="white" />
        </div>
        <div style={{ width: "80%" }}>
          <Card.Title style={{ fontSize: "18px" }}>
            HAMRO TECHNOLOGY PVT. LTD
          </Card.Title>
          <Card.Text>
            <p className="m-0">04911000579</p>
            <p>ODA</p>
            <h6>NPR. 200,000.00</h6>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Profile;

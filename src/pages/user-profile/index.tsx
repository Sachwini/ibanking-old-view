import { Card, Container } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";

const Profile = () => (
  <Card style={{ backgroundColor: "#ee944fb6", maxWidth: "500px" }}>
    <Card.Body style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: "20%" }}>
        <AiOutlineUser className="circle-icon" size="3.3em" color="white" />
      </div>
      <div style={{ width: "80%" }}>
        <Card.Title style={{ fontSize: "18px" }}>
          HAMRO TECHNOLOGY PVT. LTD
        </Card.Title>
        <Card.Text className="m-0">04911000579</Card.Text>
        <Card.Text>ODA</Card.Text>
        <Card.Text>NPR. 200,000.00</Card.Text>
      </div>
    </Card.Body>
  </Card>
);

const ProfileIndex = () => {
  return (
    <Container fluid>
      <Profile />
    </Container>
  );
};

export default ProfileIndex;

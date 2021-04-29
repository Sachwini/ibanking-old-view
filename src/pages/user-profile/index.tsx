import { Card, Container, ListGroup } from "react-bootstrap";

const Profile = () => {
  return (
    <Container fluid>
      <div> welcome MR. Sachin </div>
      <Card style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default Profile;

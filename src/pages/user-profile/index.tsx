import { PageTitle } from "components/page-title";
import { Card, Col, Container, Row } from "react-bootstrap";

const Profile = () => {
  return (
    <Container fluid>
      <PageTitle title="welcome Nawaraj Jaishi" />
      <Row>
        <Col sm={12} md={6} className="mb-sm-3 mb-md-0">
          <Card>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted fs-larger">
                Personal Details
              </Card.Subtitle>
              <hr className="mt-0" />

              <Card.Text className="m-0">Full Name: Nawaraj jaishi</Card.Text>
              <div className="d-flex">
                Address:
                <div>
                  <Card.Text className="m-0 pl-4">State: SudurPashim</Card.Text>
                  <Card.Text className="m-0 pl-4">District: Bajura</Card.Text>
                  <Card.Text className="m-0 pl-4">
                    Muncipility/VDC: Budhinanda
                  </Card.Text>
                  <Card.Text className="m-0 pl-4">Ward No.: 2</Card.Text>
                  <Card.Text className="m-0 pl-4">City: Kolti</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted fs-larger">
                Contact Details
              </Card.Subtitle>
              <hr className="mt-0" />
              <Card.Text className="mb-1">Phone: 9843750574</Card.Text>
              <Card.Text>Email: nawaraj928@gmail.com</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

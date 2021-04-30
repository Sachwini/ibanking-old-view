import { PageTitle } from "components/page-title";
import { useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useStateValue } from "state-provider/StateProvider";

const Profile = () => {
  // const [userData, setUserData] = useState<string{}>({});
  const [{ customerDetails }, dispatch] = useStateValue();
  console.log("from profile",customerDetails)

  return (
    <Container fluid>
      <PageTitle title={`welcome ${customerDetails?.fullName}`} />
      <Row>
        <Col sm={12} md={6} className="mb-sm-3 mb-md-0">
          <Card>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted fs-larger">
                Personal Details
              </Card.Subtitle>
              {/* <hr className="mt-0" /> */}
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Full Name</th>
                    <td>{customerDetails?.fullName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{customerDetails?.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row">State</th>
                    <td>{customerDetails?.state}</td>
                  </tr>
                  <tr>
                    <th scope="row">Pernament Address</th>
                    <td>{customerDetails?.addressOne}</td>
                  </tr>
                  <tr>
                    <th scope="row">Temporary AddressName</th>
                    <td>{customerDetails?.addressTwo}</td>
                  </tr>
                  <tr>
                    <th scope="row">City</th>
                    <td>{customerDetails?.city}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted fs-larger">
                Contact Details
              </Card.Subtitle>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Phone</th>
                    <td>{customerDetails?.mobileNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>{customerDetails?.email}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

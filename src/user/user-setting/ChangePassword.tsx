import { Button, Card, Form, Container, Col, Row } from "react-bootstrap";
import { PageTitle } from "components/page-title/index";
import { IoChevronBackCircleOutline } from "react-icons/io5";

function ChangePassword() {
  return (
    <Container className="justify-content-center">
      <div className="d-flex flex-wrap mt-1">
        <IoChevronBackCircleOutline size="40px" />
        <PageTitle
          title="Change Password"
          subTitle="Change your current password with a new one"
        />
      </div>
      <div style={{ display: "flex" }}>
        <Row>
          <Col sm={12} md={6}>
            <Card style={{ width: "30rem", marginRight: "10px" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="font-weight-bold">
                      Current Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="current password"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="font-weight-bold">
                      New Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="new password" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="font-weight-bold">
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="confirm password"
                    />
                  </Form.Group>

                  <Button
                    className="btn btn-warning"
                    variant="primary"
                    type="submit"
                    block
                  >
                    Change Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6}>
            <Card style={{ width: "36rem", height: "15rem" }}>
              <Card.Body>
                <div>
                  <ul className="list-unstyled">
                    <li className="font-weight-bold p-2">Password Policy</li>
                    <li>
                      <ul style={{ paddingLeft: "16px" }}>
                        <li>
                          The overall length of password must be greater than 6
                          and less than 15
                        </li>
                        <li>
                          Atleast 1 Number of special characters in password
                        </li>
                        <li>Atleast 1 Number of digits in password</li>
                        <li>
                          Atleast 2 Number of lowercase letters in password
                        </li>
                        <li>
                          Atleast 1 Number of Uppercase letters in password
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ChangePassword;

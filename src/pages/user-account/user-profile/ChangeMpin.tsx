import { Button, Card, Form, Container, Col, Row } from "react-bootstrap";
import { PageTitle } from "components/page-title/index";
import { useState } from "react";
import { post } from "services/AjaxService";
import { apiResponse } from "models/apiResponse";
import { toast, ToastContainer } from "react-toastify";

function ChangeMpin() {
  const [currentMpin, setCurrentMpin] = useState<string>("");
  const [newMpin, setNewMpin] = useState<string>("");
  const [confirmMpin, setConfirmMpin] = useState<string>("");
  const [errorResponse, setErrorResponse] = useState({
    message: "",
    password: "",
    repassword: "",
    oldPassword: "",
  });

  const handleReset = () => {
    setCurrentMpin("");
    setNewMpin("");
    setConfirmMpin("");
    setErrorResponse({
      message: "",
      password: "",
      repassword: "",
      oldPassword: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await post<apiResponse<any>>(
        `api/changepin?newmPin=${newMpin}&remPin=${confirmMpin}&oldmPin=${currentMpin}`,
        ""
      );
      if (res) {
        toast.success("Your Mpin Changed Successfully");
        handleReset();
      }
    } catch (error) {
      setErrorResponse({
        message: error.response.data.message,
        password: error.response.data.details.password,
        repassword: error.response.data.details.repassword,
        oldPassword: error.response.data.details.oldPassword,
      });
    }
  };

  return (
    <Container fluid className="justify-content-center pt-4">
      <div className="d-flex flex-wrap mt-1">
        <PageTitle
          title="Change Mpin"
          subTitle="Change your current mpin with a new one"
        />
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <Row>
          <Col sm={12} md={6}>
            <Card
              style={{ width: "30rem", marginRight: "10px" }}
              className="card_Shadow"
            >
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="font-weight-bold">
                      Current mpin
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="current mpin"
                      name="currentMpin"
                      value={currentMpin}
                      required
                      onChange={(e) => setCurrentMpin(e.target.value)}
                      autoComplete="off"
                    />
                    {errorResponse?.oldPassword ? (
                      <Form.Text className="text-danger">
                        {errorResponse?.oldPassword}
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="font-weight-bold">
                      New mpin
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="new mpin"
                      name="newMpin"
                      value={newMpin}
                      onChange={(e) => setNewMpin(e.target.value)}
                      autoComplete="off"
                    />
                    {errorResponse?.password ? (
                      <Form.Text className="text-danger">
                        {errorResponse?.password}
                      </Form.Text>
                    ) : (
                      ""
                    )}
                    {!errorResponse?.password ? (
                      <Form.Text className="text-warning">
                        Pin number Should Be At least 4 digit
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="font-weight-bold">
                      Confirm mpin
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="confirm mpin"
                      name="confirmMpin"
                      value={confirmMpin}
                      onChange={(e) => setConfirmMpin(e.target.value)}
                      autoComplete="off"
                    />
                    {errorResponse?.repassword ? (
                      <Form.Text className="text-danger">
                        {errorResponse?.repassword}
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Button
                    className="btn btn-warning"
                    variant="primary"
                    type="submit"
                  >
                    Confirm
                  </Button>
                  <Button
                    className="btn btn-light"
                    style={{ marginLeft: "20px" }}
                    variant="secondary"
                    onClick={handleReset}
                  >
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </Container>
  );
}

export default ChangeMpin;

import { Card, Col, Row } from "react-bootstrap";
import { GoFileSubmodule } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import "./Account.css";
import { useStateValue } from "state-provider/StateProvider";
import { Loader } from "pages/static/Loader";
import { Link } from "react-router-dom";

const AccountView = () => {
  const [{ customerDetails, switchAccount }] = useStateValue();
  return (
    <>
      {!customerDetails?.accountDetail ? (
        <Loader />
      ) : (
        <Card className="mb-3 w-100">
          <Card.Body className="w-100 d-flex ">
            <Row className="custom__row">
              <Col sm={12} md={3} className="custom__col">
                <Row className="p-0 w-100">
                  <Col sm={12} md={3}>
                    <GoFileSubmodule color="orange" size="40px" />
                  </Col>
                  <Col sm={12} md={9}>
                    <p>
                      {
                        customerDetails?.accountDetail[switchAccount][
                          "accountType"
                        ]
                      }{" "}
                      Account
                    </p>
                    <p>
                      {
                        customerDetails?.accountDetail[switchAccount][
                          "accountNumber"
                        ]
                      }
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={6} className="custom__col">
                <Row className="w-100">
                  <Col sm={12} md={6}>
                    <p>Available Balance</p>
                    <p>
                      <strong className="npr">NPR.</strong>{" "}
                      {
                        customerDetails?.accountDetail[switchAccount][
                          "availableBalance"
                        ]
                      }
                    </p>
                  </Col>
                  <Col sm={12} md={6}>
                    <p>Acutal Balance</p>
                    <p>
                      <strong className="npr">NPR.</strong>{" "}
                      {
                        customerDetails?.accountDetail[switchAccount][
                          "availableBalance"
                        ]
                      }
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={3} className="justify-content-end px-0">
                <CgNotes size="23px" />
                <strong className="iconSpacing ">
                  <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to="/statement"
                  >
                    Statment
                  </Link>
                </strong>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default AccountView;

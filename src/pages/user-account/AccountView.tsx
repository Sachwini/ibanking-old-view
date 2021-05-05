import { Card, Col, Row } from "react-bootstrap";
import { GoFileSubmodule } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { IoInformationCircleOutline } from "react-icons/io5";
import "./Account.css";
import { useStateValue } from "state-provider/StateProvider";
import { Loader } from "pages/static/Loader";

const AccountView = () => {
  const [{ customerDetails }, dispatch] = useStateValue();
  return (
    <>
      {!customerDetails?.accountDetail ? (
        <span>
          <Loader />
        </span>
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
                      {customerDetails?.accountDetail[0]["accountType"]} Account
                    </p>
                    <p>{customerDetails?.accountDetail[0]["accountNumber"]}</p>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={5} className="custom__col">
                <Row className="w-100">
                  <Col sm={12} md={6}>
                    <p>Available Balance</p>
                    <p>
                      <strong className="npr">NPR.</strong>{" "}
                      {customerDetails?.accountDetail[0]["availableBalance"]}
                    </p>
                  </Col>
                  <Col sm={12} md={6}>
                    <p>Acutal Balance</p>
                    <p>
                      <strong className="npr">NPR.</strong>{" "}
                      {customerDetails?.accountDetail[0]["availableBalance"]}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} md={4} className="justify-content-end px-0">
                <Row className="w-100 justify-content-end">
                  <Col sm={12} md={6} className="p-0 align-text-center">
                    <CgNotes size="23px" />
                    <strong className="iconSpacing ">Statment</strong>
                  </Col>
                  <Col sm={12} md={6} className="p-0">
                    <IoInformationCircleOutline size="26px" />
                    <strong className="iconSpacing">Detail</strong>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default AccountView;

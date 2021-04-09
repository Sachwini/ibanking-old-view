import { AccountName, PageTitle } from "components/page-title";
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { CgNotes } from "react-icons/cg";
import { IoInformationCircleOutline } from "react-icons/io5";
import "./Account.css";
import { GoFileSubmodule } from "react-icons/go";

function Account() {
  return (
    <Container>
      <PageTitle title="Account" subTitle="manage and view your account" />
      <AccountName name="hamro technology pvt. ltd" accountCode={44356} />
      <Card className="cardBackground">
        <Card.Body className=" d-flex ">
          <Row className="custom__row">
            <Col sm={3} className="custom__col">
              <Row className="p-0 w-100">
                <Col lg={3} className="p-0">
                  <GoFileSubmodule
                    color="orange"
                    size="52px"
                    // className="folderIcon"
                  />
                </Col>
                <Col>
                  <p>ODA Account</p>
                  <p>04911000579</p>
                </Col>
              </Row>
            </Col>
            <Col sm={6} className="custom__col">
              <Row className="w-100">
                <Col>
                  <div>Usable Balance</div>
                  <div>NPR. 200,000.00</div>
                </Col>
                <Col>
                  <div>Acutal Balance</div>
                  <div>NPR.200,000.00</div>
                </Col>
              </Row>
            </Col>
            <Col sm={3} className="justify-content-end">
              <Row>
                <Col>
                  <CgNotes size="23px" />
                  <span className="iconSpacing">Statment</span>
                </Col>
                <Col>
                  <IoInformationCircleOutline size="26px" />
                  <span className="iconSpacing">Detail</span>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Card.Text>
            <div className="row headerText">
              <div className="col">ODA Account</div>
              <div className="col">Usable Balance</div>
              <div className="col">Acutal Balance</div>
              <div className="col">
                <CgNotes size="23px" />
                <span className="iconSpacing">Statment</span>
              </div>
              <div className="col headerText">
                <div className="iconSpacing">
                  <IoInformationCircleOutline size="26px" />
                  <span className="iconSpacing">Detail</span>
                </div>
              </div>
            </div>
            <div className="row rowText">
              <div className="col">04911000579</div>
              <div className="col">
                <span className="default">NPR.</span>200,000.00
              </div>
              <div className="col">
                <span className="default">NPR.</span>200,000.00
              </div>
              <div className="col"></div>
              <div className="col"></div>
            </div>
          </Card.Text> */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Account;

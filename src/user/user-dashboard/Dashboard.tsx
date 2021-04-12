import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";
import { Col, Container, Row } from "react-bootstrap";
import Profile from "../activities/Profile";
import QuickPay from "../activities/QuickPay";
import UpcomingPayment from "../activities/UpComingPayment";
import FixedDeposit from "../activities/FixedDeposit";
import { FcSynchronize } from "react-icons/fc";
import Activities from "user/activities/Activities";

const Dashboard = (props: RouteComponentProps) => {
  return (
    <Container fluid>
      <Row className="w-100">
        <Col md={12} lg={8}>
          {/* <Row>
            <Col md={12} lg={6}>
              <p className="d-flex justify-content-end">
                <FcSynchronize size="24px" />
                <strong className="px-2">Switch Account</strong>
              </p>
            </Col>
            <Col md={12} lg={6}>
              <PageTitle title="Quick pay" />
            </Col>
          </Row> */}
          <Row>
            <Col md={12} lg={6}>
              <p className="d-flex justify-content-end">
                <FcSynchronize size="24px" />
                <strong className="px-2">Switch Account</strong>
              </p>
              <Profile />
            </Col>
            <Col md={12} lg={6} className="p-0 my-sm-4 my-md-0 ">
              <strong className="mb-3 pl-3">Quick Pay</strong>
              <QuickPay />
            </Col>
          </Row>
        </Col>

        <Col md={12} lg={4}>
          <PageTitle title="Request" />
          <FixedDeposit />
          <Activities />
          <UpcomingPayment />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

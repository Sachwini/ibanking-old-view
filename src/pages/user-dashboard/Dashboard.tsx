import { PageTitle } from "components/page-title/index";
import { Col, Container, Row } from "react-bootstrap";
import QuickPay from "pages/activities/QuickPay";
import UpcomingPayment from "pages/activities/UpComingPayment";
import FixedDeposit from "pages/activities/FixedDeposit";
import { FcSynchronize } from "react-icons/fc";
import Activities from "pages/activities/Activities";
import LineChart from "pages/activities/LineChart";
import ProfileCard from "pages/user-account/user-profile/ProfileCard";

const Dashboard = () => {
  return (
    <Container fluid>
      <PageTitle title="Dashboard" />
      <Row className="w-100">
        <Col md={12} lg={8}>
          <Row>
            <Col md={12} lg={6}>
              <p className="d-flex justify-content-end">
                <FcSynchronize size="24px" />
                <strong className="px-2">Switch Account</strong>
              </p>
              <ProfileCard />
            </Col>
            <Col md={12} lg={6} className="p-0 my-sm-4 my-md-0 ">
              <strong className="mb-3 pl-3">Quick Pay</strong>
              <QuickPay />
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mt-3">
              <LineChart />
            </Col>
          </Row>
        </Col>

        <Col md={12} lg={4} className="w-100">
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

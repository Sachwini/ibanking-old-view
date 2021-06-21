import { Col, Container, OverlayTrigger, Popover, Row } from "react-bootstrap";
// import QuickPay from "pages/activities/QuickPay";
// import UpcomingPayment from "pages/activities/UpComingPayment";
// import FixedDeposit from "pages/activities/FixedDeposit";
import LineChart from "pages/user-dashboard/LineChart";
import ProfileCard from "pages/user-dashboard/UserProfileCard";
import { useStateValue } from "state-provider/StateProvider";
import StaticBar from "components/StaticBar";
import { UserDetect } from "styling/common/PageTitleStyling";
import { forDashboard } from "static-data/forBreadCrumb";
import MiniStatementCard from "./MiniStatementCard";
import { useState } from "react";

const Dashboard = () => {
  const [{ customerDetails }, dispatch] = useStateValue();
  const [salutation, setSalutation] = useState<string>("");

  if (customerDetails! == "") {
    if (customerDetails?.gender?.toLowerCase() === "male") {
      setSalutation("Mr.");
    }
    setSalutation("Ms.");
  }

  const pageTitle = {
    title: "Dashboard",
    subTitle: (
      <span>
        Welcome Mr./Ms.
        <UserDetect>{customerDetails.fullName}</UserDetect>
        in mBank i-Banking System
      </span>
    ),
  };

  return (
    <Container fluid>
      <StaticBar pageTitle={pageTitle} breadCrumbData={forDashboard} />

      <Row className="w-100">
        <Col md={12} lg={7}>
          <LineChart />
        </Col>

        <Col md={12} lg={5} className="w-100 pr-0">
          <ProfileCard />
          <MiniStatementCard />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

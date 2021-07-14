import { Col, Container, Row } from "react-bootstrap";
import LineChart from "pages/user-dashboard/LineChart";
import ProfileCard from "pages/user-dashboard/UserProfileCard";
import { useStateValue } from "state-provider/StateProvider";
import StaticBar from "components/StaticBar";
import { UserDetect } from "styling/common/PageTitleStyling";
import { forDashboard } from "static-data/forBreadCrumb";
import MiniStatementCard from "./MiniStatementCard";
import { useRecoilValue } from "recoil";
import { getName_Salutation } from "state-provider/globalUserData";

const Dashboard = () => {
  const getSalutation = useRecoilValue(getName_Salutation);

  const pageTitle = {
    title: "Dashboard",
    subTitle: (
      <span>
        Welcome
        <span className="pl-1">{getSalutation.salutation}</span>
        <UserDetect>{getSalutation.name}</UserDetect>
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

import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";
import { Container } from "react-bootstrap";
import ChangePassword from "./user-setting/ChangePassword";
import Profile from "./activities/Profile";
import QuickPay from "./activities/QuickPay";
import UpcomingPayment from "./activities/UpComingPayment";
import FixedDeposit from "./activities/FixedDeposit";

const Dashboard = (props: RouteComponentProps) => {
  return (
    <Container>
      <PageTitle title="Custome Tabs" />
      <ChangePassword />
      <FixedDeposit />
      <Profile />
      <QuickPay />
      <UpcomingPayment />
    </Container>
  );
};

export default Dashboard;

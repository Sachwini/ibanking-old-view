import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";
import { Container } from "react-bootstrap";
import ChangePassword from "./user-setting/ChangePassword";
import Profile from "./activities/Profile";
import QuickPay from "./activities/QuickPay";
import UpcomingPayment from "./activities/UpComingPayment";
import FixedDeposit from "./activities/FixedDeposit";
import LineChart from "./activities/LineChart";

const Dashboard = (props: RouteComponentProps) => {
  return (
    <Container>
      <PageTitle title="Custome Tabs" />
      <ChangePassword />
      <FixedDeposit />
      <Profile />
      <QuickPay />
      <UpcomingPayment />
      <div style={{display:"flex",justifyContent:"center", width: "720px" }}>  
        <LineChart />
      </div>
      
    </Container> 
  );
};

export default Dashboard;

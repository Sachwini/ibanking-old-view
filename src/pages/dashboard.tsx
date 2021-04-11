import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";
import Account from "../pages/Account"
import BillPaymentLog from "../pages/payment/billPaymentLog";
import {Container} from "react-bootstrap"

const Dashboard = (props: RouteComponentProps) => {
  return (
    <Container fluid>
      <PageTitle title="Dashboard" /> 
      <Account />
      <BillPaymentLog /> 
      </Container>
  );
};

export default Dashboard;

import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";
import Account from "./Account";
import BillPaymentLog from "./BillPaymentLog";

const Dashboard = (props: RouteComponentProps) => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <Account />
      <BillPaymentLog />
    </div>
  );
};

export default Dashboard;

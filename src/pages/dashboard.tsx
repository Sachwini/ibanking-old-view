import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";
import Account from "../pages/Account"
import BillPaymentLog from "../pages/billPaymentLog";

const Dashboard = (props: RouteComponentProps) => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <Account />
      <BillPaymentLog/>
    </div>
  );
};

export default Dashboard;

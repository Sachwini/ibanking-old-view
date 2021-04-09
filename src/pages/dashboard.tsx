import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";
import Account from "../pages/Account"

const Dashboard = (props: RouteComponentProps) => {
  return (
    <div>
      <PageTitle title="Dashboard" />
      <p>hehehe </p>
      <Account />
    </div>
  );
};

export default Dashboard;

import { RouteComponentProps } from "react-router";
import { PageTitle } from "components/page-title/index";

const Dashboard = (props: RouteComponentProps) => {
  return (
    <div>
      <PageTitle title="Dashboard" />
    </div>
  );
};

export default Dashboard;

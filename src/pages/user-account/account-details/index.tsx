import { AccountName } from "components/PageTitle";
import StaticBar from "components/StaticBar";
import { Container } from "react-bootstrap";
import { useStateValue } from "state-provider/StateProvider";
import { forUserAccountDetails } from "static-data/forBreadCrumb";
import { accountDetailsPageTitle } from "static-data/forPageTitle";
import AccountView from "./AccountView";

const Account = () => {
  const [{ customerDetails, switchAccount }] = useStateValue();
  return (
    <Container>
      <StaticBar
        pageTitle={accountDetailsPageTitle}
        breadCrumbData={forUserAccountDetails}
      />
      <AccountName
        name={customerDetails?.fullName}
        accountCode={
          !customerDetails?.accountDetail
            ? ""
            : customerDetails?.accountDetail[switchAccount]["clientCode"]
        }
      />

      <AccountView />
    </Container>
  );
};

export default Account;

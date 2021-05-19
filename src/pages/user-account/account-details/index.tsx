import { AccountName, PageTitle } from "components/page-title";
import { Container } from "react-bootstrap";
import { useStateValue } from "state-provider/StateProvider";
import AccountView from "./AccountView";

function Account() {
  const [{ customerDetails }] = useStateValue();
  return (
    <Container>
      <PageTitle title="Account" subTitle="manage and view your account" />
      <AccountName
        name={customerDetails?.fullName}
        accountCode={
          !customerDetails?.accountDetail
            ? ""
            : customerDetails?.accountDetail[0]["clientCode"]
        }
      />

      <AccountView />
    </Container>
  );
}

export default Account;

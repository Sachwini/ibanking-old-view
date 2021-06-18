import { AccountName, PageTitle } from "components/PageTitle";
import { Container } from "react-bootstrap";
import { useStateValue } from "state-provider/StateProvider";
import AccountView from "./AccountView";

function Account() {
  const [{ customerDetails, switchAccount }] = useStateValue();
  return (
    <Container>
      <PageTitle title="Account" subTitle="Manage and view your account" />
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
}

export default Account;

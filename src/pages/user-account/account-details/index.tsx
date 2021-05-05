import { AccountName, PageTitle } from "components/page-title";
import { Container } from "react-bootstrap";
import AccountView from "./AccountView";

function Account() {
  return (
    <Container>
      <PageTitle title="Account" subTitle="manage and view your account" />
      <AccountName name="hamro technology pvt. ltd" accountCode={44356} />

      <AccountView />
      <AccountView />
    </Container>
  );
}

export default Account;

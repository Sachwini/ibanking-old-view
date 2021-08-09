import StaticBar from "components/StaticBar";
import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { forUserAccountDetails } from "static-data/forBreadCrumb";
import { accountDetailsPageTitle } from "static-data/forPageTitle";
import PersonalDetailCard from "./PersonalDetailCard";
import UserAccountDetailCard from "./UserAccountDetailCard";
import UserBankDetailCard from "./UserBankDetailCard";

const UserProfile = () => {
  const [key, setKey] = useState("personal_details");
  return (
    <Container>
      <StaticBar
        pageTitle={accountDetailsPageTitle}
        breadCrumbData={forUserAccountDetails}
      />

      <Tabs id="user-profile" activeKey={key} onSelect={(k: any) => setKey(k)}>
        <Tab eventKey="personal_details" title="Personal Details">
          <PersonalDetailCard />
        </Tab>
        <Tab eventKey="bak_details" title="Bank Details">
          <UserBankDetailCard />
        </Tab>
        <Tab eventKey="account_details" title="Account Details">
          <UserAccountDetailCard />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserProfile;

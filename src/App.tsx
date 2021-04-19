import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout2 from "./components/static/Layout2";
import "react-bootstrap-typeahead/css/Typeahead.css";

function App() {
  const Dashboard = React.lazy(() => import("./user/user-dashboard/Dashboard"));
  const FundTransfer = React.lazy(() => import("./user/transfer"));
  const ConfigureService = React.lazy(
    () => import("./user/user-setting/ConfigureService")
  );
  const Account = React.lazy(() => import("./user/user-account/Account"));
  const Payment = React.lazy(() => import("./user/payment/index"));
  const UserProfile = React.lazy(
    () => import("./user/user-profile/ProfileIndex")
  );
  const Transfer = React.lazy(() => import("./user/payment/paymentIndex"));
  const ChangePassword = React.lazy(
    () => import("./user/user-setting/ChangePassword")
  );

  return (
    <DefaultLayout2>
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/fund-transfer" component={FundTransfer} />
          <Route path="/service-config" component={ConfigureService} />
          <Route path="/account" component={Account} />
          <Route path="/payment" component={Payment} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/paymentLog" component={Transfer} />
        </React.Suspense>
      </SwitchWithCatch>
    </DefaultLayout2>
  );
}

export default App;

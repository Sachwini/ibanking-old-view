import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout2 from "./components/static/Layout2";

function App() {
  /* ----------For Default Dashboard Import------------------- */
  const Dashboard = React.lazy(() => import("./user/user-dashboard/Dashboard"));

  /* ----------For Account Import--------------------- */
  const Account = React.lazy(() => import("./user/user-account/Account"));
  const UserProfile = React.lazy(
    () => import("./user/user-profile/ProfileIndex")
  );

  /* ----------For Fund Management Import--------------------- */

  /* ----------For Payment Import--------------------- */
  const FundTransfer = React.lazy(() => import("./user/transfer"));

  /* ----------For request Import--------------------- */

  /* ----------For Setting Import--------------------- */
  const ConfigureService = React.lazy(
    () => import("./user/user-setting/ConfigureService")
  );

  /* ----------For History Log Import--------------------- */
  const Activities = React.lazy(() => import("user/activities/Activities"));

  return (
    <DefaultLayout2>
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/" component={Dashboard} />

          {/* ---------- For Account Routing--------------------- */}
          <Route path="/account/user-profile" component={UserProfile} />
          <Route path="/account/details" component={Account} />

          {/* ---------- For Fund Management Routing--------------------- */}

          {/* ---------- For Payment Routing--------------------- */}
          <Route exact path="/payment/fund-transfer" component={FundTransfer} />

          {/* ---------- For Request Routing--------------------- */}

          {/* ---------- For Setting Routing--------------------- */}
          <Route path="/setting/service-config" component={ConfigureService} />

          {/* ---------- For history Logs Routing--------------------- */}
          <Route path="/activity/log" component={Activities} />
        </React.Suspense>
      </SwitchWithCatch>
    </DefaultLayout2>
  );
}

export default App;

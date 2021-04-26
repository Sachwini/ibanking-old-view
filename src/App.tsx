import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout2 from "./components/static/Layout2";

function App() {
  const Login = React.lazy(() => import("./components/Login"));
  /* ----------For Default Dashboard Import------------------- */
  const Dashboard = React.lazy(() => import("./user/user-dashboard/Dashboard"));

  /* ----------For Account Import--------------------- */
  const Account = React.lazy(() => import("./user/user-account/Account"));
  const UserProfile = React.lazy(
    () => import("user/user-account/user-profile/ProfileIndex")
  );

  /* ----------For Fund Management Import--------------------- */

  /* ----------For Payment Import--------------------- */
  const Transfer = React.lazy(() => import("user/payment/fund-transfer"));
  const BulkPayment = React.lazy(
    () => import("user/payment/bulk-payment/BulkPayment")
  );
  const VendorPayment = React.lazy(
    () => import("user/payment/vendor-payment/VendorPayment")
  );

  /* ----------For request Import--------------------- */

  /* ----------For Setting Import--------------------- */
  const ConfigureService = React.lazy(
    () => import("user/user-setting/service-config/ConfigureService")
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
          <Route exact path="/payment/fund-transfer" component={Transfer} />
          <Route exact path="/payment/bulk-payment" component={BulkPayment} />
          <Route
            exact
            path="/payment/vendor-payment"
            component={VendorPayment}
          />

          {/* ---------- For Request Routing--------------------- */}

          {/* ---------- For Setting Routing--------------------- */}
          <Route path="/setting/service-config" component={ConfigureService} />

          {/* ---------- For history Logs Routing--------------------- */}
          <Route path="/activity/log" component={Activities} />
          <Route exact path='/login' render={(props: any) => {
            document.title = "Login"
            return <Login {...props}/>
          }}/>
        </React.Suspense>
      </SwitchWithCatch>
    </DefaultLayout2>
  );
}

export default App;

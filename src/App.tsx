import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout from "./components/static/Layout";
import { theme } from "components/styling/ThemeControl";
import { ThemeProvider } from "styled-components";
import { useStateValue } from "components/state-provider/StateProvider";
import Login from "./components/Login";

function App() {
  const [{ isLogin }] = useStateValue();
  /* ----------For Default Dashboard Import------------------- */
  const Dashboard = React.lazy(() => import("./user/user-dashboard/Dashboard"));

  /* ----------For Account Import--------------------- */
  const Account = React.lazy(() => import("./user/user-account/Account"));
  const UserProfile = React.lazy(() => import("pages/user-profile"));

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
  const ThemeSetting = React.lazy(
    () => import("user/user-setting/theme-setting/index")
  );

  /* ----------For History Log Import--------------------- */
  const Activities = React.lazy(() => import("user/activities/Activities"));

  console.log("loggedIn: " + isLogin);

  return (
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <SwitchWithCatch>
          <React.Suspense fallback={<Loader />}>
            <Route exact path="/dashboard" component={Dashboard} />

            {/* ---------- For Account Routing--------------------- */}
            <Route path="/account/user-profile" component={UserProfile} />
            <Route path="/account/account-details" component={Account} />

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
            <Route
              exact
              path="/setting/configure-service"
              component={ConfigureService}
            />
            <Route
              exact
              path="/setting/configure-theme"
              component={ThemeSetting}
            />

            {/* ---------- For history Logs Routing--------------------- */}
            <Route path="/activity-log/logs" component={Activities} />
          </React.Suspense>
        </SwitchWithCatch>
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default App;

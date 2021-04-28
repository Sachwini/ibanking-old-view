import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "pages/static/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout from "pages/static/Layout";
import { theme } from "styling/ThemeControl";
import { ThemeProvider } from "styled-components";
import { useStateValue } from "state-provider/StateProvider";
// import Login from "./components/Login";

function App() {
  const [{ isLogin }] = useStateValue();
  /* ----------For Default Dashboard Import------------------- */
  // const Login = React.lazy(() => import("./components/Login"));
  const Dashboard = React.lazy(() => import("pages/user-dashboard/Dashboard"));

  /* ----------For Account Import--------------------- */
  const Account = React.lazy(() => import("pages/user-account"));
  const UserProfile = React.lazy(() => import("pages/user-profile"));

  /* ----------For Fund Management Import--------------------- */

  /* ----------For Payment Import--------------------- */
  const Transfer = React.lazy(() => import("pages/payment/fund-transfer"));
  const BulkPayment = React.lazy(() => import("pages/payment/bulk-payment"));
  const VendorPayment = React.lazy(
    () => import("pages/payment/vendor-payment")
  );

  /* ----------For request Import--------------------- */

  /* ----------For Setting Import--------------------- */
  const ConfigureService = React.lazy(
    () => import("pages/user-setting/service-config/ConfigureService")
  );
  const ThemeSetting = React.lazy(
    () => import("pages/user-setting/theme-setting")
  );

  /* ----------For History Log Import--------------------- */
  const Activities = React.lazy(() => import("pages/activities/Activities"));

  console.log("loggedIn: " + isLogin);

  return (
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <SwitchWithCatch>
          <React.Suspense fallback={<Loader />}>
            <Route exact path="/" component={Dashboard} />

            {/* ---------- For Account Routing--------------------- */}
            <Route exact path="/account/user-profile" component={UserProfile} />
            <Route exact path="/account/account-details" component={Account} />

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
            <Route exact path="/activity-log/logs" component={Activities} />
          </React.Suspense>
        </SwitchWithCatch>
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default App;

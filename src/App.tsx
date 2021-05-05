import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "pages/static/Loader";
import { Route } from "react-router-dom";
import React from "react";
import DefaultLayout from "default-layout/Layout";
import { theme } from "styling/ThemeControl";
import { ThemeProvider } from "styled-components";
import { useStateValue } from "state-provider/StateProvider";

function App() {
  const [{ isLogin }, dispatch] = useStateValue();

  /* ----------For Default Dashboard Import------------------- */
  const Login = React.lazy(() => import("pages/login/Login"));
  const Dashboard = React.lazy(() => import("pages/user-dashboard/Dashboard"));

  /* ----------For Account Import--------------------- */
  const Account = React.lazy(
    () => import("pages/user-account/account-details")
  );
  const UserProfile = React.lazy(
    () => import("pages/user-account/user-profile")
  );
  const Statement = React.lazy(() => import("pages/user-account/statement"));
  /* ----------For Fund Management Import--------------------- */

  /* ----------For Payment Import--------------------- */
  const Transfer = React.lazy(() => import("pages/payment/fund-transfer"));
  const BulkPayment = React.lazy(() => import("pages/payment/bulk-payment"));
  const QuickPay = React.lazy(() => import("pages/payment/quick-pay"));
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

  const isLoginPage = window.location.pathname.startsWith("/login");

  if (isLoginPage)
    return (
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/login" component={Login} />
        </React.Suspense>
      </SwitchWithCatch>
    );

  return (
    <ThemeProvider theme={theme}>
      <DefaultLayout>
        <SwitchWithCatch>
          <React.Suspense fallback={<Loader />}>
            <Route exact path="/" component={Dashboard} />

            {/* ---------- For Account Routing--------------------- */}
            <Route path="/account/user-profile" component={UserProfile} />
            <Route path="/account/account-details" component={Account} />
            <Route path="/account/statement" component={Statement} />

            {/* ---------- For Fund Management Routing--------------------- */}

            {/* ---------- For Payment Routing--------------------- */}
            <Route path="/payment/fund-transfer" component={Transfer} />
            <Route path="/payment/bulk-payment" component={BulkPayment} />
            <Route path="/payment/vendor-payment" component={VendorPayment} />
            <Route path="/payment/quick-payment" component={QuickPay} />

            {/* ---------- For Request Routing--------------------- */}

            {/* ---------- For Setting Routing--------------------- */}
            <Route
              path="/setting/configure-service"
              component={ConfigureService}
            />
            <Route path="/setting/configure-theme" component={ThemeSetting} />

            {/* ---------- For history Logs Routing--------------------- */}
            <Route path="/activity-log/logs" component={Activities} />
          </React.Suspense>
        </SwitchWithCatch>
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default App;

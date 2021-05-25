import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "pages/static/Loader";
import { Route } from "react-router-dom";
import React from "react";
import DefaultLayout from "default-layout/Layout";
import { theme } from "styling/ThemeControl";
import { ThemeProvider } from "styled-components";
import { useStateValue } from "state-provider/StateProvider";
import Otp from "pages/login/Otp";

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
  const BrokerPayment = React.lazy(
    () => import("pages/payment/broker-payment/BrokerPayment")
  );
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
  const AddFavorite = React.lazy(
    () => import("pages/favoriteListing/AddFavorite")
  );

  const isLoginPage = window.location.pathname.startsWith("/login");

  if (isLoginPage)
    return (
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/login" component={Login} />
          <Route exact path="/otp" component={Otp} />
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
            <Route path="/user-profile" component={UserProfile} />
            <Route path="/account/account-details" component={Account} />
            <Route path="/account/statement" component={Statement} />

            {/* ---------- For Fund Management Routing--------------------- */}

            {/* ---------- For Payment Routing--------------------- */}
            <Route path="/payment/fund-transfer" component={Transfer} />
            <Route path="/payment/bulk-payment" component={BulkPayment} />
            <Route path="/payment/vendor-payment" component={VendorPayment} />
            <Route path="/payment/broker-payment" component={BrokerPayment} />
            <Route path="/payment/quick-payment" component={QuickPay} />

            {/* ---------- For Request Routing--------------------- */}

            {/* ---------- For Setting Routing--------------------- */}
            <Route
              path="/setting/configure-service"
              component={ConfigureService}
            />
            <Route path="/setting/configure-theme" component={ThemeSetting} />
            <Route
              path="/favorite-listing/add-favorite"
              component={AddFavorite}
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

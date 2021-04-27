import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout from "./components/static/Layout";
import { useStateValue } from "components/state-provider/StateProvider";
import Login from "./components/Login";

function App() {
  const [{ isLogin}] = useStateValue();
  // const [{ token }, dispatch] = useStateValue();

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

  
  console.log('loggedIn: '+ isLogin)
  return (
    <>
      {isLogin ? (
        <DefaultLayout>
          <SwitchWithCatch>
            <React.Suspense fallback={<Loader />}>
              {/* <Route
                // exact
                path="/dashboard"
                component={Dashboard}
              /> */}
              <Route
                exact
                path="/dashboard"
                render={(props: any) => {
                  document.title = "Dashboard";
                  return (
                    <>
                      <Dashboard {...props} />
                    </>
                  );
                }}
              />

              {/* ---------- For Account Routing--------------------- */}
              {/* <Route path="/account/user-profile" component={UserProfile} /> */}
              <Route exact path="/account/user-profile" component={UserProfile} />

              {/* <Route path="/account/account-details" component={Account} /> */}
              <Route
                exact
                path="/account/account-details"
                render={(props: any) => {
                  document.title = "Account";
                  return (
                    <>
                      <Account {...props} />
                    </>
                  );
                }}
              />

              {/* ---------- For Fund Management Routing--------------------- */}

              {/* ---------- For Payment Routing--------------------- */}
              {/* <Route
                // exact
                path="/payment/fund-transfer"
                component={Transfer}
              /> */}
              <Route
                exact
                path="/payment/fund-transfer"
                render={(props: any) => {
                  document.title = "Transfer";
                  return (
                    <>
                      <Transfer {...props} />
                    </>
                  );
                }}
              />
              {/* <Route
                // exact
                path="/payment/bulk-payment"
                component={BulkPayment}
              /> */}
              <Route
                exact
                path="/payment/bulk-payment"
                render={(props: any) => {
                  document.title = "BulkPayment";
                  return (
                    <>
                      <BulkPayment {...props} />
                    </>
                  );
                }}
              />
              {/* <Route
                // exact
                path="/payment/vendor-payment"
                component={VendorPayment}
              /> */}
              <Route
                exact
                path="/payment/vendor-payment"
                render={(props: any) => {
                  document.title = "VendorPayment";
                  return (
                    <>
                      <VendorPayment {...props} />
                    </>
                  );
                }}
              />

              {/* ---------- For Request Routing--------------------- */}

              {/* ---------- For Setting Routing--------------------- */}
              {/* <Route
                // exact
                path="/setting/configure-service"
                component={ConfigureService}
              /> */}
              <Route
                exact
                path="/setting/configure-service"
                render={(props: any) => {
                  document.title = "ConfigureService";
                  return (
                    <>
                      <ConfigureService {...props} />
                    </>
                  );
                }}
              />
              {/* <Route
                // exact
                path="/setting/configure-theme"
                component={ThemeSetting}
              /> */}
              <Route
                exact
                path="/setting/configure-theme"
                render={(props: any) => {
                  document.title = "ThemeSetting";
                  return (
                    <>
                      <ThemeSetting {...props} />
                    </>
                  );
                }}
              />

              {/* ---------- For history Logs Routing--------------------- */}
              {/* <Route path="/activity/log" component={Activities} /> */}
              <Route
                exact
                path="/activity/log"
                render={(props: any) => {
                  document.title = "Activities";
                  return (
                    <>
                      <Activities {...props} />
                    </>
                  );
                }}
              />
              
              <Route
                exact
                path="/"
                render={(props: any) => {
                  document.title = "Login";
                  return (
                    <>
                      <Login {...props} />
                    </>
                  );
                }}
              />
            </React.Suspense>
          </SwitchWithCatch>
        </DefaultLayout>
      ) : (
        // <Route path="/" component={Login} />
        <Route
          exact
          path="/"
          render={(props: any) => {
            document.title = "Login";
            return (
              <>
                <Login {...props} />
              </>
            );
          }}
        />
      )}
    </>
  ); 
}

export default App; 

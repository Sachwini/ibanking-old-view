import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout from "./components/static/Layout";

function App() {
  const Dashboard = React.lazy(() => import("./user/user-dashboard/Dashboard"));
  const FundTransfer = React.lazy(() => import("./user/transfer"));
  const ConfigureService = React.lazy(
    () => import("./user/user-setting/ConfigureService")
  );
  const Account = React.lazy(() => import("./user/user-account/Account"));
  const Payment = React.lazy(() => import("./user/payment/index"));

  return (
    <DefaultLayout>
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/fund-transfer" component={FundTransfer} />
          <Route path="/service-config" component={ConfigureService} />
          <Route path="/account" component={Account} />
          <Route path="/payment" component={Payment} />
        </React.Suspense>
      </SwitchWithCatch>
    </DefaultLayout>
  );
}

export default App;

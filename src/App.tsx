import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout from "./components/static/Layout";

function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const FundTransfer = React.lazy(() => import("./pages/transfer"));
  const ConfigureService = React.lazy(() => import("./pages/ConfigureService"));
  const Account = React.lazy(() => import("./pages/Account"));

  return (
    <DefaultLayout>
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/fund-transfer" component={FundTransfer} />
          <Route path="/service-config" component={ConfigureService} />
          <Route path="/account" component={Account} />
        </React.Suspense>
      </SwitchWithCatch>
    </DefaultLayout>
  );
}

export default App;

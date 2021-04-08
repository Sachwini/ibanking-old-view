import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import { FourZeroFour } from "./components/NotFound";
import React from "react";
import DefaultLayout from "./Layout";

function App() {
  const Dashboard = React.lazy(() => import("./pages/dashboard"));
  const FundTransfer = React.lazy(() => import("./pages/fundTransfer"));

  return (
    <DefaultLayout>
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/fund-transfer" component={FundTransfer} />
        </React.Suspense>
      </SwitchWithCatch>
    </DefaultLayout>
  );
}

export default App;

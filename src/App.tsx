import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import React from "react";
import DefaultLayout from "./components/static/Layout";
import ConfigureService from "pages/configureService";
import "react-bootstrap-typeahead/css/Typeahead.css";

function App() {
  const Dashboard = React.lazy(() => import("./pages/dashboard"));
  const FundTransfer = React.lazy(() => import("./pages/transfer"));
  const ChangePassword = React.lazy(() => import("./pages/changePassword"));
  const BillPaymentLog = React.lazy(
    () => import("./pages/payment/paymentIndex")
  );
  const BillPaymentTransfer = React.lazy(
    () => import("./pages/billPaymentTransfer")
  );

  return (
    <DefaultLayout>
      <SwitchWithCatch>
        <React.Suspense fallback={<Loader />}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/fund-transfer" component={FundTransfer} />
          <Route path="/service-config" component={ConfigureService} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/bill-payment-log" component={BillPaymentLog} />
          <Route
            path="/bill-payment-transfer"
            component={BillPaymentTransfer}
          />
        </React.Suspense>
      </SwitchWithCatch>
    </DefaultLayout>
  );
}

export default App;

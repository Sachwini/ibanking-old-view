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
import { GlobalStyle } from "styling/GlobalStyling";
import ListWallet from "pages/fundManagement/loadWallet/walletList/ListWallet";

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
  const LoadWallet = React.lazy(
    () => import("pages/fundManagement/loadWallet/LoadWallet")
  );

  const ListWallet = React.lazy(
    () => import("pages/fundManagement/loadWallet/walletList/ListWallet")
  );

  /* ----------For Payment Import--------------------- */
  const Transfer = React.lazy(() => import("pages/payment/fund-transfer"));
  const FundTransferSuccessConfirmation = React.lazy(
    () =>
      import("components/modals/fundTransfer/FundTransferSuccessConfirmation")
  );
  const BankTransferSuccessConfirmation = React.lazy(
    () =>
      import("components/modals/bank-transfer/BankTransferSuccessConfirmation")
  );
  const BulkPayment = React.lazy(() => import("pages/payment/bulk-payment"));
  const BrokerPayment = React.lazy(
    () => import("pages/payment/broker-payment/BrokerPayment")
  );
  const BrokerPaymentSuccessConfirmation = React.lazy(
    () =>
      import(
        "components/modals/broker-payment/BrokerPaymentSuccessConfirmation"
      )
  );
  const QuickPay = React.lazy(() => import("pages/payment/quick-pay"));
  const VendorPayment = React.lazy(
    () => import("pages/payment/vendor-payment")
  );

  /* ----------For request Import--------------------- */
  const ChequeRequest = React.lazy(
    () => import("pages/request/cheque-request/index")
  );

  /* ----------For Setting Import--------------------- */
  const ConfigureService = React.lazy(
    () => import("pages/user-setting/service-config/ConfigureService")
  );

  const ChangeMpin = React.lazy(
    () => import("pages/user-account/user-profile/ChangeMpin")
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
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <React.Suspense fallback={<Loader />}>
          <SwitchWithCatch>
            <Route exact path="/login" component={Login} />
          </SwitchWithCatch>
        </React.Suspense>
      </ThemeProvider>
    );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <React.Suspense fallback={<Loader />}>
        <DefaultLayout>
          <SwitchWithCatch>
            <Route exact path="/" component={Dashboard} />

            {/* ---------- For Account Routing--------------------- */}
            <Route path="/user-profile" component={UserProfile} />
            <Route path="/account-details" component={Account} />
            <Route path="/statement" component={Statement} />

            {/* ---------- For Fund Management Routing--------------------- */}
            <Route path="/list-wallet/load-wallet" component={LoadWallet} />
            <Route path="/load-wallet" component={ListWallet} />

            {/* ---------- For Payment Routing--------------------- */}
            <Route path="/fund-transfer" component={Transfer} />
            <Route
              path="/fund-transfer-success-confirmation"
              component={FundTransferSuccessConfirmation}
            />
            <Route
              path="/bank-transfer-success-confirmation"
              component={BankTransferSuccessConfirmation}
            />
            <Route path="/bulk-payment" component={BulkPayment} />
            <Route path="/vendor-payment" component={VendorPayment} />
            <Route path="/broker-payment" component={BrokerPayment} />
            <Route
              path="/broker-payment-success-confirmation"
              component={BrokerPaymentSuccessConfirmation}
            />
            <Route path="/quick-payment" component={QuickPay} />

            {/* ---------- For Request Routing--------------------- */}

            <Route path="/cheque-request" component={ChequeRequest} />

            {/* ---------- For Setting Routing--------------------- */}

            <Route path="/configure-service" component={ConfigureService} />
            <Route path="/change-mpin" component={ChangeMpin} />
            <Route path="/configure-theme" component={ThemeSetting} />
            <Route path="/add-favorite" component={AddFavorite} />

            {/* ---------- For history Logs Routing--------------------- */}
            <Route path="/logs" component={Activities} />
          </SwitchWithCatch>
        </DefaultLayout>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;

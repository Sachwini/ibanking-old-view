import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "pages/static/Loader";
import { Route } from "react-router-dom";
import DefaultLayout from "default-layout/Layout";
import { theme } from "styling/ThemeControl";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "styling/GlobalStyling";
import React, { useEffect } from "react";
import {
  getRememberMe,
  localStorageAuthTokenKey,
  localStorageRefreshTokenKey,
} from "services/AuthService";
import { useRecoilValue } from "recoil";
import { isUserLoggedIN } from "state-provider/globalUserData";

function App() {
  const RememberMe = getRememberMe();
  const isUserLoggedin = useRecoilValue(isUserLoggedIN);

  /* ----------For Default Dashboard Import------------------- */
  const Login = React.lazy(() => import("pages/login"));
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

  const BrokerPayment = React.lazy(
    () => import("pages/payment/broker-payment/BrokerPayment")
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
    () => import("pages/user-setting/ConfigureService")
  );

  const ChangeMpin = React.lazy(
    () => import("pages/user-account/user-profile/ChangeMpin")
  );

  const ThemeSetting = React.lazy(
    () => import("pages/user-setting/ConfigureService")
  );

  /* ----------For History Log Import--------------------- */
  const Activities = React.lazy(() => import("pages/activities"));
  const AddFavorite = React.lazy(
    () => import("pages/favoriteListing/AddFavorite")
  );

  const isLoginPage = window.location.pathname.startsWith("/login");

  useEffect(() => {
    window.addEventListener("beforeunload", handleLogout);
    window.addEventListener("unload", handleLogout);
    return () => {
      window.removeEventListener("beforeunload", handleLogout);
      window.removeEventListener("unload", handleLogout);
      handleLogout();
    };
  }, [RememberMe]);

  const handleLogout = () => {
    if (RememberMe === "false") {
      localStorage.removeItem(localStorageAuthTokenKey);
      localStorage.removeItem(localStorageRefreshTokenKey);
    }
  };

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
            <Route path="/vendor-payment" component={VendorPayment} />
            <Route path="/broker-payment" component={BrokerPayment} />

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

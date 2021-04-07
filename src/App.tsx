import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import FundTransferLimitDetail from "./pages/fundTransferLimitDetail";
import ChangePassword from "./pages/changePassword";
import FundTransfer from "./pages/fundTransfer";
import BillPaymentTransfer from "./pages/billPaymentTransfer";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
    <div className="App">
      <Dashboard/>
      </div>
      
      </>
  );
}

export default App;

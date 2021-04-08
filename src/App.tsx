import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwitchWithCatch } from "./components/SwitchWithCatch";
import { Loader } from "./components/Loader";
import { Route } from "react-router";
import { FourZeroFour } from './components/NotFound'

function App() {
  const Dashboard = React.lazy(() => import('./pages/dashboard'))

  return <SwitchWithCatch>
    <React.Suspense fallback={<Loader />}>
      <Route exact path="/" component={Dashboard} />
      <Route component={FourZeroFour} />
    </React.Suspense>
  </SwitchWithCatch>
}

export default App;

import * as React from "react";
import { Switch, Route } from "react-router";
import FourZeroFour from "pages/static/NotFound";

export const SwitchWithCatch: React.FC<{}> = ({ children }) => (
  <Switch>
    {children}
    <Route component={FourZeroFour} />
  </Switch>
);

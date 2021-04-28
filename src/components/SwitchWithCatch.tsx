import * as React from "react";
import { Switch, Route } from "react-router";
import { FourZeroFour } from "pages/static/NotFound";

export const SwitchWithCatch: React.SFC<{}> = ({ children }) => (
  <Switch>
    {children}
    <Route component={FourZeroFour} />
  </Switch>
);

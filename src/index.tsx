import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "state-provider/StateProvider";
import reducer, { initialState } from "state-provider/reducer";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

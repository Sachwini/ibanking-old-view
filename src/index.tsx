import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "state-provider/StateProvider";
import reducer, { initialState } from "state-provider/reducer";


ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "state-provider/StateProvider";
import reducer, { initialState } from "state-provider/reducer";
import { RecoilRoot } from "recoil";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

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

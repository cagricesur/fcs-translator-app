import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Loading } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

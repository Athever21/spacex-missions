import React from "react";
import { render } from "react-dom";
import App from "./App";
import MissionProvider from "./MissionProvider";
import "./style.scss";

render(
  <MissionProvider>
    <App />
  </MissionProvider>,
  document.getElementById("root")
);
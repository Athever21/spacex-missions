import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import App from "./App";
import "./style.scss";

const MissionProvider = lazy(() => import("@/MissionProvider"));

render(
  <Suspense fallback={<></>}>
    <MissionProvider>
      <App />
    </MissionProvider>
  </Suspense>,
  document.getElementById("root")
);

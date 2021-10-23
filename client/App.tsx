import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader";
import { useMission } from "@/MissionProvider";

import Loading from "@/components/Loading";
import { MissionContext } from "./models/models";

const Header = lazy(() => import("@/components/Header"));
const MissionList = lazy(() => import("@/components/Mission/MissionList"));
const SingleMission = lazy(() => import("@/components/Mission/SingleMission"));

const App = () => {
  const {init, singleMission} = useMission() as MissionContext;

  return (
    <div className="container">
      <Header />
      <Suspense fallback={<></>}>
        {singleMission.mission_name ? <SingleMission /> : init ? <Loading /> : <MissionList /> }
      </Suspense>
    </div>
  );
};

export default hot(module)(App);

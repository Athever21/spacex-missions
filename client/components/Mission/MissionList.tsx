import React from "react";
import "@/styles/MissionList.scss";

import { useMission } from "@/MissionProvider";
import { MissionContext, MissionData } from "@/models/models";

import MissionItem from "@/components/Mission/MissionItem";
import Loading from "@/components/Loading";

const MissionList = () => {
  const { missions, more, loadMore, loading } = useMission() as MissionContext;

  return (
    <div className="mission-list">
      {missions.map((x: MissionData) => (
        <MissionItem key={x.mission_name} missionData={x} />
      ))}
      {loading && <Loading />}
      {more && (
        <button className="mission-list-more" onClick={() => loadMore()}>
          More Missions
        </button>
      )}
    </div>
  );
};

export default MissionList;

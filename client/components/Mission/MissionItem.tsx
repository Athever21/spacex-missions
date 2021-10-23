import React from "react";
import moment from "moment";

import { MissionContext, MissionData } from "@/models/models";
import { useMission } from "@/MissionProvider";

const MissionItem = ({ missionData }: { missionData: MissionData }) => {
  const { setSingle } = useMission() as MissionContext;

  return (
    <div className="mission-item" onClick={() => setSingle(missionData)}>
      <h2 className="mission-item-h2">{missionData.mission_name}</h2>
      <div className="mission-item-infos">
        <div className="mission-item-launch">
          <p className="mission-item-info-name">Launch Date:</p>
          <p>{moment(missionData.launch_date_local).format("DD MMM YYYY")}</p>
        </div>
        <div className="mission-item-launch">
          <p className="mission-item-info-name">Launch Site: </p>
          <p>{missionData.launch_site.site_name}</p>
        </div>
      </div>
    </div>
  );
};

export default MissionItem;

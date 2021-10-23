import React from "react";
import moment from "moment";
import "@/styles/MissionSingle.scss";
import { useMission } from "@/MissionProvider";
import { MissionContext } from "@/models/models";

import RescueShip from "@/components/Mission/RescueShip";

const SingleMission = () => {
  const { singleMission } = useMission() as MissionContext;

  return (
    <div className="single-mission">
      <div className="single-mission-info">
        <div className="single-mission-info-left">
          <div className="single-mission-info-div">
            <p className="single-mission-info-title">MISSION</p>
            <h2 className="single-mission-name">
              {singleMission.mission_name}
            </h2>
          </div>
          <div className="single-mission-rocket single-mission-info-div">
            <p className="single-mission-info-title">ROCKET</p>
            <div className="single-mission-rocket-info">
              <p>{singleMission.rocket.rocket_name}</p>
              {singleMission.rocket.fairings &&
              singleMission.rocket.fairings.recovered ? (
                <p className="recovered single-mission-status">RECOVERED</p>
              ) : (
                <p className="unrecovered single-mission-status">UNRECOVERED</p>
              )}
            </div>
          </div>
          <a
            className="single-mission-learn-more"
            target="_blank"
            href={
              singleMission.links.article_link ||
              singleMission.links.wikipedia ||
              singleMission.links.video_link
            }
          >
            LEARN MORE
          </a>
        </div>
        <div className="single-mission-info-right">
          <div className="single-mission-launch-date single-mission-info-div">
            <p className="single-mission-info-title">LAUNCH DATE</p>
            <p className="normalDate">{moment(singleMission.launch_date_local).format("DD MMM YYYY")}</p>
            <p className="mobileDate">{moment(singleMission.launch_date_local).format("YYYY-MM-DD h:mm:ss")}</p>
          </div>
          <div className="single-mission-launch-date single-mission-info-div">
            <p className="single-mission-info-title">LAUNCH SITE</p>
            <p className="single-mission-launch" title={singleMission.launch_site.site_name_long}>
              {singleMission.launch_site.site_name}
            </p>
          </div>
        </div>
      </div>
      {singleMission.ships.length ? (
        <>
          <hr className="line" />
          <div>
            <h3 className="single-mission-ships-h3">RESCUE SHIPS</h3>
            <div className="single-mission-ships">
              {singleMission.ships.map((x) =>
                x ? <RescueShip key={x.name} ship={x} /> : ""
              )}
            </div>
          </div>
        </>
      ) : ""}
    </div>
  );
};

export default SingleMission;

import React from "react";
import "@/styles/Header.scss";
// @ts-ignore
import Logo from "@/assets/spacex.svg";
import { useMission } from "@/MissionProvider";
import { MissionContext } from "@/models/models";

const Header = () => {
  const {
    singleMission,
    nextMission,
    prevMission,
    setSingle,
    canNext,
    canPrev,
  } = useMission() as MissionContext;

  return (
    <header className="header">
      {singleMission.mission_name ? (
        <div className="header-flex">
          <i
            className={`fas fa-chevron-left nav-icon ${
              canPrev ? "" : "disabled"
            }`}
            onClick={prevMission}
          ></i>
          <img
            src={Logo}
            alt="spacex-logo"
            className="logo return-to-home"
            onClick={() => setSingle({})}
          />
          <i
            className={`fas fa-chevron-right nav-icon ${canNext ? "" : "disabled"}`}
            onClick={nextMission}
          ></i>
        </div>
      ) : (
        <img src={Logo} alt="spacex-logo" className="logo" />
      )}
      <hr className="line" />
    </header>
  );
};

export default Header;

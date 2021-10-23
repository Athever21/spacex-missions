import React from "react";
import "@/styles/Ships.scss";
import { Ship } from "@/models/models";

const RescueShip = ({ship} : {ship: Ship}) => {
  return (
    <div className="single-mission-ship">
      <img className="single-mission-ship-img" src={ship.image} alt={`${ship.name}-image`}/>
      <div className="ship-infos">
        <h3 className="ship-name">{ship.name}</h3>
        <hr className="line ship-line" />
        <div className="single-mission-ship-info">
          <p>HOME PORT</p>
          <h5>{ship.home_port}</h5>
        </div>
        <div className="single-mission-ship-info">
          <p>WEIGHT [KG]</p>
          <h5>{ship.weight_kg || "UNKNOWN"}</h5>
        </div>
      </div>
    </div>
  )
}

export default RescueShip;
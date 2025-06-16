import React from "react";
import CountUp from "react-countup";

export const MgoCounter = ({ mgo_rating = 0, mgo_level = 0 }: {mgo_rating?: number, mgo_level?: number}) => (
  <div style={{
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#000000",
    borderRadius: "1rem",
    padding: "1rem 2rem",
    display: "inline-block",
    boxShadow: "0 4px 20px rgba(80,130,255,0.15)"
  }}>
    <CountUp
      start={mgo_level}
      end={mgo_rating}
      duration={10}
      separator=","
      decimals={0}
      delay={0}
    />
  </div>
);

export default MgoCounter;

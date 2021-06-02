import React, { useState, useEffect } from "react";
import "./miniwinrate.css";

const MiniWinRate = () => {
  let winrate_api = parseInt(30);
  const [winrate, setWinRate] = useState(0);
  useEffect(() => {
    if (winrate === winrate_api) {
      setWinRate(winrate + 1);
    }
  }, [winrate]);

  return (
    <div className="mini-ranking-container">
      <div className="percentage-bar">
        <div
          onChange={() => {
            console.log("holaaa");
          }}
          style={{ width: `${winrate_api}px` }}
        ></div>
      </div>
      <span>{winrate} %</span>
    </div>
  );
};

export default MiniWinRate;

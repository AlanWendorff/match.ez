import React, { useState } from "react";
import "./miniwinrate.css";

const MiniWinRate = ({colors, winrate_api}) => {
  const [winrate, setWinRate] = useState(0);

  if (parseInt(winrate_api)) {
    const timer = setTimeout(() => {
      setWinRate(winrate + 1);
    }, 10);
    if (winrate === parseInt(winrate_api)) {
      clearTimeout(timer);
    }
  }

  return (
    <div className="mini-ranking-container">
      {winrate_api !== undefined? (
        <>
          <div className="percentage-bar">
            <div
              style={{ width: `${parseInt(winrate_api)}px`, backgroundColor: colors }}
            ></div>
          </div>
          <span>{winrate} %</span>
        </>
      ) : (
        <div className="loader-winrate display-flex-justify-center width-100percent">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniWinRate;

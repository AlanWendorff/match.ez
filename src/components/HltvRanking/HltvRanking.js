import React, { useState, useEffect, useContext } from "react";
import { ColorThemeContext } from "../Context/ColorThemeContext";
import SimpleLoadScreen from "../Loader/SimpleLoadScreen";
import { PathContext } from "../Context/PathContext";
import firebase from '../../utility/FirebaseConfig';
import { getRanking } from "./getHltvRanking";
import LoadScreen from '../Loader/LoadScreen';
import Warning from '../Warning/Warning';
import LazyLoad from "react-lazyload";
import Team from "./Team";
import "./hltvranking.css";

const database = firebase.database();
const HltvRanking = () => {
  const [badfetch, setBadFetch] = useState(false);
  const { colors } = useContext(ColorThemeContext);
  const [ranking, setRanking] = useState([]);
  const { paths } = useContext(PathContext);
  const pathsArray = Object.values(paths);

  useEffect(() => {
    database.ref('HLTV_RANKING').child(0).on('value',(snap)=>{
      if (snap.val() === null) {
        setBadFetch(true);
      }
    });
    (async () => {
      const { objRanking, badFetch } = await getRanking();
      setRanking(objRanking);
    })();
  }, []);

  return(colors.background_color !== undefined ? 
      !badfetch?
        <div
        className="ranking-container font-gilroy"
        style={{ backgroundColor: colors.background_color }}
      >
        {ranking.length > 0?
          <div className="table-container">
            {ranking.map((team) => {
              const databaseTeam = pathsArray.find(
                (element) => element.name.toLowerCase() === team.name.toLowerCase()
              );
              const { balance, name, points, position, roster } = team;
              const img = databaseTeam && databaseTeam.img;
              const id = databaseTeam && databaseTeam.id;

              let balanceColor;
              balance.length > 1
                ? balance.includes("-")
                  ? (balanceColor = "color-text-red")
                  : (balanceColor = "color-text-green")
                : (balanceColor = "color-text-black");

              return (
                <LazyLoad offset={80} height={80} overflow key={position}>
                  <Team
                    balanceColor={balanceColor}
                    id={id}
                    img={img}
                    balance={balance}
                    name={name}
                    points={points}
                    position={position}
                    roster={roster}
                  />
                </LazyLoad>
              );
            })}
          </div>
        :
          <LoadScreen/>
        }
      </div>
      :
      <div className="ranking-container font-gilroy" style={{ backgroundColor: colors.background_color }}>
        <Warning/>
      </div>
   : 
    <SimpleLoadScreen />
  );
};

export default HltvRanking;

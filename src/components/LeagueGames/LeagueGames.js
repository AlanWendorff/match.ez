import React, { useEffect, useState, useContext, Suspense } from "react";
import { useParams, useHistory } from "react-router";
import { PaletteContext } from "../Context/PaletteContext";
import { HOME } from "../../routes/routes";
import { LEAGUE_INFO } from "../../const/ApiEndpoints";
import HistoricMatchMapping from "../HistoricMatchCard/HistoricMatchMapping";
import CompetitionMapping from "../CompetitionCard/CompetitionMapping";
import MobileHeader from "../MobileHeader/MobileHeader";
import Leaderboard from "../Leaderboard/Leaderboard";
import LoadScreen from "../Loader/LoadScreen";
import InfoCard from "../InfoCard/InfoCard";
import csgoLogoDefault from "../../Images/csgoLogoDefault.png";
import axios from "axios";
const Warning = React.lazy(() => import("../Warning/Warning"));

const LeagueGames = () => {
  const { tournamentId } = useParams();
  const history = useHistory();
  !tournamentId && history.push(HOME);

  const { palette, setPalette, setLogo } = useContext(PaletteContext);
  const [loaderprogress, guardarLoaderProgress] = useState({ width: "0%" });
  const [crash, guardarStateCrash] = useState(false);
  const [matchesHoy, guardarMatchesHoy] = useState([]);
  const [prevMatch, guardarPrevMatch] = useState([]);
  const [playerscore, setPlayerScore] = useState([]);
  const [leaderboard, guardarLeaderboard] = useState([]);
  const [image_url, setImageLeague] = useState("");
  const [show, setShow] = useState("vs");
  const [buttonstatus, setButtonStatus] = useState({
    preview: false,
    vs: true,
    history: false,
    ladder: false,
  });
  const setHistory = () => {
    window.scrollTo(0, 0);
    setButtonStatus({
      vs: false,
      history: true,
      ladder: false,
      preview: false,
    });
    setShow("history");
  };

  const setLadder = () => {
    window.scrollTo(0, 0);
    setButtonStatus({
      vs: false,
      history: false,
      ladder: true,
      preview: false,
    });
    setShow("ladder");
  };

  const setVs = () => {
    window.scrollTo(0, 0);
    setButtonStatus({
      vs: true,
      history: false,
      ladder: false,
      preview: false,
    });
    setShow("vs");
  };

  useEffect(() => {
    const config = {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios
      .get(LEAGUE_INFO.replace(":id", tournamentId), config)
      .then(({ data }) => {
        const {
          historicMatches,
          upcomingMatches,
          ladder,
          imageLeague,
          colors,
        } = data;
        upcomingMatches === undefined
          ? guardarStateCrash(true)
          : guardarMatchesHoy(upcomingMatches);
        guardarLeaderboard(ladder);
        if (historicMatches && historicMatches.length !== 0) {
          setPalette(colors);
          if (imageLeague === null) {
            setImageLeague(csgoLogoDefault);
            setLogo("");
          } else {
            setLogo(setLogo);
            setImageLeague(imageLeague);
          }
          guardarPrevMatch(historicMatches);
        } else {
          guardarPrevMatch("no-match");
        }
        guardarLoaderProgress({ width: "100%" });
        if (data.length === 0) {
          guardarStateCrash(true);
          guardarLoaderProgress({ width: "100%" });
        }
      });
  }, []);

  const { width } = loaderprogress;
  if (width === "100%") {
    return (
      <div
        className="parametros-container pattern-background"
        style={{ backgroundColor: palette.DarkVibrant }}
      >
        {crash !== true && (
          <MobileHeader
            color={palette}
            img={image_url}
            buttonstatus={buttonstatus}
            setVs={setVs}
            setHistory={setHistory}
            setLadder={setLadder}
            setPreview
            isTournament
          />
        )}
        {show === "ladder" && <Leaderboard leaderboard={leaderboard} />}
        {show === "vs" && matchesHoy !== undefined && (
          <CompetitionMapping matchesHoy={matchesHoy} palette={palette} />
        )}
        {show === "vs" && matchesHoy.length === 0 && <InfoCard />}
        {show === "history" && prevMatch !== "no-match" && (
          <HistoricMatchMapping
            prevMatch={prevMatch}
            setShow={setShow}
            setPlayerScore={setPlayerScore}
            playerscore={playerscore}
          />
        )}
        {/* crash !== true && <Logo color={palette} img={image_url} /> */}

        {crash === true && (
          <Suspense fallback={<div></div>}>
            <Warning />
          </Suspense>
        )}
      </div>
    );
  } else {
    return (
      <div
        className="parametros-container pattern-background"
        style={{ backgroundColor: "#000000" }}
      >
        <LoadScreen loaderprogress={loaderprogress} />
      </div>
    );
  }
};

export default LeagueGames;
